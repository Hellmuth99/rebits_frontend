import { mantenedorApi } from '@/api/mantenedorApi';
import type { Vehicle } from '../interfaces/vehicle.interface';

export const updateVehicle = async (vehicle: Vehicle) => {
  try {
    const { data } = await mantenedorApi.put(`/vehiculos/editarVehiculo/${vehicle.id}`, vehicle);
    return data?.success;
  } catch (error) {
    console.log(error);
    throw new Error('Error al actualizar el vehículo');
  }
};

export const updateVehicleFull = async (form) => {
  try {
    const { data } = await mantenedorApi.post(`/vehiculos/editarVehiculo`, form);
    return data?.success;
  } catch (error) {
    console.log(error);
    throw new Error('Error al actualizar el vehículo');
  }
};
