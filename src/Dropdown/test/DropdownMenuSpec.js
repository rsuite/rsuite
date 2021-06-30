import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuItem from '../MenuItem';

describe('DropdownMenu', () => {
  it('Should render element with role="menu"', () => {
    const instance = getDOMNode(
      <DropdownMenu>
        <DropdownMenuItem>1</DropdownMenuItem>
        <DropdownMenuItem>2</DropdownMenuItem>
      </DropdownMenu>
    );

    assert.ok(instance.className.match(/\bdropdown-menu\b/));
    assert.equal(instance.getAttribute('role'), 'menu', 'role');
    assert.equal(instance.children.length, 2);
  });

  it('Should render a submenu', () => {
    const instance = getDOMNode(
      <DropdownMenu>
        <DropdownMenuItem>1</DropdownMenuItem>
        <DropdownMenu>
          <DropdownMenuItem>2</DropdownMenuItem>
          <DropdownMenuItem>3</DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenu>
    );

    assert.ok(instance.querySelector('.rs-dropdown-item-submenu'));
  });

  it('Should call onSelect callback with correct `eventKey`', done => {
    let doneOp = eventKey => {
      try {
        assert.equal(eventKey, 3, 'eventKey');
        done();
      } catch (err) {
        done(err);
      }
    };
    const instance = getDOMNode(
      <DropdownMenu onSelect={doneOp} activeKey={1}>
        <DropdownMenuItem eventKey={1}>1</DropdownMenuItem>
        <DropdownMenuItem eventKey={2}>2</DropdownMenuItem>
        <DropdownMenuItem eventKey={3}>3</DropdownMenuItem>
      </DropdownMenu>
    );

    ReactTestUtils.Simulate.click(instance.querySelectorAll('[role^="menuitem"]')[2]);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<DropdownMenu className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<DropdownMenu style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DropdownMenu classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
