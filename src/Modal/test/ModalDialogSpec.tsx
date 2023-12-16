import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalDialog from '../ModalDialog';

describe('ModalDialog', () => {
  it('Should render a dialog', () => {
    const title = 'Test';
    render(<ModalDialog>{title}</ModalDialog>);

    expect(screen.getByRole('dialog')).to.have.class('rs-modal');
    expect(screen.getByRole('document')).to.have.class('rs-modal-dialog');
    expect(screen.getByRole('dialog')).to.have.text(title);
  });

  it('Should have a custom className in dialog', () => {
    render(<ModalDialog dialogClassName="custom-dialog" />);
    expect(screen.getByRole('document'))
      .to.have.class('rs-modal-dialog')
      .to.have.class('custom-dialog');
  });

  it('Should have a custom style in dialog', () => {
    const fontSize = '12px';
    render(<ModalDialog dialogStyle={{ fontSize }} />);
    expect(screen.getByRole('document')).to.have.style('font-size', fontSize);
  });

  it('Should have a custom className', () => {
    render(<ModalDialog className="custom" />);
    expect(screen.getByRole('dialog')).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    render(<ModalDialog style={{ fontSize }} />);
    expect(screen.getByRole('dialog')).to.have.style('font-size', fontSize);
  });

  it('Should have a custom className prefix', () => {
    render(<ModalDialog classPrefix="custom-prefix" />);
    expect(screen.getByRole('dialog').className).to.match(/\bcustom-prefix\b/);
  });

  describe('a11y', () => {
    it('Should render an ARIA dialog with correct content', () => {
      const message = 'Message';
      render(
        <ModalDialog>
          <p>{message}</p>
        </ModalDialog>
      );

      expect(screen.queryByRole('dialog')).to.have.text(message);
    });
  });
});
