import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';

import { getDOMNode } from '@test/testUtils';
import DropdownMenuItem from '../DropdownMenuCheckItem';

describe('picker - DropdownMenuCheckItem', () => {
  it('Should output a item', () => {
    const Title = 'Title';
    const instance = getDOMNode(<DropdownMenuItem title="title">{Title}</DropdownMenuItem>);

    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.textContent, Title);
  });

  it('Should be active', () => {
    const instance = getDOMNode(<DropdownMenuItem title="title" active />);

    assert.include(
      (instance.querySelector('.rs-checkbox') as HTMLElement).className,
      'rs-checkbox-checked'
    );
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<DropdownMenuItem title="title" disabled />);

    assert.include(
      (instance.querySelector('.rs-checkbox') as HTMLElement).className,
      'rs-checkbox-disabled'
    );
  });

  it('Should be focus', () => {
    const instance = getDOMNode(<DropdownMenuItem title="title" focus />);
    assert.include((instance.querySelector('.rs-checkbox') as HTMLElement).className, 'item-focus');
  });

  it('Should call onSelect callback', () => {
    const onSelect = sinon.spy();
    const instance = getDOMNode(<DropdownMenuItem title="title" onSelect={onSelect} />);

    ReactTestUtils.Simulate.change(instance.querySelector('input') as HTMLInputElement);
    expect(onSelect).to.have.been.calledOnce;
  });

  it('Should call onKeyDown callback', () => {
    const onKeyDown = sinon.spy();
    const instance = getDOMNode(<DropdownMenuItem title="title" onKeyDown={onKeyDown} />);

    ReactTestUtils.Simulate.keyDown(instance.querySelector('input') as HTMLInputElement);
    expect(onKeyDown).to.have.been.calledOnce;
  });

  it('Should call onCheck callback', () => {
    const onSelectSpy = sinon.spy();
    const onCheckeSpy = sinon.spy();

    const instance = getDOMNode(
      <DropdownMenuItem title="title" onCheck={onCheckeSpy} onSelectItem={onSelectSpy} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-checkbox-wrapper') as HTMLElement);

    assert.ok(onCheckeSpy.calledOnce);
    assert.ok(onSelectSpy.calledOnce);
  });

  it('Should call onSelectItem callback', () => {
    const onSelectItem = sinon.spy();
    const instance = getDOMNode(<DropdownMenuItem title="title" onSelectItem={onSelectItem} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-checkbox') as HTMLElement);
    expect(onSelectItem).to.have.been.calledOnce;
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
});
