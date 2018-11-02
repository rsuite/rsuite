import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode } from '../TestWrapper';
import DropdownMenuItem from '../../src/_picker/DropdownMenuCheckItem';

describe('picker - DropdownMenuCheckItem', () => {
  it('Should output a li', () => {
    const Title = 'Title';
    const instance = getDOMNode(
      <DropdownMenuItem classPrefix="item" title="title">
        {Title}
      </DropdownMenuItem>
    );

    assert.equal(instance.tagName, 'LI');
    assert.include(instance.querySelector('label').className, 'item');
    assert.equal(instance.innerText, Title);
  });

  it('Should be active', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="item" title="title" active />);

    assert.include(instance.querySelector('label').className, 'active');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="item" title="title" disabled />);

    assert.include(instance.querySelector('label').className, 'disabled');
  });

  it('Should be focus', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="item" title="title" focus />);

    assert.include(instance.querySelector('label').className, 'focus');
  });

  it('Should call onSelect callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <DropdownMenuItem classPrefix="item" title="title" onSelect={doneOp} />
    );

    ReactTestUtils.Simulate.change(instance.querySelector('input'));
  });

  it('Should call onKeyDown callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <DropdownMenuItem classPrefix="item" title="title" onKeyDown={doneOp} />
    );

    ReactTestUtils.Simulate.keyDown(instance.querySelector('label'));
  });

  it('Should call onCheck callback', () => {
    const onSelectSpy = sinon.spy();
    const onCheckeSpy = sinon.spy();

    const instance = getDOMNode(
      <DropdownMenuItem
        classPrefix="item"
        title="title"
        onCheck={onCheckeSpy}
        onSelectItem={onSelectSpy}
        labelComponentClass="div"
      />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.item-wrapper'));

    assert.ok(onCheckeSpy.calledOnce);
    assert.ok(onSelectSpy.calledOnce);
  });

  it('Should call onSelectItem callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <DropdownMenuItem
        classPrefix="item"
        title="title"
        onSelectItem={doneOp}
        labelComponentClass="div"
      />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.item'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="item" className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<DropdownMenuItem classPrefix="item" style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DropdownMenuItem classPrefix="custom-prefix" />);
    assert.ok(instance.querySelector('label').className.match(/\bcustom-prefix\b/));
  });
});
