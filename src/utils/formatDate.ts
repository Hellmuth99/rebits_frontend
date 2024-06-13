// src/utils/dateFormatter.ts
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: string): string => {
  return format(new Date(date), 'MMM dd, yyyy', { locale: es });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
};
