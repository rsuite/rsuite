import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import MonthDropdown from '../MonthDropdown';

describe('Calendar-MonthDropdown', () => {
  it('Should output year and month ', () => {
    const instance = getDOMNode(<MonthDropdown date={new Date()} />);
    assert.equal(instance.querySelectorAll('.rs-calendar-month-dropdown-year').length, 8);
  });

  it('Should call `onSelect` callback ', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(<MonthDropdown date={new Date()} onSelect={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-month-dropdown-cell'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<MonthDropdown className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<MonthDropdown style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<MonthDropdown classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
