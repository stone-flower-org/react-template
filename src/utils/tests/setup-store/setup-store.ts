import { Action, AnyAction, configureStore as baseConfigureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import merge from 'lodash/mergeWith';

import { defaultMiddlewareOverrides } from '@src/store';
import * as reducer from '@src/store/slices';
import { RootState } from '@src/store/types';
import { SetupStoreOptions } from '@src/utils/tests/types';
import { RecursivePartial } from '@src/utils/ts-utils';

import { initialState } from './initial-state';

export const getDefaultPreloadedState = (
  (rootReducer: typeof reducer) => () =>
    Object.fromEntries(
      Object.entries(rootReducer).map(([name, reducer]) => [
        name,
        merge({}, reducer(initialState[name], { type: '_fake' })),
      ])
    ) as RootState
)(reducer);

export const overrideDefaultPreloadedState = (preloadedState: RecursivePartial<RootState>) =>
  merge(getDefaultPreloadedState(), preloadedState);

export const configureStore = <S = any, A extends Action = AnyAction>(params: ConfigureStoreOptions<S, A>) =>
  baseConfigureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(defaultMiddlewareOverrides),
    ...params,
    preloadedState: (params.preloadedState ?? getDefaultPreloadedState()) as typeof params.preloadedState,
  });

export const setupStore = ({ preloadedState }: SetupStoreOptions = {}) => configureStore({ reducer, preloadedState });
