import { Tooltip, TooltipProps, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 0,
    boxShadow: theme.shadows[2],
    color: theme.palette.text.primary,
    padding: '12px',
  },
}));
