import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../index';
import { createTestContainer } from '@test/testUtils';

import '../styles/index';

describe('DatePicker styles', () => {
  it('Should render the calendar icon', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<DatePicker ref={instanceRef} open />, createTestContainer());
    const toggleDom = instanceRef.current.root.querySelector('.rs-picker-toggle');
    assert.isNotNull(toggleDom.querySelector('[aria-label="calendar"]'));
  });

  it('Should render the clock icon', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<DatePicker ref={instanceRef} format="HH:mm:ss" open />, createTestContainer());
    const toggleDom = instanceRef.current.root.querySelector('.rs-picker-toggle');
    assert.isNotNull(toggleDom.querySelector('[aria-label="clock o"]'));
  });
});
