import React from 'react';
import { render } from '@testing-library/react';
import DatePicker from '../index';

import '../styles/index.less';
import { PickerHandle } from '../../Picker';

describe('DatePicker styles', () => {
  it('Should render the calendar icon', () => {
    const instanceRef = React.createRef<PickerHandle>();
    render(<DatePicker ref={instanceRef as any} open />);
    const toggleDom = ((instanceRef.current as PickerHandle).root as HTMLElement).querySelector(
      '.rs-picker-toggle'
    ) as HTMLElement;
    assert.isNotNull(toggleDom.querySelector('[aria-label="calendar"]'));
  });

  it('Should render the clock icon', () => {
    const instanceRef = React.createRef<PickerHandle>();
    render(<DatePicker ref={instanceRef as any} format="HH:mm:ss" open />);
    const toggleDom = ((instanceRef.current as PickerHandle).root as HTMLElement).querySelector(
      '.rs-picker-toggle'
    ) as HTMLElement;
    assert.isNotNull(toggleDom.querySelector('[aria-label="clock o"]'));
  });
});
