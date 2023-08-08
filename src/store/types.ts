import { TypedUseSelectorHook } from 'react-redux';

import { LoadingStatus } from '@src/utils/loading-status';

import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;

export type RootStore = typeof store;

export type Dispatch = typeof store.dispatch;

export type DispatchFunc = () => Dispatch;

export type SelectorFunc = TypedUseSelectorHook<RootState>;

export type SliceSelectorFunc<K extends keyof RootState, S> = (state: RootState[K]) => S;

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
