import React from 'react';
import PickerOverlay from '../PickerOverlay';
import { getDOMNode } from '@test/testUtils';

describe('PickerOverlay', () => {
  it('Should render a menu', () => {
    const instance = getDOMNode(<PickerOverlay />);
    assert.ok(instance.className.match(/\bpicker-menu\b/));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<PickerOverlay className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<PickerOverlay style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<PickerOverlay classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
