import { waitFor } from '@testing-library/react';
import { useState } from 'react';

import { renderHookWithProviders } from '@src/features/app/tests-utils/utils';

import { useControlledState } from './use-controlled-state';

const newState = { a: 'a' };
const firedEvent = {};
const defaultOuterState = {};
const renderUseControlledState = (renderProps: any = {}) =>
  renderHookWithProviders(
    (initialProps: any = {}) => {
      const [outerState, setOuterState] = useState(initialProps.outerState);
      const useControlledStateValue = useControlledState({
        ...initialProps.hookProps,
        state: outerState,
      });
      return {
        outerState,
        setOuterState,
        useControlledStateValue,
      };
    },
    {
      ...renderProps,
      initialProps: {
        outerState: defaultOuterState,
        ...renderProps.initialProps,
      },
    },
  );

describe('useControlledState', () => {
  it('should return passed initial state', () => {
    const composition = renderUseControlledState();
    expect(composition.result.current.useControlledStateValue.state).toBe(defaultOuterState);
  });

  it('should return new passed outer state', async () => {
    const composition = renderUseControlledState();
    await waitFor(() => {
      composition.result.current.setOuterState(newState);
    });
    await waitFor(() => {
      expect(composition.result.current.useControlledStateValue.state).toBe(newState);
    });
  });

  it('should return new state when onChange undefined after updateState call', async () => {
    const composition = renderUseControlledState();
    await waitFor(() => {
      composition.result.current.useControlledStateValue.updateState(newState);
    });
    await waitFor(() => {
      expect(composition.result.current.useControlledStateValue.state).toBe(newState);
    });
  });

  it('should keep prev state and call onChange with new state when onChange given after updateState call', async () => {
    const onChange = jest.fn();
    const composition = renderUseControlledState({
      initialProps: {
        hookProps: { onChange },
      },
    });
    await waitFor(() => {
      composition.result.current.useControlledStateValue.updateState(newState, firedEvent);
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(newState, firedEvent);
      expect(composition.result.current.useControlledStateValue.state).toBe(defaultOuterState);
    });
  });
});
