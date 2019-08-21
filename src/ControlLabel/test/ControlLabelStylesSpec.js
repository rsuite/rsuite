import React from 'react';
import ReactDOM from 'react-dom';
import ControlLabel from '../index';
import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';

describe('ControlLabel styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<ControlLabel ref={instanceRef}>Title</ControlLabel>, createTestContainer());
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'marginBottom'), '4px');
  });
});
