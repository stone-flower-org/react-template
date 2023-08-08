import React, { createContext, PropsWithChildren, FC } from 'react';

import { configsProvider } from '@src/boot';

export const ConfigsContext = createContext<ReturnType<typeof configsProvider.get> | undefined>(undefined);

export type ConfigsProviderProps = PropsWithChildren;

export const ConfigsProvider: FC<ConfigsProviderProps> = ({ children }: ConfigsProviderProps) => (
  <ConfigsContext.Provider value={configsProvider.get()}>{children}</ConfigsContext.Provider>
);
