import { mantenedorApi } from '@/api/mantenedorApi';
import type { Vehicle } from '../interfaces/vehicle.interface';

export const deleteVehicleById = async (id) => {
  try {
    const { data } = await mantenedorApi.post(`/vehiculos/eliminarVehiculo?patente=${id}`);
    return data?.success;
  } catch (error) {
    console.log(error);
    throw new Error('Error al actualizar el vehículo');
  }
};
