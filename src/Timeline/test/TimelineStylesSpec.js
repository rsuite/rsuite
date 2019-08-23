import React from 'react';
import ReactDOM from 'react-dom';
import Timeline from '../index';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  toRGB,
  getDefaultPalette
} from '@test/testUtils';

import '../styles/index';

describe('Timeline styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Timeline ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'listStyleType'), 'none', 'Timeline list-style');
  });
});
