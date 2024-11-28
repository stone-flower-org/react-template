import { waitFor } from '@testing-library/react';

import { renderHookWithProviders } from '@src/features/app/tests-utils/utils';

import { useSingleCallQueue } from './use-single-call-queue';

const renderUseSingleCallQueue = function (renderProps: any = {}, callback: (...args: any[]) => Promise<any>) {
  return renderHookWithProviders(() => useSingleCallQueue(callback, []), renderProps);
};

const makeContolledAsyncCallback = () => {
  let resolveWrapper: any;
  let rejectWrapper: any;
  const controlledPromise = new Promise((resolve, reject) => {
    resolveWrapper = resolve;
    rejectWrapper = reject;
  });
  const callback = jest.fn().mockResolvedValue(controlledPromise);
  return {
    callback,
    resolve: resolveWrapper,
    reject: rejectWrapper,
  };
};

describe('useSingleCallQueue', () => {
  it('should return callable wrapper which will exec provided callback with given args', () => {
    const args = {};
    const { callback } = makeContolledAsyncCallback();
    const hookValue = renderUseSingleCallQueue({}, callback);

    void hookValue.result.current(args);

    expect(callback).toHaveBeenCalledWith(args);
  });

  test('wrapper should make only 1 request with given callback at a time', async () => {
    const { callback } = makeContolledAsyncCallback();
    const hookValue = renderUseSingleCallQueue({}, callback);

    await waitFor(async () => {
      void hookValue.result.current();
      void hookValue.result.current();
      void hookValue.result.current();
    });

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  test('wrapper should make last request with given callback after prev request resolved', async () => {
    const firstArgs = {};
    const lastArgs = {};
    const { callback, resolve } = makeContolledAsyncCallback();
    const hookValue = renderUseSingleCallQueue({}, callback);

    await waitFor(() => {
      void hookValue.result.current(firstArgs);
      void hookValue.result.current();
      void hookValue.result.current(lastArgs);
    });
    resolve();

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(1, firstArgs);
      expect(callback).toHaveBeenNthCalledWith(2, lastArgs);
    });
  });
});
