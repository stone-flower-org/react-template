import { waitFor } from '@testing-library/react';

import { injectFuncParam, makeSingleBlockingCall, makeSingleCallQueue } from './function';

const makeControlledAsyncFunc = () => {
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

describe('core.function', () => {
  describe('injectFuncParam', () => {
    const result = null;
    const func = jest.fn().mockReturnValue(result);

    it('should return new funciton with injected param to given function', () => {
      const injectedParam = '1';
      const param = '2';
      const newFunc = injectFuncParam(func, injectedParam);
      expect(newFunc(param)).toBe(result);
      expect(func).toHaveBeenCalledWith(injectedParam, param);
    });
  });

  describe('makeSingleCallQueue', () => {
    it('should return callable wrapper which will exec provided callback with given args', () => {
      const args = {};
      const { callback } = makeControlledAsyncFunc();
      const singleCallQueue = makeSingleCallQueue(callback);

      void singleCallQueue(args);

      expect(callback).toHaveBeenCalledWith(args);
    });

    test('wrapper should make only 1 request with given callback at a time', async () => {
      const { callback } = makeControlledAsyncFunc();
      const singleCallQueue = makeSingleCallQueue(callback);

      await waitFor(async () => {
        void singleCallQueue();
        void singleCallQueue();
        void singleCallQueue();
      });

      await waitFor(() => {
        expect(callback).toHaveBeenCalledTimes(1);
      });
    });

    test('wrapper should make last request with given callback after resolved prev request', async () => {
      const firstArgs = {};
      const lastArgs = {};
      const { callback, resolve } = makeControlledAsyncFunc();
      const singleCallQueue = makeSingleCallQueue(callback);

      await waitFor(() => {
        void singleCallQueue(firstArgs);
        void singleCallQueue();
        void singleCallQueue(lastArgs);
      });
      await resolve();

      await waitFor(() => {
        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenNthCalledWith(1, firstArgs);
        expect(callback).toHaveBeenNthCalledWith(2, lastArgs);
      });
    });

    test('should clear calls queue after clear call', async () => {
      const firstArgs = {};
      const lastArgs = {};
      const { callback, resolve } = makeControlledAsyncFunc();
      const singleCallQueue = makeSingleCallQueue(callback);

      await waitFor(() => {
        void singleCallQueue(firstArgs);
        void singleCallQueue(lastArgs);
      });
      singleCallQueue.clear();
      await resolve();

      await waitFor(() => {
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenNthCalledWith(1, firstArgs);
      });
    });
  });

  describe('makeSingleBlockingCall', () => {
    it('should return callable wrapper which will exec provided callback with given args', () => {
      const args = {};
      const { callback } = makeControlledAsyncFunc();
      const singleBlockingCall = makeSingleBlockingCall(callback);

      void singleBlockingCall(args);

      expect(callback).toHaveBeenCalledWith(args);
    });

    test('wrapper should make only 1 call and skip others until 1st will be resolved', async () => {
      const firstArgs = {};
      const lastArgs = {};
      const { callback, resolve } = makeControlledAsyncFunc();
      const singleBlockingCall = makeSingleBlockingCall(callback);

      await waitFor(() => {
        void singleBlockingCall(firstArgs);
        void singleBlockingCall();
        void singleBlockingCall(lastArgs);
      });
      await resolve();

      await waitFor(() => {
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenNthCalledWith(1, firstArgs);
      });
    });

    test('wrapper should make next call after previous will be resolved', async () => {
      const firstArgs = {};
      const lastArgs = {};
      const { callback, resolve } = makeControlledAsyncFunc();
      const singleBlockingCall = makeSingleBlockingCall(callback);

      await waitFor(() => {
        void singleBlockingCall(firstArgs);
        void singleBlockingCall();
      });
      await resolve();
      await waitFor(() => {
        void singleBlockingCall(lastArgs);
        void singleBlockingCall();
      });
      await resolve();

      await waitFor(() => {
        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenNthCalledWith(1, firstArgs);
        expect(callback).toHaveBeenNthCalledWith(2, lastArgs);
      });
    });
  });
});
