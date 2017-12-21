import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import ControlLabel from '../src/ControlLabel';
import FormGroup from '../src/FormGroup';

describe('ControlLabel', () => {

  it('Should render a ControlLabel', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <ControlLabel>{title}</ControlLabel>
    );
    assert.ok(findDOMNode(instance).className.match(/\bcontrol-label\b/));
    assert.equal(findDOMNode(instance).innerHTML, title);
    assert.equal(findDOMNode(instance).tagName, 'LABEL');
  });

  it('Should have sr-only className', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <ControlLabel srOnly>{title}</ControlLabel>
    );
    assert.ok(findDOMNode(instance).className.match(/\bsr-only\b/));
  });

  it('Should have `for` in label when set controlId of FormGroup', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup controlId="test">
        <ControlLabel />
      </FormGroup>
    );
    assert.equal(findDOMNode(instance).children[0].getAttribute('for'), 'test');
  });


  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ControlLabel className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <ControlLabel style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
