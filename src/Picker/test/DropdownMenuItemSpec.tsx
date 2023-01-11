import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode } from '@test/testUtils';
import DropdownMenuItem from '../DropdownMenuItem';
import Sinon from 'sinon';

describe('picker - DropdownMenuItem', () => {
  it('Should output a item', () => {
    const Title = 'Title';
    const instance = getDOMNode(<DropdownMenuItem title="title">{Title}</DropdownMenuItem>);

    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.textContent, Title);
  });

  it('Should be active', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="item" title="title" active />);

    assert.include((instance.querySelector('.rs-item') as HTMLElement).className, 'item-active');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="item" title="title" disabled />);

    assert.include((instance.querySelector('.rs-item') as HTMLElement).className, 'item-disabled');
  });

  it('Should be focus', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="item" title="title" focus />);

    assert.include((instance.querySelector('.rs-item') as HTMLElement).className, 'item-focus');
  });

  it('Should call onSelect callback', () => {
    const onSelect = Sinon.spy();
    const instance = getDOMNode(<DropdownMenuItem title="title" onSelect={onSelect} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-dropdown-menu-item') as HTMLElement);

    expect(onSelect).to.have.been.calledOnce;
  });

  it('Should call onKeyDown callback', () => {
    const onKeyDown = Sinon.spy();
    const instance = getDOMNode(<DropdownMenuItem title="title" onKeyDown={onKeyDown} />);

    ReactTestUtils.Simulate.keyDown(
      instance.querySelector('.rs-dropdown-menu-item') as HTMLElement
    );
    expect(onKeyDown).to.have.been.calledOnce;
  });

  it('Should have a role', () => {
    const instance = getDOMNode(<DropdownMenuItem>item</DropdownMenuItem>);
    assert.equal(instance.getAttribute('role'), 'option');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<DropdownMenuItem className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<DropdownMenuItem style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="custom-prefix" />);
    assert.ok((instance.querySelector('span') as HTMLElement).className.match(/\bcustom-prefix\b/));
  });
});
