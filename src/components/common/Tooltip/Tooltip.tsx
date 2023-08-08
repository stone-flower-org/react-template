import { TooltipProps as BaseTooltipProps } from '@mui/material';
import React, { FC } from 'react';

import { PopperProps } from '@src/components/common/Popper';

import { DEFAULT_RPOPS } from './constants';
import { StyledTooltip } from './styles';

export interface TooltipProps extends BaseTooltipProps {
  'data-test-id'?: string;
  PopperProps?: PopperProps;
}

export const Tooltip: FC<TooltipProps> = (props: TooltipProps) => (
  <StyledTooltip
    {...DEFAULT_RPOPS}
    {...props}
  />
);
