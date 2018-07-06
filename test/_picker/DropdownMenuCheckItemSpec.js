import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode } from '../TestWrapper';
import DropdownMenuItem from '../../src/_picker/DropdownMenuCheckItem';

describe('<CheckPicker> - DropdownMenuItem', () => {
  it('Should output a li', () => {
    const Title = 'Title';
    const instance = getDOMNode(<DropdownMenuItem title="title">{Title}</DropdownMenuItem>);

    assert.equal(instance.tagName, 'LI');
    assert.ok(instance.querySelector('label').className.match(/\bmenu-item\b/));
    assert.equal(instance.innerText, Title);
  });

  it('Should be active', () => {
    const instance = getDOMNode(<DropdownMenuItem title="title" active />);

    assert.ok(instance.querySelector('label').className.match(/\bactive\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<DropdownMenuItem title="title" disabled />);

    assert.ok(instance.querySelector('label').className.match(/\bdisabled\b/));
  });

  it('Should be focus', () => {
    const instance = getDOMNode(<DropdownMenuItem title="title" focus />);

    assert.ok(instance.querySelector('label').className.match(/\bfocus\b/));
  });

  it('Should call onSelect callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<DropdownMenuItem title="title" onSelect={doneOp} />);

    ReactTestUtils.Simulate.change(instance.querySelector('input'));
  });

  it('Should call onKeyDown callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<DropdownMenuItem title="title" onKeyDown={doneOp} />);

    ReactTestUtils.Simulate.keyDown(instance.querySelector('label'));
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
});
