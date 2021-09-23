import React from 'react';
import { getDOMNode } from '@test/testUtils';
import DropdownMenuGroup from '../DropdownMenuGroup';

describe('picker - DropdownMenuGroup', () => {
  it('Should output a `menu-item-group`', () => {
    const Title = 'Title';
    const instance = getDOMNode(<DropdownMenuGroup>{Title}</DropdownMenuGroup>);

    assert.equal(instance.className, 'rs-dropdown-menu-group');
    assert.equal(instance.innerText, Title);
  });

  it('Should have a title', () => {
    const instance = getDOMNode(
      <DropdownMenuGroup>
        <div>title</div>
      </DropdownMenuGroup>
    );

    assert.equal(instance.querySelector('.rs-dropdown-menu-group-title').innerText, 'title');
  });

  it('Should have a role', () => {
    const instance = getDOMNode(<DropdownMenuGroup>group</DropdownMenuGroup>);
    assert.equal(instance.getAttribute('role'), 'group');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<DropdownMenuGroup className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<DropdownMenuGroup style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DropdownMenuGroup classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
