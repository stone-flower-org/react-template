import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { renderWithProviders } from '@src/utils/tests';

import { Tooltip } from './Tooltip';
import { DEFAULT_RPOPS } from './constants';

const DEFAULT_CHILDREN_CONTENT = 'Some Ref';
const DEFAULT_TITLE_CONTENT = 'Some Title';

const defaultProps = {
  'data-test-id': DEFAULT_RPOPS['data-test-id'],
  children: <span>{DEFAULT_CHILDREN_CONTENT}</span>,
  title: <span>{DEFAULT_TITLE_CONTENT}</span>,
};

const getProps = (props: any = {}) => ({
  ...defaultProps,
  ...props,
});

const setup = (props: any = {}) => renderWithProviders(<Tooltip {...getProps(props)} />);

describe('Tooltip', () => {
  it("should render component with visible children and hidden title when children's unhovered", () => {
    const { queryByText } = setup();
    expect(queryByText(DEFAULT_CHILDREN_CONTENT)).toBeInTheDocument();
    expect(queryByText(DEFAULT_TITLE_CONTENT)).not.toBeInTheDocument();
  });

  it("should render component with visible title when children's hovered", async () => {
    const { getByText } = setup();
    const ref = getByText(DEFAULT_CHILDREN_CONTENT);
    fireEvent.mouseEnter(ref);
    await waitFor(() => {
      expect(getByText(DEFAULT_TITLE_CONTENT)).toBeInTheDocument();
    });
  });
});
