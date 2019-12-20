import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import MonthDropdown from '../MonthDropdown';

describe('Calendar-MonthDropdown', () => {
  it('Should output year and month ', () => {
    const instance = getDOMNode(<MonthDropdown show date={new Date()} />);
    assert.equal(instance.querySelectorAll('.rs-calendar-month-dropdown-year').length, 8);
  });

  it('Should call `onSelect` callback ', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(<MonthDropdown show date={new Date()} onSelect={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-month-dropdown-cell'));
  });

  it('Should disable month', () => {
    const instance = getDOMNode(
      <MonthDropdown
        show
        date={new Date(2019, 8, 1)}
        disabledMonth={d => {
          let today = new Date(2019, 8, 6);
          let d2 = new Date(today.getTime() - 240 * 60 * 60 * 1000);
          if (d.getTime() > today.getTime() || d.getTime() < d2.getTime()) {
            return true;
          }
          return false;
        }}
      />
    );

    const cells = instance
      .querySelector('.rs-calendar-month-dropdown-year-active')
      .parentNode.querySelectorAll('.rs-calendar-month-dropdown-cell');

    assert.include(cells[6].className, 'disabled');
    assert.equal(cells[7].className, 'rs-calendar-month-dropdown-cell');
    assert.equal(
      cells[8].className,
      'rs-calendar-month-dropdown-cell rs-calendar-month-dropdown-cell-active'
    );
    assert.include(cells[9].className, 'disabled');
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
