import { useCallback, useEffect, useState } from 'react';

export interface UseControlledStateProps<S = any, E = any> {
  state: S;
  onChange?: (state: S, e?: E) => void;
  disabled?: boolean;
}

export const useControlledState = <S = any, E = any>({
  disabled = false,
  state,
  onChange,
}: UseControlledStateProps<S, E>) => {
  const [innerState, setInnerState] = useState(state);

  const updateState = useCallback(
    (state: S, e?: E) => {
      if (disabled) return;
      if (onChange) {
        onChange(state, e);
        return;
      }
      setInnerState(state);
    },
    [onChange, disabled]
  );

  useEffect(() => {
    setInnerState(state);
  }, [state]);

  return { state: innerState, updateState };
};
