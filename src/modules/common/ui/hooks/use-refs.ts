import { ForwardedRef, useCallback } from 'react';

export const useRefs = <T>(...forwardedRefs: ForwardedRef<T>[]) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: should be generated on first render only
  const ref = useCallback((el: T | null) => {
    forwardedRefs.forEach((forwardedRef) => {
      if (forwardedRef)
        if (typeof forwardedRef === 'function') forwardedRef(el);
        else forwardedRef.current = el;
    });
  }, []);

  return {
    ref,
  };
};
