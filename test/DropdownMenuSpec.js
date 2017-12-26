import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import DropdownMenu from '../src/DropdownMenu';
import DropdownMenuItem from '../src/DropdownMenuItem';

describe('DropdownMenu', () => {

  it('Should render a ul', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu>
        <DropdownMenuItem>1</DropdownMenuItem>
        <DropdownMenuItem>2</DropdownMenuItem>
      </DropdownMenu>
    );
    assert.ok(findDOMNode(instance).className.match(/\bdropdown-menu\b/));
    assert.equal(findDOMNode(instance).tagName, 'UL');
    assert.equal(findDOMNode(instance).children.length, 2);
  });

  it('Should have a `pull-right` className ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu pullRight />
    );
    assert.ok(findDOMNode(instance).className.match(/\bdropdown-menu-right\b/));
  });


  it('Should call onSelect callback', (done) => {
    let doneOp = (eventKey) => {
      if (eventKey === 3) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu onSelect={doneOp} activeKey={1}>
        <DropdownMenuItem eventKey={1}>1</DropdownMenuItem>
        <DropdownMenuItem eventKey={2}>2</DropdownMenuItem>
        <DropdownMenuItem eventKey={3}>3</DropdownMenuItem>
      </DropdownMenu>
    );

    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelectorAll('a')[2]);
  });

  it('Should call onSelect callback', (done) => {
    let doneOp = (eventKey) => {
      if (eventKey === 3) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu activeKey={1}>
        <DropdownMenuItem eventKey={1}>1</DropdownMenuItem>
        <DropdownMenuItem eventKey={2}>2</DropdownMenuItem>
        <DropdownMenuItem eventKey={3} onSelect={doneOp}>3</DropdownMenuItem>
      </DropdownMenu>
    );

    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelectorAll('a')[2]);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
