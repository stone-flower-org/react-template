import { render, renderHook } from '@testing-library/react';
import React from 'react';

import { useConfigs } from '@src/hooks';

import { ConfigsProvider } from './ConfigsProvider';

const defaultProps = {
  children: 'Some Content',
};
const setup = (props: any = {}, renderProps: any = {}) =>
  render(
    <ConfigsProvider
      {...defaultProps}
      {...props}
    />,
    renderProps
  );

const setupWithValueOut = (props: any = {}) =>
  renderHook(() => useConfigs(), {
    wrapper: ({ children }) => (
      <ConfigsProvider
        {...defaultProps}
        {...props}
      >
        {children}
      </ConfigsProvider>
    ),
  }).result;

describe('ConfigsProvider', () => {
  it('should render provider with given children', async () => {
    const { getByText } = setup();
    expect(getByText(defaultProps.children)).toBeInTheDocument();
  });

  it('should provide ConfigsContext', async () => {
    const value = setupWithValueOut();
    expect(value.current.APP_LOCALE).toBeDefined();
  });
});
