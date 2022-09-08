import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';

import Toolbar from '../Toolbar';

describe('DatePicker - Toolbar', () => {
  it('Should render a div with `rs-picker-toolbar` class', () => {
    const instance = getDOMNode(<Toolbar calendarDate={new Date(2021, 11, 24)} />);

    assert.equal(instance.nodeName, 'DIV');
    assert.include(instance.className, 'rs-picker-toolbar');
  });

  it('Should render a custom option', () => {
    const instance = getDOMNode(
      <Toolbar
        calendarDate={new Date(2021, 11, 24)}
        ranges={[
          {
            label: <div className="btn-today">today</div>,
            value: new Date(),
            closeOverlay: true
          }
        ]}
      />
    );
    assert.equal(instance.querySelector('.btn-today').textContent, 'today');
  });

  it('Should call `onOk` callback', () => {
    const onOkSpy = sinon.spy();
    const instance = getDOMNode(<Toolbar calendarDate={new Date(2021, 11, 24)} onOk={onOkSpy} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toolbar-right .rs-btn'));
    assert.isTrue(onOkSpy.calledOnce);
  });

  it('Should call `onClickShortcut` callback', () => {
    const onClickShortcutSpy = sinon.spy();
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} onClickShortcut={onClickShortcutSpy} />
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toolbar-ranges button'));
    assert.isTrue(onClickShortcutSpy.calledOnce);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} className="custom" />
    );
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} style={{ fontSize }} />
    );
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} classPrefix="custom-prefix" />
    );
    assert.include(instance.className, 'custom-prefix');
  });

  it('Should not render the ok button', () => {
    const instance = getDOMNode(<Toolbar calendarDate={new Date(2021, 11, 24)} hideOkBtn />);
    assert.isNull(instance.querySelector('.rs-picker-toolbar-right button'));
  });

  it('Should not render any elements', () => {
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} hideOkBtn ranges={[]} />
    );
    assert.isNull(instance);
  });

  it('Should be wrap in ranges', () => {
    const { container } = render(<Toolbar calendarDate={new Date()} />);
    expect(container.querySelector('.rs-picker-toolbar-ranges')).to.have.style('flex-wrap', 'wrap');
  });
});
