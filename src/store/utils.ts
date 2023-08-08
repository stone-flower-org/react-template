import {
  AnyAction,
  ActionReducerMapBuilder,
  AsyncThunk,
  createAsyncThunk as baseCreateAsyncThunk,
  AsyncThunkPayloadCreator,
} from '@reduxjs/toolkit';

import { isKeyOf } from '@src/utils/common';
import { LoadingStatus } from '@src/utils/loading-status';

import { ActionParams, RootState, SliceSelectorFunc, StateWithActions } from './types';

export const defaultPendingActionHandler = <S extends StateWithActions = any, TR = any, TA = any>(
  action: AsyncThunk<TR, TA, any>,
  actionName: string,
  state: S,
  payload: AnyAction
) => {
  if (state.actions[actionName]) state.actions[actionName].status = LoadingStatus.LOADING;
};

export const defaultRejectdActionHandler = <S extends StateWithActions = any, TR = any, TA = any>(
  action: AsyncThunk<TR, TA, any>,
  actionName: string,
  state: S,
  payload: AnyAction
) => {
  if (state.actions[actionName]) state.actions[actionName].status = LoadingStatus.ERROR;
};

export const addDefaultThunkActionHandlers = <S extends StateWithActions = any, TR = any, TA = any>(
  builder: ActionReducerMapBuilder<S>,
  action: AsyncThunk<TR, TA, any>,
  actionName: string
) => {
  builder.addCase(action.pending, (state, payload) => {
    defaultPendingActionHandler(action, actionName, state, payload);
  });
  builder.addCase(action.rejected, (state, payload) => {
    defaultRejectdActionHandler(action, actionName, state, payload);
  });
};

export const normilizeNTransformEntities = <K extends keyof E, E extends object = object, O extends object = object>(
  items: O[],
  key: K,
  transform: (item: O) => E
) =>
  items.reduce<{ ids: E[K][]; entities: Record<string | number, E> }>(
    (data, item) => {
      const transformed = transform(item);
      const id = (isKeyOf(transformed, key) ? transformed[key] : '') as string | number | object;
      if (typeof id === 'object' || id === null) return data;
      data.ids.push(id as E[K]);
      data.entities[id] = transformed;
      return data;
    },
    {
      ids: [],
      entities: {},
    }
  );

export const normilizeEntities = <K extends keyof E, E extends object = object>(entities: E[], key: K) =>
  normilizeNTransformEntities<K, E, E>(entities, key, (item) => item);

export const denormilizeEntities = <K extends string | number, E extends object>(
  entities: Record<K, E>,
  keys: K[]
): E[] => keys.map((key) => entities[key]);

export const createAsyncThunk = <Returned, ThunkArg extends ActionParams = ActionParams>(
  actionName: string,
  func: AsyncThunkPayloadCreator<Returned, ThunkArg>,
  options?: any
) => baseCreateAsyncThunk(actionName, func, options);
