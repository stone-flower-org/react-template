import { App as AppContainer, ConsoleLogger, LoggerErrorReporter, ServiceProvider } from '@stone-flower-org/js-app';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import { APP_ELEMENT_ID } from '@/src/modules/app/constants';
import { App as AppComponent } from '@/src/modules/app/ui/components/App';
import { AppServices } from '@/src/modules/app/utils/app';

import { axiosProvider } from './axios';
import { configsProvider } from './configs';
import { luxonProvider } from './luxon';
import { routerProvider, routesStoreProvider } from './router';
import { storeProvider } from './store';

const logger = ConsoleLogger.create();

export const app = new AppContainer<AppServices>(
  () => {
    const appEl = document.getElementById(APP_ELEMENT_ID);
    if (!appEl) throw new Error(`Couldn't find #${APP_ELEMENT_ID} element`);
    createRoot(appEl).render(createElement(AppComponent));
  },
  {
    coreProviders: {
      'error-reporter': ServiceProvider.create(LoggerErrorReporter.createFromLogger(logger)),
      logger: ServiceProvider.create(logger),
    },
  },
);

app.registerProvider('configs', configsProvider);
app.registerProvider('date', luxonProvider);
app.registerProvider('http', axiosProvider);
app.registerProvider('store', storeProvider);
app.registerProvider('routesStore', routesStoreProvider);
app.registerProvider('router', routerProvider);

// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.DEV_MOCK_API === 'true') app.registerProvider('server', require('./servers').serverProvider);
