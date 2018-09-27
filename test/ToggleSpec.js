import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Toggle from '../src/Toggle';
import innerText from './innerText';

describe('Toggle', () => {
  it('Should output a toggle', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Toggle />);
    assert.equal(findDOMNode(instance).className, 'rs-btn-toggle');
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Toggle disabled />);
    assert.ok(findDOMNode(instance).className.match(/\bdisabled\b/));
  });

  it('Should be checked', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Toggle checked />);
    assert.ok(findDOMNode(instance).className.match(/\bbtn-toggle-checked\b/));
  });

  it('Should apply size class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Toggle size="lg" />);
    assert.ok(findDOMNode(instance).className.match(/\bbtn-toggle-lg\b/));
  });

  it('Should output a `off` in inner ', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Toggle unCheckedChildren="off" />);
    assert.equal(innerText(findDOMNode(instance)), 'off');
  });

  it('Should output a `on` in inner ', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Toggle checkedChildren="on" checked />);
    assert.equal(innerText(findDOMNode(instance)), 'on');
  });

  it('Should call onChange callback ', done => {
    const doneOp = checked => {
      if (checked) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(<Toggle onChange={doneOp} />);
    ReactTestUtils.Simulate.click(findDOMNode(instance));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Toggle className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Toggle style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Toggle classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
