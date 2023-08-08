import React, { FC } from 'react';

import { DefaultCellContent } from './DefaultCellContent';
import { HeaderCellRendererProps, ValidRowModel, ValidStateModel } from './types';

export type DefaultHeaderCellProps<
  R extends ValidRowModel = ValidRowModel,
  S extends ValidStateModel = ValidStateModel
> = HeaderCellRendererProps<R, S>;

export const DefaultHeaderCell: FC<DefaultHeaderCellProps> = <
  R extends ValidRowModel = ValidRowModel,
  S extends ValidStateModel = ValidStateModel
>({
  column,
}: DefaultHeaderCellProps<R, S>) => <DefaultCellContent>{column.headerName}</DefaultCellContent>;
