import React, { FC, PropsWithChildren } from 'react';

export interface DefaultProps extends PropsWithChildren {}

export const Default: FC<DefaultProps> = ({ children }: DefaultProps) => <>{children}</>;
