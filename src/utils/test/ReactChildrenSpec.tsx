/* eslint-disable testing-library/no-node-access */
import React from 'react';
import ReactChildren from '../ReactChildren';
import { render, screen } from '@testing-library/react';

describe('[utils] ReactChildren', () => {
  it('Should count the number', () => {
    expect(ReactChildren.count(<div />)).to.equal(1);
    expect(ReactChildren.count([<div key="1" />, <div key="2" />])).to.equal(2);
    expect(
      ReactChildren.count([
        <React.Fragment key="1">
          <div key="1.1" />
          <div key="1.2"></div>
        </React.Fragment>,
        <div key="2" />
      ])
    ).to.equal(3);
    expect(
      ReactChildren.count([
        <React.Fragment key="1">
          <div key="1.1" />
          <div key="1.2"></div>
        </React.Fragment>,
        null,
        undefined,
        true,
        <div key="2" />
      ])
    ).to.equal(3);
    expect(
      ReactChildren.count([
        <React.Fragment key="1">
          <div key="1.1" />
          <div key="1.2"></div>
        </React.Fragment>,
        0,
        <div key="2" />
      ])
    ).to.equal(4);
  });

  it('Should clone the element and add props', () => {
    const children = ReactChildren.mapCloneElement(
      [<div key="1" role="button" />, <div key="2" role="button" />],
      () => {
        return { className: 'foo' };
      }
    );

    render(<div>{children}</div>);

    screen.getAllByRole('button').forEach(node => {
      expect(node).to.have.class('foo');
    });
  });

  it('Should clone the element and add props with fragment syntax', () => {
    const children = ReactChildren.mapCloneElement(
      <>
        <div key="1" role="button" />
        <div key="2" role="button" />
      </>,
      () => {
        return { className: 'foo' };
      }
    );

    render(<div>{children}</div>);

    screen.getAllByRole('button').forEach(node => {
      expect(node).to.have.class('foo');
    });
  });

  it('Should clone the element and add props with React.Fragment', () => {
    const children = ReactChildren.mapCloneElement(
      [
        <React.Fragment key="1">
          <div key="1.1" role="button" />
          <div key="1.2" role="button" />
        </React.Fragment>,
        <div key="2" role="button" />
      ],
      () => {
        return { className: 'foo' };
      }
    );

    render(<div>{children}</div>);

    screen.getAllByRole('button').forEach(node => {
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

  it('Should map the element with React.Fragment', () => {
    const children = ReactChildren.map(
      [
        <React.Fragment key="1">
          <div key="1.1" role="listitem" />
          <div key="1.2" role="listitem" />
        </React.Fragment>,
        <div key="2" role="listitem" />
      ],
      () => {
        return { className: 'foo' };
      }
    );
    expect(children).to.have.length(3);
    expect(children?.[0]).to.have.property('className', 'foo');
  });

  it('Should find the specified element', () => {
    const item = ReactChildren.find(
      [
        <div key="1" role="button" className="foo" />,
        <div key="2" role="button" className="bar" />
      ],
      child => child.props.className === 'bar'
    );

    render(<div>{item}</div>);
    expect(screen.getByRole('button')).to.have.class('bar');
  });

  it('Should fine the specified element with React.Fragment', () => {
    const item = ReactChildren.find(
      [
        <React.Fragment key="1">
          <div key="1.1" role="button" className="foo" />
          <div key="1.2" role="button" className="bar" />
        </React.Fragment>,
        <div key="2" role="button" className="header" />
      ],
      child => child.props.className === 'bar'
    );

    render(<div>{item}</div>);
    expect(screen.getByRole('button')).to.have.class('bar');
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
  it('Should check if the specified element exists with React.Fragment', () => {
    expect(
      ReactChildren.some(
        [
          <React.Fragment key="1">
            <div key="1.1" className="foo" />
            <div key="1.2" className="bar" />
          </React.Fragment>,
          <div key="2" className="header" />
        ],
        child => child.props.className === 'bar'
      )
    ).to.be.true;
  });
});
