import React from 'react';
import ReactDOM from 'react-dom';
import DateRangePicker from '../index';
import { createTestContainer } from '@test/testUtils';

import '../styles/index';

describe('DateRangePicker styles', () => {
  it('Should render the correct styles', call => {
    const instanceRef = React.createRef();
    ReactDOM.render(<DateRangePicker ref={instanceRef} open />, createTestContainer());
    const toggleDom = instanceRef.root.querySelector('.rs-picker-toggle');
    assert.equal(
      window.getComputedStyle(toggleDom.querySelector('.rs-picker-toggle-caret'), '::before')
        .content,
      `"${String.fromCharCode(0xf073)}"`
    );
    call();
  });
});
