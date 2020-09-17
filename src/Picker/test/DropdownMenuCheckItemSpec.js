import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode } from '@test/testUtils';
import DropdownMenuItem from '../DropdownMenuCheckItem';

describe('picker - DropdownMenuCheckItem', () => {
  it('Should output a item', () => {
    const Title = 'Title';
    const instance = getDOMNode(<DropdownMenuItem title="title">{Title}</DropdownMenuItem>);

    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.innerText, Title);
  });

  it('Should be active', () => {
    const instance = getDOMNode(<DropdownMenuItem title="title" active />);

    assert.include(instance.querySelector('.rs-checkbox').className, 'rs-checkbox-checked');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<DropdownMenuItem title="title" disabled />);

    assert.include(instance.querySelector('.rs-checkbox').className, 'rs-checkbox-disabled');
  });

  it('Should be focus', () => {
    const instance = getDOMNode(<DropdownMenuItem title="title" focus />);
    assert.include(instance.querySelector('.rs-checkbox').className, 'item-focus');
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

    ReactTestUtils.Simulate.keyDown(instance.querySelector('input'));
  });

  it('Should call onCheck callback', () => {
    const onSelectSpy = sinon.spy();
    const onCheckeSpy = sinon.spy();

    const instance = getDOMNode(
      <DropdownMenuItem title="title" onCheck={onCheckeSpy} onSelectItem={onSelectSpy} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-checkbox-wrapper'));

    assert.ok(onCheckeSpy.calledOnce);
    assert.ok(onSelectSpy.calledOnce);
  });

  it('Should call onSelectItem callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<DropdownMenuItem title="title" onSelectItem={doneOp} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-checkbox'));
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
