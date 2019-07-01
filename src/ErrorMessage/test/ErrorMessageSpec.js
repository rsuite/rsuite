import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import ErrorMessage from '../ErrorMessage';
import { innerText } from '@test/testUtils';

describe('ErrorMessage', () => {
  it('Should render a ErrorMessage', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<ErrorMessage show>{title}</ErrorMessage>);
    assert.include(findDOMNode(instance).className, 'rs-error-message-wrapper');
    assert.equal(innerText(findDOMNode(instance)), title);
  });

  it('Should be show', () => {
    const instance = ReactTestUtils.renderIntoDocument(<ErrorMessage show />);
    assert.ok(findDOMNode(instance).querySelector('.rs-error-message.rs-error-message-show'));
  });

  it('Should be hide', () => {
    const instance = ReactTestUtils.renderIntoDocument(<ErrorMessage show={false} />);
    assert.equal(findDOMNode(instance), null);
  });

  it('Should hava a `bottomStart` for placement', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ErrorMessage show placement="bottomStart" />
    );
    assert.include(findDOMNode(instance).className, 'rs-error-message-placement-bottom-start');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<ErrorMessage show className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<ErrorMessage show style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <ErrorMessage show classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
