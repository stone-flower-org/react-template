import { waitFor } from '@testing-library/react';

import { renderHookWithProviders } from '@src/features/app/tests-utils/utils';
import { useAlertContext } from '@src/features/common/ui/components/Alert/hooks';
import { AlertType } from '@src/features/common/ui/components/Alert/types';

import { useAlert } from './use-alert';

const defaultAlertAttrs = {
  lifetime: 1000,
  message: 'Some Message',
  title: 'Some Title',
};

const renderUseAlert = (renderProps: any = {}) =>
  renderHookWithProviders(() => {
    const useAlertValue = useAlert();
    const alertContextValue = useAlertContext();
    return {
      useAlertValue,
      alertContextValue,
    };
  }, renderProps);

describe('useAlert', () => {
  describe('error', () => {
    it('should add alert item to alert context with error type', async () => {
      const composition = renderUseAlert();
      await waitFor(() => {
        composition.result.current.useAlertValue.error(defaultAlertAttrs);
      });
      await waitFor(() => {
        expect(composition.result.current.alertContextValue.alerts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              ...defaultAlertAttrs,
              type: AlertType.error,
            }),
          ]),
        );
      });
    });
  });

  describe('info', () => {
    it('should add alert item to alert context with info type', async () => {
      const composition = renderUseAlert();
      await waitFor(() => {
        composition.result.current.useAlertValue.info(defaultAlertAttrs);
      });
      await waitFor(() => {
        expect(composition.result.current.alertContextValue.alerts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              ...defaultAlertAttrs,
              type: AlertType.info,
            }),
          ]),
        );
      });
    });
  });

  describe('success', () => {
    it('should add alert item to alert context with success type', async () => {
      const composition = renderUseAlert();
      await waitFor(() => {
        composition.result.current.useAlertValue.success(defaultAlertAttrs);
      });
      await waitFor(() => {
        expect(composition.result.current.alertContextValue.alerts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              ...defaultAlertAttrs,
              type: AlertType.success,
            }),
          ]),
        );
      });
    });
  });

  describe('warning', () => {
    it('should add alert item to alert context with warning type', async () => {
      const composition = renderUseAlert();
      await waitFor(() => {
        composition.result.current.useAlertValue.warning(defaultAlertAttrs);
      });
      await waitFor(() => {
        expect(composition.result.current.alertContextValue.alerts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              ...defaultAlertAttrs,
              type: AlertType.warning,
            }),
          ]),
        );
      });
    });
  });
});
