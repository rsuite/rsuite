import React from 'react';
import ReactDOM from 'react-dom';
import Col from '../index';
import { createTestContainer, getDOMNode, getStyle, itChrome } from '@test/testUtils';

import '../styles/index';

describe('Col styles', () => {
  itChrome('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Col ref={instanceRef} md={1}>
        Title
      </Col>,
      createTestContainer()
    );
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'padding'), '0px 5px');
  });
});
