import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import FormGroup from '../src/FormGroup';

describe('FormGroup', () => {

  it('Should render a FormGroup', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup>{title}</FormGroup>
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'form-group');
    assert.equal(ReactDOM.findDOMNode(instance).innerHTML, title);
  });

  it('Should have a validation State', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup validationState="warning" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bhas-warning\b/));
  });

  it('Should have a warning State', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup validationState="warning" isValid />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bhas-warning\b/));
    assert.ok(!ReactDOM.findDOMNode(instance).className.match(/\bhas-success\b/));
  });

  it('Should have a warning State', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup validationState="warning" isValid={false} />
    );

    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bhas-warning\b/));
    assert.ok(!ReactDOM.findDOMNode(instance).className.match(/\bhas-error\b/));
  });

  it('Should have a error State', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup isValid={false} />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bhas-error\b/));
  });

  it('Should have a success State', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup isValid />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bhas-success\b/));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup className="custom" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup style={{ fontSize }} />
    );
    assert.equal(ReactDOM.findDOMNode(instance).style.fontSize, fontSize);
  });

});
