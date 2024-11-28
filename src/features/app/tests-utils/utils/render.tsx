import { render, renderHook } from '@testing-library/react';
import React, { ReactElement } from 'react';

import { AppProvider, AppProviderProps } from '@src/features/app/tests-utils/components';
import { RenderOptions, RenderHookOptions } from '@src/features/app/tests-utils/types';

import { createMemoryHistory } from './history';
import { setupStore } from './store';

const makeRendererWrapper = (props: AppProviderProps) =>
  function wrapper({ children }: any) {
    return <AppProvider {...props}>{children}</AppProvider>;
  };

export const renderWithProviders = (
  el: ReactElement,
  { initAlerts, history = createMemoryHistory(), store = setupStore(), ...renderOptions }: RenderOptions = {},
) => ({
  store,
  history,
  ...render(el, {
    wrapper: makeRendererWrapper({
      initAlerts,
      history,
      store,
    }),
    ...renderOptions,
  }),
});

export const renderHookWithProviders = <Result = any, Props = any>(
  render: (initialProps: Props) => Result,
  {
    initAlerts,
    history = createMemoryHistory(),
    store = setupStore(),
    ...renderOptions
  }: RenderHookOptions<Props> = {},
) => ({
  history,
  store,
  ...renderHook(render, {
    wrapper: makeRendererWrapper({
      initAlerts,
      history,
      store,
    }),
    ...renderOptions,
  }),
});

export { render, renderHook } from '@testing-library/react';
