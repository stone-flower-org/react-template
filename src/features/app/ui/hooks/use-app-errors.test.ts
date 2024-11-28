import { waitFor } from '@testing-library/react';

import { overrideInitialState, renderHookWithProviders, setupStore } from '@src/features/app/tests-utils/utils';

import { useAppErrors } from './use-app-errors';

const defaultErrors = [new Error('Some Error')];

const renderUseAppErrors = (renderProps: any = {}) =>
  renderHookWithProviders(() => useAppErrors(), {
    store: setupStore({
      preloadedState: overrideInitialState({
        app: {
          ui: {
            app: {
              errors: defaultErrors,
            },
          },
        },
      }),
    }),
    ...renderProps,
  });

describe('useAppErrors', () => {
  describe('addError', () => {
    it('should add given error', async () => {
      const newError = new Error('Some New Error');
      const composition = renderUseAppErrors();
      await waitFor(() => {
        composition.result.current.addError(newError);
      });
      await waitFor(() => {
        expect(composition.result.current.errors).toEqual([...defaultErrors, newError]);
      });
    });
  });

  describe('errors', () => {
    it('should return errors from store', async () => {
      const composition = renderUseAppErrors();
      await waitFor(() => {
        expect(composition.result.current.errors).toEqual(defaultErrors);
      });
    });
  });

  describe('setErrors', () => {
    it('should set given errors', async () => {
      const errors: any[] = [];
      const composition = renderUseAppErrors();
      await waitFor(() => {
        composition.result.current.setErrors(errors);
      });
      await waitFor(() => {
        expect(composition.result.current.errors).toEqual(errors);
      });
    });
  });
});
