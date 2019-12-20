import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { innerText, getDOMNode } from '@test/testUtils';

import DropdownMenuItem from '../DropdownMenuItem';
import Sidenav from '../../Sidenav';
import Icon from '../../Icon';

describe('DropdownMenuItem', () => {
  it('Should render a li', () => {
    const title = 'Test';
    const instance = getDOMNode(<DropdownMenuItem>{title}</DropdownMenuItem>);
    assert.equal(instance.tagName, 'LI');
    assert.equal(innerText(instance), title);
  });

  it('Should render a Button', () => {
    const title = 'Test';
    const instance = getDOMNode(
      <DropdownMenuItem componentClass="button">{title}</DropdownMenuItem>
    );
    assert.equal(instance.children[0].tagName, 'BUTTON');
    assert.equal(innerText(instance), title);
  });

  it('Should render a divider', () => {
    const instance = getDOMNode(<DropdownMenuItem divider />);
    assert.equal(instance.className, 'rs-dropdown-item-divider');
  });

  it('Should render a panel', () => {
    const instance = getDOMNode(<DropdownMenuItem panel />);
    assert.equal(instance.className, 'rs-dropdown-item-panel');
  });

  it('Should be active', () => {
    const instance = getDOMNode(<DropdownMenuItem active />);
    assert.include(instance.className, 'rs-dropdown-item-active');
  });

  it('Should be open', () => {
    const instance = getDOMNode(<DropdownMenuItem open />);
    assert.include(instance.className, 'rs-dropdown-item-open');
  });

  it('Should be submenu', () => {
    const instance = getDOMNode(<DropdownMenuItem submenu />);
    assert.include(instance.className, 'rs-dropdown-item-submenu');
  });

  it('Should be expanded in `Sidenav`', () => {
    const instance = getDOMNode(
      <Sidenav>
        <DropdownMenuItem expanded submenu />
      </Sidenav>
    );
    const Item = instance.querySelector('.rs-dropdown-item');
    assert.include(Item.className, 'rs-dropdown-item-expand');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<DropdownMenuItem disabled />);
    assert.include(instance.className, 'rs-dropdown-item-disabled');
  });

  it('Should be `pullLeft`', () => {
    const instance = getDOMNode(<DropdownMenuItem pullLeft />);
    assert.include(instance.className, 'rs-dropdown-item-pull-left');
  });

  it('Should render a icon', () => {
    const instance = getDOMNode(<DropdownMenuItem icon={<Icon icon="user" />} />);
    assert.ok(instance.querySelector('.rs-icon-user'));
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
    ReactTestUtils.Simulate.click(instance.children[0]);
  });

  it('Should call onClick callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<DropdownMenuItem onClick={doneOp}>Title</DropdownMenuItem>);
    ReactTestUtils.Simulate.click(instance.children[0]);
  });

  it('Should output a custom item', () => {
    let instance = getDOMNode(
      <DropdownMenuItem
        renderItem={() => {
          return <span>custom</span>;
        }}
      />
    );
    assert.include(instance.querySelector('span').innerText, 'custom');
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
});
