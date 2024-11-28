import React, { CSSProperties, FC, HTMLAttributes } from 'react';

import { DEFAULT_PROPS } from './constants';
import { LoadingSizeValue } from './types';

export interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
  'data-test-id'?: string;
  className?: string;
  color?: CSSProperties['color'] | string;
  size?: CSSProperties['width'] | LoadingSizeValue;
  title?: string;
}

export const Loading: FC<LoadingProps> = ({
  'data-test-id': dataName = DEFAULT_PROPS['data-test-id'],
  role = DEFAULT_PROPS.role,
  title = DEFAULT_PROPS.title,
  ...rest
}: LoadingProps) => (
  <span
    {...rest}
    aria-label={title}
    data-test-id={dataName}
    role={role}
  />
);
