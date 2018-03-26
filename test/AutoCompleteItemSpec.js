import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import TestWrapper from './TestWrapper';
import AutoCompleteItem from '../src/AutoCompleteItem';

describe('AutoCompleteItem', () => {
  it('Should render `a` as inner element when is not active', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <AutoCompleteItem value="1">Crumb</AutoCompleteItem>
      </TestWrapper>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.notInclude(findDOMNode(instance).className, 'breadcrumb-item-active');
  });

  it('Should be focus', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <AutoCompleteItem value="1" focus />
      </TestWrapper>
    );

    let classes = findDOMNode(instance).childNodes[0].className;
    assert.include(classes, 'rs-auto-complete-item-focus');
  });

  it('Should call onSelect callback', done => {
    let doneOp = value => {
      if (value === '1') {
        done();
      }
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <AutoCompleteItem value="1" focus onSelect={doneOp} />
      </TestWrapper>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).childNodes[0]);
  });

  it('Should call onKeyDown callback', done => {
    let doneOp = () => {
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <AutoCompleteItem value="1" focus onKeyDown={doneOp} />
      </TestWrapper>
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(instance).childNodes[0]);
  });

  it('Should render a icon in li', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <AutoCompleteItem value="1" renderItem={() => <i className="icon" />} />
      </TestWrapper>
    );
    let className = findDOMNode(instance).childNodes[0].childNodes[0].className;
    assert.equal(className, 'icon');
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <AutoCompleteItem value="1" className="custom" />
      </TestWrapper>
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <AutoCompleteItem value="1" style={{ fontSize }} />
      </TestWrapper>
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
