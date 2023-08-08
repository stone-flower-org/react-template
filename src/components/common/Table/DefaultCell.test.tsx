import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { DefaultCell } from './DefaultCell';

const defaultField = 'field';

const defaultRowData = {
  [defaultField]: 'Some Value',
};

const defaultProps = {
  field: defaultField,
  rowData: defaultRowData,
  value: defaultRowData[defaultField],
};
const setup = (props: any = {}) =>
  renderWithProviders(
    <DefaultCell
      {...defaultProps}
      {...props}
    />
  );

describe('DefaultCell', () => {
  it('should render value from field in given rowData', async () => {
    const { getByText } = setup();
    expect(getByText(defaultProps.value)).toBeInTheDocument();
  });
});
