import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import AutoComplete from '../src/AutoComplete';

describe('AutoComplete', () => {
  it('Should render input', () => {
    const instance = ReactTestUtils.renderIntoDocument(<AutoComplete />);

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input'));
  });

  it('Should render 2 `li` when set `open` and `defaultValue`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" />
    );
    assert.equal(instance.menuContainer.querySelectorAll('li').length, 2);
  });

  it('Should be a `top-right` for placement', () => {
    const instance = ReactTestUtils.renderIntoDocument(<AutoComplete open placement="topRight" />);
    const classes = instance.menuContainer.parentNode.className;
    assert.include(classes, 'rs-placement-top-right');
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(<AutoComplete disabled />);
    assert.include(findDOMNode(instance).className, 'rs-auto-complete-disabled');
  });

  it('Should call onSelect callback', done => {
    const doneOp = value => {
      if (value === 'a') {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <AutoComplete data={['a', 'b', 'ab']} open defaultValue="a" onSelect={doneOp} />
    );
    ReactTestUtils.Simulate.click(instance.menuContainer.querySelectorAll('a')[0]);
  });

  it('Should call onChange callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(<AutoComplete onChange={doneOp} />);
    const input = findDOMNode(instance).querySelector('input');

    input.value = 'a';

    ReactTestUtils.Simulate.change(input);
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(<AutoComplete onFocus={doneOp} />);
    const input = findDOMNode(instance).querySelector('input');
    ReactTestUtils.Simulate.focus(input);
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(<AutoComplete onBlur={doneOp} />);
    const input = findDOMNode(instance).querySelector('input');
    ReactTestUtils.Simulate.blur(input);
  });

  it('Should render a icon in li', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <AutoComplete
        data={['a', 'b', 'ab']}
        open
        defaultValue="a"
        renderItem={() => <i className="icon" />}
      />
    );

    assert.equal(instance.menuContainer.querySelectorAll('a i').length, 2);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<AutoComplete className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<AutoComplete style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
