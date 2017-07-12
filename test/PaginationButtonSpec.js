import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import PaginationButton from '../src/PaginationButton';

describe('PaginationButton', () => {

  it('Should render a li', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationButton>{title}</PaginationButton>
    );
    assert.equal(findDOMNode(instance).tagName, 'LI');
    assert.equal(findDOMNode(instance).innerText, title);
  });

  it('Should be disabled', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationButton disabled />
    );
    assert.ok(findDOMNode(instance).className.match(/\bdisabled\b/));
  });

  it('Should be active', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationButton active />
    );
    assert.ok(findDOMNode(instance).className.match(/\bactive\b/));
  });

  it('Should call onSelect callback', (done) => {
    const doneOp = (eventKey) => {
      if (eventKey === 10) {
        done();
      }
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationButton onSelect={doneOp} eventKey={10} />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('a'));
  });

  it('Should call onClick callback', (done) => {
    const doneOp = (eventKey) => {
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationButton onClick={doneOp} eventKey={10} />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('a'));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationButton className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <PaginationButton style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
