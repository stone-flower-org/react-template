import userEvent from '@testing-library/user-event';
import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { PopperCard } from './PopperCard';
import { DEFAULT_POPPER_CARD_PROPS } from './constants';

const defaultProps = {
  'data-test-id': DEFAULT_POPPER_CARD_PROPS['data-test-id'],
  children: 'Some Content',
  button: 'Some Button Content',
  open: false,
  onChange: jest.fn(),
};
const setup = (props: any = {}) =>
  renderWithProviders(
    <PopperCard
      {...defaultProps}
      {...props}
    />
  );

describe('PopperCard', () => {
  beforeEach(() => {
    defaultProps.onChange.mockClear();
  });

  it('should hide provided children when open is false', () => {
    const { queryByText } = setup();
    expect(queryByText(defaultProps.children)).not.toBeInTheDocument();
  });

  it('should show provided children when open is true', () => {
    const { queryByText } = setup({ open: true });
    expect(queryByText(defaultProps.children)).toBeInTheDocument();
  });

  it('should call onChange with updated open value after click on button', async () => {
    const { getByText } = setup();
    await userEvent.click(getByText(defaultProps.button));
    expect(defaultProps.onChange).toHaveBeenCalledWith(!defaultProps.open, undefined);
  });

  it('should call onChange with false when click outside', async () => {
    const { container } = setup({ open: true });
    await userEvent.click(container.firstChild as any);
    expect(defaultProps.onChange).toHaveBeenCalledWith(false, undefined);
  });

  it("should not call onChange when click on child's element", async () => {
    const { getByText } = setup({ open: true });
    await userEvent.click(getByText(defaultProps.children));
    expect(defaultProps.onChange).not.toHaveBeenCalledWith(!defaultProps.open);
  });
});
