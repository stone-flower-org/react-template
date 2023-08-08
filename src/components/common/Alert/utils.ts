import { createAutoincrementIdGenerator } from '@src/utils/id-generator';

import { AlertItem, AlertItemParams } from './types';

const idGenerator = createAutoincrementIdGenerator();

export const createAlertItem = (params: AlertItemParams): AlertItem => ({
  ...params,
  id: String(idGenerator()),
  lifetime: params.lifetime ?? null,
});
