import { useEffect, useMemo } from 'react';

import { makeSingleCallQueue } from '@src/features/common/utils/core';

/**
 * Allows to avoid simultaneous async calls. Run only 1 call per a time, keeps 1 latest subsequent call in a queue
 * @example
 *   const callback = useSingleCallQueue(() => fetch(url), [url])
 *   callback() // (1) will be runned
 *   callback() // (2) will be runned after (1)
 *   callback() // (3) if (2) was started - (3) will run after it,
 *                     if (1) is still in process - will remove (2) from queue and run after (1)
 */
export const useSingleCallQueue = <R = unknown, P extends any[] = any[]>(
  func: (...args: P) => Promise<R>,
  deps: any[],
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useMemo(() => makeSingleCallQueue(func), deps);
  useEffect(
    () => () => {
      callback.clear();
    },
    [callback],
  );
  return callback;
};
