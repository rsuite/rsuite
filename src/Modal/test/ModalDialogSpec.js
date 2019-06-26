import React from 'react';
import ModalDialog from '../ModalDialog';
import { innerText, getDOMNode } from '@test/testUtils';

describe('ModalDialog', () => {
  it('Should render a dialog', () => {
    let title = 'Test';
    let instance = getDOMNode(<ModalDialog>{title}</ModalDialog>);

    assert.equal(instance.className, 'rs-modal');
    assert.ok(instance.querySelector('.rs-modal-dialog'));
    assert.equal(innerText(instance), title);
  });

  it('Should have a custom className in dialog', () => {
    let instance = getDOMNode(<ModalDialog dialogClassName="custom-dialog" />);
    assert.ok(instance.querySelector('.rs-modal-dialog.custom-dialog'));
  });

  it('Should have a custom style in dialog', () => {
    const fontSize = '12px';
    let instance = getDOMNode(<ModalDialog dialogStyle={{ fontSize }} />);
    assert.equal(instance.querySelector('.rs-modal-dialog').style.fontSize, fontSize);
  });

  it('Should have a custom className', () => {
    let instance = getDOMNode(<ModalDialog className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = getDOMNode(<ModalDialog style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<ModalDialog classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
