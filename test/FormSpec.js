import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import Form from '../src/Form';

describe('Form', () => {

  it('Should render a Form', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <Form>{title}</Form>
    );
    assert.equal(findDOMNode(instance).tagName, 'FORM');
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should be horizontal', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form horizontal />
    );
    assert.ok(findDOMNode(instance).className.match(/\bform-horizontal\b/));
  });

  it('Should be inline', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form inline />
    );
    assert.ok(findDOMNode(instance).className.match(/\bform-inline\b/));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Form style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
