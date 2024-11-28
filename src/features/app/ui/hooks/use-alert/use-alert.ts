import { useMemo } from 'react';

import { useAlertContext } from '@src/features/common/ui/components/Alert/hooks';
import { AlertType } from '@src/features/common/ui/components/Alert/types';

import { DEFAULT_LIFETIME } from './constants';
import { AlertParams } from './types';

export const useAlert = () => {
  const { push } = useAlertContext();
  return useMemo(
    () => ({
      error: (params: AlertParams) => {
        push({ lifetime: DEFAULT_LIFETIME, ...params, type: AlertType.error });
      },
      info: (params: AlertParams) => {
        push({ lifetime: DEFAULT_LIFETIME, ...params, type: AlertType.info });
      },
      success: (params: AlertParams) => {
        push({
          lifetime: DEFAULT_LIFETIME,
          ...params,
          type: AlertType.success,
        });
      },
      warning: (params: AlertParams) => {
        push({
          lifetime: DEFAULT_LIFETIME,
          ...params,
          type: AlertType.warning,
        });
      },
    }),
    [push],
  );
};
