import React, { FC, PropsWithChildren, useEffect } from 'react';

import { AlertBar } from '@src/components/common/Alert';
import { useAlertContext } from '@src/components/common/Alert/hooks';
import { useErrorHandler, useAppErrors } from '@src/hooks';

export type AppLayoutProps = PropsWithChildren;

export const AppLayout: FC<AppLayoutProps> = ({ children }: AppLayoutProps) => {
  const handleError = useErrorHandler();
  const { errors, setErrors } = useAppErrors();
  const { alerts, remove } = useAlertContext();

  useEffect(() => {
    if (errors.length) {
      errors.forEach(handleError);
      setErrors([]);
    }
  }, [errors, handleError, setErrors]);

  return (
    <>
      {children}
      <AlertBar
        alerts={alerts}
        onClose={remove}
      />
    </>
  );
};
