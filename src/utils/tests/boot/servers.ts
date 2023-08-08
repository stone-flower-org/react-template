import fs from 'fs';

import { rest } from 'msw';

import { APP_CONFIG_FILE_PATH, APP_CONFIG_URL_PATH } from '@src/constants';
import { createProvider } from '@src/utils/core';
import { setupServer } from '@src/utils/servers/node';

export const serverProvider = createProvider(async () => {
  const [appConfig] = await Promise.all(
    [APP_CONFIG_FILE_PATH].map(async (path) => JSON.parse(await fs.promises.readFile(path, 'utf-8')))
  );
  const server = await setupServer(
    rest.get('/' + APP_CONFIG_URL_PATH, async (_, res, ctx) => {
      ctx.status(200);
      return await res(ctx.json(appConfig));
    })
  );
  return server;
});
