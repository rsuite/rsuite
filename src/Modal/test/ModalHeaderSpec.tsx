import React from 'react';
import { render, screen } from '@testing-library/react';

import ModalHeader from '../ModalHeader';
import Sinon from 'sinon';
import userEvent from '@testing-library/user-event';

const headerText = 'Test';

describe('ModalHeader', () => {
  it('Should render a modal header', () => {
    render(<ModalHeader>{headerText}</ModalHeader>);
    expect(screen.getByText(headerText)).to.have.class('rs-modal-header');
  });

  it('Should hide close button', () => {
    render(<ModalHeader closeButton={false}>{headerText}</ModalHeader>);
    expect(screen.queryByRole('button')).to.not.exist;
  });

  it('Should call onClose callback', () => {
    const onClose = Sinon.spy();
    render(<ModalHeader onClose={onClose} />);
    userEvent.click(screen.getByRole('button'));

    expect(onClose).to.have.been.calledOnce;
  });

  it('Should have a custom className', () => {
    render(<ModalHeader className="custom">{headerText}</ModalHeader>);
    expect(screen.getByText(headerText)).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    render(<ModalHeader style={{ fontSize }}>{headerText}</ModalHeader>);
    expect(screen.getByText(headerText)).to.have.style('font-size', fontSize);
  });

  it('Should have a custom className prefix', () => {
    render(<ModalHeader classPrefix="custom-prefix">{headerText}</ModalHeader>);
    expect(screen.getByText(headerText).className).to.match(/\bcustom-prefix\b/);
  });
});
