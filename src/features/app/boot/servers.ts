import { setupWorker } from '@src/features/app/tests-utils/utils/msw/browser';
import { createProvider } from '@src/features/common/utils/service-provider';

export const serverProvider = createProvider(async () => {
  const server = await setupWorker();
  await server.start();
  return server;
});
