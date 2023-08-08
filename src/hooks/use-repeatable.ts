import { useEffect, useRef } from 'react';

/**
 * Allows to schedule func in future with dynamic delay.
 * First time func will be called after initDelay ms, next time it will be called after delay returned from func
 * @example
 *   let i = 0
 *   const callback = useRepeatable(() => { log(i++); return 200 - i < 0 ? undefined : 200 - i; }, 100)
 *   callback()
 *   // print 0 after 100 ms
 *   // print 1 after 199 ms
 *   // print 2 after 198 ms
 *   // ...
 *   // print 199 after 0 ms
 */
export const useRepeatable = (func: () => number | undefined, initDelay?: number) => {
  const delayRef = useRef(initDelay);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | undefined>();
  useEffect(() => {
    const runJob = () => {
      timeoutIdRef.current = setTimeout(() => {
        delayRef.current = func();
        delayRef.current !== undefined && runJob();
      }, delayRef.current);
    };
    delayRef.current !== undefined && runJob();
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, [func]);
};
