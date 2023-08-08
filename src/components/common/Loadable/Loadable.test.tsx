import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { Loadable } from './Loadable';

const defaultProps = {
  children: 'Some Content',
  loading: false,
};

const setup = (props: any = {}) =>
  renderWithProviders(
    <Loadable
      {...defaultProps}
      {...props}
    />
  );

describe('Loadable', () => {
  it('should render component with given children when loading false', async () => {
    const { getByText } = setup();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });

  it('should render loader when loading true', async () => {
    const title = 'Some Title';
    const { getByRole } = setup({ loading: true, title });
    expect(getByRole('status', { name: title })).toBeInTheDocument();
  });
});
