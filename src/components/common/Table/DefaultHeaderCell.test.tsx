import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { DefaultHeaderCell } from './DefaultHeaderCell';

const defaultProps = {
  column: {
    headerName: 'Some Header',
  },
};
const setup = (props: any = {}) =>
  renderWithProviders(
    <DefaultHeaderCell
      {...defaultProps}
      {...props}
    />
  );

describe('DefaultHeaderCell', () => {
  it('should render column header name', () => {
    const { getByText } = setup();
    expect(getByText(defaultProps.column.headerName)).toBeInTheDocument();
  });
});
