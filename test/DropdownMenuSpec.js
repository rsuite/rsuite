import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Sidenav from '../src/Sidenav';
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

    const node = findDOMNode(instance);
    assert.ok(node.className.match(/\bdropdown-menu\b/));
    assert.equal(node.tagName, 'UL');
    assert.equal(node.children.length, 2);
  });

  it('Should render a submenu', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu>
        <DropdownMenuItem>1</DropdownMenuItem>
        <DropdownMenu>
          <DropdownMenuItem>2</DropdownMenuItem>
          <DropdownMenuItem>3</DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenu>
    );
    const node = findDOMNode(instance);
    assert.ok(node.querySelector('.rs-dropdown-item-submenu'));
  });

  it('Should be expanded when set openKeys in submenu', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Sidenav>
        <DropdownMenu openKeys={['2']}>
          <DropdownMenu eventKey="2">
            <DropdownMenuItem>2.1</DropdownMenuItem>
            <DropdownMenuItem>2.2</DropdownMenuItem>
          </DropdownMenu>
        </DropdownMenu>
      </Sidenav>
    );
    const node = findDOMNode(instance);
    assert.ok(node.querySelector('.rs-dropdown-item-submenu.rs-dropdown-item-expand'));
  });

  it('Should be open when set `open` in submenu', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu>
        <DropdownMenu open>
          <DropdownMenuItem>2.1</DropdownMenuItem>
          <DropdownMenuItem>2.2</DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenu>
    );
    const node = findDOMNode(instance);
    assert.ok(node.querySelector('.rs-dropdown-item-submenu.rs-dropdown-item-open'));
  });

  it('Should be active when set `activeKey` in submenu', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu activeKey={'2'}>
        <DropdownMenu eventKey={'2'}>
          <DropdownMenuItem>2.1</DropdownMenuItem>
          <DropdownMenuItem>2.2</DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenu>
    );
    const node = findDOMNode(instance);
    assert.ok(node.querySelector('.rs-dropdown-item-submenu.rs-dropdown-item-active'));
  });

  it('Should be active when set `activeKey` in submenu', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu>
        <DropdownMenu pullLeft>
          <DropdownMenuItem>2.1</DropdownMenuItem>
          <DropdownMenuItem>2.2</DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenu>
    );
    const node = findDOMNode(instance);
    assert.ok(node.querySelector('.rs-dropdown-menu-pull-left.rs-dropdown-item-pull-left'));
  });

  it('Should call onSelect callback', done => {
    let doneOp = eventKey => {
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

  it('Should call onSelect callback', done => {
    let doneOp = eventKey => {
      if (eventKey === 3) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu activeKey={1}>
        <DropdownMenuItem eventKey={1}>1</DropdownMenuItem>
        <DropdownMenuItem eventKey={2}>2</DropdownMenuItem>
        <DropdownMenuItem eventKey={3} onSelect={doneOp}>
          3
        </DropdownMenuItem>
      </DropdownMenu>
    );

    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelectorAll('a')[2]);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenu className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenu style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
