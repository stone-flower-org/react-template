import { Popper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButtonWrapper = styled('div')(() => ({
  height: 'max-content',
}));

export const StyledContent = styled('div')(() => ({}));

export const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.tooltip,
}));
