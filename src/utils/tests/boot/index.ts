import { boot as appBoot } from '@src/boot';

import { serverProvider } from './servers';

export { serverProvider };

export const boot = async () => {
  const server = await serverProvider.boot();
  server.listen();
  return [server, ...(await appBoot())];
};
