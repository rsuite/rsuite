import React from 'react';
import { getDOMNode } from '@test/testUtils';
import DropdownToggle from '../DropdownToggle';
import Icon from '../../Icon';
import { innerText } from '@test/testUtils';

describe('DropdownToggle', () => {
  it('Should render a toggle', () => {
    const title = 'Test';
    const instance = getDOMNode(<DropdownToggle>{title}</DropdownToggle>);

    assert.include(instance.className, 'dropdown-toggle');
    assert.ok(instance.querySelector('.rs-dropdown-toggle-caret'));
    assert.equal(innerText(instance), title);
  });

  it('Should have a title', () => {
    const title = 'Test';
    const instance = getDOMNode(<DropdownToggle>{title}</DropdownToggle>);
    assert.equal(innerText(instance), title);
  });

  it('Should have a icon', () => {
    const instance = getDOMNode(<DropdownToggle icon={<Icon icon="user" />}>abc</DropdownToggle>);
    assert.ok(instance.querySelector('i.rs-icon-user'));
  });

  it('Should render custom component', () => {
    const instance = getDOMNode(<DropdownToggle componentClass={'div'}>abc</DropdownToggle>);
    assert.equal(instance.tagName, 'DIV');
  });

  it('Should not show caret', () => {
    const instance = getDOMNode(<DropdownToggle noCaret>abc</DropdownToggle>);
    assert.ok(!instance.querySelector('.rs-dropdown-toggle-caret'));
  });

  it('Should render a custom title', () => {
    const instance = getDOMNode(
      <DropdownToggle renderTitle={children => <b>{children}</b>}>abc</DropdownToggle>
    );
    assert.equal(instance.innerText, 'abc');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<DropdownToggle className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<DropdownToggle style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DropdownToggle classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
