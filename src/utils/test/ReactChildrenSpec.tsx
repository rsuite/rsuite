/* eslint-disable testing-library/no-node-access */
import React from 'react';
import ReactChildren from '../ReactChildren';
import { render, screen } from '@testing-library/react';

describe('[utils] ReactChildren', () => {
  it('Should count the number', () => {
    expect(ReactChildren.count(<div />)).to.equal(1);
    expect(ReactChildren.count([<div key="1" />, <div key="2" />])).to.equal(2);
  });

  it('Should clone the element and add props', () => {
    const children = ReactChildren.mapCloneElement(
      [<div key="1" role="listitem" />, <div key="2" role="listitem" />],
      () => {
        return { className: 'foo' };
      }
    );

    render(<div role="list">{children}</div>);

    screen.getAllByRole('listitem').forEach(node => {
      expect(node).to.have.class('foo');
    });
  });

  it('Should clone the element and add props with fragment syntax', () => {
    const children = ReactChildren.mapCloneElement(
      <>
        <div key="1" role="listitem" />
        <div key="2" role="listitem" />
      </>,
      () => {
        return { className: 'foo' };
      }
    );

    render(<div role="list">{children}</div>);

    screen.getAllByRole('listitem').forEach(node => {
      expect(node).to.have.class('foo');
    });
  });

  it('Should clone the element and add props with React.Fragment', () => {
    const children = ReactChildren.mapCloneElement(
      <React.Fragment>
        <div key="1" role="listitem" />
        <div key="2" role="listitem" />
      </React.Fragment>,
      () => {
        return { className: 'foo' };
      }
    );

    render(<div role="list">{children}</div>);

    screen.getAllByRole('listitem').forEach(node => {
      expect(node).to.have.class('foo');
    });
  });

  it('Should map the element', () => {
    const children = ReactChildren.map(
      [<div key="1" role="listitem" />, <div key="2" role="listitem" />],
      () => {
        return { className: 'foo' };
      }
    );

    expect(children).to.have.length(2);
    expect(children?.[0]).to.have.property('className', 'foo');
  });

  it('Should find the specified element', () => {
    const item = ReactChildren.find(
      [<div key="1" className="foo" />, <div key="2" className="bar" />],
      child => child.props.className === 'bar'
    );

    expect(item).to.have.property('key', '2');
  });

  it('Should check if the specified element exists', () => {
    expect(
      ReactChildren.some(
        [<div key="1" className="foo" />, <div key="2" className="bar" />],
        child => child.props.className === 'bar'
      )
    ).to.be.true;

    expect(
      ReactChildren.some(
        [<div key="1" className="foo" />, <div key="2" className="bar" />],
        child => child.props.className === 'bar2'
      )
    ).to.be.false;
  });
});
