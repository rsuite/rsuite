import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import IconButton from '../src/IconButton';
import Icon from '../src/Icon';

describe('IconButton', () => {
  it('Should output a button', () => {
    const instance = ReactTestUtils.renderIntoDocument(<IconButton />);
    assert.include(findDOMNode(instance).className, 'rs-btn-icon');
    assert.equal(findDOMNode(instance).nodeName, 'BUTTON');
  });

  it('Should output a icon', () => {
    const instance = ReactTestUtils.renderIntoDocument(<IconButton icon={<Icon icon="user" />} />);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'i'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <IconButton icon="star" className="custom" />
    );
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {

    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <IconButton icon="star" style={{ fontSize }} />
    );

    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
