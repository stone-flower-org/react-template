import fs from 'fs';

import { rest } from 'msw';

import { APP_CONFIG_FILE_PATH, APP_CONFIG_URL_PATH } from '@src/features/app/constants';
import { setupServer } from '@src/features/app/tests-utils/utils/msw/node';
import { createProvider } from '@src/features/common/utils/service-provider';

export const serverProvider = createProvider(async () => {
  const [appConfig] = await Promise.all(
    [APP_CONFIG_FILE_PATH].map(async (path) => JSON.parse(await fs.promises.readFile(path, 'utf-8'))),
  );
  const server = await setupServer(
    rest.get('/' + APP_CONFIG_URL_PATH, async (_, res, ctx) => {
      ctx.status(200);
      return await res(ctx.json(appConfig));
    }),
  );
  return server;
});
