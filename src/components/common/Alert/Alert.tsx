import { Collapse } from '@mui/material';
import React, { FC, HTMLAttributes, useState } from 'react';

import { AlertItem } from '@src/components/common/Alert/types';

import { DEFAULT_ALERT_PROPS } from './contants';
import {
  StyledAlertContainer,
  StyledAlertHeader,
  StyledAlertIcon,
  StyledAlertTitle,
  StyledAlertBtn,
  StyledAlertBody,
  StyledDisappearanceTimer,
} from './styles';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'id'>, AlertItem {
  onClose: (id: AlertItem['id']) => void;
}

export const Alert: FC<AlertProps> = (props: AlertProps) => {
  const { id, lifetime, message, title, type, onClose, timeoutId: _, ...rest } = props;
  const containerProps = { ...DEFAULT_ALERT_PROPS, ...rest };
  const dataName = containerProps['data-test-id'];
  const [isOpen, setIsOpen] = useState(false);
  const onHeaderClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  const onCloseClick = () => {
    onClose(id);
  };
  return (
    <StyledAlertContainer
      {...containerProps}
      role="alert"
    >
      <StyledAlertHeader
        data-test-id={`${dataName}-header`}
        onClick={onHeaderClick}
      >
        <StyledAlertIcon color={type} />
        <StyledAlertTitle>{title}</StyledAlertTitle>
        <StyledAlertBtn
          data-test-id={`${dataName}-close-btn`}
          size="small"
          onClick={onCloseClick}
        >
          x
        </StyledAlertBtn>
      </StyledAlertHeader>
      <Collapse in={isOpen}>
        <StyledAlertBody data-test-id={`${dataName}-body`}>{message}</StyledAlertBody>
      </Collapse>
      <StyledDisappearanceTimer
        color={type}
        role="progressbar"
        time={lifetime}
      />
    </StyledAlertContainer>
  );
};
