import { AlertItemParams } from '@src/features/common/ui/components/Alert/types';

export type AlertParams = Omit<AlertItemParams, 'type'>;
