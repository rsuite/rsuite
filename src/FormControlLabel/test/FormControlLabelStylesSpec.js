import React from 'react';
import ReactDOM from 'react-dom';
import FormControlLabel from '../index';
import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';

describe('FormControlLabel styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <FormControlLabel ref={instanceRef}>Title</FormControlLabel>,
      createTestContainer()
    );
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'marginBottom'), '4px');
  });
});
