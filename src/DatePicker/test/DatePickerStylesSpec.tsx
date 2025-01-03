import React from 'react';
import { render, screen } from '@testing-library/react';
import { testPickerSize } from '@test/utils';
import DatePicker from '../index';
import '../styles/index.less';

describe('DatePicker styles', () => {
  testPickerSize(DatePicker, { role: 'textbox', maxHeight: 40 });

  it('Should render the calendar icon', () => {
    render(<DatePicker />);

    expect(screen.getByLabelText('calender simple')).to.have.class('rs-icon');
  });

  it('Should render the clock icon', () => {
    render(<DatePicker format="HH:mm:ss" />);
    expect(screen.getByLabelText('time')).to.have.class('rs-icon');
  });

  it('Should hava a padding of 0px', () => {
    render(<DatePicker open />);
    expect(screen.getByRole('dialog')).to.have.style('padding', '0px');
  });
});
