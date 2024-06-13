import axios from 'axios';

const mantenedorApi = axios.create({
  baseURL: import.meta.env.VITE_MANTENEDOR_API,
});

console.log(import.meta.env);

//interceptor

export { mantenedorApi };
