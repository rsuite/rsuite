import React from 'react';
import ReactDOM from 'react-dom';
import IconButton from '../index';
import { createTestContainer, getDOMNode, getStyle, inChrome } from '@test/testUtils';

import '../styles/index';

describe('IconButton styles', () => {
  it('Should render the correct width and height', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<IconButton ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'width'), getStyle(dom, 'height'));
  });

  it('Should render the correct border-raidus', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<IconButton circle ref={instanceRef} />, createTestContainer());
    inChrome && assert.equal(getStyle(getDOMNode(instanceRef.current), 'borderRadius'), '50%');
  });
});
