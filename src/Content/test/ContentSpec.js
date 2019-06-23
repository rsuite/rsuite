import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Content from '../Content';
import { innerText } from '@test/testUtils';

describe('Content', () => {
  it('Should render a Content', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<Content>{title}</Content>);

    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.className, 'rs-content');
    assert.equal(innerText(instanceDOM), title);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Content className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Content style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Content classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
