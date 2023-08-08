import { TableCell, TableRow } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

import { RowRendererProps, ValidRowModel, ValidStateModel } from './types';

export interface DefaultRowGroupHeaderProps<R extends ValidRowModel = any, S extends ValidStateModel = any>
  extends PropsWithChildren<any>,
    RowRendererProps<R, S> {}

export const DefaultRowGroupHeader: FC<DefaultRowGroupHeaderProps> = ({
  children,
  columns,
}: DefaultRowGroupHeaderProps) => (
  <TableRow className="table-row table-body__row table-row-group-header">
    <TableCell
      className="table-cell table-body__cell table-row-group-header__cell"
      colSpan={columns.length}
    >
      <div className="table-row-group-header__label">{children}</div>
    </TableCell>
  </TableRow>
);
