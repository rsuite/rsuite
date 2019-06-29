import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Drawer from '../Drawer';

describe('Drawer', () => {
  it('Should render a drawer', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Drawer show>
        <p>message</p>
      </Drawer>
    );
    assert.ok(findDOMNode(instance).querySelectorAll('.rs-drawer.rs-drawer-right'));
  });

  it('Should be full', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Drawer full show>
        <p>message</p>
      </Drawer>
    );
    assert.ok(findDOMNode(instance).querySelectorAll('.rs-drawer.rs-drawer-full'));
  });

  it('Should have a `top` className for placement', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Drawer show placement="top">
        <p>message</p>
      </Drawer>
    );
    assert.ok(findDOMNode(instance).querySelectorAll('.rs-drawer-top'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Drawer className="custom" show />);
    assert.ok(findDOMNode(instance).querySelector('.rs-drawer.custom'));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Drawer style={{ fontSize }} show />);
    assert.equal(findDOMNode(instance).querySelector('.rs-drawer').style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Drawer classPrefix="custom-prefix" show />);
    assert.ok(
      findDOMNode(instance)
        .querySelector('.fade')
        .className.match(/\bcustom-prefix\b/)
    );
  });
});
