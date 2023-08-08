import { MouseEvent, ReactNode } from 'react';

export type TableId = string | number;

export type ValidRowModel = Record<string, any>;

export type ValidStateModel = Record<string, any>;

export interface Column<V = any, R extends ValidRowModel = any, S extends ValidStateModel = any> {
  field: string;
  headerName?: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  valueGetter?: (params: ValueGetterParams<V, R>) => V;
  renderCell?: CellRenderer<V, R, S>;
  renderHeaderCell?: HeaderCellRenderer<R, S>;
}

export interface Row<R extends ValidRowModel = any, S extends ValidStateModel = any> {
  id: TableId;
  rowData: R;
  columns: Column<any, R, S>[];
}

export interface Cell<V = any, R extends ValidRowModel = any> {
  id: TableId;
  field: string;
  value?: V | undefined;
  rowData: R;
}

export interface HeaderCell<R extends ValidRowModel = any, S extends ValidStateModel = any> {
  id: TableId;
  field: string;
  column: Column<any, R, S>;
}

export type CellRenderer<V = any, R extends ValidRowModel = any, S extends ValidStateModel = any> = (
  params: CellRendererProps<V, R, S>
) => React.ReactNode;

export interface CellRendererProps<V = any, R extends ValidRowModel = any, S extends ValidStateModel = any>
  extends Cell<V, R> {
  row: Row<R, S>;
  state: S;
  onStateChange: TableRenderProps<R, S>['onStateChange'];
}

export type HeaderRenderer<R extends ValidRowModel = any, S extends ValidStateModel = any> = (
  props: HeaderRendererProps<R, S>
) => ReactNode;

export interface HeaderRendererProps<R extends ValidRowModel = any, S extends ValidStateModel = any> {
  columns: Column<any, R, S>[];
  state: S;
  onColumnHeaderClick: TableRenderProps<R>['onColumnHeaderClick'];
  onStateChange: TableRenderProps<R, S>['onStateChange'];
}

export type HeaderCellRenderer<R extends ValidRowModel = any, S extends ValidStateModel = any> = (
  props: HeaderCellRendererProps<R, S>
) => ReactNode;

export interface HeaderCellRendererProps<R extends ValidRowModel = any, S extends ValidStateModel = any>
  extends HeaderCell<R, S> {
  state: S;
  onStateChange: TableRenderProps<R, S>['onStateChange'];
}

export type RowRenderer<R extends ValidRowModel = any, S extends ValidStateModel = any> = (
  props: RowRendererProps<R, S>
) => ReactNode;

export type ValueGetterParams<V = any, R extends ValidRowModel = any> = Cell<V, R>;

export interface RowRendererProps<R extends ValidRowModel = any, S extends ValidStateModel = any> extends Row<R, S> {
  rowIndex?: number;
  state: S;
  onCellClick: TableRenderProps<R, S>['onCellClick'];
  onRowClick: TableRenderProps<R, S>['onRowClick'];
  getRowId: TableRenderProps<R, S>['getRowId'];
  onStateChange: TableRenderProps<R, S>['onStateChange'];
}

export interface TableRenderProps<R extends ValidRowModel = any, S extends ValidStateModel = any> {
  columns: Column<any, R, S>[];
  getHeaderRenderer: HeaderRenderer<R, S>;
  getRowId: (row: R) => TableId;
  getRowRenderer: RowRenderer<R, S>;
  onCellClick: (params: Cell<any, R>, event: MouseEvent<HTMLElement>) => void;
  onColumnHeaderClick: (params: HeaderCell<R, S>, event: MouseEvent<HTMLElement>) => void;
  onRowClick: (params: Row<R, S>, event: MouseEvent<HTMLElement>) => void;
  onStateChange: (state: S) => void;
  rows: R[];
  state: S;
}
