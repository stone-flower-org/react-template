import React, { FC } from 'react';

import { AppProvider, AppThemeProvider } from '@src/features/app/ui/context';

import { AppBoot } from './AppBoot';
import { AppErrorBoundary } from './AppErrorBoundary';
import { AppLayout } from './AppLayout';
import { AppRouter } from './AppRouter';
import './styles.css';

export const App: FC = () => (
  <AppThemeProvider>
    <AppBoot>
      <AppProvider>
        <AppLayout>
          <AppErrorBoundary>
            <AppRouter />
          </AppErrorBoundary>
        </AppLayout>
      </AppProvider>
    </AppBoot>
  </AppThemeProvider>
);
