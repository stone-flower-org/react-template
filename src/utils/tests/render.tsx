import { render, renderHook } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React, { ReactElement } from 'react';

import { Provider, ProviderProps } from './components/Provider';
import { setupStore } from './setup-store';
import { RenderOptions, RenderHookOptions } from './types';

const makeRendererWrapper = (props: ProviderProps) =>
  function wrapper({ children }: any) {
    return <Provider {...props}>{children}</Provider>;
  };

export const renderWithProviders = (
  el: ReactElement,
  {
    initAlerts,
    historyOptions,
    history = createMemoryHistory(historyOptions),
    preloadedState,
    store = setupStore({ preloadedState }),
    theme,
    ...renderOptions
  }: RenderOptions = {}
) => ({
  store,
  history,
  ...render(el, {
    wrapper: makeRendererWrapper({
      initAlerts,
      historyOptions,
      history,
      store,
      theme,
    }),
    ...renderOptions,
  }),
});

export const renderHookWithProviders = <Result = any, Props = any>(
  render: (initialProps: Props) => Result,
  {
    initAlerts,
    historyOptions,
    history = createMemoryHistory(historyOptions),
    preloadedState,
    store = setupStore({ preloadedState }),
    theme,
    ...renderOptions
  }: RenderHookOptions<Props> = {}
) => ({
  history,
  store,
  ...renderHook(render, {
    wrapper: makeRendererWrapper({
      initAlerts,
      historyOptions,
      history,
      store,
      theme,
    }),
    ...renderOptions,
  }),
});
