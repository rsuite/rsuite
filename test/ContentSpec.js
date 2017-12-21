import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Content from '../src/Content';
import innerText from './innerText';
import { globalKey } from '../src/utils/prefix';


describe('Content', () => {

  it('Should render a Content', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <Content>{title}</Content>
    );

    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.className, `${globalKey}content-wrapper`);
    assert.equal(instanceDOM.children[0].className, `${globalKey}content`);
    assert.equal(innerText(instanceDOM), title);
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
