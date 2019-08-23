import React from 'react';
import ReactDOM from 'react-dom';
import StepItem from '../StepItem';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  toRGB,
  getDefaultPalette
} from '@test/testUtils';

import '../styles/index';

describe('StepItem styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<StepItem ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'paddingLeft'), '40px', 'StepItem padding-left');
  });
});
