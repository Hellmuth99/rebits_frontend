import { mantenedorApi } from '@/api/mantenedorApi';

import type { User } from '../interfaces/user.interface';

export const getUsersList = async () => {
  try {
    // const { data } = await mantenedorApi.get(
    const { data } = await mantenedorApi.get(
      `/usuarios/list`,

      // `/vehiculos?page=${page}&limit=${limit * page}`,
    );
    console.log('dataaaa', data.success);
    return data?.success;
  } catch (error) {
    console.log(error);
  }
};
