import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { Alert } from './Alert';
import { DEFAULT_ALERT_PROPS } from './contants';
import { AlertType } from './types';
import { createAlertItem } from './utils';

const alert = createAlertItem({
  type: AlertType.error,
  title: 'Some Title 0',
  message: 'Some Message 0',
});
const defaultProps = {
  ...alert,
  'data-test-id': DEFAULT_ALERT_PROPS['data-test-id'],
  onClose: jest.fn(),
};

const setup = (props: any = {}) =>
  renderWithProviders(
    <Alert
      {...defaultProps}
      {...props}
    />
  );

describe('Alert', () => {
  it('should render given alert', () => {
    const { getByText } = setup();
    expect(getByText(defaultProps.title as string)).toBeInTheDocument();
  });

  it('should toggle message when click on header', async () => {
    const { getByTestId, queryByText } = setup();
    const alertHeader = getByTestId(`${defaultProps['data-test-id']}-header`);

    await userEvent.click(alertHeader);
    await waitFor(async () => {
      expect(queryByText(defaultProps.message as string)).toBeVisible();
    });

    await userEvent.click(alertHeader);
    await waitFor(async () => {
      expect(queryByText(defaultProps.message as string)).not.toBeVisible();
    });
  });

  it('should call onClose with alert it when click on close', async () => {
    const { getByTestId } = setup();
    const closeBtn = getByTestId(`${defaultProps['data-test-id']}-close-btn`);

    await userEvent.click(closeBtn);
    await waitFor(async () => {
      expect(defaultProps.onClose).toHaveBeenCalledWith(defaultProps.id);
    });
  });
});
