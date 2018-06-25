import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import DropdownToggle from '../src/DropdownToggle';
import Icon from '../src/Icon';
import innerText from './innerText';

describe('DropdownToggle', () => {
  it('Should render a toggle', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<DropdownToggle>{title}</DropdownToggle>);

    assert.include(findDOMNode(instance).className, 'dropdown-toggle');
    assert.ok(findDOMNode(instance).querySelector('.rs-dropdown-toggle-caret'));
    assert.equal(innerText(findDOMNode(instance)), title);
  });

  it('Should have a title', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<DropdownToggle>{title}</DropdownToggle>);
    assert.equal(innerText(findDOMNode(instance)), title);
  });

  it('Should have a icon', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle icon={<Icon icon="user" />}>abc</DropdownToggle>
    );
    assert.ok(findDOMNode(instance).querySelector('i.rs-icon-user'));
  });

  it('Should render custom component', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle componentClass={'div'}>abc</DropdownToggle>
    );
    assert.equal(findDOMNode(instance).tagName, 'DIV');
  });

  it('Should not show caret', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle noCaret>abc</DropdownToggle>
    );
    assert.ok(!findDOMNode(instance).querySelector('.rs-dropdown-toggle-caret'));
  });

  it('Should render a custom title', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle renderTitle={children => <b>{children}</b>}>abc</DropdownToggle>
    );
    assert.equal(findDOMNode(instance).innerHTML, '<b>abc</b>');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownToggle className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<DropdownToggle style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
