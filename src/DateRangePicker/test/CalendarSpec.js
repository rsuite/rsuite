import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import Calendar from '../Calendar';
import { parseISO } from '../../utils/dateUtils';

describe('DateRangePicker - Calendar', () => {
  it('Should render a div with "rs-calendar" class', () => {
    const instance = getDOMNode(<Calendar onChangeCalendarDate={() => 1} />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\brs-calendar\b/));
  });

  it('Should output a date', () => {
    const instance = getDOMNode(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-09')]}
        index={0}
        onChangeCalendarDate={() => 1}
        format="yyyy-MM"
      />
    );
    assert.equal(instance.querySelector('.rs-calendar-header-title').innerText, '2017-08');
  });

  it('Should call `onChangeCalendarDate` callback', done => {
    const instance = getDOMNode(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-09')]}
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
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-10')]}
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
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-10')]}
        index={0}
        onChangeCalendarDate={() => {
          done();
        }}
      />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-header-title-date'));
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-calendar-month-dropdown-cell'));
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Calendar classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
