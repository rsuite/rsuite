import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalDialog from '../ModalDialog';
import { getDOMNode } from '@test/testUtils';

describe('ModalDialog', () => {
  it('Should render a dialog', () => {
    const title = 'Test';
    const instance = getDOMNode(<ModalDialog>{title}</ModalDialog>);

    assert.equal(instance.className, 'rs-modal');
    assert.ok(instance.querySelector('.rs-modal-dialog'));
    assert.equal(instance.textContent, title);
  });

  it('Should have a custom className in dialog', () => {
    const instance = getDOMNode(<ModalDialog dialogClassName="custom-dialog" />);
    assert.ok(instance.querySelector('.rs-modal-dialog.custom-dialog'));
  });

  it('Should have a custom style in dialog', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<ModalDialog dialogStyle={{ fontSize }} />);
    assert.equal(
      (instance.querySelector('.rs-modal-dialog') as HTMLElement).style.fontSize,
      fontSize
    );
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<ModalDialog className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<ModalDialog style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<ModalDialog classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
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
