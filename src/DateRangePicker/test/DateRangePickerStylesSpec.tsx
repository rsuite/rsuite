import React from 'react';
import { render, screen } from '@testing-library/react';
import DateRangePicker from '../index';
import getWidth from 'dom-lib/getWidth';

import '../styles/index.less';

describe('DateRangePicker styles', () => {
  it('Should render the correct styles', () => {
    render(<DateRangePicker open />);

    expect(screen.getByLabelText('calendar').tagName).to.equal('svg');
  });

  it('Should keep size in `block` mode', function () {
    const { container } = render(<DateRangePicker block defaultOpen />);

    expect(container.firstChild).to.have.class('rs-picker-block');
    expect(getWidth(screen.getByRole('dialog'))).to.equal(264 * 2);
  });

  it('Should hava a padding of 0px', () => {
    render(<DateRangePicker open />);
    expect(screen.getByRole('dialog')).to.have.style('padding', '0px');
  });
});
