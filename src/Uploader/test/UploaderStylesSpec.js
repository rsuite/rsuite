import React from 'react';
import ReactDOM from 'react-dom';
import Uploader from '../index';
import { createTestContainer, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('Uploader styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Uploader ref={instanceRef} />, createTestContainer());
    const dom = instanceRef.current.root;
    const triggerButtonDom = dom.querySelector('.rs-uploader-trigger-btn');
    assert.equal(
      getStyle(triggerButtonDom, 'backgroundColor'),
      toRGB('#f7f7fa'),
      'Uploader trigger button background-color'
    );
  });
});
