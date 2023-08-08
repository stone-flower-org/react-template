import { createSelector, createSlice, isRejected, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@src/store/types';
import { isNonNullObject } from '@src/utils/common';

import { SLICE_NAME } from './constants';
import { AppState } from './types';

export const selectErrors = createSelector(
  (state: RootState) => state[SLICE_NAME].ui.app.errors,
  (errors) => errors
);

export const selectApp = createSelector(
  (state: RootState) => state.app.ui.app,
  (app) => app
);

export const initialState: AppState = {
  ui: {
    app: {
      errors: [],
    },
  },
};

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<Error[]>) => {
      state.ui.app.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRejected, (state, action) => {
      if (isNonNullObject(action.meta.arg) && 'skipErrorHandler' in action.meta.arg && action.meta.arg.skipErrorHandler)
        return;

      action.error && state.ui.app.errors.push(action.error as Error);
    });
  },
});

export const { setErrors } = slice.actions;

export default slice.reducer;
