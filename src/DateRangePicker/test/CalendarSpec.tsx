import React from 'react';
import { fireEvent } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';
import Calendar from '../Calendar';
import { parseISO } from '../../utils/dateUtils';

describe('DateRangePicker - Calendar', () => {
  it('Should render a div with "rs-calendar" class', () => {
    const instance = getDOMNode(
      <Calendar onChangeCalendarMonth={() => 1} index={0} onToggleMeridian={() => void 0} />
    );

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
        onToggleMeridian={() => void 0}
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
        onToggleMeridian={() => void 0}
      />
    );

    fireEvent.click(instance.querySelector('.rs-calendar-header-backward') as HTMLElement);

    expect(onChangeCalendarMonthSpy).to.have.been.called;
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonthSpy = sinon.spy();
    const instance = getDOMNode(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-10')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonthSpy}
        onToggleMeridian={() => void 0}
      />
    );
    fireEvent.click(instance.querySelector('.rs-calendar-header-forward') as HTMLElement);

    expect(onChangeCalendarMonthSpy).to.have.been.called;
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonthSpy = sinon.spy();
    const instance = getDOMNode(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-10')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonthSpy}
        onToggleMeridian={() => void 0}
      />
    );

    fireEvent.click(instance.querySelector('.rs-calendar-header-title-date') as HTMLElement);
    fireEvent.click(instance.querySelector('.rs-calendar-month-dropdown-cell') as HTMLElement);

    expect(onChangeCalendarMonthSpy).to.have.been.called;
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(
      <Calendar classPrefix="custom-prefix" index={0} onToggleMeridian={() => void 0} />
    );

    expect(instance.className).to.contain('custom-prefix');
  });
});
