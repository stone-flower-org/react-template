import { waitFor } from '@testing-library/react';

import { renderHookWithProviders } from '@src/utils/tests';

import { useRepeatable } from './use-repeatable';

const defaultDelay = 500;

const renderUseRepeatable = (renderProps: any = {}) =>
  renderHookWithProviders((initialProps: any = {}) => {
    useRepeatable(initialProps.func, initialProps.delay);
  }, renderProps);

describe('useRepeatable', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should call given function after given delay', async () => {
    const func = jest.fn();
    renderUseRepeatable({
      initialProps: {
        func,
        delay: defaultDelay,
      },
    });
    jest.runOnlyPendingTimers();
    await waitFor(() => {
      expect(func).toHaveBeenCalledTimes(1);
    });
  });

  it('should call given function again after returned ms from prev call', async () => {
    const func = jest.fn().mockReturnValueOnce(100);
    renderUseRepeatable({
      initialProps: {
        func,
        delay: defaultDelay,
      },
    });
    jest.runOnlyPendingTimers();
    await waitFor(() => {
      expect(func).toHaveBeenCalledTimes(1);
    });
    jest.runOnlyPendingTimers();
    await waitFor(() => {
      expect(func).toHaveBeenCalledTimes(2);
    });
  });
});
