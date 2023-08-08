import userEvent from '@testing-library/user-event';
import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { DefaultHeader } from './DefaultHeader';

const defaultColumns = [
  {
    field: 'field-1',
    headerName: 'Header 1',
    renderHeaderCell: undefined,
  },
  {
    field: 'field-2',
    headerName: 'Header 2',
    renderHeaderCell: undefined,
  },
];

const defaultProps = {
  columns: defaultColumns,
  state: {},
  onColumnHeaderClick: jest.fn(),
  onStateChange: jest.fn(),
};
const setup = (props: any = {}) =>
  renderWithProviders(
    <DefaultHeader
      {...defaultProps}
      {...props}
    />
  );

describe('DefaultCell', () => {
  beforeAll(() => {
    defaultProps.onColumnHeaderClick.mockReset();
    defaultProps.onStateChange.mockReset();
  });

  it('should render given colums names', () => {
    const { getByText } = setup();
    defaultColumns.forEach(({ headerName }) => {
      expect(getByText(headerName)).toBeInTheDocument();
    });
  });

  it('should call onColumnHeaderClick when click on header', async () => {
    const { getByRole } = setup();
    const header = getByRole('columnheader', { name: defaultColumns[0].headerName });
    await userEvent.click(header);
    expect(defaultProps.onColumnHeaderClick).toHaveBeenCalledWith(
      {
        column: defaultColumns[0],
        field: defaultColumns[0].field,
        id: 0,
      },
      expect.any(Object)
    );
  });

  it("should call renderHeaderCell when it's provided", async () => {
    const renderHeaderCell = jest.fn();
    const column = {
      ...defaultColumns[0],
      renderHeaderCell,
    };
    setup({
      columns: [column],
    });
    expect(renderHeaderCell).toHaveBeenCalledWith({
      column,
      field: defaultColumns[0].field,
      id: 0,
      onStateChange: defaultProps.onStateChange,
      state: defaultProps.state,
    });
  });
});
