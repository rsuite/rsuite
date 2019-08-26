import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB, inChrome } from '@test/testUtils';

import '../styles/index';

describe('Input styles', () => {
  it('Input should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Input ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    inChrome &&
      assert.equal(getStyle(dom, 'border'), `1px solid ${toRGB('#e5e5ea')}`, 'Input border');
  });

  it('Textarea should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Input ref={instanceRef} componentClass="textarea" />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'minWidth'), '300px', 'Textarea min-width');
    assert.equal(getStyle(dom, 'minHeight'), '76px', 'Textarea min-height');
  });
});
