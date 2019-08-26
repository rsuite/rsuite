import React from 'react';
import ReactDOM from 'react-dom';
import Tag from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB, inChrome } from '@test/testUtils';

import '../styles/index';

describe('Tag styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Tag ref={instanceRef}>Text</Tag>, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#f7f7fa'), 'Tag background-color');
    inChrome && assert.equal(getStyle(dom, 'padding'), '2px 8px', 'Tag padding');
    assert.equal(getStyle(dom, 'fontSize'), '12px', 'Tag font-size');
    assert.equal(getStyle(dom, 'height'), '24px', 'Tag height');
  });
});
