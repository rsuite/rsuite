import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import Toolbar from '../Toolbar';

describe('Toolbar', () => {
  it('Should render a div with `rs-picker-toolbar` class', () => {
    const instance = getDOMNode(<Toolbar />);

    assert.equal(instance.nodeName, 'DIV');
    assert.include(instance.className, 'rs-picker-toolbar');
  });

  it('Should render a custom option', () => {
    const instance = getDOMNode(
      <Toolbar
        ranges={[
          {
            label: <div className="btn-today">today</div>,
            value: new Date(),
            closeOverlay: true
          }
        ]}
      />
    );
    assert.equal(instance.querySelector('.btn-today').innerText, 'today');
  });

  it('Should call `onOk` callback', () => {
    const onOkSpy = sinon.spy();
    const instance = getDOMNode(<Toolbar onOk={onOkSpy} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toolbar-right .rs-btn'));
    assert.isTrue(onOkSpy.calledOnce);
  });

  it('Should call `onClickShortcut` callback', () => {
    const onClickShortcutSpy = sinon.spy();
    const instance = getDOMNode(<Toolbar onClickShortcut={onClickShortcutSpy} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toolbar-ranges button'));
    assert.isTrue(onClickShortcutSpy.calledOnce);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Toolbar className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Toolbar style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Toolbar classPrefix="custom-prefix" />);
    assert.include(instance.className, 'custom-prefix');
  });

  it('Should not render the ok button', () => {
    const instance = getDOMNode(<Toolbar hideOkBtn />);
    assert.isNull(instance.querySelector('.rs-picker-toolbar-right button'));
  });

  it('Should not render any elements', () => {
    const instance = getDOMNode(<Toolbar hideOkBtn ranges={[]} />);
    assert.isNull(instance);
  });
});
