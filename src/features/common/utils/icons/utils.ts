import { SvgIconProps as BaseSvgIconProps } from '@mui/material';
import { createElement, ElementType, FC } from 'react';

import { StyledIcon } from './styles';
import { FontSize } from './types';

export interface SvgIconProps extends Omit<BaseSvgIconProps, 'component' | 'fontSize'> {
  fontSize?: BaseSvgIconProps['fontSize'] | string;
}

export const createComponentFromSvg = (svg: ElementType, name: string) => {
  const Icon: FC<SvgIconProps> = (props: SvgIconProps) =>
    createElement(StyledIcon, {
      fontSize: FontSize.small,
      inheritViewBox: true,
      role: 'img',
      titleAccess: name,
      ...props,
      component: svg,
    } as any);
  Icon.displayName = name;
  return Icon;
};
