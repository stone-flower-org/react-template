import { render } from '@testing-library/react';
import React from 'react';

import { AppProvider } from './AppProvider';

const defaultProps = {
  children: 'Some Content',
};
const setup = (props: any = {}, renderProps: any = {}) =>
  render(
    <AppProvider
      {...defaultProps}
      {...props}
    />,
    renderProps,
  );

describe('AppProvider', () => {
  it('should render provider with given children', async () => {
    const { getByText } = setup();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });
});
