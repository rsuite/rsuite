import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { parseISO } from 'date-fns';
import Calendar from '../Calendar';
import { testStandardProps } from '@test/utils';

describe('DateRangePicker - Calendar', () => {
  testStandardProps(<Calendar index={0} />);

  it('Should render a div with "rs-calendar" class', () => {
    const { container } = render(<Calendar onChangeCalendarMonth={() => 1} index={0} />);
    expect(container.firstChild).to.have.class('rs-calendar');
    expect(container.firstChild).to.have.tagName('DIV');
  });

  it('Should output a date', () => {
    render(
      <Calendar
        calendarDateRange={[parseISO('2017-08'), parseISO('2017-09')]}
        index={0}
        onChangeCalendarMonth={() => 1}
        format="yyyy-MM"
      />
    );

    expect(screen.getByText('2017-08')).to.exist;
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonthSpy = sinon.spy();
    render(
      <Calendar
        calendarDateRange={[parseISO('2017-08'), parseISO('2017-09')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonthSpy}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(onChangeCalendarMonthSpy).to.have.been.called;
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonthSpy = sinon.spy();
    render(
      <Calendar
        calendarDateRange={[parseISO('2017-08'), parseISO('2017-10')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonthSpy}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(onChangeCalendarMonthSpy).to.have.been.called;
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonthSpy = sinon.spy();
    const { container } = render(
      <Calendar
        calendarDateRange={[parseISO('2017-08'), parseISO('2017-10')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonthSpy}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

    fireEvent.click(container.querySelector('.rs-calendar-month-dropdown-cell') as HTMLElement);

    expect(onChangeCalendarMonthSpy).to.have.been.called;
  });
});
