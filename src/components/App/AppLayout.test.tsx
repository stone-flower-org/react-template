import { waitFor, within } from '@testing-library/react';
import React from 'react';

import { DEFAULT_ALERT_BAR_PROPS } from '@src/components/common/Alert/contants';
import { AlertType } from '@src/components/common/Alert/types';
import { createAlertItem } from '@src/components/common/Alert/utils';
import { renderWithProviders } from '@src/utils/tests';

import { AppLayout } from './AppLayout';

const alertItem = createAlertItem({
  type: AlertType.info,
  title: 'Some Alert 0',
});
const content = 'Some content';
const defaultProps = {
  children: <>{content}</>,
};
const setup = (props: any = {}, renderProps: any = {}) =>
  renderWithProviders(
    <AppLayout
      {...defaultProps}
      {...props}
    />,
    renderProps
  );

describe('AppLayout', () => {
  it('should render children', () => {
    const { getByText } = setup();
    expect(getByText(content)).toBeInTheDocument();
  });

  it('should render alert bar with its alerts', () => {
    const { getByTestId } = setup({}, { initAlerts: [alertItem] });

    const alertBar = getByTestId(DEFAULT_ALERT_BAR_PROPS['data-test-id']);
    expect(alertBar).toBeInTheDocument();
    const { getByText } = within(alertBar);
    expect(getByText(alertItem.title as any)).toBeInTheDocument();
  });

  it('should render alerts based on app errors', async () => {
    const error = new Error('Some Error');
    const { getByTestId } = setup(
      {},
      {
        preloadedState: {
          app: {
            ui: {
              app: {
                errors: [error],
              },
            },
          },
        },
      }
    );

    const alertBar = getByTestId(DEFAULT_ALERT_BAR_PROPS['data-test-id']);
    expect(alertBar).toBeInTheDocument();
    const { findByText } = within(alertBar);
    await waitFor(async () => {
      expect(await findByText(error.message)).toBeInTheDocument();
    });
  });
});
