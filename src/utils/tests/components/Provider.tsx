import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PreloadedState } from '@reduxjs/toolkit';
import { createMemoryHistory, MemoryHistory, MemoryHistoryOptions } from 'history';
import React, { FC, PropsWithChildren } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Router } from 'react-router-dom';

import { AlertProvider, AlertProviderProps } from '@src/components/common/Alert/context';
import { AppThemeProvider, ConfigsProvider } from '@src/context';
import { RootState, RootStore } from '@src/store/types';
import { setupStore } from '@src/utils/tests';

export interface ProviderProps extends PropsWithChildren<any> {
  preloadedState?: PreloadedState<RootState>;
  historyOptions?: MemoryHistoryOptions;
  history?: MemoryHistory;
  store?: RootStore;
  initAlerts?: AlertProviderProps['initAlerts'];
}

export const Provider: FC<ProviderProps> = ({
  children,
  initAlerts,
  historyOptions,
  history = createMemoryHistory(historyOptions),
  preloadedState,
  store = setupStore({ preloadedState }),
}: ProviderProps) => (
  <AppThemeProvider>
    <ConfigsProvider>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <StoreProvider store={store}>
          <AlertProvider initAlerts={initAlerts}>
            <Router
              location={history.location}
              navigator={history}
            >
              {children}
            </Router>
          </AlertProvider>
        </StoreProvider>
      </LocalizationProvider>
    </ConfigsProvider>
  </AppThemeProvider>
);
