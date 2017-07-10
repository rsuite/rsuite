import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import CheckboxGroup from '../src/CheckboxGroup';
import Checkbox from '../src/Checkbox';

describe('CheckboxGroup', () => {
  it('Should render a checkbox group', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup>
        <Checkbox>Test1</Checkbox>
        <Checkbox>Test2</Checkbox>
      </CheckboxGroup>
    );
    assert.equal(findDOMNode(instance).querySelectorAll('.checkbox').length, 2);
  });

  it('Should have a name in input', () => {
    let name = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup name={name}>
        <Checkbox>Test1</Checkbox>
        <Checkbox>Test2</Checkbox>
      </CheckboxGroup>
    );
    assert.equal(findDOMNode(instance).querySelectorAll('input[name="Test"]').length, 2);
  });

  it('Should have `checkbox-inline` className in checkbox', () => {

    let instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup inline>
        <Checkbox>Test1</Checkbox>
        <Checkbox>Test2</Checkbox>
      </CheckboxGroup>
    );
    assert.equal(findDOMNode(instance).querySelectorAll('.checkbox-inline').length, 2);

  });

  it('Should be checked when set value', () => {

    let instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup value={[2, 4, '1']} >
        <Checkbox value={1}>Test1</Checkbox>
        <Checkbox value={2}>Test2</Checkbox>
        <Checkbox value={3}>Test2</Checkbox>
        <Checkbox value={4}>Test2</Checkbox>
      </CheckboxGroup>
    );

    let checkboxs = findDOMNode(instance).querySelectorAll('.checkbox');
    assert.ok(!checkboxs[0].querySelector('.checked'));
    assert.ok(!checkboxs[2].querySelector('.checked'));
    assert.ok(checkboxs[1].querySelector('.checked'));
    assert.ok(checkboxs[3].querySelector('.checked'));
  });

  it('Should be checked when set defaultValue', () => {

    let instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup defaultValue={[2, 4, '1']} >
        <Checkbox value={1}>Test1</Checkbox>
        <Checkbox value={2}>Test2</Checkbox>
        <Checkbox value={3}>Test2</Checkbox>
        <Checkbox value={4}>Test2</Checkbox>
      </CheckboxGroup>
    );

    let checkboxs = findDOMNode(instance).querySelectorAll('.checkbox');
    assert.ok(!checkboxs[0].querySelector('.checked'));
    assert.ok(!checkboxs[2].querySelector('.checked'));
    assert.ok(checkboxs[1].querySelector('.checked'));
    assert.ok(checkboxs[3].querySelector('.checked'));
  });


  it('Should call onChange callback', (done) => {

    let instance = ReactTestUtils.renderIntoDocument(
      <CheckboxGroup
        onChange={(value) => {
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

    let checkboxs = findDOMNode(instance).querySelectorAll('.checkbox');
    ReactTestUtils.Simulate.change(checkboxs[2].querySelector('input'));
  });



});
