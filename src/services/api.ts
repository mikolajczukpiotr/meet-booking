interface UploadResponse {
  id: string;
  url: string;
}

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Create object URL for the file
  const url = URL.createObjectURL(file);

  // Mock response
  return {
    id: Math.random().toString(36).substring(7),
    url,
  };
};

export const deleteFile = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
};
