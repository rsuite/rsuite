import React from 'react';
import ReactChildren from '../ReactChildren';
import { render, screen } from '@testing-library/react';

describe('internals/utils/ReactChildren', () => {
  describe('ReactChildren.count', () => {
    it('Should count a single element', () => {
      expect(ReactChildren.count(<div />)).to.equal(1);
    });

    it('Should count multiple elements in an array', () => {
      expect(ReactChildren.count([<div key="1" />, <div key="2" />])).to.equal(2);
    });

    it('Should count elements inside a React.Fragment', () => {
      expect(
        ReactChildren.count(
          <React.Fragment>
            <div key="1.1" />
            <div key="1.2" />
          </React.Fragment>
        )
      ).to.equal(2);
    });

    it('Should count elements inside an array with a React.Fragment', () => {
      expect(
        ReactChildren.count([
          <React.Fragment key="1">
            <div key="1.1" />
            <div key="1.2"></div>
          </React.Fragment>,
          <div key="2" />
        ])
      ).to.equal(3);
    });

    it('Should ignore null, undefined, and boolean values in count', () => {
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
    });

    it('Should count non-element children like numbers', () => {
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
  });

  describe('ReactChildren.mapCloneElement', () => {
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
  });

  describe('ReactChildren.map', () => {
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
  });

  describe('ReactChildren.find', () => {
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
  });

  describe('ReactChildren.find', () => {
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

  describe('ReactChildren.forEach', () => {
    it('Should call the callback for each valid React element', () => {
      const mockFunc = (child, index) => {
        expect(child).to.be.an('object');
        expect(index).to.be.a('number');
      };
      const children = (
        <>
          <div>Child 1</div>
          <span>Child 2</span>
          <p>Child 3</p>
        </>
      );

      ReactChildren.forEach(children, mockFunc);

      let callCount = 0;

      ReactChildren.forEach(children, () => callCount++);

      expect(callCount).to.equal(3);
    });

    it('Should not call the callback for non-React elements', () => {
      let callCount = 0;
      const mockFunc = () => callCount++;
      const children = (
        <>
          <div>Child 1</div>
          {null}
          <span>Child 2</span>
          {undefined}
          <p>Child 3</p>
          {false}
          {'string'}
        </>
      );

      ReactChildren.forEach(children, mockFunc);
      expect(callCount).to.equal(3);
    });

    it('Should call the callback with the correct context', () => {
      const context = { someKey: 'someValue' };
      const mockFunc = function (this: typeof context) {
        expect(this).to.equal(context);
      };
      const children = <div>Child 1</div>;

      ReactChildren.forEach(children, mockFunc, context);
    });

    it('Should work with no children', () => {
      let callCount = 0;
      const mockFunc = () => callCount++;
      const children = null;

      ReactChildren.forEach(children, mockFunc);
      expect(callCount).to.equal(0);
    });

    it('Should apply transformations to cloned elements', () => {
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
  });
});
