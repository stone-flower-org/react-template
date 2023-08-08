import { render } from '@testing-library/react';
import React from 'react';

import { AppThemeProvider } from './AppThemeProvider';

const defaultProps = {
  children: 'Some Content',
};
const setup = (props: any = {}, renderProps: any = {}) =>
  render(
    <AppThemeProvider
      {...defaultProps}
      {...props}
    />,
    renderProps
  );

describe('AppThemeProvider', () => {
  it('should render provider with given children', async () => {
    const { getByText } = setup();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });
});
