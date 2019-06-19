import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import CheckboxGroup from '../CheckboxGroup';
import Checkbox from '../../Checkbox';
import { globalKey } from '../../utils/prefix';

describe('CheckboxGroup', () => {
  it('Should render a checkbox group', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup>
        <Checkbox>Test1</Checkbox>
        <Checkbox>Test2</Checkbox>
      </CheckboxGroup>
    );
    assert.equal(findDOMNode(instance).querySelectorAll(`.${globalKey}checkbox`).length, 2);
  });

  it('Should have a name in input', () => {
    const name = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup name={name}>
        <Checkbox>Test1</Checkbox>
        <Checkbox>Test2</Checkbox>
      </CheckboxGroup>
    );
    assert.equal(findDOMNode(instance).querySelectorAll('input[name="Test"]').length, 2);
  });

  it('Should have `checkbox-inline` className in checkbox', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup inline>
        <Checkbox>Test1</Checkbox>
        <Checkbox>Test2</Checkbox>
      </CheckboxGroup>
    );
    assert.equal(findDOMNode(instance).querySelectorAll(`.${globalKey}checkbox-inline`).length, 2);
  });

  it('Should output a h1', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup inline>
        <h1>Group</h1>
        <Checkbox>Test1</Checkbox>
      </CheckboxGroup>
    );
    assert.ok(findDOMNode(instance).querySelectorAll('.h1'));
  });

  it('Should be checked when set value', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup value={[2, 4, '1']}>
        <Checkbox value={1}>Test1</Checkbox>
        <Checkbox value={2}>Test2</Checkbox>
        <Checkbox value={3}>Test2</Checkbox>
        <Checkbox value={4}>Test2</Checkbox>
      </CheckboxGroup>
    );

    const checkboxs = findDOMNode(instance).querySelectorAll(`.${globalKey}checkbox`);
    const checked = /\bcheckbox-checked\b/;
    assert.ok(!checkboxs[0].className.match(checked));
    assert.ok(!checkboxs[2].className.match(checked));
    assert.ok(checkboxs[1].className.match(checked));
    assert.ok(checkboxs[3].className.match(checked));
  });

  it('Should be checked when set defaultValue', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup defaultValue={[2, 4, '1']}>
        <Checkbox value={1}>Test1</Checkbox>
        <Checkbox value={2}>Test2</Checkbox>
        <Checkbox value={3}>Test2</Checkbox>
        <Checkbox value={4}>Test2</Checkbox>
      </CheckboxGroup>
    );

    const checkboxs = findDOMNode(instance).querySelectorAll(`.${globalKey}checkbox`);
    const checked = /\bcheckbox-checked\b/;
    assert.ok(!checkboxs[0].className.match(checked));
    assert.ok(!checkboxs[2].className.match(checked));
    assert.ok(checkboxs[1].className.match(checked));
    assert.ok(checkboxs[3].className.match(checked));
  });

  it('Should call onChange callback', done => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup
        onChange={value => {
          if (value.length === 1 && value[0] === 3) {
            done();
          }
        }}
      >
        <Checkbox value={1}>Test1</Checkbox>
        <Checkbox value={2}>Test2</Checkbox>
        <Checkbox value={3}>Test2</Checkbox>
        <Checkbox value={4}>Test2</Checkbox>
      </CheckboxGroup>
    );

    const checkboxs = findDOMNode(instance).querySelectorAll(`.${globalKey}checkbox`);
    ReactTestUtils.Simulate.change(checkboxs[2].querySelector('input'));
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
      <CheckboxGroup onChange={onDone}>
        <Checkbox value={1}>Test1</Checkbox>
        <Checkbox value={2}>Test2</Checkbox>
        <Checkbox value={3} onChange={onDone}>
          Test2
        </Checkbox>
        <Checkbox value={4}>Test2</Checkbox>
      </CheckboxGroup>
    );

    const checkboxs = findDOMNode(instance).querySelectorAll(`.${globalKey}checkbox`);
    ReactTestUtils.Simulate.change(checkboxs[2].querySelector('input'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<CheckboxGroup className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<CheckboxGroup style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
