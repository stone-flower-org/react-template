import { Router } from '@remix-run/router';
import { type IErrorReporter, type ILogger } from '@stone-flower-org/js-app';
import { Axios } from 'axios';
import { SetupWorker } from 'msw/lib/browser';
import { SetupServer } from 'msw/lib/node';

import { configsProvider } from '@/src/modules/app/boot/configs';
import { luxonProvider } from '@/src/modules/app/boot/luxon';
import { RootStore } from '@/src/modules/app/utils/store/types';
import { RoutesStore } from '@/src/modules/common/utils/react-router-dom';

export type AppConfigs = ReturnType<typeof configsProvider.get>;

export interface AppServices {
  configs: AppConfigs;
  date: ReturnType<typeof luxonProvider.get>;
  http: Axios;
  logger: ILogger;
  server: SetupWorker | SetupServer;
  store: RootStore;
  router: Router;
  routesStore: RoutesStore;
  errorReporter: IErrorReporter;
}

export type AppServicesKey = keyof AppServices;
