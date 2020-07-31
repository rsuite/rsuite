import React from 'react';
import ReactDOM from 'react-dom';
import FormHelpText from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('FormHelpText styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<FormHelpText ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'display'), 'block', 'FormHelpText display');
    assert.equal(getStyle(dom, 'color'), toRGB('#8e8e93'), 'FormHelpText color');
  });
});
