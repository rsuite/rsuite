import React from 'react';
import { getDOMNode } from '@test/testUtils';

import ModalTitle from '../ModalTitle';

describe('ModalTitle', () => {
  it('Should render a modal title', () => {
    const title = 'Test';
    const instance = getDOMNode(<ModalTitle>{title}</ModalTitle>);
    assert.equal(instance.className, 'rs-modal-title');
    assert.equal(instance.innerHTML, title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<ModalTitle className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<ModalTitle style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<ModalTitle classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
