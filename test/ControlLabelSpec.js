import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import ControlLabel from '../src/ControlLabel';
import FormGroup from '../src/FormGroup';

describe('ControlLabel', () => {

  it('Should render a ControlLabel', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <ControlLabel>{title}</ControlLabel>
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'control-label');
    assert.equal(ReactDOM.findDOMNode(instance).innerHTML, title);
  });

  it('Should have sr-only className', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <ControlLabel srOnly>{title}</ControlLabel>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bsr-only\b/));
  });

  it('Should have `for` in label when set controlId of FormGroup', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup controlId="test">
        <ControlLabel srOnly />
      </FormGroup>
    );
    assert.equal(ReactDOM.findDOMNode(instance).children[0].getAttribute('for'), 'test');
  });

  it('Should have `for` in label ', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <ControlLabel srOnly>{title}</ControlLabel>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bsr-only\b/));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ControlLabel className="custom" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <ControlLabel style={{ fontSize }} />
    );
    assert.equal(ReactDOM.findDOMNode(instance).style.fontSize, fontSize);
  });

});
