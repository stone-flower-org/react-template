import { render } from '@testing-library/react';
import React, { createElement } from 'react';

import { Case } from './Case';
import { Switch } from './Switch';

const setup = (props: any = {}) => render(<Switch {...props} />);

describe('Switch', () => {
  it('should render cases contents with matched values', () => {
    const cases = [
      { children: 'First Case', value: 1 },
      { children: 'Second Case', value: 2 },
      { children: 'Third Case', value: 1 },
    ];
    const { container } = setup({
      value: 1,
      children: cases.map(({ children, value }, i) => createElement(Case, { value, key: i }, children)),
    });
    expect(container).toHaveTextContent('First Case');
    expect(container).not.toHaveTextContent('Second Case');
    expect(container).toHaveTextContent('Third Case');
  });
});
