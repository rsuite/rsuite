import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Content from '../src/Content';
import innerText from './innerText';

describe('Content', () => {

  it('Should render a Content', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <Content>{title}</Content>
    );

    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.className, 'content-wrapper');
    assert.equal(instanceDOM.children[0].className, 'content');
    assert.equal(innerText(instanceDOM), title);
  });

  it('Should render a Page Content', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <Content page>{title}</Content>
    );
    assert.equal(findDOMNode(instance).className, 'page-content-wrapper');
    assert.equal(findDOMNode(instance).children[0].className, 'page-content');
  });


  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Content className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Content style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
