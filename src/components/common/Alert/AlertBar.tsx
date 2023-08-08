import React, { FC, HTMLAttributes, memo } from 'react';

import { Alert } from './Alert';
import { DEFAULT_ALERT_BAR_PROPS } from './contants';
import { StyledAlertBarContainer } from './styles';
import { AlertItem } from './types';

export interface AlertBarProps extends HTMLAttributes<HTMLDivElement> {
  alerts: AlertItem[];
  onClose: (id: AlertItem['id']) => void;
}

export const _AlertBar: FC<AlertBarProps> = ({ alerts, onClose, ...rest }: AlertBarProps) => {
  const props = { ...DEFAULT_ALERT_BAR_PROPS, ...rest };
  return (
    <StyledAlertBarContainer
      {...props}
      role="presentation"
    >
      {alerts.map((alert, i) => (
        <Alert
          {...alert}
          data-test-id={`${props['data-test-id']}-alert-${i}`}
          key={alert.id}
          onClose={onClose}
        />
      ))}
    </StyledAlertBarContainer>
  );
};
export const AlertBar = memo(_AlertBar);
