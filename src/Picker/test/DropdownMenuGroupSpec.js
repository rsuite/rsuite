import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode } from '@test/testUtils';
import DropdownMenuGroup from '../DropdownMenuGroup';

const classPrefix = 'dropdown-menu-group';
const titleClassName = `.${classPrefix}-title`;

describe('picker - DropdownMenuGroup', () => {
  it('Should output a `menu-item-group`', () => {
    const Title = 'Title';
    const instance = getDOMNode(<DropdownMenuGroup>{Title}</DropdownMenuGroup>);

    assert.equal(instance.className, classPrefix);
    assert.equal(instance.innerText, Title);
  });

  it('Should have a title', () => {
    const instance = getDOMNode(
      <DropdownMenuGroup>
        <div>title</div>
      </DropdownMenuGroup>
    );

    assert.equal(instance.querySelector(titleClassName).innerText, 'title');
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
