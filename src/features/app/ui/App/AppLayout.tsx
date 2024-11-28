import React, { FC, PropsWithChildren, useEffect } from 'react';

import { useErrorHandler, useAppErrors } from '@src/features/app/ui/hooks';
import { AlertBar } from '@src/features/common/ui/components/Alert';
import { useAlertContext } from '@src/features/common/ui/components/Alert/hooks';

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
