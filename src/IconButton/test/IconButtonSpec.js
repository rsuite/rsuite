import React from 'react';
import { getDOMNode } from '@test/testUtils';
import IconButton from '../IconButton';
import Icon from '../../Icon';

describe('IconButton', () => {
  it('Should output a button', () => {
    const instance = getDOMNode(<IconButton />);
    assert.include(instance.className, 'rs-btn-icon');
    assert.equal(instance.nodeName, 'BUTTON');
  });

  it('Should output a icon', () => {
    const instance = getDOMNode(<IconButton icon={<Icon icon="user" />} />);
    assert.ok(instance.querySelector('i.rs-icon'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<IconButton icon={<Icon icon="star" />} className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<IconButton icon={<Icon icon="star" />} style={{ fontSize }} />);

    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = getDOMNode(<IconButton style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<IconButton classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
