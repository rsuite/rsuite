import React from 'react';
import { render, screen } from '@testing-library/react';
import { testPickerSize } from '@test/utils';
import DateRangePicker from '../index';
import '../styles/index.less';

describe('DateRangePicker styles', () => {
  testPickerSize(DateRangePicker, { role: 'textbox', maxHeight: 40 });
  it('Should render the correct styles', () => {
    render(<DateRangePicker open />);

    expect(screen.getByLabelText('calendar').tagName).to.equal('svg');
  });

  it('Should keep size in `block` mode', function () {
    const { container } = render(<DateRangePicker block defaultOpen />);

    expect(container.firstChild).to.have.class('rs-picker-block');
    expect(screen.getByRole('dialog')).to.have.style('width', `${264 * 2}px`);
  });

  it('Should hava a padding of 0px', () => {
    render(<DateRangePicker open />);
    expect(screen.getByRole('dialog')).to.have.style('padding', '0px');
  });
});
