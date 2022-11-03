import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';

import Drawer from '../Drawer';

describe('Drawer.Header', () => {
  it('Should render a drawer header', () => {
    const title = 'Test';
    const instance = getDOMNode(<Drawer.Header>{title}</Drawer.Header>);
    assert.equal(instance.className, 'rs-drawer-header');
    assert.equal(instance.textContent, 'Test');
  });

  it('Should hide close button', () => {
    const title = 'Test';
    const instance = getDOMNode(<Drawer.Header closeButton={false}>{title}</Drawer.Header>);
    assert.isNull(instance.querySelector('button'));
  });

  it('Should call onClose callback', () => {
    const onCloseSpy = sinon.spy();
    const instance = getDOMNode(<Drawer.Header onClose={onCloseSpy} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-drawer-header-close') as HTMLElement);
    assert.isTrue(onCloseSpy.calledOnce);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Drawer.Header className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Drawer.Header style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Drawer.Header classPrefix="custom-prefix" />);
    assert.include(instance.className, 'custom-prefix');
  });
});
