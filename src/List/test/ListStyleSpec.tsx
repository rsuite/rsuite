import React from 'react';
import { render } from '@testing-library/react';
import List from '../index';
import { getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('List styles', () => {
  it('Should render correct toggle styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<List ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);

    assert.equal(getStyle(dom, 'position'), 'relative', 'List position');
  });
});
