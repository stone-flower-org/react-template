import { debounce } from '@mui/material';
import { useEffect, useMemo } from 'react';

export const useDebounce = <P extends any[]>(func: (...args: P) => any, deps: any[], wait = 500) => {
  const debounced = useMemo(() => debounce(func, wait), deps);
  useEffect(
    () => () => {
      debounced.clear();
    },
    [debounced]
  );
  return debounced;
};
