import { BoxProps } from '@mui/material';
import React, { FC } from 'react';

import { DEFAULT_PROPS, Position } from './constants';
import { StyledContainer } from './styles';

export interface AdjusterProps extends Omit<BoxProps, 'sx'> {
  pos?: Position | string;
}

export const Adjuster: FC<AdjusterProps> = (props: AdjusterProps) => (
  <StyledContainer
    {...DEFAULT_PROPS}
    {...props}
  />
);
