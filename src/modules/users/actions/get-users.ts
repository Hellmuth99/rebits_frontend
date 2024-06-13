import { mantenedorApi } from '@/api/mantenedorApi';

import type { User } from '../interfaces/user.interface';

export const getUsers = async (page: number = 1, limit: number = 10) => {
  try {
    // const { data } = await mantenedorApi.get(
    const { data } = await mantenedorApi.get<User[]>(
      `/usuarios?page=${page}&limit=${limit}`,

      // `/vehiculos?page=${page}&limit=${limit * page}`,
    );
    console.log('dataaaa', data);
    return data?.success?.data;
  } catch (error) {
    console.log(error);
  }
};
