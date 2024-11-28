import { render } from '@testing-library/react';
import React from 'react';

import { Adjuster } from './Adjuster';
import { Position } from './constants';

const content = 'Some Content';
const defaultProps = {
  children: content,
};

const setup = (props: any = {}) =>
  render(
    <Adjuster
      {...defaultProps}
      {...props}
    />,
  );

describe('Adjuster', () => {
  describe.each(Object.values(Position).map((pos) => ({ pos })))(
    'should render children with given position',
    ({ pos }) => {
      it(`should render chilren on ${pos} position`, () => {
        const { getByText } = setup({ pos: Position.TOP_L });
        expect(getByText(content)).toBeInTheDocument();
      });
    },
  );
});
