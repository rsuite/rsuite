import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import TestWrapper from './TestWrapper';
import Breadcrumb from '../src/Breadcrumb';

describe('Breadcrumb.Item', () => {
  it('Should render `a` as inner element when is not active', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>
      </TestWrapper>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.notInclude(findDOMNode(instance).className, 'breadcrumb-item-active');
  });

  it('Should render `span.active` with `active` attribute set.', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>
      </TestWrapper>
    );
    assert.include(findDOMNode(instance).className, 'breadcrumb-item-active');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span'));
  });

  it('Should render `span.active` when active and has href', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb.Item href="#" active>
          Active Crumb
        </Breadcrumb.Item>
      </TestWrapper>
    );

    assert.include(findDOMNode(instance).className, 'breadcrumb-item-active');

    const spanNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span');
    assert.ok(spanNode);
    assert.notOk(spanNode.hasAttribute('href'));

    assert.lengthOf(ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'a'), 0);
  });

  it('Should add custom classes onto `li` wrapper element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb.Item className="custom-one custom-two">Active Crumb</Breadcrumb.Item>
      </TestWrapper>
    );

    const classes = findDOMNode(instance).className;
    assert.include(classes, 'custom-one');
    assert.include(classes, 'custom-two');
  });

  it('Should spread additional props onto inner element', done => {
    const handleClick = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb.Item href="#" onClick={handleClick}>
          Crumb
        </Breadcrumb.Item>
      </TestWrapper>
    );

    const anchorNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    ReactTestUtils.Simulate.click(anchorNode);
  });

  it('Should apply id onto the anchor', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb.Item href="#" id="test-link-id">
          Crumb
        </Breadcrumb.Item>
      </TestWrapper>
    );

    const linkNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(linkNode.id, 'test-link-id');
  });

  it('Should apply `href` property onto `a` inner element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb.Item href="http://rsuitejs.com/">Crumb</Breadcrumb.Item>
      </TestWrapper>
    );

    const linkNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(linkNode.href, 'http://rsuitejs.com/');
  });

  it('Should apply `title` property onto `a` inner element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb.Item title="test-title" href="http://rsuitejs.com/">
          Crumb
        </Breadcrumb.Item>
      </TestWrapper>
    );

    const linkNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(linkNode.title, 'test-title');
  });

  it('Should not apply properties for inner `anchor` onto `li` wrapper element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb.Item title="test-title" href="/hi">
          Crumb
        </Breadcrumb.Item>
      </TestWrapper>
    );

    const liNode = findDOMNode(instance);
    assert.notOk(liNode.hasAttribute('href'));
    assert.notOk(liNode.hasAttribute('title'));
  });

  it('Should set `target` attribute on `anchor`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb.Item target="_blank" href="http://rsuitejs.com/">
          Crumb
        </Breadcrumb.Item>
      </TestWrapper>
    );

    const linkNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(linkNode.target, '_blank');
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb.Item className="custom" />
      </TestWrapper>
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb.Item style={{ fontSize }} />
      </TestWrapper>
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
