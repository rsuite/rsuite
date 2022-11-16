import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';

import Toolbar from '../Toolbar';

describe('DatePicker - Toolbar', () => {
  it('Should render a div with `rs-picker-toolbar` class', () => {
    const instance = getDOMNode(<Toolbar calendarDate={new Date(2021, 11, 24)} locale={{}} />);

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
        locale={{}}
      />
    );
    assert.equal((instance.querySelector('.btn-today') as HTMLElement).textContent, 'today');
  });

  it('Should call `onOk` callback', () => {
    const onOkSpy = sinon.spy();
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} onOk={onOkSpy} locale={{}} />
    );
    ReactTestUtils.Simulate.click(
      instance.querySelector('.rs-picker-toolbar-right .rs-btn') as HTMLElement
    );
    assert.isTrue(onOkSpy.calledOnce);
  });

  it('Should call `onClickShortcut` callback', () => {
    const onClickShortcutSpy = sinon.spy();
    const instance = getDOMNode(
      <Toolbar
        calendarDate={new Date(2021, 11, 24)}
        onClickShortcut={onClickShortcutSpy}
        locale={{}}
      />
    );
    ReactTestUtils.Simulate.click(
      instance.querySelector('.rs-picker-toolbar-ranges button') as HTMLElement
    );
    assert.isTrue(onClickShortcutSpy.calledOnce);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} className="custom" locale={{}} />
    );
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} style={{ fontSize }} locale={{}} />
    );
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} classPrefix="custom-prefix" locale={{}} />
    );
    assert.include(instance.className, 'custom-prefix');
  });

  it('Should not render the ok button', () => {
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} hideOkBtn locale={{}} />
    );
    assert.isNull(instance.querySelector('.rs-picker-toolbar-right button'));
  });

  it('Should not render any elements', () => {
    const instance = getDOMNode(
      <Toolbar calendarDate={new Date(2021, 11, 24)} hideOkBtn ranges={[]} locale={{}} />
    );
    assert.isNull(instance);
  });

  it('Should be wrap in ranges', () => {
    const { container } = render(<Toolbar calendarDate={new Date()} locale={{}} />);
    expect(container.querySelector('.rs-picker-toolbar-ranges')).to.have.style('flex-wrap', 'wrap');
  });
});
