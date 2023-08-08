import { waitFor } from '@testing-library/react';

import { renderHookWithProviders } from '@src/utils/tests';

import { useDebounce } from './use-debounce';

const renderUseDebounce = (renderProps: any = {}) =>
  renderHookWithProviders(
    (initialProps: any = {}) => useDebounce(initialProps.callback, initialProps.deps, initialProps.wait),
    renderProps
  );

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should not call callback until given time pass', async () => {
    const args = {};
    const callback = jest.fn();
    const composition = renderUseDebounce({
      initialProps: {
        callback,
      },
    });
    composition.result.current(args);
    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(0);
    });
  });

  it('should run last call after timer pass', async () => {
    const args0 = {};
    const args1 = {};
    const callback = jest.fn();
    const composition = renderUseDebounce({
      initialProps: {
        callback,
      },
    });

    composition.result.current(args0);
    composition.result.current(args1);
    jest.runOnlyPendingTimers();

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(args1);
    });
  });
});
