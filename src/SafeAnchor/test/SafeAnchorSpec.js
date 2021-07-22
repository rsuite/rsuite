import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import SafeAnchor from '../SafeAnchor';

describe('SafeAnchor', () => {
  it('Should output a Anchor', () => {
    const instance = getDOMNode(<SafeAnchor>Title</SafeAnchor>);

    assert.equal(instance.getAttribute('href'), '#');
    assert.equal(instance.getAttribute('role'), 'button');
    assert.equal(instance.innerHTML, 'Title');
  });

  it('Should call onClick callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<SafeAnchor onClick={doneOp} />);
    ReactTestUtils.Simulate.click(instance);
  });

  it('Should call onKeyDown callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<SafeAnchor onKeyDown={doneOp} />);
    ReactTestUtils.Simulate.keyDown(instance);
  });

  it('Should call onClick callback by key === SPACE', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<SafeAnchor onClick={doneOp} />);
    ReactTestUtils.Simulate.keyDown(instance, {
      key: ' '
    });
  });

  it('Should disabled onClick callback and tabIndex = -1', () => {
    const onHideSpy = sinon.spy();
    const instance = getDOMNode(<SafeAnchor onClick={onHideSpy} disabled />);
    ReactTestUtils.Simulate.click(instance);

    assert.ok(!onHideSpy.calledOnce);
    assert.equal(instance.tabIndex, -1);
  });

  it('Should output an anchor and has href', () => {
    const href = '/url';
    const instance = getDOMNode(<SafeAnchor href={href}>Title</SafeAnchor>);

    assert.isNull(instance.getAttribute('role'));
    assert.equal(instance.getAttribute('href'), href);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<SafeAnchor className="custom" />);
    assert.include(instance.className, 'custom');
  });
});
