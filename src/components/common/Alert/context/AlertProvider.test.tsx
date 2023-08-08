import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';

import { useAlertContext } from '@src/components/common/Alert/hooks';
import { AlertType } from '@src/components/common/Alert/types';
import { createAlertItem } from '@src/components/common/Alert/utils';

import { AlertProvider } from './AlertProvider';

const initAlerts = [createAlertItem({ type: AlertType.info, title: 'Some Title' })];
const defaultProps = {
  initAlerts,
};

const setup = (props: any = {}) =>
  renderHook(() => useAlertContext(), {
    wrapper: ({ children }) => (
      <AlertProvider
        {...defaultProps}
        {...props}
      >
        {children}
      </AlertProvider>
    ),
  }).result;

describe('AlertProvider', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01 00:00:00.300Z'));
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should provide alerts', () => {
    const value = setup();
    expect(value.current.alerts).toBe(initAlerts);
  });

  it('should remove alert when call remove with its id', async () => {
    const value = setup();
    await waitFor(() => {
      value.current.remove(initAlerts[0].id);
    });
    await waitFor(() => {
      expect(value.current.alerts).toHaveLength(0);
    });
  });

  it('should add new alert when call push with alert object', async () => {
    const value = setup();
    const newAlert = createAlertItem({ type: AlertType.info, title: 'New' });
    await waitFor(() => {
      value.current.push(newAlert);
    });
    await waitFor(() => {
      expect(value.current.alerts).toHaveLength(2);
      expect(value.current.alerts[1]).toEqual(
        expect.objectContaining({
          type: newAlert.type,
          title: newAlert.title,
        })
      );
    });
  });

  it('should add alerts with unique type/title/message combination', async () => {
    const initAlerts = [
      createAlertItem({ type: AlertType.info, title: 'title 1' }),
      createAlertItem({ type: AlertType.info, title: 'title 2' }),
      createAlertItem({ type: AlertType.info, title: 'title 3', message: 'message 3' }),
    ];
    const value = setup({
      initAlerts,
    });
    const newAlerts = [
      createAlertItem({ type: AlertType.info, title: 'title 1', message: 'message 1' }),
      createAlertItem({ type: AlertType.info, title: 'title 2', message: 'message 2' }),
      createAlertItem({ type: AlertType.error, title: 'title 3', message: 'message 3' }),
      createAlertItem({ type: AlertType.info, title: 'title 3', message: 'message 4' }),
    ];
    await waitFor(() => {
      [...initAlerts, ...newAlerts].forEach(value.current.push);
    });
    await waitFor(() => {
      expect(value.current.alerts).toHaveLength(initAlerts.length + newAlerts.length);
    });
  });
});
