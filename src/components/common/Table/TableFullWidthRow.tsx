import { TableCell, TableRow } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

export interface TableFullWidthRowProps extends PropsWithChildren<any> {
  colSpan: number;
}

export const TableFullWidthRow: FC<TableFullWidthRowProps> = ({ children, colSpan }: TableFullWidthRowProps) => (
  <TableRow className="table-row table-body__row table-row-full">
    <TableCell
      className="table-cell table-body__cell table-row-full__cell"
      colSpan={colSpan}
    >
      {children}
    </TableCell>
  </TableRow>
);
