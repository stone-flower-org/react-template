export const makeInMemoryCookies = () => {
  const store: any = {};
  return {
    set: (key: string, val: any) => {
      store[key] = val;
      return val;
    },
    get: (key: string) => store[key],
    remove: (key: string) => {
      delete store[key];
    },
    withAttributes: () => makeInMemoryCookies(),
    withConverter: () => makeInMemoryCookies(),
  };
};
