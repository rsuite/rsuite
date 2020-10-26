import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import Panel from '../Panel';
import { parseISO } from '../../utils/dateUtils';

describe('DateRangePicker - Panel', () => {
  it('Should render a div with "rs-calendar" class', () => {
    const instance = getDOMNode(<Panel onChangeCalendarDate={() => {}} />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\brs-calendar\b/));
  });

  it('Should output a date', () => {
    const instance = getDOMNode(
      <Panel
        calendarDate={[parseISO('2017-08'), parseISO('2017-09')]}
        index={0}
        onChangeCalendarDate={() => {}}
        format="yyyy-MM"
      />
    );
    assert.equal(instance.querySelector('.rs-calendar-header-title').innerText, '2017-08');
  });

  it('Should call `onChangeCalendarDate` callback', done => {
    const instance = getDOMNode(
      <Panel
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
      <Panel
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
      <Panel
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
    const instance = getDOMNode(<Panel classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
