/* eslint-disable @typescript-eslint/no-var-requires */
import { ServiceProvider } from '@src/utils/core/types';

import { configsProvider } from './configs';
import { errorReporterProvider } from './error-reporter';
import { luxonProvider } from './luxon';

let serverProvider: ServiceProvider | undefined;
if (process.env.MOCK_API) serverProvider = require('./servers').serverProvider;

export * from './axios';
export * from './luxon';

export { configsProvider, errorReporterProvider };

export const boot = async () => {
  const providers: ServiceProvider[] = [configsProvider, errorReporterProvider, luxonProvider];
  serverProvider && providers.push(serverProvider);
  return await Promise.all(providers.map((provider) => provider.boot()));
};
