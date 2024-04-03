import React from 'react';
import Drawer from '../index';
import { render, screen } from '@testing-library/react';

import '../styles/index.less';

describe('Drawer styles', () => {
  it('Should render the correct styles', () => {
    render(<Drawer open />);

    expect(screen.getByRole('dialog')).to.have.style('z-index', '1050');
    expect(screen.getByRole('dialog')).to.have.style('position', 'fixed');
    expect(screen.getByRole('dialog')).to.have.style('overflow', 'visible');
  });

  it('Should have a wrapper that fills the window', () => {
    render(<Drawer open />);

    const wrapper = screen.getByTestId('drawer-wrapper');
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    expect(wrapper).to.have.style('position', 'fixed');
    expect(wrapper).to.have.style('z-index', '1050');
    expect(wrapper).to.have.style('width', `${windowWidth}px`);
    expect(wrapper).to.have.style('height', `${windowHeight}px`);
    expect(wrapper).to.have.style('left', `0px`);
    expect(wrapper).to.have.style('top', `0px`);
  });

  it('Should not render backdrop', () => {
    render(<Drawer open backdrop={false} />);

    expect(screen.getByTestId('drawer-wrapper')).to.have.style('pointer-events', 'none');
    expect(screen.getByRole('dialog')).to.have.style('pointer-events', 'auto');
  });
});
