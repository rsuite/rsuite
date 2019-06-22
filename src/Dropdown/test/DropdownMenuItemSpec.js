import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import DropdownMenuItem from '../DropdownMenuItem';
import Sidenav from '../../Sidenav';
import Icon from '../../Icon';

import innerText from '../../../test/innerText';

describe('DropdownMenuItem', () => {
  it('Should render a li', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem>{title}</DropdownMenuItem>
    );
    assert.equal(findDOMNode(instance).tagName, 'LI');
    assert.equal(innerText(findDOMNode(instance)), title);
  });

  it('Should render a Button', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem componentClass="button">{title}</DropdownMenuItem>
    );
    assert.equal(findDOMNode(instance).children[0].tagName, 'BUTTON');
    assert.equal(innerText(findDOMNode(instance)), title);
  });

  it('Should render a divider', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem divider />);
    assert.equal(findDOMNode(instance).className, 'rs-dropdown-item-divider');
  });

  it('Should render a panel', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem panel />);
    assert.equal(findDOMNode(instance).className, 'rs-dropdown-item-panel');
  });

  it('Should be active', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem active />);
    assert.include(findDOMNode(instance).className, 'rs-dropdown-item-active');
  });

  it('Should be open', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem open />);
    assert.include(findDOMNode(instance).className, 'rs-dropdown-item-open');
  });

  it('Should be submenu', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem submenu />);
    assert.include(findDOMNode(instance).className, 'rs-dropdown-item-submenu');
  });

  it('Should be expanded in `Sidenav`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Sidenav>
        <DropdownMenuItem expanded submenu />
      </Sidenav>
    );
    const Item = findDOMNode(instance).querySelector('.rs-dropdown-item');
    assert.include(Item.className, 'rs-dropdown-item-expand');
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem disabled />);
    assert.include(findDOMNode(instance).className, 'rs-dropdown-item-disabled');
  });

  it('Should be `pullLeft`', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem pullLeft />);
    assert.include(findDOMNode(instance).className, 'rs-dropdown-item-pull-left');
  });

  it('Should render a icon', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem icon={<Icon icon="user" />} />
    );
    assert.ok(findDOMNode(instance).querySelector('.rs-icon-user'));
  });

  it('Should call onSelect callback', done => {
    const doneOp = eventKey => {
      if (eventKey === 'ABC') {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem onSelect={doneOp} eventKey="ABC">
        Title
      </DropdownMenuItem>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).children[0]);
  });

  it('Should call onClick callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem onClick={doneOp}>Title</DropdownMenuItem>
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).children[0]);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenuItem style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenuItem classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
