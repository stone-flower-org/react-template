import { waitFor } from '@testing-library/react';

import { renderHookWithProviders } from '@src/utils/tests';

import { useRefChangeHandler } from './use-ref-change-handler';

const renderUseRefChangeHandler = (renderProps: any = {}) =>
  renderHookWithProviders((initialProps: any = {}) => useRefChangeHandler(initialProps.forwardedRef), renderProps);

describe('useRefChangeHandler', () => {
  it('should set el after onRefChange call', async () => {
    const args = {};
    const composition = renderUseRefChangeHandler();
    composition.result.current.onRefChange(args);
    await waitFor(() => {
      expect(composition.result.current.el).toBe(args);
    });
  });

  it('should call forwardedRef with el after onRefChange call', async () => {
    const args = {};
    const forwardedRef = jest.fn();
    const composition = renderUseRefChangeHandler({ initialProps: { forwardedRef } });
    composition.result.current.onRefChange(args);
    await waitFor(() => {
      expect(forwardedRef).toHaveBeenCalledWith(args);
    });
  });
});
