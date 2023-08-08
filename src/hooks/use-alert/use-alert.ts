import { useMemo } from 'react';

import { useAlertContext } from '@src/components/common/Alert/hooks';
import { AlertType } from '@src/components/common/Alert/types';

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
        push({ lifetime: DEFAULT_LIFETIME, ...params, type: AlertType.success });
      },
      warning: (params: AlertParams) => {
        push({ lifetime: DEFAULT_LIFETIME, ...params, type: AlertType.warning });
      },
    }),
    [push]
  );
};
