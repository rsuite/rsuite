import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../index';
import { createTestContainer, getDOMNode } from '@test/testUtils';

import '../styles/index';

describe('DatePicker styles', () => {
  it('Should render the calendar icon', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<DatePicker ref={instanceRef} open />, createTestContainer());
    const toggleDom = getDOMNode(instanceRef.current).querySelector('.rs-picker-toggle');
    assert.equal(
      window.getComputedStyle(toggleDom.querySelector('.rs-picker-toggle-caret'), '::before')
        .content,
      `"${String.fromCharCode(0xf073)}"`
    );
  });

  it('Should render the clock icon', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<DatePicker ref={instanceRef} format="HH:mm:ss" open />, createTestContainer());
    const toggleDom = getDOMNode(instanceRef.current).querySelector('.rs-picker-toggle');
    assert.equal(
      window.getComputedStyle(toggleDom.querySelector('.rs-picker-toggle-caret'), '::before')
        .content,
      `"${String.fromCharCode(0xf017)}"`
    );
  });
});
