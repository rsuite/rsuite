import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../index';
import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';

describe('Header styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Header ref={instanceRef} />, createTestContainer());
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'flex'), '0 0 auto');
  });
});
