import React from 'react';
import { render, screen } from '@testing-library/react';
import Slider from '../index';
import { toRGB, getDefaultPalette, inChrome } from '@test/utils';

import '../styles/index.less';

const { H500 } = getDefaultPalette();

describe('Slider styles', () => {
  it('Should render the correct styles', () => {
    const { container } = render(<Slider />);

    const bar = screen.getByTestId('slider-bar');
    const handle = screen.getByTestId('slider-handle');

    expect(container.firstChild).to.have.style('position', 'relative');
    expect(bar).to.have.style('background-color', toRGB('#f2f2f5'));
    expect(handle).to.have.style('position', 'absolute');
    inChrome &&
      expect(window.getComputedStyle(handle, '::before').border).to.equal(`2px solid ${H500}`);
  });
});
