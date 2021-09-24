import React from 'react';
import ReactDOM from 'react-dom';
import Radio from '../index';
import { createTestContainer, getDOMNode, toRGB, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Radio styles', () => {
  itChrome('Should render the correct border', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Radio ref={instanceRef} />, createTestContainer());
    const innerDom = getDOMNode(instanceRef.current).querySelector('.rs-radio-inner');
    assert.equal(
      window.getComputedStyle(innerDom, '::before').border,
      `1px solid ${toRGB('#d9d9d9')}`
    );
  });

  it('Should render checked style even in disabled state', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Radio ref={instanceRef} checked disabled />, createTestContainer());
    const innerDom = getDOMNode(instanceRef.current).querySelector('.rs-radio-inner');
    assert.equal(window.getComputedStyle(innerDom, '::before').backgroundColor, toRGB('#3498ff'));
  });
});
