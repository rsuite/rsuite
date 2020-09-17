import React from 'react';
import { getDOMNode } from '@test/testUtils';

import ModalBody from '../ModalBody';

describe('ModalBody', () => {
  it('Should render a modal body', () => {
    const title = 'Test';
    const instance = getDOMNode(<ModalBody>{title}</ModalBody>);
    assert.equal(instance.className, 'rs-modal-body');
    assert.equal(instance.innerHTML, title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<ModalBody className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<ModalBody style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<ModalBody classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
