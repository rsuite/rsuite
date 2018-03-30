import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import ErrorMessage from '../src/ErrorMessage';
import innerText from './innerText';

describe('ErrorMessage', () => {
  it('Should render a ErrorMessage', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<ErrorMessage>{title}</ErrorMessage>);
    assert.include(findDOMNode(instance).className, 'rs-error-message-wrapper');
    assert.equal(innerText(findDOMNode(instance)), title);
  });

  it('Should be show', () => {
    const instance = ReactTestUtils.renderIntoDocument(<ErrorMessage show />);
    assert.ok(findDOMNode(instance).querySelector('.rs-error-message.rs-error-message-show'));
  });

  it('Should hava a `bottomLeft` for placement', () => {
    const instance = ReactTestUtils.renderIntoDocument(<ErrorMessage placement="bottomLeft" />);
    assert.include(findDOMNode(instance).className, 'rs-error-message-placement-bottom-left');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<ErrorMessage className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<ErrorMessage style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
