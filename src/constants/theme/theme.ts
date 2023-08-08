import { createTheme } from '@mui/material/styles';

import { colors } from './colors';
import { fonts } from './fonts';
import { globalStyles } from './global-styles';
import { typography } from './typography';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1200,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: [globalStyles, fonts].join('\n'),
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  palette: {
    common: {
      ...colors,
    },
  },
  typography: {
    ...typography,
  },
});
