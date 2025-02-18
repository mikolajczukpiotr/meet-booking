import React, { useState } from 'react';
import { DeleteIcon } from './DeleteIcon';
import { uploadFile, deleteFile } from '../services/api';

interface FileUploadProps {
  label: string;
  onChange: (urls: string[]) => void;
}

interface UploadedFile {
  id: string;
  url: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ label, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const handleFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    try {
      setIsUploading(true);
      const response = await uploadFile(file);
      setUploadedFile(response);
      onChange([response.url]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!uploadedFile) return;

    try {
      await deleteFile(uploadedFile.id);
      setUploadedFile(null);
      onChange([]);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-purple-950 text-base">{label}</label>
      <div
        className={`border ${isDragging ? 'border-purple-600 bg-purple-50' : 'border-purple-200 bg-white'} rounded-lg p-4 transition-colors`}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
      >
        {!uploadedFile ? (
          <div className="text-center">
            <label className="cursor-pointer">
              <p className="text-purple-600 hover:text-purple-800 transition-colors">
                Upload a file
              </p>
              <p className="text-gray-500 ml-2">or drag and drop here</p>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
                disabled={isUploading}
              />
            </label>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex flex-row gap-4 items-center">
              <p className="text-sm text-purple-950">{uploadedFile.url.split('/').pop()}</p>
              <DeleteIcon onClick={handleDelete} />
            </div>
          </div>
        )}
        {isUploading && <div className="mt-2 text-sm text-purple-600">Uploading...</div>}
      </div>
    </div>
  );
};
