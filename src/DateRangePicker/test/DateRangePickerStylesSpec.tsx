import React from 'react';
import { render, screen } from '@testing-library/react';
import DateRangePicker from '../index';
import { getInstance } from '@test/testUtils';
import getWidth from 'dom-lib/getWidth';

import '../styles/index.less';

describe('DateRangePicker styles', () => {
  it('Should render the correct styles', () => {
    render(<DateRangePicker open />);

    expect(screen.getByLabelText('calendar').tagName).to.equal('svg');
  });

  it('Should keep size in `block` mode', function () {
    const instance = getInstance(<DateRangePicker block defaultOpen />);

    expect(instance.root).to.have.class('rs-picker-block');
    expect(getWidth(instance.overlay)).to.equal(492);
  });
});
