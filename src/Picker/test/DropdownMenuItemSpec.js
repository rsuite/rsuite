import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode } from '@test/testUtils';
import DropdownMenuItem from '../DropdownMenuItem';

describe('picker - DropdownMenuItem', () => {
  it('Should output a item', () => {
    const Title = 'Title';
    const instance = getDOMNode(<DropdownMenuItem title="title">{Title}</DropdownMenuItem>);

    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.innerText, Title);
  });

  it('Should be active', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="item" title="title" active />);

    assert.include(instance.querySelector('a').className, 'item-active');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="item" title="title" disabled />);

    assert.include(instance.querySelector('a').className, 'item-disabled');
  });

  it('Should be focus', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="item" title="title" focus />);

    assert.include(instance.querySelector('a').className, 'item-focus');
  });

  it('Should call onSelect callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<DropdownMenuItem title="title" onSelect={doneOp} />);

    ReactTestUtils.Simulate.click(instance.querySelector('a'));
  });

  it('Should call onKeyDown callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<DropdownMenuItem title="title" onKeyDown={doneOp} />);

    ReactTestUtils.Simulate.keyDown(instance.querySelector('a'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<DropdownMenuItem className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<DropdownMenuItem style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="custom-prefix" />);
    assert.ok(instance.querySelector('a').className.match(/\bcustom-prefix\b/));
  });
});
