import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '../index';
import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';

describe('Grid styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Grid ref={instanceRef} />, createTestContainer());
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'padding'), '0px 5px');
  });
});
