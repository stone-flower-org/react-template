import React, { FC, PropsWithChildren } from 'react';

import { Adjuster } from '@src/features/common/ui/components/Adjuster';
import { Loading } from '@src/features/common/ui/components/Loading';

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
            size={size}
            title={title}
          />
        </StyledContainer>
      </Adjuster>
    );
  return children;
};
