import { Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

import { Scrollable } from '@src/components/common/Scrollable';
import { getColorFromTheme } from '@src/utils/theme';

export const StyledAlertBarContainer = styled(Scrollable)(({ theme }) => ({
  '&.scrollable': {
    bottom: 0,
    display: 'block',
    position: 'absolute',
    right: 0,
    zIndex: theme.zIndex.snackbar,
  },
  '& > .scrollable__content': {
    maxHeight: '100vh',
    overflow: 'auto',
    padding: theme.spacing(2, 3, 2, 0),
    width: '444px',
    '&:empty': {
      padding: 0,
      width: 0,
    },
  },
}));

export const StyledAlertContainer = styled(Scrollable)(({ theme }) => ({
  '&.scrollable': {
    margin: theme.spacing(0, 0, 2),
    '&:last-of-type': {
      margin: 0,
    },
  },
  '& > .scrollable__content': {
    background: theme.palette.background.paper,
    borderRadius: '8px',
    boxShadow: theme.shadows[1],
    display: 'flex',
    flexFlow: 'column',
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
    '&:last-of-type': {
      margin: 0,
    },
  },
}));

export const StyledAlertHeader = styled('div')(({ theme }) => ({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  gap: theme.spacing(1),
}));

export const StyledAlertTitle = styled('p')(({ theme }) => ({
  ...theme.typography.body1,
  display: 'flex',
  fontWeight: 600,
  flexGrow: 1,
  padding: theme.spacing(2, 0),
}));

export interface StyledAlertIconProps {
  color?: string;
}

export const StyledAlertIcon = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})<StyledAlertIconProps>(({ theme, color = 'info' }) => ({
  alignSelf: 'stretch',
  background: getColorFromTheme(theme, color),
  display: 'flex',
  width: '2.5rem',
}));

export const StyledAlertBtn = styled(Button)(() => ({}));

export const StyledAlertBody = styled('div')(({ theme }) => ({
  ...theme.typography.body1,
  display: 'flex',
  padding: theme.spacing(1),
}));

export interface StyledDisappearanceTimerProps {
  color?: string;
  time?: number | null;
}

const disappear = keyframes`
  from {
    transform: translate(0%, 0)
  },
  to {
    transform: translate(100%, 0)
  }
`;

export const StyledDisappearanceTimer = styled('span', {
  shouldForwardProp: (prop: any) => !['color', 'time'].includes(prop),
})<StyledDisappearanceTimerProps>(({ color = 'info', time, theme }) => ({
  animation: `${disappear} ${time ?? 0}ms ease forwards`,
  borderColor: getColorFromTheme(theme, color),
  borderStyle: 'solid',
  borderWidth: '2px',
  bottom: 0,
  position: 'absolute',
  width: '100%',
}));
