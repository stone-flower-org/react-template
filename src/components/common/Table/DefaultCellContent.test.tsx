import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { DefaultCellContent } from './DefaultCellContent';

const defaultProps = {
  children: 'Some Content',
};
const setup = (props: any = {}) =>
  renderWithProviders(
    <DefaultCellContent
      {...defaultProps}
      {...props}
    />
  );

describe('DefaultCellContent', () => {
  it('should render given children', async () => {
    const { getByText } = setup();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });
});
