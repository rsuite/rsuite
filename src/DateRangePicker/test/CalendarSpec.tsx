import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import Calendar from '../Calendar';
import { parseISO } from '../../utils/dateUtils';
import { testStandardProps } from '@test/commonCases';

describe('DateRangePicker - Calendar', () => {
  testStandardProps(<Calendar index={0} onToggleMeridian={() => void 0} />);
  it('Should render a div with "rs-calendar" class', () => {
    const { container } = render(
      <Calendar onChangeCalendarMonth={() => 1} index={0} onToggleMeridian={() => void 0} />
    );
    expect(container.firstChild).to.have.class('rs-calendar');
    expect(container.firstChild).to.have.tagName('DIV');
  });

  it('Should output a date', () => {
    render(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-09')]}
        index={0}
        onChangeCalendarMonth={() => 1}
        format="yyyy-MM"
        onToggleMeridian={() => void 0}
      />
    );

    expect(screen.getByText('2017-08')).to.exist;
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonthSpy = sinon.spy();
    render(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-09')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonthSpy}
        onToggleMeridian={() => void 0}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(onChangeCalendarMonthSpy).to.have.been.called;
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonthSpy = sinon.spy();
    render(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-10')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonthSpy}
        onToggleMeridian={() => void 0}
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(onChangeCalendarMonthSpy).to.have.been.called;
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonthSpy = sinon.spy();
    const { container } = render(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-10')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonthSpy}
        onToggleMeridian={() => void 0}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    fireEvent.click(container.querySelector('.rs-calendar-month-dropdown-cell') as HTMLElement);

    expect(onChangeCalendarMonthSpy).to.have.been.called;
  });
});
