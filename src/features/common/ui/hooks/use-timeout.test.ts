import { waitFor } from '@testing-library/react';

import { renderHookWithProviders } from '@src/features/app/tests-utils/utils';

import { useTimeout } from './use-timeout';

const defaultDelay = 500;

const renderUseTimeout = (renderProps: any = {}) => renderHookWithProviders(() => useTimeout(), renderProps);

describe('useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should call given function after given delay', async () => {
    const func = jest.fn();
    const timeout = renderUseTimeout().result.current;
    timeout(func, defaultDelay);
    jest.runOnlyPendingTimers();
    await waitFor(() => {
      expect(func).toHaveBeenCalledTimes(1);
    });
  });

  it('should remove delayed function from stack after clear call', async () => {
    const firstFunc = jest.fn();
    const secondFunc = jest.fn();
    const timeout = renderUseTimeout().result.current;

    const timeoutId = timeout(firstFunc, defaultDelay);
    timeout(secondFunc, defaultDelay);
    timeout.clear(timeoutId);

    jest.runOnlyPendingTimers();
    await waitFor(() => {
      expect(firstFunc).not.toHaveBeenCalled();
      expect(secondFunc).toHaveBeenCalledTimes(1);
    });
  });
});
