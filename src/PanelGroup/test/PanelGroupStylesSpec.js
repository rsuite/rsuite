import React from 'react';
import ReactDOM from 'react-dom';
import PanelGroup from '../index';
import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';

describe('PanelGroup styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<PanelGroup ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'borderRadius'), '6px', 'Panel border-radius');
  });
});
