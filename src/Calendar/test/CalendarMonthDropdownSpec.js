import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import MonthDropdown from '../MonthDropdown';
import CalendarContext from '../CalendarContext';
import { createTestContainer } from '../../../test/testUtils';

describe('Calendar-MonthDropdown', () => {
  it('Should output year and month ', () => {
    const ref = React.createRef();
    ReactDOM.render(
      <CalendarContext.Provider
        value={{
          date: new Date()
        }}
      >
        <MonthDropdown show ref={ref} />
      </CalendarContext.Provider>,
      createTestContainer()
    );
    assert.equal(ref.current.querySelectorAll('.rs-calendar-month-dropdown-year').length, 8);
  });

  it('Should call `onChangePageDate` callback ', done => {
    const onChangePageDate = () => {
      done();
    };
    const ref = React.createRef();
    ReactDOM.render(
      <CalendarContext.Provider value={{ onChangePageDate, date: new Date() }}>
        <MonthDropdown show ref={ref} />
      </CalendarContext.Provider>,
      createTestContainer()
    );
    ReactTestUtils.Simulate.click(ref.current.querySelector('.rs-calendar-month-dropdown-cell'));
  });

  it('Should disable month', () => {
    const ref = React.createRef();
    ReactDOM.render(
      <CalendarContext.Provider value={{ date: new Date(2019, 8, 1) }}>
        <MonthDropdown
          show
          disabledMonth={d => {
            const today = new Date(2019, 8, 6);
            const d2 = new Date(today.getTime() - 240 * 60 * 60 * 1000);
            return d.getTime() > today.getTime() || d.getTime() < d2.getTime();
          }}
          ref={ref}
        />
      </CalendarContext.Provider>,
      createTestContainer()
    );

    const cells = ref.current
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
