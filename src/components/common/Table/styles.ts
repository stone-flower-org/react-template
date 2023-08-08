import { styled } from '@mui/material';

import { Adjuster } from '@src/components/common/Adjuster';
import { Scrollable } from '@src/components/common/Scrollable/Scrollable';

export const StyledTableContainer = styled(Scrollable)(() => ({
  '& > .scrollable__content': {
    width: '100%',
    overflowY: 'auto',
  },
}));

export const StyledTableBlock = styled('div')(() => ({
  display: 'flex',
  height: 'calc(100% - 64px)',
  position: 'relative',
  width: '100%',
}));

export const StyledLoaderAdjuster = styled(Adjuster)(() => ({
  position: 'absolute',
}));

export const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  flexFlow: 'column',
  '& .table': {
    background: theme.palette.background.paper,
    tableLayout: 'fixed',
    '.MuiTableCell-root': {
      fontWeight: 400,
      padding: 0,
    },
    '.table__header': {},
    '.table-header__row': {
      verticalAlign: 'top',
    },
    '.table-header__cell': {
      background: theme.palette.background.paper,
      minHeight: '40px',
      padding: '8px 0',
      textTransform: 'uppercase',
    },
    '.table__body': {
      height: '100%',
    },
    '.table-header__cell,.table-body__cell': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: '0 12px',
    },
    '.table__body .table-cell__content': {
      overflow: 'visible',
      padding: '12px 0',
      width: '100%',
    },
    '.table__header .table-cell__content': {
      minHeight: '40px',
      padding: '8px 0',
    },
    '.table-cell:first-of-type': {
      paddingLeft: '24px',
    },
    '.table-cell:last-of-type': {
      paddingRight: '24px',
    },
    '.table-body__row:hover': {
      background: theme.palette.background.default,
    },
    '.table-row-group-header': {
      background: theme.palette.background.default,
    },
    '.table-row-group-header__label': {
      alignItems: 'center',
      display: 'flex',
      color: theme.palette.text.disabled,
      fontWeight: 400,
      height: '28px',
    },
    '.table-row-full': {
      '.table-body__cell': {
        border: 0,
      },
      '.table-cell': {
        padding: 0,
      },
    },
  },
}));
