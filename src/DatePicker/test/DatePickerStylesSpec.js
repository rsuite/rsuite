import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../index';
import { createTestContainer, getDOMNode } from '@test/testUtils';

import '../styles/index';

describe('DatePicker styles', () => {
  it('Should render the correct styles', call => {
    const instanceRef = React.createRef();
    ReactDOM.render(<DatePicker ref={instanceRef} open />, createTestContainer());
    const toggleDom = getDOMNode(instanceRef.current).querySelector('.rs-picker-toggle');
    assert.equal(
      window.getComputedStyle(toggleDom.querySelector('.rs-picker-toggle-caret'), '::before')
        .content,
      `"${String.fromCharCode(0xf073)}"`
    );
    call();
  });
});
