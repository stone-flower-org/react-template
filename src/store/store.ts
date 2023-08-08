import { configureStore } from '@reduxjs/toolkit';

import * as reducer from './slices';

export const defaultMiddlewareOverrides = {
  serializableCheck: {
    ignoredPaths: ['app.errors'],
    ignoreActions: true,
  },
};

export const store = configureStore({
  devTools: process.env.DEV_MODE === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(defaultMiddlewareOverrides),
  reducer,
});
