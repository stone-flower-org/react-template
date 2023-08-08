import { createProvider } from '@src/utils/core';
import { setupWorker } from '@src/utils/servers/browser';

export const serverProvider = createProvider(async () => {
  // register request handlers in setupWorker()
  const server = await setupWorker();
  await server.start();
  return server;
});
