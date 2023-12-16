import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalBody from '../ModalBody';

const modalBodyText = 'Test';
describe('ModalBody', () => {
  it('Should render a modal body', () => {
    render(<ModalBody>{modalBodyText}</ModalBody>);
    expect(screen.getByText(modalBodyText)).to.have.class('rs-modal-body');
  });

  it('Should have a custom className', () => {
    render(<ModalBody className="custom">{modalBodyText}</ModalBody>);
    expect(screen.getByText(modalBodyText)).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    render(<ModalBody style={{ fontSize }}>{modalBodyText}</ModalBody>);
    expect(screen.getByText(modalBodyText)).to.have.style('font-size', fontSize);
  });

  it('Should have a custom className prefix', () => {
    render(<ModalBody classPrefix="custom-prefix">{modalBodyText}</ModalBody>);
    expect(screen.getByText(modalBodyText).className).to.match(/\bcustom-prefix\b/);
  });
});
