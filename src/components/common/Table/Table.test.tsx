import { within } from '@testing-library/react';
import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { Table } from './Table';
import { DEFAULT_TABLE_PROPS } from './constants';

const defaultColumns = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'column',
    headerName: 'Column',
  },
];
const defaultRows = [
  {
    id: 'Some Id 0',
    column: 'Some value 0',
  },
  {
    id: 'Some Id 1',
    column: 'Some value 1',
  },
];
const defaultProps = {
  'data-test-id': DEFAULT_TABLE_PROPS['data-test-id'],
  columns: defaultColumns,
  rows: defaultRows,
};
const setup = (props: any = {}) =>
  renderWithProviders(
    <Table
      {...defaultProps}
      {...props}
    />
  );

describe('Table', () => {
  it('should render headers based on given columns', async () => {
    const { getByRole } = setup();
    for (const column of defaultColumns)
      expect(getByRole('columnheader', { name: column.headerName })).toBeInTheDocument();
  });

  it('should render table rows based on rows', async () => {
    const { getAllByRole } = setup();
    const tableRows = getAllByRole('row').slice(1);

    expect(tableRows).toHaveLength(defaultRows.length);
    defaultRows.forEach((expectedRow, rowI) => {
      const { getAllByRole: rowGetAllByRole } = within(tableRows[rowI]);
      const tableCells = rowGetAllByRole('cell');

      const expectedColumns = Object.values(expectedRow);
      expect(tableCells).toHaveLength(expectedColumns.length);
      expectedColumns.forEach((expectedColumn, columnI) => {
        expect(tableCells[columnI]).toHaveTextContent(expectedColumn);
      });
    });
  });

  it("should call renderCell when it's provided in columns", () => {
    const renderCellMock = jest.fn();
    const columns = [
      {
        field: 'id',
        headerName: 'Id',
        renderCell: renderCellMock.mockReturnValue(''),
      },
    ];
    const rows = [
      {
        id: 1,
      },
    ];
    setup({ columns, rows });
    expect(renderCellMock).toHaveBeenCalledWith({
      field: 'id',
      id: '1-id',
      key: 1,
      onStateChange: expect.any(Function),
      row: { columns, id: 1, rowData: rows[0] },
      rowData: rows[0],
      state: {},
      value: 1,
    });
  });

  it("should call renderHeaderCell when it's provided in columns", () => {
    const renderHeaderCellMock = jest.fn();
    const columns = [
      {
        field: 'id',
        headerName: 'Id',
        renderHeaderCell: renderHeaderCellMock.mockReturnValue(''),
      },
    ];
    const rows = [
      {
        id: 1,
      },
    ];
    setup({ columns, rows });
    expect(renderHeaderCellMock).toHaveBeenCalledWith(
      expect.objectContaining({
        column: columns[0],
        field: 'id',
        id: 0,
        onStateChange: expect.any(Function),
        state: {},
      })
    );
  });

  it('should render loader when loading true', () => {
    const { getByRole } = setup({ loading: true });
    expect(getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });
});
