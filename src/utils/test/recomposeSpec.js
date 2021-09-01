// Ref: https://github.com/acdlite/recompose/tree/master/src/packages/recompose/__tests__
import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  setStatic,
  setDisplayName,
  getDisplayName,
  wrapDisplayName,
  setPropTypes
} from '../recompose';

describe('compose', function() {
  it('composes from right to left', () => {
    const double = x => x * 2;
    const square = x => x * x;
    expect(compose(square)(5)).to.equal(25);
    expect(compose(square, double)(5)).to.equal(100);
    expect(compose(double, square, double)(5)).to.equal(200);
  });

  it('can be seeded with multiple arguments', () => {
    const square = x => x * x;
    const add = (x, y) => x + y;
    expect(compose(square, add)(1, 2)).to.equal(9);
  });

  it('returns the identity function if given no arguments', () => {
    expect(compose()(1, 2)).to.equal(1);
    expect(compose()(3)).to.equal(3);
    expect(compose()()).to.equal(undefined);
  });

  it('the first function if given only one', () => {
    const fn = x => x * x;
    expect(compose(fn)(3)).to.equal(fn(3));
  });
});

describe('setStatic', () => {
  it('sets a static property on the base component', () => {
    const BaseComponent = () => <div />;
    const NewComponent = setStatic('propTypes', { foo: PropTypes.object })(BaseComponent);

    expect(NewComponent.propTypes).to.eql({
      foo: PropTypes.object
    });
  });
});

describe('setDisplayName', () => {
  it('sets a static property on the base component', () => {
    const BaseComponent = () => <div />;
    const NewComponent = setDisplayName('Foo')(BaseComponent);
    expect(NewComponent.displayName).to.equal('Foo');
  });
});

describe('getDisplayName', () => {
  it('gets the display name of a React component', () => {
    class SomeComponent extends React.Component {
      render() {
        return <div />;
      }
    }

    class SomeOtherComponent extends React.Component {
      static displayName = 'CustomDisplayName';
      render() {
        return <div />;
      }
    }

    function YetAnotherComponent() {
      return <div />;
    }

    expect(getDisplayName(SomeComponent)).to.equal('SomeComponent');
    expect(getDisplayName(SomeOtherComponent)).to.equal('CustomDisplayName');
    expect(getDisplayName(YetAnotherComponent)).to.equal('YetAnotherComponent');
    expect(getDisplayName(() => <div />)).to.equal('Component');
    expect(getDisplayName('div')).to.equal('div');
  });
});

describe('wrapDisplayName', () => {
  it('wraps the display name of a React component with the name of an HoC, Relay-style', () => {
    class SomeComponent extends React.Component {
      render() {
        return <div />;
      }
    }

    expect(wrapDisplayName(SomeComponent, 'someHoC')).to.equal('someHoC(SomeComponent)');
  });
});

describe('setPropTypes', () => {
  it(' sets a static property on the base component', () => {
    const BaseComponent = () => <div />;
    const NewComponent = setPropTypes({ foo: PropTypes.object })(BaseComponent);

    expect(NewComponent.propTypes).to.eql({
      foo: PropTypes.object
    });
  });
});
