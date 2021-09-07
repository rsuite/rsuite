import React from 'react';
import ReactChildren from '../ReactChildren';
import { getDOMNode } from '@test/testUtils';

describe('[utils] ReactChildren', () => {
  it('Should count the number', () => {
    assert.equal(ReactChildren.count(<div />), 1);
    assert.equal(ReactChildren.count([<div key="1" />, <div key="2" />]), 2);
  });

  it('Should clone the element and add props', () => {
    const children = ReactChildren.mapCloneElement([<div key="1" />, <div key="2" />], () => {
      return { className: 'foo' };
    });

    const instance = getDOMNode(<div>{children}</div>);
    assert.equal(instance.querySelectorAll('.foo').length, 2);
  });

  it('Should find the specified element', () => {
    const item = ReactChildren.find(
      [<div key="1" className="foo" />, <div key="2" className="bar" />],
      child => child.props.className === 'bar'
    );

    const instance = getDOMNode(item);

    assert.equal(instance.className, 'bar');
  });

  it('Should check if the specified element exists', () => {
    const has1 = ReactChildren.some(
      [<div key="1" className="foo" />, <div key="2" className="bar" />],
      child => child.props.className === 'bar'
    );

    const has2 = ReactChildren.some(
      [<div key="1" className="foo" />, <div key="2" className="bar" />],
      child => child.props.className === 'bar2'
    );

    assert.equal(has1, true);
    assert.equal(has2, false);
  });
});
