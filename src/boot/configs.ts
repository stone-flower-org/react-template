import { APP_CONFIG_URL_PATH } from '@src/constants';
import { createProvider } from '@src/utils/core';

import { axios } from './axios';

const fetchConfig = (path: string) =>
  axios
    .get(`${window.location.origin}/${path}`, {
      params: {
        v: process.env.APP_VERSION,
      },
    })
    .then((res) => res.data);

const configsPaths = [APP_CONFIG_URL_PATH];

export const configsProvider = createProvider(
  async () =>
    await Promise.all(configsPaths.map(fetchConfig)).then(async ([appConfigs]) => ({
      APP_LOCALE: appConfigs.APP_LOCALE ?? '',
      APP_TZ: appConfigs.APP_TZ ?? '',
    }))
);
