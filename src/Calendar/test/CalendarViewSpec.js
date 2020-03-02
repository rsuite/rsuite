import React from 'react';
import { getDOMNode } from '@test/testUtils';

import View from '../View';

describe('Calendar-View', () => {
  it('Should render a div with "view" class', () => {
    const instance = getDOMNode(<View />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\bview\b/));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<View className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<View style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<View classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
