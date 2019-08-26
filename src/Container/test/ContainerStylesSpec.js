import React from 'react';
import ReactDOM from 'react-dom';
import Container from '../index';
import { createTestContainer, getDOMNode, getStyle } from '@test/testUtils';

import '../styles/index';

describe('Container styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Container ref={instanceRef}>
        <span>Title</span>
      </Container>,
      createTestContainer()
    );
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'display'), 'flex');
  });
});
