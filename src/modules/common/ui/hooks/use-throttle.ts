import throttle from 'lodash/throttle';
import { useEffect, useMemo } from 'react';

export const useThrottle = <P extends unknown[], R>(func: (...args: P) => R, deps: unknown[], wait = 100) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: provide explicit adeps from arguments
  const debounced = useMemo(() => throttle(func, wait), deps);
  useEffect(
    () => () => {
      debounced.cancel();
    },
    [debounced],
  );
  return debounced;
};
