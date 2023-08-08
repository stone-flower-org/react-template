import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { AppErrorBoundary } from './AppErrorBoundary';

const content = 'Some content';
const error = new Error('Some error');
const ChildWithError = () => {
  throw error;
};
const defaultProps = {
  children: <>{content}</>,
};
const setup = (props: any = {}) =>
  renderWithProviders(
    <AppErrorBoundary
      {...defaultProps}
      {...props}
    />
  );

describe('AppErrorBoundary', () => {
  it('should render children when no errors occur', () => {
    const { getByText } = setup();
    expect(getByText(content)).toBeInTheDocument();
  });

  it('should render error page with error message when error occurs during render', () => {
    const { getByText } = setup({ children: <ChildWithError /> });
    expect(getByText(error.message, { exact: false })).toBeInTheDocument();
  });
});
