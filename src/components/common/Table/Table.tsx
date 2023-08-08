import { Table as BaseTable, TableProps as BaseTableProps, TableBody, TableHead } from '@mui/material';
import React, { FC, memo } from 'react';

import { useControlledState } from '@src/hooks';
import { joinNonEmpty } from '@src/utils/common';

import { DefaultHeader } from './DefaultHeader';
import { DefaultRow } from './DefaultRow';
import { TableLoader } from './TableLoader';
import { DEFAULT_TABLE_PROPS } from './constants';
import { StyledContainer, StyledTableBlock, StyledTableContainer } from './styles';
import {
  HeaderRenderer,
  RowRenderer,
  RowRendererProps,
  TableRenderProps,
  ValidRowModel,
  ValidStateModel,
} from './types';
import { defaultClickHandler, defaultRowIdGetter } from './utils';

export interface TableProps<R extends ValidRowModel = any, S extends ValidStateModel = any>
  extends BaseTableProps,
    Partial<TableRenderProps<R>> {
  'data-test-id'?: string;
  className?: string;
  loading?: boolean;
}

export const _Table: FC<TableProps> = <R extends ValidRowModel = any, S extends ValidStateModel = any>({
  'data-test-id': dataName = DEFAULT_TABLE_PROPS['data-test-id'],
  className,
  columns = DEFAULT_TABLE_PROPS.columns,
  rows = DEFAULT_TABLE_PROPS.rows,
  onCellClick,
  onColumnHeaderClick,
  onRowClick,
  onStateChange,
  getHeaderRenderer,
  getRowId,
  getRowRenderer,
  loading = DEFAULT_TABLE_PROPS.loading,
  state = DEFAULT_TABLE_PROPS.state,
  ...rest
}: TableProps<R, S>) => {
  const containerClassName = joinNonEmpty([className, 'table__wrapper'], ' ');

  const headerRenderer = (getHeaderRenderer ?? DefaultHeader) as HeaderRenderer<R, S>;
  const rowIdGetter = getRowId ?? defaultRowIdGetter;
  const rowRenderer = (getRowRenderer ?? DefaultRow) as RowRenderer<R, S>;
  const rowClickHandler = onRowClick ?? defaultClickHandler;
  const cellClickHandler = onCellClick ?? defaultClickHandler;
  const columnHeaderClickHandler = onColumnHeaderClick ?? defaultClickHandler;

  const { state: tableState, updateState: updateTableState } = useControlledState({ state, onChange: onStateChange });

  return (
    <StyledContainer
      data-test-id={`${dataName}-wrapper`}
      className={containerClassName}
    >
      <StyledTableBlock>
        {loading && <TableLoader />}
        <StyledTableContainer className="table__container">
          <BaseTable
            {...rest}
            aria-label={dataName}
            className="table"
            data-test-id={dataName}
          >
            <TableHead
              role="rowgroup"
              className="table__header"
            >
              {headerRenderer({
                columns,
                onColumnHeaderClick: columnHeaderClickHandler,
                onStateChange: updateTableState,
                state: tableState,
              })}
            </TableHead>
            <TableBody
              role="rowgroup"
              className="table__body"
            >
              {!loading &&
                rows.map((rowData, rowIndex) => {
                  const rowId = rowIdGetter(rowData);
                  const rowRendererProps = {
                    key: rowId,
                    id: rowId,
                    rowData,
                    rowIndex,
                    columns,
                    state: tableState,
                    getRowId: rowIdGetter,
                    onCellClick: cellClickHandler,
                    onRowClick: rowClickHandler,
                    onStateChange: updateTableState,
                  } as RowRendererProps<R, S>;
                  return rowRenderer(rowRendererProps);
                })}
            </TableBody>
          </BaseTable>
        </StyledTableContainer>
      </StyledTableBlock>
    </StyledContainer>
  );
};

export const Table = memo(_Table);
