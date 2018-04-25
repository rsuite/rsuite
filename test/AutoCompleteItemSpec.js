import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import AutoCompleteItem from '../src/AutoCompleteItem';
import { getDOMNode, getInstance } from './TestWrapper';

describe('AutoCompleteItem', () => {
  it('Should render `a` as inner element', () => {
    const instance = getInstance(<AutoCompleteItem itemData={{ value: '1', label: '1' }} />);

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });

  it('Should be focus', () => {
    const instance = getDOMNode(<AutoCompleteItem itemData={{ value: '1', label: '1' }} focus />);

    const classes = instance.childNodes[0].className;
    assert.include(classes, 'rs-auto-complete-item-focus');
  });

  it('Should call onSelect callback', done => {
    const doneOp = itemData => {
      if (itemData.value === '1') {
        done();
      }
    };

    const instance = getDOMNode(
      <AutoCompleteItem itemData={{ value: '1', label: '1' }} focus onSelect={doneOp} />
    );
    ReactTestUtils.Simulate.click(instance.childNodes[0]);
  });

  it('Should call onKeyDown callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(
      <AutoCompleteItem itemData={{ value: '1', label: '1' }} focus onKeyDown={doneOp} />
    );
    ReactTestUtils.Simulate.keyDown(instance.childNodes[0]);
  });

  it('Should render a icon in li', () => {
    const instance = getDOMNode(
      <AutoCompleteItem
        itemData={{ value: '1', label: '1' }}
        renderItem={() => <i className="icon" />}
      />
    );
    const className = instance.childNodes[0].childNodes[0].className;
    assert.equal(className, 'icon');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <AutoCompleteItem itemData={{ value: '1', label: '1' }} className="custom" />
    );
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <AutoCompleteItem itemData={{ value: '1', label: '1' }} style={{ fontSize }} />
    );
    assert.equal(instance.style.fontSize, fontSize);
  });
});
