import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Toolbar from '../../src/DateRangePicker/Toolbar';

describe('Toolbar', () => {
  it('Should render a div with `rs-picker-toolbar` class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Toolbar onShortcut={() => {}} disabledShortcutButton={() => {}} />
    );

    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.nodeName, 'DIV');
    assert.ok(instanceDOM.className.match(/\brs-picker-toolbar\b/));
  });

  it('Should call `onOk` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <Toolbar onOk={doneOp} onShortcut={() => {}} disabledShortcutButton={() => {}} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-picker-toolbar-right-btn-ok'));
  });

  it('Should call `onShortcut` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <Toolbar onShortcut={doneOp} disabledShortcutButton={() => {}} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-picker-toolbar-ranges a'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Toolbar className="custom" onShortcut={() => {}} disabledShortcutButton={() => {}} />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Toolbar style={{ fontSize }} onShortcut={() => {}} disabledShortcutButton={() => {}} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Toolbar
        classPrefix="custom-prefix"
        onShortcut={() => {}}
        disabledShortcutButton={() => {}}
      />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
