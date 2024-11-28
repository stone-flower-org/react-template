import React, { FC, PropsWithChildren } from 'react';

export type CommonLayoutProps = PropsWithChildren;

export const CommonLayout: FC<CommonLayoutProps> = ({ children }) => <>{children}</>;
