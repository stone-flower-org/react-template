import React, { FC } from 'react';

import { DefaultCellContent } from './DefaultCellContent';
import { CellRendererProps, ValidRowModel, ValidStateModel } from './types';

export type DefaultCellProps<
  V = any,
  R extends ValidRowModel = any,
  S extends ValidStateModel = any
> = CellRendererProps<V, R, S>;

export const DefaultCell: FC<DefaultCellProps> = ({ value }: DefaultCellProps) => (
  <DefaultCellContent>{value}</DefaultCellContent>
);
