import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { innerText, getDOMNode } from '@test/testUtils';

import DropdownMenuItem from '../MenuItem';
import Sidenav from '../../Sidenav';
import User from '@rsuite/icons/legacy/User';

describe('DropdownMenuItem', () => {
  it('Should render element with role="menuitem"', () => {
    const title = 'Test';
    const instance = getDOMNode(<DropdownMenuItem>{title}</DropdownMenuItem>);

    assert.equal(instance.getAttribute('role'), 'menuitem', 'role');
    assert.equal(innerText(instance), title);
  });

  it('Should render a <a>', () => {
    const title = 'Test';
    const instance = getDOMNode(<DropdownMenuItem as="a">{title}</DropdownMenuItem>);
    assert.equal(instance.tagName, 'A');
    assert.equal(innerText(instance), title);
  });

  it('Should render a divider', () => {
    const instance = getDOMNode(<DropdownMenuItem divider />);
    assert.include(instance.className, 'rs-dropdown-item-divider');
  });

  it('Should render a panel', () => {
    const instance = getDOMNode(<DropdownMenuItem panel />);
    assert.include(instance.className, 'rs-dropdown-item-panel');
  });

  it('Should be active', () => {
    const instance = getDOMNode(<DropdownMenuItem active />);
    assert.include(instance.className, 'rs-dropdown-item-active');
  });

  it('Should render menuitem that controls submenu given `submenu`', () => {
    const instance = getDOMNode(<DropdownMenuItem submenu={<ul></ul>} />);
    assert.include(['true', 'menu'], instance.getAttribute('aria-haspopup'));
  });

  it('Should be expanded in `Sidenav`', () => {
    const instance = getDOMNode(
      <Sidenav>
        <DropdownMenuItem expanded submenu={<ul></ul>} />
      </Sidenav>
    );
    const Item = instance.querySelector('.rs-dropdown-item');
    assert.include(Item.className, 'rs-dropdown-item-expand');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<DropdownMenuItem disabled />);
    assert.include(instance.className, 'rs-dropdown-item-disabled');
  });

  it('Should render a icon', () => {
    const instance = getDOMNode(<DropdownMenuItem icon={<User />} />);
    assert.ok(instance.querySelector('.rs-icon'));
  });

  it('Should call onSelect callback', done => {
    const doneOp = eventKey => {
      if (eventKey === 'ABC') {
        done();
      }
    };
    const instance = getDOMNode(
      <DropdownMenuItem onSelect={doneOp} eventKey="ABC">
        Title
      </DropdownMenuItem>
    );
    ReactTestUtils.Simulate.click(instance);
  });

  it('Should call onClick callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<DropdownMenuItem onClick={doneOp}>Title</DropdownMenuItem>);
    ReactTestUtils.Simulate.click(instance);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<DropdownMenuItem className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<DropdownMenuItem style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should accept a custom `id`', () => {
    const menuitem = getDOMNode(<DropdownMenuItem id="custom-id">Menu item</DropdownMenuItem>);
    assert.equal(menuitem.getAttribute('id'), 'custom-id', 'id');
  });
});
