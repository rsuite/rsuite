import React from 'react';
import ReactDOM from 'react-dom';
import Color from 'color';
import Button from '../Button';
import { createTestContainer, getDOMNode } from '@test/testUtils';

import '../styles/index';

describe('Button styles', () => {
  it('Should render the correct background color', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Button appearance="primary" ref={instanceRef}>
        Title
      </Button>,
      createTestContainer()
    );

    assert.equal(
      window.getComputedStyle(getDOMNode(instanceRef.current)).backgroundColor,
      Color('#3498ff')
        .rgb()
        .string()
    );
  });
});
