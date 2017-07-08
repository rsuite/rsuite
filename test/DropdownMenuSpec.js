import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import DropdownMenu from '../src/DropdownMenu';
import DropdownMenuItem from '../src/DropdownMenuItem';

describe('DropdownMenu', () => {

  it('Should render a ul', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu>
        <DropdownMenuItem>1</DropdownMenuItem>
        <DropdownMenuItem>2</DropdownMenuItem>
      </DropdownMenu>
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'dropdown-menu');
    assert.equal(ReactDOM.findDOMNode(instance).tagName, 'UL');
    assert.equal(ReactDOM.findDOMNode(instance).children.length, 2);
  });

  it('Should have a `pull-right` className ', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu pullRight />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bdropdown-menu-right\b/));
  });

  it('Should be selected second option when activeKey = 2 ', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu activeKey={2}>
        <DropdownMenuItem eventKey={1}>1</DropdownMenuItem>
        <DropdownMenuItem eventKey={2}>2</DropdownMenuItem>
      </DropdownMenu>
    );
    assert.equal(ReactDOM.findDOMNode(instance).children[1].className, 'active');
  });

  it('Should call onSelect callback', (done) => {
    let doneOp = (eventKey) => {
      if (eventKey === 3) {
        done();
      }
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu onSelect={doneOp} activeKey={1}>
        <DropdownMenuItem eventKey={1}>1</DropdownMenuItem>
        <DropdownMenuItem eventKey={2}>2</DropdownMenuItem>
        <DropdownMenuItem eventKey={3}>3</DropdownMenuItem>
      </DropdownMenu>
    );

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance).querySelectorAll('a')[2]);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu className="custom" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu style={{ fontSize }} />
    );
    assert.equal(ReactDOM.findDOMNode(instance).style.fontSize, fontSize);
  });

});
