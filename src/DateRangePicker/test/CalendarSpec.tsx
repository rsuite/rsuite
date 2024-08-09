import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { parseISO } from 'date-fns';
import Calendar from '../Calendar';
import { testStandardProps } from '@test/utils';

describe('DateRangePicker - Calendar', () => {
  testStandardProps(<Calendar index={0} onToggleMeridian={() => void 0} />);

  it('Should render a div with "rs-calendar" class', () => {
    const { container } = render(
      <Calendar onChangeCalendarMonth={() => 1} index={0} onToggleMeridian={() => void 0} />
    );
    expect(container.firstChild).to.have.class('rs-calendar');
    expect(container.firstChild).to.have.tagName('DIV');
  });

  it('Should render a calendar with the correct month', () => {
    render(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-09')]}
        index={0}
        onChangeCalendarMonth={() => 1}
        format="yyyy-MM"
        onToggleMeridian={() => void 0}
      />
    );

    expect(screen.getByRole('button', { name: 'Select month' })).to.have.text('Aug 2017');
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonth = sinon.spy();
    render(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-09')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonth}
        onToggleMeridian={() => void 0}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));

    expect(onChangeCalendarMonth).to.have.been.called;
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonth = sinon.spy();
    render(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-10')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonth}
        onToggleMeridian={() => void 0}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));

    expect(onChangeCalendarMonth).to.have.been.called;
  });

  it('Should call `onChangeCalendarMonth` callback', () => {
    const onChangeCalendarMonth = sinon.spy();
    const { container } = render(
      <Calendar
        calendarDate={[parseISO('2017-08'), parseISO('2017-10')]}
        index={0}
        onChangeCalendarMonth={onChangeCalendarMonth}
        onToggleMeridian={() => void 0}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    fireEvent.click(container.querySelector('.rs-calendar-month-dropdown-cell') as HTMLElement);

    expect(onChangeCalendarMonth).to.have.been.called;
  });
});
