import React from 'react';
import { render } from '@testing-library/react';
import DatePicker from '../index';

import '../styles/index.less';

describe('DatePicker styles', () => {
  it('Should render the calendar icon', () => {
    const instanceRef = React.createRef();
    render(<DatePicker ref={instanceRef} open />);
    const toggleDom = instanceRef.current.root.querySelector('.rs-picker-toggle');
    assert.isNotNull(toggleDom.querySelector('[aria-label="calendar"]'));
  });

  it('Should render the clock icon', () => {
    const instanceRef = React.createRef();
    render(<DatePicker ref={instanceRef} format="HH:mm:ss" open />);
    const toggleDom = instanceRef.current.root.querySelector('.rs-picker-toggle');
    assert.isNotNull(toggleDom.querySelector('[aria-label="clock o"]'));
  });
});
