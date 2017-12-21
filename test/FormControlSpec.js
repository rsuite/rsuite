import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import FormGroup from '../src/FormGroup';
import FormControl from '../src/FormControl';
import { globalKey } from '../src/utils/prefix';

describe('FormControl', () => {

  it('Should render a Input', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormControl />
    );
    assert.equal(findDOMNode(instance).tagName, 'INPUT');
    assert.equal(findDOMNode(instance).className, `${globalKey}form-control`);
  });

  it('Should render a Textearea', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormControl componentClass="textarea" />
    );
    assert.equal(findDOMNode(instance).tagName, 'TEXTAREA');
    assert.equal(findDOMNode(instance).className, `${globalKey}form-control`);
  });

  it('Should render a file Input', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormControl type="file" />
    );
    assert.equal(findDOMNode(instance).type, 'file');
    assert.equal(findDOMNode(instance).className, '');
  });

  it('Should render a Select', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormControl componentClass="select" >
        <option>1</option>
        <option>2</option>
      </FormControl>
    );
    assert.equal(findDOMNode(instance).tagName, 'SELECT');
    assert.equal(findDOMNode(instance).className, `${globalKey}form-control`);
  });

  it('Should have a type', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormControl type="number" />
    );
    assert.equal(findDOMNode(instance).type, 'number');
  });

  it('Should have a id', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormControl id="input" />
    );
    assert.equal(findDOMNode(instance).id, 'input');
  });

  it('Should have a id when set controlId of FormGroup', () => {
    let id = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup controlId={id}>
        <FormControl />
      </FormGroup>
    );
    assert.equal(findDOMNode(instance).querySelector('input').id, id);
  });

  it('Should support inputRef', () => {
    let input;
    let instance = ReactTestUtils.renderIntoDocument(
      <FormControl inputRef={ref => input = ref} />
    );
    assert.ok(input);
  });

  it('Should add size', () => {

    let instance = ReactTestUtils.renderIntoDocument(
      <FormControl size="lg" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bform-control-lg\b/));
  });

  it('Should call onChange callback', (done) => {
    let doneOp = (value) => {
      if (value === "1") {
        done();
      }
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <FormControl onChange={doneOp} value={1} />
    );
    ReactTestUtils.Simulate.change(findDOMNode(instance));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormControl className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <FormControl style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
