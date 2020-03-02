import React from 'react';
import { getDOMNode } from '@test/testUtils';
import Table from '../Table';

describe('Calendar-Table', () => {
  it('Should render a div with `table` class', () => {
    const instance = getDOMNode(<Table />);
    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\btable\b/));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Table className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Table style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Table classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
