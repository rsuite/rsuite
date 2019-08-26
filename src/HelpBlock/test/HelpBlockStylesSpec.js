import React from 'react';
import ReactDOM from 'react-dom';
import HelpBlock from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('HelpBlock styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<HelpBlock ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'display'), 'block', 'HelpBlock display');
    assert.equal(getStyle(dom, 'color'), toRGB('#8e8e93'), 'HelpBlock color');
  });
});
