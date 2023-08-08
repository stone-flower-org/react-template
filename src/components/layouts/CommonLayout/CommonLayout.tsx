import React, { FC, PropsWithChildren } from 'react';

export interface CommonLayoutProps extends PropsWithChildren {}

export const CommonLayout: FC<CommonLayoutProps> = ({ children }) => <>{children}</>;
