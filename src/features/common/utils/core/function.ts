import { FuncWithInjectedParam, SingleBlockingCall, SingleCallQueueCtx } from './types';

export const injectFuncParam =
  <IP, P = void, R = unknown>(func: FuncWithInjectedParam<IP, P, R>, injectedParam: IP) =>
  (...params: P[]) =>
    func(injectedParam, ...params);

export const makeSingleCallQueue = <P extends any[] = any[], R = unknown>(func: (...params: P) => Promise<R>) => {
  const listenPromiseResolved = (ctx: SingleCallQueueCtx<R>, promise: Promise<R>) =>
    promise.finally(() => {
      ctx.promise = undefined;
      if (ctx.next) {
        ctx.promise = ctx.next();
        ctx.next = undefined;
      }
    });

  const ctx: SingleCallQueueCtx<R> = {};

  function singleCallQueue(...params: P) {
    if (ctx.promise) {
      ctx.next = () => {
        const nextPromise = func(...params);
        return listenPromiseResolved(ctx, nextPromise);
      };
      return ctx.promise;
    }
    ctx.promise = func(...params);
    return listenPromiseResolved(ctx, ctx.promise);
  }
  singleCallQueue.clear = () => {
    ctx.next = undefined;
  };
  return singleCallQueue;
};

export const makeSingleBlockingCall = <P extends any[] = any[], R = unknown>(func: (...params: P) => Promise<R>) => {
  const ctx: SingleBlockingCall<R> = {};
  return function blockingCall(...params: P) {
    if (ctx.promise) return ctx.promise;
    ctx.promise = func(...params).finally(() => {
      ctx.promise = undefined;
    });
    return ctx.promise;
  };
};

export const inverseComparator =
  <T = any>(comparator: (a: T, b: T) => number) =>
  (a: T, b: T) =>
    -1 * comparator(a, b);

export const defaultComparator = (a: any, b: any) => {
  if (a === b) return 0;
  return a > b ? 1 : -1;
};
