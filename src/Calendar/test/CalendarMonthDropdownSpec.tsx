import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { getYear } from 'date-fns';
import sinon from 'sinon';
import MonthDropdown from '../MonthDropdown';
import { CalendarProvider } from '../CalendarProvider';
import { testStandardProps } from '@test/utils';

describe('Calendar-MonthDropdown', () => {
  testStandardProps(<MonthDropdown show />);

  it('Should output year and month ', () => {
    render(
      <CalendarProvider
        value={{
          date: new Date(),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <MonthDropdown show />
      </CalendarProvider>
    );

    expect(screen.getAllByRole('rowheader', { hidden: true })).to.be.lengthOf(7);
    expect(screen.getAllByRole('gridcell', { hidden: true })).to.be.lengthOf(7 * 12);
  });

  it('Should output year and month of current year', () => {
    render(
      <CalendarProvider
        value={{
          date: new Date(),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <MonthDropdown show limitStartYear={1} limitEndYear={1} />
      </CalendarProvider>
    );
    const currentYear = getYear(new Date());
    expect(screen.getAllByRole('row', { hidden: true })).to.be.lengthOf(1);
    expect(screen.getAllByRole('rowheader', { hidden: true })[0].innerText).to.be.eq(
      currentYear.toString()
    );
  });

  it('Should output year and month of two previous years', () => {
    render(
      <CalendarProvider
        value={{
          date: new Date(),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <MonthDropdown show limitStartYear={3} limitEndYear={0} />
      </CalendarProvider>
    );
    const currentYear = getYear(new Date());
    expect(screen.getAllByRole('row', { hidden: true })).to.be.lengthOf(2);
    expect(screen.getAllByRole('rowheader', { hidden: true })[0].innerText).to.be.eq(
      (currentYear - 2).toString()
    );
    expect(screen.getAllByRole('rowheader', { hidden: true })[1].innerText).to.be.eq(
      (currentYear - 1).toString()
    );
  });

  it('Should output a range of year and month between previous and next year', () => {
    render(
      <CalendarProvider
        value={{
          date: new Date(),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <MonthDropdown show limitStartYear={2} limitEndYear={2} />
      </CalendarProvider>
    );
    const currentYear = getYear(new Date());
    const nextYear = currentYear + 1;
    const previousYear = currentYear - 1;
    expect(screen.getAllByRole('row', { hidden: true })).to.be.lengthOf(3);
    expect(screen.getAllByRole('rowheader', { hidden: true })[0].innerText).to.be.eq(
      previousYear.toString()
    );
    expect(screen.getAllByRole('rowheader', { hidden: true })[1].innerText).to.be.eq(
      currentYear.toString()
    );
    expect(screen.getAllByRole('rowheader', { hidden: true })[2].innerText).to.be.eq(
      nextYear.toString()
    );
  });

  it('Should call `onChangeMonth` callback ', () => {
    const onChangeMonthSpy = sinon.spy();
    render(
      <CalendarProvider
        value={{
          onChangeMonth: onChangeMonthSpy,
          date: new Date(),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <MonthDropdown show />
      </CalendarProvider>
    );

    fireEvent.click(
      within(screen.getByRole('grid', { hidden: true })).queryAllByRole('gridcell', {
        hidden: true
      })[0]
    );

    expect(onChangeMonthSpy).to.be.calledOnce;
  });

  it('Should disable month', () => {
    render(
      <CalendarProvider
        value={{ date: new Date(2019, 8, 1), locale: {}, isoWeek: false, weekStart: 0 }}
      >
        <MonthDropdown
          show
          disabledMonth={d => {
            const today = new Date(2019, 8, 6);
            const d2 = new Date(today.getTime() - 240 * 60 * 60 * 1000);
            return d.getTime() > today.getTime() || d.getTime() < d2.getTime();
          }}
        />
      </CalendarProvider>
    );

    const cells = within(screen.getByRole('row', { name: '2019', hidden: true })).getAllByRole(
      'gridcell',
      { hidden: true }
    );

    expect(cells[6]).to.have.class('disabled');
    expect(cells[7]).to.have.class('rs-calendar-month-dropdown-cell');
    expect(cells[8]).to.have.class('rs-calendar-month-dropdown-cell-active');
    expect(cells[9]).to.have.class('disabled');
  });
});
