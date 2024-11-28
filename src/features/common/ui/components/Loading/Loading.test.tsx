import React from 'react';

import { renderWithProviders } from '@src/features/app/tests-utils/utils';

import { Loading } from './Loading';

const setup = (props: any = {}) => renderWithProviders(<Loading {...props} />);

describe('Loading', () => {
  it('should render component with default props', () => {
    const { getByRole } = setup();
    const loading = getByRole('status', { name: 'Loading' });
    expect(loading).toBeInTheDocument();
  });

  it('should render component with given props', () => {
    const className = 'className';
    const role = 'img';
    const title = 'title';
    const { getByRole } = setup({
      className,
      role,
      title,
    });
    const loading = getByRole(role, { name: title });
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveClass(className);
  });
});
