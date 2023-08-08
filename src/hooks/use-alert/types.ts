import { AlertItemParams } from '@src/components/common/Alert/types';

export type AlertParams = Omit<AlertItemParams, 'type'>;
