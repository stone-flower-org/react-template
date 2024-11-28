import { waitFor } from '@testing-library/react';
import React from 'react';

import { renderWithProviders } from '@src/features/app/tests-utils/utils';

import { AppRouter } from './AppRouter';

const defaultProps = {};
const setup = (props: any = {}, renderProps: any = {}) =>
  renderWithProviders(
    <AppRouter
      {...defaultProps}
      {...props}
    />,
    renderProps,
  );

describe('AppRouter', () => {
  it('should show loader on first render', async () => {
    const { queryByRole } = setup();
    await waitFor(async () => {
      expect(queryByRole('status', { name: /page loading/i })).toBeInTheDocument();
    });
  });
});
