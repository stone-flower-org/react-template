import { initialState as appInitialState } from '@src/features/app/store/slices/app';

export const initialState: any = {
  app: {
    ...appInitialState,
    ui: {
      ...appInitialState.ui,
      app: {
        errors: [],
      },
    },
  },
};
