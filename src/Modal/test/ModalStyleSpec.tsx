import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from '../index';

import '../styles/index.less';

describe('Modal styles', () => {
  it('Should render the correct styles', () => {
    render(<Modal open />);
    const wrapper = screen.getByRole('dialog').parentNode as HTMLElement;
    const modal = wrapper.querySelector('.rs-modal') as HTMLElement;

    expect(wrapper).to.have.style('position', 'fixed');
    expect(wrapper).to.have.style('z-index', '1050');
    expect(modal).to.have.style('position', 'relative');
    expect(modal).to.have.style('z-index', '1050');
    expect(modal).to.have.style('overflow', 'visible');
  });

  it('Should be full screen in `full` size', () => {
    render(<Modal open size="full" />);
    const dialog = screen.getByRole('dialog');
    const modalDialog = dialog.querySelector('.rs-modal-dialog') as HTMLElement;
    const { left, right } = modalDialog.getBoundingClientRect();

    expect(left).to.equal(0);
    expect(window.innerWidth - right).to.equal(0);
  });
});
