import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Radio from '../src/Radio';

describe('Radio', () => {
  it('Should render a radio', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Radio>Test</Radio>);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelectorAll('input[type="radio"]').length, 1);
  });

  it('Should add title', () => {
    const title = 'Text';
    const instance = ReactTestUtils.renderIntoDocument(<Radio title={title}>Test</Radio>);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector('label').title, title);
  });

  it('Should have radio-inline class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Radio inline>Test</Radio>);
    assert.ok(findDOMNode(instance).className.match(/\bradio-inline\b/));
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Radio disabled>Test</Radio>);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.querySelector('input').disabled);
    assert.ok(instanceDom.className.match(/\bradio-disabled\b/));
  });

  it('Should be checked', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Radio checked>Test</Radio>);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bradio-checked\b/));
  });

  it('Should be defaultChecked', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Radio defaultChecked>Test</Radio>);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bradio-checked\b/));
  });

  it('Should have a `Test` value', () => {
    const value = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<Radio defaultValue={value}>Test</Radio>);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector('input').value, value);
  });

  it('Should support inputRef', () => {
    let input;
    ReactTestUtils.renderIntoDocument(<Radio inputRef={ref => (input = ref)}>Test</Radio>);
    assert.ok(input);
  });

  it('Should call onChange callback', done => {
    const value = 'Test';
    const doneOp = data => {
      if (data === value) {
        done();
      }
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <Radio onChange={doneOp} value={value}>
        Title
      </Radio>
    );
    ReactTestUtils.Simulate.change(findDOMNode(instance).querySelector('input'));
  });

  it('Should be checked with change', done => {
    const doneOp = checked => {
      if (checked === '100') {
        done();
      }
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <Radio onChange={doneOp} value="100">
        Title
      </Radio>
    );
    const instanceDom = findDOMNode(instance);
    ReactTestUtils.Simulate.change(instanceDom.querySelector('input'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Radio className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Radio style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
