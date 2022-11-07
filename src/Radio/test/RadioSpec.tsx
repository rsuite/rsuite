import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Radio from '../Radio';

describe('Radio', () => {
  testStandardProps(<Radio />);

  it('Should render a radio', () => {
    const instance = getDOMNode(<Radio>Test</Radio>);
    assert.equal(instance.querySelectorAll('input[type="radio"]').length, 1);
  });

  it('Should add title', () => {
    const title = 'Text';
    const instance = getDOMNode(<Radio title={title}>Test</Radio>);
    assert.equal((instance.querySelector('label') as HTMLLabelElement).title, title);
  });

  it('Should have radio-inline class', () => {
    const instance = getDOMNode(<Radio inline>Test</Radio>);
    assert.ok(instance.className.match(/\bradio-inline\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Radio disabled>Test</Radio>);
    assert.ok((instance.querySelector('input') as HTMLInputElement).disabled);
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

    assert.equal((instance.querySelector('input') as HTMLInputElement).value, value);
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
    ReactTestUtils.Simulate.click(instance.querySelector('label') as HTMLLabelElement);
  });

  it('Should call onChange callback with correct value', done => {
    const value = 'Test';
    const doneOp = data => {
      try {
        assert.equal(data, value);
        done();
      } catch (err) {
        done(err);
      }
    };

    const instance = getDOMNode(
      <Radio onChange={doneOp} value={value}>
        Title
      </Radio>
    );
    ReactTestUtils.Simulate.change(instance.querySelector('input') as HTMLInputElement);
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Radio onBlur={doneOp} />);
    ReactTestUtils.Simulate.blur(instance.querySelector('input') as HTMLInputElement);
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Radio onFocus={doneOp} />);
    ReactTestUtils.Simulate.focus(instance.querySelector('input') as HTMLInputElement);
  });

  it('Should be checked with change', done => {
    const doneOp = checked => {
      try {
        assert.equal(checked, '100');
        done();
      } catch (err) {
        done(err);
      }
    };

    const instance = getDOMNode(
      <Radio onChange={doneOp} value="100">
        Title
      </Radio>
    );

    ReactTestUtils.Simulate.change(instance.querySelector('input') as HTMLInputElement);
  });
});
