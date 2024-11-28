import { boot as appBoot } from '@src/features/app/boot';

import { serverProvider } from './servers';

export { serverProvider };

export const boot = async () => {
  const server = await serverProvider.boot();
  server.listen();
  return [server, ...(await appBoot())];
};
