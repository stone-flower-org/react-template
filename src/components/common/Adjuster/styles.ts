import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Adjuster, AdjusterProps } from './Adjuster';
import { Position } from './constants';

const mPos: string[] = [Position.TOP_M, Position.CENTER_M, Position.BOTTOM_M];
const rPos: string[] = [Position.TOP_R, Position.CENTER_R, Position.BOTTOM_R];
const cPos: string[] = [Position.CENTER_L, Position.CENTER_M, Position.CENTER_R];
const bPos: string[] = [Position.BOTTOM_L, Position.BOTTOM_M, Position.BOTTOM_R];

export const StyledContainer = styled(Box, { shouldForwardProp: (prop) => prop !== 'pos' })<Required<AdjusterProps>>(
  ({ pos }) => ({
    display: 'flex',
    height: '100%',
    width: '100%',
    ...(mPos.includes(pos) && {
      justifyContent: 'center',
    }),
    ...(rPos.includes(pos) && {
      justifyContent: 'end',
    }),
    ...(cPos.includes(pos) && {
      alignItems: 'center',
    }),
    ...(bPos.includes(pos) && {
      alignItems: 'end',
    }),
  })
) as typeof Adjuster;
