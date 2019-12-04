import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance } from '@test/testUtils';
import DatePicker from '../DatePicker';
import { parse } from 'date-fns';

describe('DatePicker', () => {
  it('Should render a div with "rs-calendar" class', () => {
    const instance = getDOMNode(<DatePicker onChangeCalendarDate={() => {}} />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\brs-calendar\b/));
  });

  it('Should output a date', () => {
    const instance = getDOMNode(
      <DatePicker
        calendarDate={[parse('2017-08'), parse('2017-09')]}
        index={0}
        onChangeCalendarDate={() => {}}
      />
    );
    assert.equal(instance.querySelector('.rs-calendar-header-title').innerText, '2017-08');
  });

  it('Should call `onChangeCalendarDate` callback', done => {
    const instance = getDOMNode(
      <DatePicker
        calendarDate={[parse('2017-08'), parse('2017-09')]}
        index={0}
        onChangeCalendarDate={() => {
          done();
        }}
      />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-header-backward'));
  });

  it('Should call `onChangeCalendarDate` callback', done => {
    const instance = getDOMNode(
      <DatePicker
        calendarDate={[parse('2017-08'), parse('2017-10')]}
        index={0}
        onChangeCalendarDate={() => {
          done();
        }}
      />
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-header-forward'));
  });

  it('Should call `onChangeCalendarDate` callback', done => {
    const instance = getDOMNode(
      <DatePicker
        calendarDate={[parse('2017-08'), parse('2017-10')]}
        index={0}
        onChangeCalendarDate={() => {
          done();
        }}
      />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-header-title-date'));
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-month-dropdown-cell'));
  });

  it('Should change calendarState', () => {
    const instance = getInstance(
      <DatePicker
        onChangeCalendarDate={() => {}}
        calendarDate={[parse('2017-08'), parse('2017-10')]}
        index={0}
      />
    );
    instance.toggleMonthDropdown(() => {
      assert.equal(instance.state.calendarState, 'DROP_MONTH');
    });

    instance.toggleMonthDropdown(() => {
      assert.equal(instance.state.calendarState, null);
    });
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DatePicker classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
