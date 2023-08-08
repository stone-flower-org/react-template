import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { DateCell } from './DateCell';

const emptyContent = '-';

const expectedValue = '01/01/2023';

const defaultProps = {
  value: '2023-01-01T00:00:00.000Z',
};

const setup = (props: any = {}) =>
  renderWithProviders(
    <DateCell
      {...defaultProps}
      {...props}
    />
  );

describe('DateCell', () => {
  it('should render given ISO date in MM/dd/yyyy format', async () => {
    const { getByText } = setup();
    expect(getByText(expectedValue)).toBeInTheDocument();
  });

  it('should render - when value has invalid date format', async () => {
    const { getByText } = setup({ value: '2020-01-01 00:00:00.000Z' });
    expect(getByText(emptyContent)).toBeInTheDocument();
  });

  it('should render - when value is empty', async () => {
    const { getByText } = setup({ value: '' });
    expect(getByText(emptyContent)).toBeInTheDocument();
  });
});
