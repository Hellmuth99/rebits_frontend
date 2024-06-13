import { mantenedorApi } from '@/api/mantenedorApi';

export const createVehicle = async (form) => {
  try {
    const { data } = await mantenedorApi.post(`/vehiculos/crearVehiculo`, form);
    return data?.success;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detalleRespuesta) {
      const { detalleRespuesta } = error.response.data;
      throw new Error(detalleRespuesta); // Lanza un error con el mensaje devuelto por el backend
    } else {
      console.error('Error al crear usuario:', error);
      throw new Error('Error desconocido al crear el usuario'); // Error genérico si no se puede acceder al mensaje detallado
    }
  }
};
