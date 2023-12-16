import React from 'react';
import { render, screen } from '@testing-library/react';

import ModalTitle from '../ModalTitle';

const titleText = 'Test';
describe('ModalTitle', () => {
  it('Should render a modal title', () => {
    render(<ModalTitle>{titleText}</ModalTitle>);
    expect(screen.getByText(titleText)).to.have.class('rs-modal-title');
  });

  it('Should have a custom className', () => {
    render(<ModalTitle className="custom">{titleText}</ModalTitle>);
    expect(screen.getByText(titleText).className).to.match(/\bcustom\b/);
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    render(<ModalTitle style={{ fontSize }}>{titleText}</ModalTitle>);
    expect(screen.getByText(titleText)).to.have.style('font-size', fontSize);
  });

  it('Should have a custom className prefix', () => {
    render(<ModalTitle classPrefix="custom-prefix">{titleText}</ModalTitle>);
    expect(screen.getByText(titleText).className).to.match(/\bcustom-prefix\b/);
  });
});
