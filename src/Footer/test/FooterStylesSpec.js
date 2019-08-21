import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../index';
import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';

describe('Footer styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Footer ref={instanceRef} />, createTestContainer());
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'flex'), '0 0 auto');
  });
});
