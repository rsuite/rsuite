import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Message from '../src/Message';
import { globalKey } from '../src/utils/prefix';

describe('Message', () => {

  it('Should render a Message', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Message />
    );
    assert.ok(findDOMNode(instance).className.match(/\bmessage\b/));
  });

  it('Should render a title', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Message title="title" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bmessage-has-title\b/));
    assert.equal(findDOMNode(instance).innerText, 'title');
  });


  it('Should render a description', () => {

    let instance = ReactTestUtils.renderIntoDocument(
      <Message description="description" />
    );
    assert.equal(findDOMNode(instance).innerText, 'description');
  });

  it('Should have a type', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Message type="info" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bmessage-info\b/));
  });

  it('Should display icon', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Message showIcon type="info" />
    );
    assert.ok(findDOMNode(instance).querySelector('i.icon'));
    assert.ok(findDOMNode(instance).className.match(/\bmessage-has-icon\b/));
  });

  it('Should be full', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Message full />
    );
    assert.ok(findDOMNode(instance).className.match(/\bmessage-full\b/));
  });

  it('Should be closable', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Message closable />
    );
    assert.ok(findDOMNode(instance).querySelector(`.${globalKey}message-btn-close`));
  });


  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Message className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Message style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
