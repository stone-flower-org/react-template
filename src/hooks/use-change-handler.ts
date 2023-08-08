import { useCallback, useRef } from 'react';

export const useChangeHandler = <S extends object = any, K extends keyof S = keyof S, V = S[K]>({
  key,
  state,
  onChange,
}: {
  key: K;
  state: S;
  onChange?: (state: S) => void;
}) => {
  const stateRef = useRef(state);
  stateRef.current = state;
  return useCallback(
    (value: V) => {
      if (!onChange) return;
      const newObj = {
        ...stateRef.current,
        [key]: value,
      };
      onChange(newObj);
    },
    [onChange, key]
  );
};
