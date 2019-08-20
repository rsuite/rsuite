import React from 'react';
import ReactDOM from 'react-dom';
import Badge from '../Badge';
import { createTestContainer, getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('Badge styles', () => {
  it('Should render independent', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Badge ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'width'), '8px');
    assert.equal(getStyle(dom, 'width'), getStyle(dom, 'height'));
    assert.equal(getStyle(dom, 'borderRadius'), '4px');
  });

  it('Should render correct color', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Badge ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'color'), toRGB('#fff'));
  });
});
