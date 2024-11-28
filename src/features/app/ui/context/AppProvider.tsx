import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { FC, PropsWithChildren } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@src/features/app/store';
import { AlertProvider } from '@src/features/common/ui/components/Alert/context';

import { ConfigsProvider } from './ConfigsProvider';

export type AppProviderProps = PropsWithChildren;

export const AppProvider: FC<AppProviderProps> = ({ children }: AppProviderProps) => (
  <ConfigsProvider>
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <StoreProvider store={store}>
        <AlertProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AlertProvider>
      </StoreProvider>
    </LocalizationProvider>
  </ConfigsProvider>
);
