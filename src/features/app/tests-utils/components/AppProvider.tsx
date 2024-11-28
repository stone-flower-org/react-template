import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createMemoryHistory, MemoryHistory } from 'history';
import React, { FC, ReactNode } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Router } from 'react-router-dom';

import { RootStore } from '@src/features/app/store/types';
import { setupStore } from '@src/features/app/tests-utils/utils';
import { AppThemeProvider, ConfigsProvider } from '@src/features/app/ui/context';
import { AlertProvider, AlertProviderProps } from '@src/features/common/ui/components/Alert/context';

export interface AppProviderProps {
  children?: ReactNode;
  history?: MemoryHistory;
  store?: RootStore;
  initAlerts?: AlertProviderProps['initAlerts'];
}

export const AppProvider: FC<AppProviderProps> = ({
  children,
  initAlerts,
  history = createMemoryHistory(),
  store = setupStore(),
}: AppProviderProps) => (
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
