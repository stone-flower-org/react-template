import { TableCell, TableRow } from '@mui/material';
import React, { FC, MouseEvent } from 'react';

import { DefaultCell } from './DefaultCell';
import { Cell, Row, RowRendererProps, ValidRowModel, ValidStateModel } from './types';
import { defaultValueGetter } from './utils';

export type DefaultRowProps<R extends ValidRowModel = any, S extends ValidStateModel = any> = RowRendererProps<R, S>;

export const DefaultRow: FC<DefaultRowProps> = <R extends ValidRowModel = any, S extends ValidStateModel = any>({
  columns,
  rowData,
  rowIndex,
  getRowId,
  onRowClick,
  onCellClick,
  ...rest
}: DefaultRowProps<R, S>) => {
  const row: Row = {
    id: getRowId(rowData),
    rowData,
    columns,
  };

  const rowClickedHandler = (e: MouseEvent<HTMLElement>) => {
    onRowClick(row, e);
  };

  return (
    <TableRow
      role="row"
      key={row.id}
      data-id={row.id}
      data-rowindex={rowIndex}
      className="table-row table-body__row"
      onClick={rowClickedHandler}
    >
      {columns.map((colum, colindex) => {
        const cellData: Cell = {
          id: `${String(row.id)}-${colum.field}`,
          field: colum.field,
          value: undefined,
          rowData,
        };

        const valueGetter = colum.valueGetter || defaultValueGetter;
        const cellRenderer = colum.renderCell || DefaultCell;

        const value = valueGetter(cellData);
        cellData.value = value;

        const cellClickedHandler = (e: MouseEvent<HTMLElement>) => {
          onCellClick(cellData, e);
        };

        return (
          <TableCell
            role="cell"
            data-field={colum.field}
            data-colindex={colindex}
            key={colum.field}
            className="table-cell table-body__cell"
            onClick={cellClickedHandler}
          >
            {cellRenderer({ ...rest, ...cellData, row })}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
