import React from 'react';
import ReactDOM from 'react-dom';
import InputGroup from '../index';
import Input from '../../Input';
import { createTestContainer, getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('InputGroup styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<InputGroup ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'display'), 'flex', 'InputGroup display');
  });
});
