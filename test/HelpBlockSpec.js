import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import HelpBlock from '../src/HelpBlock';
import FormGroup from '../src/FormGroup';

describe('HelpBlock', () => {

  it('Should render a HelpBlock', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <HelpBlock>{title}</HelpBlock>
    );
    assert.equal(findDOMNode(instance).className, 'help-block');
    assert.equal(findDOMNode(instance).tagName, 'SPAN');
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should render a warning `HelpBlock`', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <HelpBlock shape="warning">{title}</HelpBlock>
    );
    assert.ok(findDOMNode(instance).className.match(/\bhelp-block-warning\b/));
  });

  it('Should have `for` in span when set controlId of FormGroup', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <FormGroup controlId="test">
        <HelpBlock />
      </FormGroup>
    );
    assert.equal(findDOMNode(instance).children[0].getAttribute('for'), 'test');
  });

  it('Should have `for` in span ', () => {
    let id = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <HelpBlock htmlFor={id} />
    );
    assert.ok(findDOMNode(instance).getAttribute('for'), id);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <HelpBlock className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <HelpBlock style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
