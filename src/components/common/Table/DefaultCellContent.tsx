import React, { FC, ReactNode } from 'react';

export interface DefaultCellContentProps {
  children?: ReactNode;
}

export const DefaultCellContent: FC<DefaultCellContentProps> = ({ children }: DefaultCellContentProps) => (
  <div className="table-cell__content">{children}</div>
);
