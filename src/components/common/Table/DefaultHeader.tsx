import { TableCell, TableRow } from '@mui/material';
import React, { FC, MouseEvent } from 'react';

import { DefaultHeaderCell } from './DefaultHeaderCell';
import { DEFAULT_COLUMN_STYLES } from './constants';
import { HeaderCell, HeaderCellRenderer, HeaderRendererProps, ValidRowModel, ValidStateModel } from './types';

export type DefaultHeaderProps<R extends ValidRowModel = any, S extends ValidStateModel = any> = HeaderRendererProps<
  R,
  S
>;

export const DefaultHeader: FC<DefaultHeaderProps> = <R extends ValidRowModel = any, S extends ValidStateModel = any>({
  columns,
  onColumnHeaderClick,
  ...rest
}: DefaultHeaderProps<R, S>) => (
  <TableRow
    role="row"
    className="table-row table-header__row"
  >
    {columns.map((column, id) => {
      const headerCellRenderer = (column.renderHeaderCell || DefaultHeaderCell) as HeaderCellRenderer<R, S>;
      const headerParams: HeaderCell = { id, field: column.field, column };

      const headerClickedHandler = (e: MouseEvent<HTMLElement>) => {
        onColumnHeaderClick(headerParams, e);
      };

      return (
        <TableCell
          aria-label={headerParams.column.headerName}
          data-field={column.field}
          role="columnheader"
          key={column.field}
          className="table-cell table-header__cell"
          onClick={headerClickedHandler}
          style={{
            ...DEFAULT_COLUMN_STYLES,
            ...{
              width: column.width,
              maxWidth: column.maxWidth,
              minWidth: column.minWidth,
            },
          }}
        >
          {headerCellRenderer({ ...rest, ...headerParams })}
        </TableCell>
      );
    })}
  </TableRow>
);
