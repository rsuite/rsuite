import React from 'react';
import DatePicker from '../index';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testPickerSize } from '@test/utils';

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

  it('Should update the label padding based on size', () => {
    const { rerender } = render(<DatePicker label="custom-label" />);
    expect(screen.getByText('custom-label')).to.have.style('padding', '0px 11px');

    rerender(<DatePicker label="custom-label" size="lg" />);
    expect(screen.getByText('custom-label')).to.have.style('padding', '0px 15px');

    rerender(<DatePicker label="custom-label" size="sm" />);
    expect(screen.getByText('custom-label')).to.have.style('padding', '0px 9px');

    rerender(<DatePicker label="custom-label" size="xs" />);
    expect(screen.getByText('custom-label')).to.have.style('padding', '0px 7px');
  });
});
