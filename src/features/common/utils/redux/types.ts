import { LoadingStatus } from '@src/features/common/utils/loading-status';

export interface BaseActionParams {
  skipErrorHandler?: boolean;
}

export type ActionParams<P extends BaseActionParams = BaseActionParams> = void | P;

export interface BaseActionState {
  status: LoadingStatus;
}

export interface StateWithActions<A extends Record<string, BaseActionState> = Record<string, BaseActionState>> {
  actions: A;
}
