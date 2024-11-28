import { TypedUseSelectorHook } from 'react-redux';

import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;

export type RootStore = typeof store;

export type Dispatch = typeof store.dispatch;

export type DispatchFunc = () => Dispatch;

export type SelectorFunc = TypedUseSelectorHook<RootState>;

export type SliceSelectorFunc<K extends keyof RootState, S> = (state: RootState[K]) => S;
