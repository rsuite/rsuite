import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import Radio from '../Radio';
import { getDOMNode } from '@test/testUtils';

describe('Radio', () => {
  it('Should render a radio', () => {
    const instance = getDOMNode(<Radio>Test</Radio>);
    assert.equal(instance.querySelectorAll('input[type="radio"]').length, 1);
  });

  it('Should add title', () => {
    const title = 'Text';
    const instance = getDOMNode(<Radio title={title}>Test</Radio>);
    assert.equal(instance.querySelector('label').title, title);
  });

  it('Should have radio-inline class', () => {
    const instance = getDOMNode(<Radio inline>Test</Radio>);
    assert.ok(instance.className.match(/\bradio-inline\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Radio disabled>Test</Radio>);
    assert.ok(instance.querySelector('input').disabled);
    assert.ok(instance.className.match(/\bradio-disabled\b/));
  });

  it('Should be checked', () => {
    const instance = getDOMNode(<Radio checked>Test</Radio>);

    assert.ok(instance.className.match(/\bradio-checked\b/));
  });

  it('Should be defaultChecked', () => {
    const instance = getDOMNode(<Radio defaultChecked>Test</Radio>);

    assert.ok(instance.className.match(/\bradio-checked\b/));
  });

  it('Should have a `Test` value', () => {
    const value = 'Test';
    const instance = getDOMNode(<Radio defaultValue={value}>Test</Radio>);

    assert.equal(instance.querySelector('input').value, value);
  });

  it('Should support inputRef', () => {
    let input;
    getDOMNode(<Radio inputRef={ref => (input = ref)}>Test</Radio>);
    assert.ok(input);
  });

  it('Should call onClick callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(<Radio onClick={doneOp}>Title</Radio>);
    ReactTestUtils.Simulate.click(instance.querySelector('label'));
  });

  it('Should call onChange callback', done => {
    const value = 'Test';
    const doneOp = data => {
      if (data === value) {
        done();
      }
    };

    const instance = getDOMNode(
      <Radio onChange={doneOp} value={value}>
        Title
      </Radio>
    );
    ReactTestUtils.Simulate.change(instance.querySelector('input'));
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Radio onBlur={doneOp} />);
    ReactTestUtils.Simulate.blur(instance.querySelector('input'));
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Radio onFocus={doneOp} />);
    ReactTestUtils.Simulate.focus(instance.querySelector('input'));
  });

  it('Should be checked with change', done => {
    const doneOp = checked => {
      if (checked === '100') {
        done();
      }
    };

    const instance = getDOMNode(
      <Radio onChange={doneOp} value="100">
        Title
      </Radio>
    );

    ReactTestUtils.Simulate.change(instance.querySelector('input'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Radio className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Radio style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Radio classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
