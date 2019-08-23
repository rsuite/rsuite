import React from 'react';
import ReactDOM from 'react-dom';
import Steps from '../index';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  toRGB,
  getDefaultPalette
} from '@test/testUtils';

import '../styles/index';

describe('Steps styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Steps ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'display'), 'flex', 'Steps flex');
  });
});
