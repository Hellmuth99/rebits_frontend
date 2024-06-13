import { mantenedorApi } from '@/api/mantenedorApi';
import type { Vehicle } from './../interfaces/vehicle.interface';

export const getVehicleById = async (vehicleId: string): Promise<Vehicle> => {
  console.log('vehicleId', vehicleId);

  if (vehicleId === 'create') {
    return {
      id: '',
      title: '',
      slug: '',
      description: '',
      price: 0,
      stock: 0,
      images: [],
      tags: [],
      sizes: [],
      gender: '' as any,
      user: {} as any,
    };
  }

  try {
    const { data } = await mantenedorApi.get<Vehicle>(`/vehiculos/detalleVehiculo?id=${vehicleId}`);

    console.log(data);
    return data?.success;
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting product by id ${vehicleId}`);
  }
};
