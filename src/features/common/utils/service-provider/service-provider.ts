import { BootFunc, ServiceProvider } from './types';

export const createProvider = <S = unknown>(func: BootFunc<S>): ServiceProvider<S> => {
  let promise: Promise<S> | undefined;
  let service: S | undefined;
  return {
    boot: async () => {
      if (promise) return await promise;
      promise = func().then((res) => (service = res));
      return await promise;
    },
    get: () => {
      if (!service) throw new Error('Service is not booted');
      return service;
    },
  };
};
