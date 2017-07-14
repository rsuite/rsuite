import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import Text from '../src/Text';

describe('Text', () => {

  it('Should render a `p`', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <Text>{title}</Text>
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.tagName, 'P');
  });

  it('Should render a `span`', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <Text componentClass="span">{title}</Text>
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.tagName, 'SPAN');
  });


  it('Should have a `bg-primary` classNmae', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <Text bg shape="primary" >{title}</Text>
    );
    const instanceDom = findDOMNode(instance);
    assert.ok(findDOMNode(instance).className.match(/\bbg-primary\b/));
  });

  it('Should have a `text-primary` classNmae', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <Text shape="primary" >{title}</Text>
    );
    const instanceDom = findDOMNode(instance);
    assert.ok(findDOMNode(instance).className.match(/\btext-primary\b/));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Text className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Text style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
