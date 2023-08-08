import userEvent from '@testing-library/user-event';
import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { DefaultRow } from './DefaultRow';

const defaultColumns = [
  {
    field: 'field-1',
    renderCell: undefined,
    valueGetter: undefined,
  },
  {
    field: 'field-2',
    renderCell: undefined,
    valueGetter: undefined,
  },
];

const defaultRowData: Record<string, string | undefined> = {
  'field-1': 'Value 1',
  'field-2': 'Value 2',
};

const defaultProps = {
  columns: defaultColumns,
  id: 0,
  getRowId: jest.fn().mockReturnValue('0'),
  onCellClick: jest.fn(),
  onRowClick: jest.fn(),
  onStateChange: jest.fn(),
  rowData: defaultRowData,
  rowIndex: 0,
  state: {},
};
const setup = (props: any = {}) =>
  renderWithProviders(
    <DefaultRow
      {...defaultProps}
      {...props}
    />
  );

describe('DefaultRow', () => {
  beforeAll(() => {
    defaultProps.getRowId.mockClear();
    defaultProps.onCellClick.mockClear();
    defaultProps.onRowClick.mockClear();
    defaultProps.onStateChange.mockClear();
  });

  it('should render given cells', () => {
    const { getByText } = setup();
    defaultColumns.forEach(({ field }) => {
      expect(getByText(defaultRowData[field] ?? '')).toBeInTheDocument();
    });
  });

  it('should call onRowClick when click on row', async () => {
    const { getByRole } = setup();
    const row = getByRole('row');
    await userEvent.click(row);
    expect(defaultProps.onRowClick).toHaveBeenCalledWith(
      {
        columns: defaultColumns,
        id: '0',
        rowData: defaultRowData,
      },
      expect.any(Object)
    );
  });

  it('should call onCellClick when click on cell', async () => {
    const expectedField = 'field-1';
    const { getAllByRole } = setup();
    const cell = getAllByRole('cell')[0];

    await userEvent.click(cell);

    expect(defaultProps.onCellClick).toHaveBeenCalledWith(
      {
        field: expectedField,
        id: `0-${expectedField}`,
        rowData: defaultRowData,
        value: defaultRowData[expectedField],
      },
      expect.any(Object)
    );
  });

  it('should use custom value retriever when valueGetter provided', () => {
    const expectedValue = 'Custom Value 1';
    const column = {
      ...defaultColumns[0],
      valueGetter: jest.fn().mockReturnValue(expectedValue),
    };
    const { getByText } = setup({
      columns: [column],
    });
    expect(getByText(expectedValue)).toBeInTheDocument();
    expect(column.valueGetter).toHaveBeenCalledWith({
      field: 'field-1',
      id: '0-field-1',
      rowData: defaultRowData,
      value: expectedValue,
    });
  });

  it('should use custom cell renderer when renderCell provided', () => {
    const column = {
      ...defaultColumns[0],
      renderCell: jest.fn(),
    };
    setup({
      columns: [column],
    });
    expect(column.renderCell).toHaveBeenCalledWith({
      field: 'field-1',
      id: '0-field-1',
      onStateChange: defaultProps.onStateChange,
      row: {
        columns: [column],
        id: '0',
        rowData: defaultRowData,
      },
      rowData: defaultRowData,
      state: defaultProps.state,
      value: 'Value 1',
    });
  });
});
