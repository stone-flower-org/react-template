import { ReactNode } from 'react';

export enum AlertType {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

export interface AlertContext {
  alerts: AlertItem[];
  push: (item: AlertItemParams) => void;
  remove: (item: AlertItem['id']) => void;
}

export interface AlertItemParams extends Omit<AlertItem, 'id' | 'timeoutId' | 'lifetime'> {
  lifetime?: number | null;
}

export interface AlertItem {
  id: string;
  lifetime: number | null;
  message?: ReactNode;
  timeoutId?: ReturnType<typeof setTimeout>;
  title: ReactNode;
  type: AlertType;
}
