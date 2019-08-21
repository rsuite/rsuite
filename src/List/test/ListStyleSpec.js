import React from 'react';
import ReactDOM from 'react-dom';
import List from '../index';
import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';

describe('List styles', () => {
  it('Should render correct toggle styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<List ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);

    assert.equal(getStyle(dom, 'position'), 'relative', 'List position');
  });
});
