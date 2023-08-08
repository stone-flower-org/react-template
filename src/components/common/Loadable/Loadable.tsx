import React, { FC, PropsWithChildren } from 'react';

import { Adjuster } from '@src/components/common/Adjuster';
import { Loading } from '@src/components/common/Loading';

import { DEFAULT_PROPS } from './constants';
import { StyledContainer } from './styles';

export interface LoadableProps extends PropsWithChildren<any> {
  loading?: boolean;
  size?: string;
  title?: string;
}

export const Loadable: FC<LoadableProps> = ({
  children,
  loading = DEFAULT_PROPS.loading,
  size = DEFAULT_PROPS.size,
  title = DEFAULT_PROPS.title,
}: LoadableProps) => {
  if (loading)
    return (
      <Adjuster>
        <StyledContainer>
          <Loading
            title={title}
            size={size}
          />
        </StyledContainer>
      </Adjuster>
    );
  return children;
};
