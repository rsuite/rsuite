import React from 'react';
import ReactDOM from 'react-dom';
import InputNumber from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB, inChrome } from '@test/testUtils';

import '../styles/index';

describe('InputNumber styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<InputNumber ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'backgroundColor'), toRGB('#fff'), 'InputNumber background-color');
    inChrome &&
      assert.equal(
        getStyle(dom, 'border'),
        `1px solid ${toRGB('#e5e5ea')}`,
        'InputNumber border-color'
      );
    assert.equal(getStyle(dom, 'height'), '36px', 'InputNumber height');
  });
});
