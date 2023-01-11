import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import ModalHeader from '../ModalHeader';
import Sinon from 'sinon';

describe('ModalHeader', () => {
  it('Should render a modal header', () => {
    const title = 'Test';
    const instance = getDOMNode(<ModalHeader>{title}</ModalHeader>);
    assert.equal(instance.className, 'rs-modal-header');
    assert.equal(instance.textContent, 'Test');
  });

  it('Should hide close button', () => {
    const title = 'Test';
    const instance = getDOMNode(<ModalHeader closeButton={false}>{title}</ModalHeader>);
    assert.ok(!instance.querySelector('button'));
  });

  it('Should call onClose callback', () => {
    const onClose = Sinon.spy();
    const instance = getDOMNode(<ModalHeader onClose={onClose} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-modal-header-close') as HTMLElement);

    expect(onClose).to.have.been.calledOnce;
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<ModalHeader className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<ModalHeader style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<ModalHeader classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
