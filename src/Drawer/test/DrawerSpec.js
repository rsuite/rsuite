import React from 'react';
import { getDOMNode } from '@test/testUtils';

import Drawer from '../Drawer';

describe('Drawer', () => {
  it('Should render a drawer', () => {
    const instance = getDOMNode(
      <Drawer show>
        <p>message</p>
      </Drawer>
    );
    assert.ok(instance.querySelectorAll('.rs-drawer.rs-drawer-right'));
    assert.ok(instance.querySelector('[role="dialog"]'));
  });

  it('Should be full', () => {
    const instance = getDOMNode(
      <Drawer full show>
        <p>message</p>
      </Drawer>
    );
    assert.ok(instance.querySelectorAll('.rs-drawer.rs-drawer-full'));
  });

  it('Should have a `top` className for placement', () => {
    const instance = getDOMNode(
      <Drawer show placement="top">
        <p>message</p>
      </Drawer>
    );
    assert.ok(instance.querySelectorAll('.rs-drawer-top'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Drawer className="custom" show />);
    assert.ok(instance.querySelector('.rs-drawer.custom'));
  });

  it('Should accept id and aria-labelledby attribute', () => {
    const instance = getDOMNode(
      <Drawer show id="drawer" aria-labelledby="drawer-title">
        <h4 id="drawer-title">My Drawer</h4>
        <p>message</p>
      </Drawer>
    );

    const dialog = instance.querySelector('[role="dialog"]');
    assert.equal(dialog.getAttribute('id'), 'drawer');
    assert.equal(dialog.getAttribute('aria-labelledby'), 'drawer-title');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Drawer style={{ fontSize }} show />);
    assert.equal(instance.querySelector('.rs-drawer').style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Drawer classPrefix="custom-prefix" show />);
    assert.ok(instance.querySelector('.fade').className.match(/\bcustom-prefix\b/));
  });
});
