import { ForwardedRef, useCallback, useState } from 'react';

export const useRefChangeHandler = <T = any>(forwardedRef?: ForwardedRef<T>) => {
  const [el, setEl] = useState<T | null>(null);
  const onRefChange = useCallback(
    (el: T | null) => {
      if (forwardedRef)
        if (typeof forwardedRef === 'function') forwardedRef(el);
        else forwardedRef.current = el;
      setEl(el);
    },
    [forwardedRef],
  );
  return {
    el,
    onRefChange,
  };
};
