import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import SafeAnchor from '../src/SafeAnchor';

describe('SafeAnchor', () => {
  it('Should output a Anchor', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor>Title</SafeAnchor>);
    assert.equal(findDOMNode(instance).innerHTML, 'Title');
  });

  it('Should call onClick callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor onClick={doneOp} />);
    ReactTestUtils.Simulate.click(findDOMNode(instance));
  });

  it('Should disabled onClick callback and tabIndex = -1', () => {
    const onHideSpy = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor onClick={onHideSpy} disabled />);
    ReactTestUtils.Simulate.click(findDOMNode(instance));

    assert.ok(!onHideSpy.calledOnce);
    assert.equal(findDOMNode(instance).tabIndex, -1);
  });

  it('Should output an anchor and has href', () => {
    const href = '/url';
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor href={href}>Title</SafeAnchor>);

    assert.equal(findDOMNode(instance).nodeName, 'A');
    assert.equal(findDOMNode(instance).getAttribute('href'), href);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SafeAnchor className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


});
