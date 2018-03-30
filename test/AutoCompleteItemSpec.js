import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import AutoCompleteItem from '../src/AutoCompleteItem';

describe('AutoCompleteItem', () => {
  it('Should render `a` as inner element', () => {
    const instance = ReactTestUtils.renderIntoDocument(<AutoCompleteItem value="1" />);

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });

  it('Should be focus', () => {
    const instance = ReactTestUtils.renderIntoDocument(<AutoCompleteItem value="1" focus />);

    const classes = findDOMNode(instance).childNodes[0].className;
    assert.include(classes, 'rs-auto-complete-item-focus');
  });

  it('Should call onSelect callback', done => {
    const doneOp = value => {
      if (value === '1') {
        done();
      }
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <AutoCompleteItem value="1" focus onSelect={doneOp} />
    );
    ReactTestUtils.Simulate.click(findDOMNode(instance).childNodes[0]);
  });

  it('Should call onKeyDown callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <AutoCompleteItem value="1" focus onKeyDown={doneOp} />
    );
    ReactTestUtils.Simulate.keyDown(findDOMNode(instance).childNodes[0]);
  });

  it('Should render a icon in li', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <AutoCompleteItem value="1" renderItem={() => <i className="icon" />} />
    );
    const className = findDOMNode(instance).childNodes[0].childNodes[0].className;
    assert.equal(className, 'icon');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <AutoCompleteItem value="1" className="custom" />
    );
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <AutoCompleteItem value="1" style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
