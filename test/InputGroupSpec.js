import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import InputGroup from '../src/InputGroup';
import FormControl from '../src/FormControl';
import { globalKey } from '../src/utils/prefix';

describe('InputGroup', () => {

  it('Should render a container', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <InputGroup>{title}</InputGroup>
    );
    assert.equal(findDOMNode(instance).className, `${globalKey}input-group`);
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should have a `input-group-inside` className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <InputGroup inside />
    );
    assert.ok(findDOMNode(instance).className.match(/\binput-group-inside\b/));
  });

  it('Should add size', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <InputGroup size="lg" />
    );
    assert.ok(findDOMNode(instance).className.match(/\binput-group-lg\b/));
  });

  it('Should have a children Element and className is `input-group-addon` ', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <InputGroup>
        <InputGroup.Addon> @</InputGroup.Addon>
        <FormControl />
      </InputGroup>
    );
    assert.ok(findDOMNode(instance).querySelector(`.${globalKey}input-group-addon`));
  });

  it('Should have a children Element and className is `input-group-btn` ', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <InputGroup>
        <FormControl />
        <InputGroup.Button>btn</InputGroup.Button>
      </InputGroup>
    );
    assert.ok(findDOMNode(instance).querySelector(`.${globalKey}input-group-btn`));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <InputGroup className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <InputGroup style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
