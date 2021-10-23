import React from 'react';
import { getDOMNode } from '@test/testUtils';
import DropdownToggle from '../DropdownToggle';
import User from '@rsuite/icons/legacy/User';

describe('DropdownToggle', () => {
  it('Should render a toggle', () => {
    const title = 'Test';
    const instance = getDOMNode(<DropdownToggle>{title}</DropdownToggle>);

    assert.include(instance.className, 'dropdown-toggle');
    assert.ok(instance.querySelector('.rs-dropdown-toggle-caret'));
    assert.equal(instance.textContent, title);
  });

  it('Should have a title', () => {
    const title = 'Test';
    const instance = getDOMNode(<DropdownToggle>{title}</DropdownToggle>);
    assert.equal(instance.textContent, title);
  });

  it('Should have an icon', () => {
    const instance = getDOMNode(<DropdownToggle icon={<User />}>abc</DropdownToggle>);
    assert.ok(instance.querySelector('.rs-dropdown-toggle-icon.rs-icon'));
  });

  it('Should render custom component', () => {
    const instance = getDOMNode(<DropdownToggle as={'div'}>abc</DropdownToggle>);
    assert.equal(instance.tagName, 'DIV');
  });

  it('Should not show caret', () => {
    const instance = getDOMNode(<DropdownToggle noCaret>abc</DropdownToggle>);
    assert.ok(!instance.querySelector('.rs-dropdown-toggle-caret'));
  });

  it('Should render a custom toggle', () => {
    const renderToggle = (props, ref) => {
      return (
        <button {...props} ref={ref}>
          new
        </button>
      );
    };
    const instance = getDOMNode(<DropdownToggle renderToggle={renderToggle}>abc</DropdownToggle>);
    assert.equal(instance.textContent, 'new');
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
