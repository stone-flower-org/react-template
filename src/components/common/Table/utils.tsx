import { FC, PropsWithChildren, createElement } from 'react';

import { CellRendererProps, ValueGetterParams, ValidRowModel } from './types';

export const makeDefaultCellRenderer = <P, PWC extends PropsWithChildren<P>>(Component: FC<PWC>) => {
  const Wrapper: FC<CellRendererProps> = ({ value }: CellRendererProps) => createElement(Component, null, value);
  Wrapper.displayName = `defaultCellRenderer(${Component.displayName ?? ''})`;
  return Wrapper;
};

export const defaultRowIdGetter = (row: ValidRowModel) => row.id;

export const defaultValueGetter = ({ rowData, field }: ValueGetterParams) => rowData[field];

export const defaultClickHandler = () => undefined;
