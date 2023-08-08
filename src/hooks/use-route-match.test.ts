import { waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { renderHookWithProviders } from '@src/utils/tests';

import { useRouteMatch } from './use-route-match';

const renderUseRouteMatch = (renderProps: any = {}) =>
  renderHookWithProviders((initialProps: any = {}) => useRouteMatch(initialProps.patterns || []), {
    history: createMemoryHistory({ initialEntries: ['/profiles/1'] }),
    ...renderProps,
  });

describe('useRouteMatch', () => {
  it('should return undefined when route with given pattern was not found', async () => {
    const patterns = ['/profiles/2/*'];
    const composition = renderUseRouteMatch({
      initialProps: {
        patterns,
      },
    });
    await waitFor(() => {
      expect(composition.result.current).toBeUndefined();
    });
  });

  it('should return resolved route when it matches on of given patterns', async () => {
    const patterns = ['/profiles/*'];
    const composition = renderUseRouteMatch({
      initialProps: {
        patterns,
      },
    });
    await waitFor(() => {
      expect(composition.result.current?.pattern.path).toBe(patterns[0]);
    });
  });
});
