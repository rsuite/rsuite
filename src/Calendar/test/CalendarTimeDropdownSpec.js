import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import TimeDropdown from '../TimeDropdown';

describe('Calendar-TimeDropdown', () => {
  it('Should render a div with `time-dropdown` class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TimeDropdown />);

    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.nodeName, 'DIV');
    assert.ok(instanceDOM.className.match(/\btime-dropdown\b/));
  });

  it('Should render 3 column', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TimeDropdown format="HH:mm:ss" />);
    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.querySelectorAll('.rs-calendar-time-dropdown-column').length, 3);
  });

  it('Should render 2 column', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TimeDropdown format="HH:mm" />);
    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.querySelectorAll('.rs-calendar-time-dropdown-column').length, 2);
  });

  it('Should render 1 column', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TimeDropdown format="HH" />);
    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.querySelectorAll('.rs-calendar-time-dropdown-column').length, 1);
  });

  it('Should call `onSelect` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <TimeDropdown onSelect={doneOp} format="HH" />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('[data-key="hours-1"]'));
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TimeDropdown
        disabledHours={h => {
          return h > 10;
        }}
        format="HH"
      />
    );
    const instanceDOM = findDOMNode(instance);
    assert.equal(
      instanceDOM.querySelectorAll('.rs-calendar-time-dropdown-cell-disabled').length,
      23 - 10
    );
  });

  it('Should be hide', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TimeDropdown
        hideHours={h => {
          return h > 10;
        }}
        format="HH"
      />
    );
    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.querySelectorAll('li').length, 11);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TimeDropdown className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<TimeDropdown style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TimeDropdown classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
