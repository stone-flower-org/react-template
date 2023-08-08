import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { App } from './App';

const setup = () => render(<App />);

describe('App', () => {
  it('should show loader on first render', async () => {
    const { findByRole } = setup();
    await waitFor(async () => {
      expect(await findByRole('status', { name: /loading/i })).toBeInTheDocument();
    });
  });
});
