import React from 'react';
import ReactDOM from 'react-dom';
import Uploader from '../index';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  toRGB,
  getDefaultPalette
} from '@test/testUtils';

import '../styles/index';

describe('Uploader styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Uploader ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    const triggerButtonDom = dom.querySelector('.rs-uploader-trigger-btn');
    assert.equal(
      getStyle(triggerButtonDom, 'backgroundColor'),
      toRGB('#f7f7fa'),
      'Uploader trigger button background-color'
    );
  });
});
