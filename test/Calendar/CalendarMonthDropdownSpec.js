import React from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import ReactTestUtils from 'react-dom/test-utils';

import MonthDropdown from '../../src/Calendar/MonthDropdown';

describe('Calendar-MonthDropdown', () => {
  it('Should output year and month ', () => {
    const date = moment();

    const instance = ReactTestUtils.renderIntoDocument(<MonthDropdown date={date} />);
    const node = findDOMNode(instance);
    assert.equal(node.querySelectorAll('.rs-calendar-month-dropdown-year').length, 8);
  });

  it('Should call `onSelect` callback ', done => {
    const date = moment();
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <MonthDropdown date={date} onSelect={doneOp} />
    );

    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-calendar-month-dropdown-cell'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<MonthDropdown className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<MonthDropdown style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthDropdown classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
