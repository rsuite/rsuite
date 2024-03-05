import React from 'react';
import { render, screen } from '@testing-library/react';
import DatePicker from '../index';

import '../styles/index.less';

describe('DatePicker styles', () => {
  it('Should render the calendar icon', () => {
    render(<DatePicker />);

    expect(screen.getByLabelText('calendar')).to.have.class('rs-icon');
  });

  it('Should render the clock icon', () => {
    render(<DatePicker format="HH:mm:ss" />);
    expect(screen.getByLabelText('clock o')).to.have.class('rs-icon');
  });

  it('Should hava a padding of 0px', () => {
    render(<DatePicker open />);
    expect(screen.getByRole('dialog')).to.have.style('padding', '0px');
  });
});
