import { mantenedorApi } from '@/api/mantenedorApi';

export const deleteUser = async (form) => {
  try {
    const { data } = await mantenedorApi.post(`/usuarios/eliminarUsuario?id=${form}`);
    return data?.success;
  } catch (error) {
    console.log(error);
    throw new Error('Error al actualizar el vehículo');
  }
};
