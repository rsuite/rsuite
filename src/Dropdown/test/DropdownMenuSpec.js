import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import Sidenav from '../../Sidenav';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuItem from '../DropdownMenuItem';

describe('DropdownMenu', () => {
  it('Should render a ul', () => {
    const instance = getDOMNode(
      <DropdownMenu>
        <DropdownMenuItem>1</DropdownMenuItem>
        <DropdownMenuItem>2</DropdownMenuItem>
      </DropdownMenu>
    );

    assert.ok(instance.className.match(/\bdropdown-menu\b/));
    assert.equal(instance.tagName, 'UL');
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

  it('Should be expanded when set openKeys in submenu', () => {
    const instance = getDOMNode(
      <Sidenav>
        <DropdownMenu openKeys={['2']}>
          <DropdownMenu eventKey="2">
            <DropdownMenuItem>2.1</DropdownMenuItem>
            <DropdownMenuItem>2.2</DropdownMenuItem>
          </DropdownMenu>
        </DropdownMenu>
      </Sidenav>
    );

    assert.ok(instance.querySelector('.rs-dropdown-item-submenu.rs-dropdown-item-expand'));
  });

  it('Should be open when set `open` in submenu', () => {
    const instance = getDOMNode(
      <DropdownMenu>
        <DropdownMenu open>
          <DropdownMenuItem>2.1</DropdownMenuItem>
          <DropdownMenuItem>2.2</DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenu>
    );

    assert.ok(instance.querySelector('.rs-dropdown-item-submenu.rs-dropdown-item-open'));
  });

  it('Should be active when set `activeKey` in submenu', () => {
    const instance = getDOMNode(
      <DropdownMenu activeKey={'2'}>
        <DropdownMenu eventKey={'2'}>
          <DropdownMenuItem>2.1</DropdownMenuItem>
          <DropdownMenuItem>2.2</DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenu>
    );

    assert.ok(instance.querySelector('.rs-dropdown-item-submenu.rs-dropdown-menu-item-focus'));
  });

  it('Should be pull left', () => {
    const instance = getDOMNode(
      <DropdownMenu>
        <DropdownMenu pullLeft>
          <DropdownMenuItem>2.1</DropdownMenuItem>
          <DropdownMenuItem>2.2</DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenu>
    );

    assert.ok(instance.querySelector('.rs-dropdown-menu-pull-left.rs-dropdown-item-pull-left'));
  });

  it('Should call onSelect callback', done => {
    let doneOp = eventKey => {
      if (eventKey === 3) {
        done();
      }
    };
    const instance = getDOMNode(
      <DropdownMenu onSelect={doneOp} activeKey={1}>
        <DropdownMenuItem eventKey={1}>1</DropdownMenuItem>
        <DropdownMenuItem eventKey={2}>2</DropdownMenuItem>
        <DropdownMenuItem eventKey={3}>3</DropdownMenuItem>
      </DropdownMenu>
    );

    ReactTestUtils.Simulate.click(instance.querySelectorAll('a')[2]);
  });

  it('Should call onSelect callback', done => {
    let doneOp = eventKey => {
      if (eventKey === 3) {
        done();
      }
    };
    const instance = getDOMNode(
      <DropdownMenu activeKey={1}>
        <DropdownMenuItem eventKey={1}>1</DropdownMenuItem>
        <DropdownMenuItem eventKey={2}>2</DropdownMenuItem>
        <DropdownMenuItem eventKey={3} onSelect={doneOp}>
          3
        </DropdownMenuItem>
      </DropdownMenu>
    );

    ReactTestUtils.Simulate.click(instance.querySelectorAll('a')[2]);
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
