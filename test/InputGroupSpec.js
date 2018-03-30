import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import InputGroup from '../src/InputGroup';
import Input from '../src/Input';

describe('InputGroup', () => {
  it('Should render a container', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<InputGroup>{title}</InputGroup>);
    assert.equal(findDOMNode(instance).className, 'rs-input-group');
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should have a `input-group-inside` className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<InputGroup inside />);
    assert.include(findDOMNode(instance).className, 'rs-input-group-inside');
  });

  it('Should add size', () => {
    const instance = ReactTestUtils.renderIntoDocument(<InputGroup size="lg" />);
    assert.include(findDOMNode(instance).className, 'rs-input-group-lg');
  });

  it('Should have a children Element and className is `input-group-addon` ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <InputGroup>
        <InputGroup.Addon> @</InputGroup.Addon>
        <Input />
      </InputGroup>
    );
    assert.ok(findDOMNode(instance).querySelector('.rs-input-group-addon'));
  });

  it('Should have a children Element and className is `input-group-btn` ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <InputGroup>
        <Input />
        <InputGroup.Button>btn</InputGroup.Button>
      </InputGroup>
    );
    assert.ok(findDOMNode(instance).querySelector('.rs-input-group-btn'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<InputGroup className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<InputGroup style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
