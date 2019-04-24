import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import RadioGroup from '../src/RadioGroup';
import Radio from '../src/Radio';

describe('RadioGroup', () => {
  it('Should render a radio group', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup>
        <Radio>Test1</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );
    assert.equal(findDOMNode(instance).querySelectorAll('.rs-radio').length, 2);
  });

  it('Should have a name in input', () => {
    const name = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup name={name}>
        <Radio>Test1</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );
    assert.equal(findDOMNode(instance).querySelectorAll('input[name="Test"]').length, 2);
  });

  it('Should have `radio-inline` className in radio', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup inline>
        <Radio>Test1</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );

    assert.ok(findDOMNode(instance).className.match(/\brs-radio-group-inline\b/));
    assert.equal(findDOMNode(instance).querySelectorAll('.rs-radio-inline').length, 2);
  });

  it('Should output a h1', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup inline>
        <h1>Group</h1>
        <Radio>Test1</Radio>
      </RadioGroup>
    );
    assert.ok(findDOMNode(instance).querySelectorAll('.h1'));
  });

  it('Should be checked when set value', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup value={2}>
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test2</Radio>
        <Radio value={4}>Test2</Radio>
      </RadioGroup>
    );
    const radios = findDOMNode(instance).querySelectorAll('.rs-radio');
    assert.ok(radios[1].className.match(/\bradio-checked\b/));
  });

  it('Should be checked when set defaultValue', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup defaultValue={2}>
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test2</Radio>
        <Radio>Test2</Radio>
      </RadioGroup>
    );
    const radios = findDOMNode(instance).querySelectorAll('.rs-radio');
    assert.ok(radios[1].className.match(/\bradio-checked\b/));
  });

  it('Should call onChange callback', done => {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup
        onChange={value => {
          if (value === 3) {
            done();
          }
        }}
      >
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test2</Radio>
        <Radio value={4}>Test2</Radio>
      </RadioGroup>
    );

    const radios = findDOMNode(instance).querySelectorAll('.rs-radio');
    ReactTestUtils.Simulate.change(radios[2].querySelector('input'));
  });

  it('Should call onChange callback', done => {
    let count = 0;

    function onDone() {
      count++;
      if (count === 2) {
        done();
      }
    }

    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup onChange={onDone}>
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3} onChange={onDone}>
          Test2
        </Radio>
        <Radio value={4}>Test2</Radio>
      </RadioGroup>
    );

    const radios = findDOMNode(instance).querySelectorAll('.rs-radio');
    ReactTestUtils.Simulate.change(radios[2].querySelector('input'));
  });

  it('Should call onChange callback and return correct parameters', done => {
    const instance = ReactTestUtils.renderIntoDocument(
      <RadioGroup
        name="test"
        onChange={(value, event) => {
          if (value === 3 && event.target.name === 'test') {
            done();
          }
        }}
      >
        <Radio value={1}>Test1</Radio>
        <Radio value={2}>Test2</Radio>
        <Radio value={3}>Test2</Radio>
        <Radio value={4}>Test2</Radio>
      </RadioGroup>
    );

    const radios = findDOMNode(instance).querySelectorAll('.rs-radio');
    ReactTestUtils.Simulate.change(radios[2].querySelector('input'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<RadioGroup className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<RadioGroup style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<RadioGroup classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });

  it('Should apply appearance', () => {
    const instance = ReactTestUtils.renderIntoDocument(<RadioGroup appearance="picker" />);

    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-radio-group-picker');
  });
});
