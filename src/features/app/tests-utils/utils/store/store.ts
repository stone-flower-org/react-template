import { Action, AnyAction, configureStore as baseConfigureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import merge from 'lodash/mergeWith';

import { defaultMiddlewareOverrides, rootReducer } from '@src/features/app/store';
import { RootState } from '@src/features/app/store/types';
import { SetupStoreOptions } from '@src/features/app/tests-utils/types';
import { RecursivePartial } from '@src/features/common/utils/ts-utils';

import { initialState } from './initial-state';

export const getInitialState = (
  (reducer: typeof rootReducer) => () =>
    Object.fromEntries(
      Object.entries(reducer).map(([name, reducer]) => [
        name,
        merge({}, reducer(initialState[name], { type: '_fake' })),
      ]),
    ) as RootState
)(rootReducer);

export const overrideInitialState = (preloadedState: RecursivePartial<RootState>) =>
  merge(getInitialState(), preloadedState);

export const configureStore = <S = any, A extends Action = AnyAction>(params: ConfigureStoreOptions<S, A>) =>
  baseConfigureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(defaultMiddlewareOverrides),
    ...params,
    preloadedState: (params.preloadedState ?? getInitialState()) as typeof params.preloadedState,
  });

export const setupStore = ({ preloadedState }: SetupStoreOptions = {}) =>
  configureStore({ reducer: rootReducer, preloadedState });
