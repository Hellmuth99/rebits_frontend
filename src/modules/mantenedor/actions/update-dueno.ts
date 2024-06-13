import { mantenedorApi } from '@/api/mantenedorApi';

export const updateDueno = async (form) => {
  try {
    const { data } = await mantenedorApi.post(`/vehiculos/editarVehiculo`, form);
    return data?.success;
  } catch (error) {
    console.log(error);
    throw new Error('Error al actualizar el vehículo');
  }
};
