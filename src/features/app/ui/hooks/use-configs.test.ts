import { renderHook } from '@testing-library/react';

import { renderHookWithProviders } from '@src/features/app/tests-utils/utils';

import { useConfigs } from './use-configs';

const renderUseConfigsWithProviders = (renderProps: any = {}) =>
  renderHookWithProviders(() => useConfigs(), renderProps);

const renderUseConfigs = (renderProps: any = {}) => renderHook(() => useConfigs(), renderProps);

describe('useConfigs', () => {
  it('should return configs when using whithin ConfigsContext', () => {
    const composition = renderUseConfigsWithProviders();
    expect(composition.result.current.APP_TZ).toBe('UTC');
  });

  it('throw exception when using beyound ConfigsContext', () => {
    expect(() => {
      renderUseConfigs();
    }).toThrow('useConfigs must be used within ConfigsContext');
  });
});
