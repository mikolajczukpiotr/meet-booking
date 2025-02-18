import React, { useState } from 'react';
import { DeleteIcon } from './DeleteIcon';
import { AddIcon } from './AddIcon';
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
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    try {
      setIsUploading(true);
      const response = await uploadFile(file);
      const newFiles = [...uploadedFiles, response];
      setUploadedFiles(newFiles);
      onChange(newFiles.map((file) => file.url));
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFile(id);
      const newFiles = uploadedFiles.filter((file) => file.id !== id);
      setUploadedFiles(newFiles);
      onChange(newFiles.map((file) => file.url));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    Array.from(e.dataTransfer.files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        handleFile(file);
      }
    });
  };

  const handleAdd = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFile(file);
    };
    input.click();
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
        {uploadedFiles.length === 0 ? (
          <div className="text-center">
            <label className="cursor-pointer">
              <span className="text-purple-600 hover:text-purple-800 transition-colors">
                Upload a file
              </span>
              <span className="text-gray-500 ml-2">or drag and drop here</span>
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
          <div className="flex flex-wrap gap-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="relative group">
                <img
                  src={file.url}
                  alt="Uploaded file"
                  className="h-20 w-20 object-cover rounded-lg border border-purple-100"
                />
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DeleteIcon onClick={() => handleDelete(file.id)} />
                </div>
              </div>
            ))}
            <div
              className="flex items-center justify-center h-20 w-20 border border-purple-100 rounded-lg cursor-pointer hover:border-purple-200 transition-colors"
              onClick={handleAdd}
            >
              <AddIcon />
            </div>
          </div>
        )}
        {isUploading && <div className="mt-2 text-sm text-purple-600">Uploading...</div>}
      </div>
    </div>
  );
};
