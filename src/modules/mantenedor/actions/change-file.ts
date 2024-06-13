import { mantenedorApi } from '@/api/mantenedorApi';

const uploadFile = async (file: File): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await mantenedorApi.post('/products', formData, {
      responseType: 'blob',
    });

    return data;
    //   handleFileDownload(response.data, file.name);
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file');
  }
};
