import { useContext } from 'react';

import { AlertContext } from '@src/components/common/Alert/context';

export const useAlertContext = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlertContext must be used within AlertContext');
  return ctx;
};
