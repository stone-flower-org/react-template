import React, { FC } from 'react';

import { Loading } from '@src/components/common/Loading';

import { StyledLoaderAdjuster } from './styles';

export const TableLoader: FC = () => (
  <StyledLoaderAdjuster>
    <Loading size="large" />
  </StyledLoaderAdjuster>
);
