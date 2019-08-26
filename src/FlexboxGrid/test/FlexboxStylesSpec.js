import React from 'react';
import ReactDOM from 'react-dom';
import Flexbox from '../index';
import { createTestContainer, getDOMNode, getStyle, inChrome } from '@test/testUtils';

import '../styles/index';

describe('Flexbox styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Flexbox ref={instanceRef} />, createTestContainer());
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'display'), 'flex', 'Flexbox display');
    inChrome &&
      assert.equal(
        getStyle(getDOMNode(instanceRef.current), 'flexFlow'),
        'row wrap',
        'Flexbox flex-flow'
      );
  });

  it('Should render the correct aligned', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Flexbox ref={instanceRef} align="top" />, createTestContainer());
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'alignItems'), 'flex-start');
  });
});
