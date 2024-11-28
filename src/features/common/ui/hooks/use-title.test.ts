import { waitFor } from '@testing-library/react';

import { renderHookWithProviders } from '@src/features/app/tests-utils/utils';

import { useTitle } from './use-title';

const renderUseTitle = (renderProps: any = {}) =>
  renderHookWithProviders((initialProps: any = {}) => {
    useTitle(initialProps.title);
  }, renderProps);

describe('useTitle', () => {
  it('should set given title', async () => {
    const patterns = ['/profiles/2/*'];
    const composition = renderUseTitle({
      initialProps: {
        patterns,
      },
    });
    await waitFor(() => {
      expect(composition.result.current).toBeUndefined();
    });
  });
});
