import { renderHook } from '@testing-library/react';

import { renderHookWithProviders } from '@src/features/app/tests-utils/utils';
import { AlertType } from '@src/features/common/ui/components/Alert/types';
import { createAlertItem } from '@src/features/common/ui/components/Alert/utils';

import { useAlertContext } from './use-alert-context';

describe('useAlertContext', () => {
  it('should return Alert Context when called within AlertProvider', () => {
    const initAlerts = [createAlertItem({ type: AlertType.info, title: 'some' })];
    const hookResult = renderHookWithProviders(() => useAlertContext(), {
      initAlerts,
    });
    expect(hookResult.result.current.alerts).toBe(initAlerts);
  });

  it('should throw error when called beyond AlertProvider', () => {
    expect(() => {
      renderHook(() => useAlertContext());
    }).toThrow('useAlertContext must be used within AlertContext');
  });
});
