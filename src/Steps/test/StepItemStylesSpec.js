import React from 'react';
import ReactDOM from 'react-dom';
import StepItem from '../StepItem';
import { createTestContainer, getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index';

describe('StepItem styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<StepItem ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'paddingLeft'), '40px', 'StepItem padding-left');
  });
});
