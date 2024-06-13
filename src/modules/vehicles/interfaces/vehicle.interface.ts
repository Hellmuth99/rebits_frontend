import type { User } from '@/modules/users/interfaces/user.interface';

export interface Vehicle {
  id: number;
  marca: string;
  modelo: string;
  patente: string;
  anio: number;
  precio: number;
  dueno_id: number;
  created_at: Date;
  updated_at: Date;
  user: User;
}
