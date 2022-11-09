import React from 'react';
import { fireEvent } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';
import Calendar from '../Calendar';
import { parseISO } from '../../utils/dateUtils';

describe('DateRangePicker - Calendar', () => {
  it('Should render a div with "rs-calendar" class', () => {
    const instance = getDOMNode(<Calendar onChangeCalendarMonth={() => 1} />);

    expect(instance.nodeName).to.equal('DIV');
    expect(instance).to.have.class('rs-calendar');
  });

  it('Should output a date', () => {
    const instance = getDOMNode(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-09')]}
        index={0}
        onChangeCalendarMonth={() => 1}
        format="yyyy-MM"
      />
    );

    expect(instance.querySelector('.rs-calendar-header-title')).to.text('2017-08');
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonthSpy = sinon.spy();
    const instance = getDOMNode(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-09')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonthSpy}
      />
    );

    fireEvent.click(instance.querySelector('.rs-calendar-header-backward'));

    expect(onChangeCalendarMonthSpy).to.have.been.called;
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonthSpy = sinon.spy();
    const instance = getDOMNode(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-10')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonthSpy}
      />
    );
    fireEvent.click(instance.querySelector('.rs-calendar-header-forward'));

    expect(onChangeCalendarMonthSpy).to.have.been.called;
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonthSpy = sinon.spy();
    const instance = getDOMNode(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-10')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonthSpy}
      />
    );

    fireEvent.click(instance.querySelector('.rs-calendar-header-title-date'));
    fireEvent.click(instance.querySelector('.rs-calendar-month-dropdown-cell'));

    expect(onChangeCalendarMonthSpy).to.have.been.called;
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Calendar classPrefix="custom-prefix" />);

    expect(instance.className).to.contain('custom-prefix');
  });
});
