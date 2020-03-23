import React from 'react';
import { getDOMNode } from '@test/testUtils';

import ModalFooter from '../ModalFooter';

describe('ModalFooter', () => {
  it('Should render a modal footer', () => {
    const title = 'Test';
    const instance = getDOMNode(<ModalFooter>{title}</ModalFooter>);
    assert.equal(instance.className, 'rs-modal-footer');
    assert.equal(instance.innerHTML, title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<ModalFooter className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<ModalFooter style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<ModalFooter classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
