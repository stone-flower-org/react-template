import { useCallback } from 'react';

import { errorReporterProvider } from '@src/features/app/boot';
import { useAlert } from '@src/features/app/ui/hooks';

import { DEFAULT_ALERT_ERROR_TITLE } from './constants';
import { shouldHandleError } from './utils';

export const useErrorHandler = () => {
  const { error } = useAlert();
  return useCallback(
    (e: Error) => {
      if (!shouldHandleError(e)) return;
      errorReporterProvider.get().report(e);
      error({ title: DEFAULT_ALERT_ERROR_TITLE, message: e.message });
    },
    [error],
  );
};
