import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import DropdownMenuItem from '../src/DropdownMenuItem';

describe('DropdownMenuItem', () => {

  it('Should render a li', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem>{title}</DropdownMenuItem>
    );
    assert.equal(findDOMNode(instance).tagName, 'LI');
    assert.equal(findDOMNode(instance).innerText, title);

  });

  it('Should render a Button', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem componentClass="button">{title}</DropdownMenuItem>
    );
    assert.equal(findDOMNode(instance).children[0].tagName, 'BUTTON');
    assert.equal(findDOMNode(instance).innerText, title);

  });

  it('Should render a divider', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem divider />
    );
    assert.equal(findDOMNode(instance).className, 'divider');

  });

  it('Should be active', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem active />
    );
    assert.ok(findDOMNode(instance).className.match(/\bactive\b/));

  });

  it('Should be disabled', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem disabled />
    );
    assert.ok(findDOMNode(instance).className.match(/\bdisabled\b/));

  });

  it('Should call onSelect callback', (done) => {
    let doneOp = (eventKey) => {
      if (eventKey === 'ABC') {
        done();
      }
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem onSelect={doneOp} eventKey="ABC">
        Title
      </DropdownMenuItem>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).children[0]);
  });


  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
