import React, { FC } from 'react';

import { DefaultCellContent, DefaultCellContentProps } from '@src/components/common/Table';

export type DashCellContentProps = DefaultCellContentProps;

export const DashCellContent: FC<DashCellContentProps> = ({ children, ...props }: DashCellContentProps) => (
  <DefaultCellContent {...props}>{children || '-'}</DefaultCellContent>
);
