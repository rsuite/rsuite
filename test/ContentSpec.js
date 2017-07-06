import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Content from '../src/Content';

describe('Content', () => {

  it('Should render a Content', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <Content>{title}</Content>
    );

    assert.equal(ReactDOM.findDOMNode(instance).className, 'content-wrapper');
    assert.equal(ReactDOM.findDOMNode(instance).children[0].className, 'content');
    assert.equal(ReactDOM.findDOMNode(instance).innerText, title);
  });

  it('Should render a Page Content', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <Content page>{title}</Content>
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'page-content-wrapper');
    assert.equal(ReactDOM.findDOMNode(instance).children[0].className, 'page-content');
  });


  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Content className="custom" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Content style={{ fontSize }} />
    );
    assert.equal(ReactDOM.findDOMNode(instance).style.fontSize, fontSize);
  });

});
