import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import FormGroup from '../src/FormGroup';
import { globalKey } from '../src/utils/prefix';

describe('FormGroup', () => {

  it('Should render a FormGroup', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup>{title}</FormGroup>
    );
    assert.equal(findDOMNode(instance).className, `${globalKey}form-group`);
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should have a validation State', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup validationState="warning" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bhas-warning\b/));
  });

  it('Should have a warning State', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup validationState="warning" isValid />
    );
    assert.ok(findDOMNode(instance).className.match(/\bhas-warning\b/));
    assert.ok(!findDOMNode(instance).className.match(/\bhas-success\b/));
  });

  it('Should have a warning State', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup validationState="warning" isValid={false} />
    );

    assert.ok(findDOMNode(instance).className.match(/\bhas-warning\b/));
    assert.ok(!findDOMNode(instance).className.match(/\bhas-error\b/));
  });

  it('Should have a error State', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup isValid={false} />
    );
    assert.ok(findDOMNode(instance).className.match(/\bhas-error\b/));
  });

  it('Should have a success State', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup isValid />
    );
    assert.ok(findDOMNode(instance).className.match(/\bhas-success\b/));
  });


  it('Should add size', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup size="lg" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bform-group-lg\b/));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
