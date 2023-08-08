import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { AppBoot } from './AppBoot';

const content = 'Some content';

const setup = () => render(<AppBoot>{content}</AppBoot>);

describe('AppBoot', () => {
  it('should show loader on first render', async () => {
    const { findByRole } = setup();
    await waitFor(async () => {
      expect(await findByRole('status', { name: /loading/i })).toBeInTheDocument();
    });
  });

  it('should render children when app is booted', async () => {
    const { findByText } = setup();
    await waitFor(async () => {
      expect(await findByText(content)).toBeInTheDocument();
    });
  });
});
