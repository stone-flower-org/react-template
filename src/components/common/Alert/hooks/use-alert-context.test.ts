import { renderHook } from '@testing-library/react';

import { AlertType } from '@src/components/common/Alert/types';
import { createAlertItem } from '@src/components/common/Alert/utils';
import { renderHookWithProviders } from '@src/utils/tests';

import { useAlertContext } from './use-alert-context';

describe('useAlertContext', () => {
  it('should return Alert Context when called within AlertProvider', () => {
    const initAlerts = [createAlertItem({ type: AlertType.info, title: 'some' })];
    const hookResult = renderHookWithProviders(() => useAlertContext(), { initAlerts });
    expect(hookResult.result.current.alerts).toBe(initAlerts);
  });

  it('should throw error when called beyond AlertProvider', () => {
    expect(() => {
      renderHook(() => useAlertContext());
    }).toThrow('useAlertContext must be used within AlertContext');
  });
});
