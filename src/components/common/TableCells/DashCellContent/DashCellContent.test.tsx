import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { DashCellContent } from './DashCellContent';

const emptyContent = '-';

const defaultProps = {
  children: 'Some Content',
};
const setup = (props: any = {}) =>
  renderWithProviders(
    <DashCellContent
      {...defaultProps}
      {...props}
    />
  );

describe('DashCellContent', () => {
  it("should render given children when it's not empty", async () => {
    const { getByText } = setup();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });

  it('should render - when children is empty', async () => {
    const { getByText } = setup({ children: '' });
    expect(getByText(emptyContent)).toBeInTheDocument();
  });
});
