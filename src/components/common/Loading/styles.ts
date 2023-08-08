import { styled } from '@mui/material/styles';

import { isKeyOf } from '@src/utils/common';
import { getColorFromTheme } from '@src/utils/theme';

import { Loading, LoadingProps } from './Loading';
import { DEFAULT_PROPS, SIZES } from './constants';

const borderWidth = 2;

const calcSize = (size: LoadingProps['size']) =>
  `calc(${isKeyOf(SIZES, size) ? SIZES[size] : size} - ${borderWidth * 2}px)`;

export const StyledLoading = styled(Loading)<LoadingProps>(
  ({ theme, size = DEFAULT_PROPS.size, color = DEFAULT_PROPS.color }) => ({
    animation: `circle-loader-spin ${theme.transitions.duration.standard}s linear infinite`,
    border: `${borderWidth}px solid ${theme.palette.divider}`,
    borderLeftColor: getColorFromTheme(theme, color),
    borderRadius: '50%',
    display: 'inline-flex',
    height: calcSize(size),
    width: calcSize(size),
    transform: 'translateZ(0)',
    '@keyframes circle-loader-spin': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(1turn)',
      },
    },
  })
);
