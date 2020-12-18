import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import Toolbar from '../Toolbar';

describe('Toolbar', () => {
  it('Should render a div with `rs-picker-toolbar` class', () => {
    const instance = getDOMNode(<Toolbar />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\brs-picker-toolbar\b/));
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

  it('Should call `onOk` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Toolbar onOk={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toolbar-right .rs-btn'));
  });

  it('Should call `onClickShortcut` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(<Toolbar onClickShortcut={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toolbar-ranges button'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Toolbar className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Toolbar style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Toolbar classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
