import React from 'react';
import ReactDOM from 'react-dom';
import IconStack from '../index';
import Icon from '../../Icon';
import { createTestContainer, getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('IconStack styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <IconStack ref={instanceRef}>
        <Icon icon="square" stack="2x" />
        <Icon icon="terminal" stack="1x" inverse />
      </IconStack>,
      createTestContainer()
    );
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'display'), 'inline-block', 'IconStack display');
    assert.equal(getStyle(dom, 'height'), '28px', 'IconStack height');
    assert.equal(getStyle(dom, 'width'), '28px', 'IconStack width');
  });
});
