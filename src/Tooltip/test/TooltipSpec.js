import React from 'react';
import Tooltip from '../Tooltip';
import { innerText, getDOMNode } from '@test/testUtils';

describe('Tooltip', () => {
  it('Should render a Tooltip', () => {
    const title = 'Test';
    const instance = getDOMNode(<Tooltip>{title}</Tooltip>);
    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.className, 'rs-tooltip');
    assert.equal(innerText(instance), title);
  });

  it('Should have a id', () => {
    const instance = getDOMNode(<Tooltip id="tooltip" />);
    assert.equal(instance.id, 'tooltip');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Tooltip className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Tooltip style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Tooltip classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
