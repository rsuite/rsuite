import React from 'react';
import { render, screen } from '@testing-library/react';

import ModalFooter from '../ModalFooter';

const footerText = 'Test';

describe('ModalFooter', () => {
  it('Should render a modal footer', () => {
    render(<ModalFooter>{footerText}</ModalFooter>);
    expect(screen.getByText(footerText)).to.have.class('rs-modal-footer');
  });

  it('Should have a custom className', () => {
    render(<ModalFooter className="custom">{footerText}</ModalFooter>);
    expect(screen.getByText(footerText)).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    render(<ModalFooter style={{ fontSize }}>{footerText}</ModalFooter>);
    expect(screen.getByText(footerText)).to.have.style('font-size', fontSize);
  });

  it('Should have a custom className prefix', () => {
    render(<ModalFooter classPrefix="custom-prefix">{footerText}</ModalFooter>);
    expect(screen.getByText(footerText).className).to.match(/\bcustom-prefix\b/);
  });
});
