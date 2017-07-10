import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import SafeAnchor from '../src/SafeAnchor';


describe('SafeAnchor', () => {

  it('Should output a Anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <SafeAnchor>
        Title
      </SafeAnchor>
    );
    assert.equal(findDOMNode(instance).innerHTML, 'Title');
  });

  it('Should call onClick callback', (done) => {
    let doneOp = () => {
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <SafeAnchor onClick={doneOp} />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance));
  });


  it('Should disabled onClick callback and tabIndex = -1', (done) => {
    let k = true;
    let doneOp = () => {
      k = false;
    };
    setTimeout(() => {
      k && done();
    }, 10);

    let instance = ReactTestUtils.renderIntoDocument(
      <SafeAnchor onClick={doneOp} disabled />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance));
    assert.equal(findDOMNode(instance).tabIndex, -1);

  });

  it('Should output an anchor and has href', () => {
    let href = '/url';
    let instance = ReactTestUtils.renderIntoDocument(
      <SafeAnchor href={href}>
        Title
      </SafeAnchor>
    );
    assert.equal(findDOMNode(instance).nodeName, 'A');
    assert.equal(findDOMNode(instance).getAttribute('href'), href);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <SafeAnchor className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

});
