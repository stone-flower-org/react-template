import { Settings } from 'luxon';

import { configsProvider } from '@src/boot/configs';
import { createProvider } from '@src/utils/core';

export const luxonProvider = createProvider(async () => {
  const { APP_LOCALE, APP_TZ } = await configsProvider.boot();
  Settings.defaultLocale = APP_LOCALE;
  Settings.defaultZone = APP_TZ;
});

export * from 'luxon';
