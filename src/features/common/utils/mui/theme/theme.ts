import { PaletteColor, Theme } from '@mui/material/styles';
import { CSSProperties } from 'react';

import { isKeyOf } from '@src/features/common/utils/core';

export const getColorFromTheme = (theme: Theme, color: string): CSSProperties['color'] => {
  if (isKeyOf(theme.palette, color) && isKeyOf(theme.palette[color], 'main'))
    return (theme.palette[color] as PaletteColor).main;
  if (color === 'text') return theme.palette.text.primary;
  return color;
};

export const getSelectedColorFromTheme = (theme: Theme, color: string): CSSProperties['color'] => {
  if (isKeyOf(theme.palette, color) && isKeyOf(theme.palette[color], 'dark'))
    return (theme.palette[color] as PaletteColor).dark;
  if (color === 'text') return theme.palette.text.primary;
  return color;
};
