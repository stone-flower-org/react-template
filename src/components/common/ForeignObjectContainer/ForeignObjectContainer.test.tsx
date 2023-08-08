import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { ForeignObjectContainer } from './ForeignObjectContainer';

const defaultProps = {
  children: 'Some Content',
};

const setup = (props: any = {}) =>
  renderWithProviders(
    <svg>
      <ForeignObjectContainer
        {...defaultProps}
        {...props}
      />
    </svg>
  );

describe('ForeignObjectContainer', () => {
  it('should render component with given children', async () => {
    const { getByText } = setup();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });
});
