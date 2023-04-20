import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';
import MonthDropdown from '../MonthDropdown';
import CalendarContext from '../CalendarContext';
import { DateUtils } from '../../utils';

describe('Calendar-MonthDropdown', () => {
  it('Should output year and month ', () => {
    const { getAllByRole } = render(
      <CalendarContext.Provider
        value={{
          date: new Date(),
          locale: {},
          isoWeek: false
        }}
      >
        <MonthDropdown show />
      </CalendarContext.Provider>
    );

    expect(getAllByRole('rowheader', { hidden: true })).to.be.lengthOf(7);
    expect(getAllByRole('gridcell', { hidden: true })).to.be.lengthOf(7);
    expect(getAllByRole('gridcell', { hidden: true })[0].childNodes).to.be.lengthOf(12);
  });

  it('Should output year and month of current year', () => {
    const { getAllByRole } = render(
      <CalendarContext.Provider
        value={{
          date: new Date(),
          locale: {},
          isoWeek: false
        }}
      >
        <MonthDropdown show limitStartYear={1} limitEndYear={1} />
      </CalendarContext.Provider>
    );
    const currentYear = DateUtils.getYear(new Date());
    expect(getAllByRole('row', { hidden: true })).to.be.lengthOf(1);
    expect(getAllByRole('rowheader', { hidden: true })[0].innerText).to.be.eq(
      currentYear.toString()
    );
  });

  it('Should output year and month of two previous years', () => {
    const { getAllByRole } = render(
      <CalendarContext.Provider
        value={{
          date: new Date(),
          locale: {},
          isoWeek: false
        }}
      >
        <MonthDropdown show limitStartYear={3} limitEndYear={0} />
      </CalendarContext.Provider>
    );
    const currentYear = DateUtils.getYear(new Date());
    expect(getAllByRole('row', { hidden: true })).to.be.lengthOf(2);
    expect(getAllByRole('rowheader', { hidden: true })[0].innerText).to.be.eq(
      (currentYear - 2).toString()
    );
    expect(getAllByRole('rowheader', { hidden: true })[1].innerText).to.be.eq(
      (currentYear - 1).toString()
    );
  });

  it('Should output a range of year and month between previous and next year', () => {
    const { getAllByRole } = render(
      <CalendarContext.Provider
        value={{
          date: new Date(),
          locale: {},
          isoWeek: false
        }}
      >
        <MonthDropdown show limitStartYear={2} limitEndYear={2} />
      </CalendarContext.Provider>
    );
    const currentYear = DateUtils.getYear(new Date());
    const nextYear = currentYear + 1;
    const previousYear = currentYear - 1;
    expect(getAllByRole('row', { hidden: true })).to.be.lengthOf(3);
    expect(getAllByRole('rowheader', { hidden: true })[0].innerText).to.be.eq(
      previousYear.toString()
    );
    expect(getAllByRole('rowheader', { hidden: true })[1].innerText).to.be.eq(
      currentYear.toString()
    );
    expect(getAllByRole('rowheader', { hidden: true })[2].innerText).to.be.eq(nextYear.toString());
  });

  it('Should call `onChangeMonth` callback ', () => {
    const onChangeMonthSpy = sinon.spy();
    const { getByRole } = render(
      <CalendarContext.Provider
        value={{
          onChangeMonth: onChangeMonthSpy,
          date: new Date(),
          locale: {},
          isoWeek: false
        }}
      >
        <MonthDropdown show />
      </CalendarContext.Provider>
    );

    fireEvent.click(
      getByRole('menu', { hidden: true }).querySelector(
        '.rs-calendar-month-dropdown-cell'
      ) as HTMLElement
    );

    expect(onChangeMonthSpy).to.be.calledOnce;
  });

  it('Should disable month', () => {
    const { getByRole } = render(
      <CalendarContext.Provider value={{ date: new Date(2019, 8, 1), locale: {}, isoWeek: false }}>
        <MonthDropdown
          show
          disabledMonth={d => {
            const today = new Date(2019, 8, 6);
            const d2 = new Date(today.getTime() - 240 * 60 * 60 * 1000);
            return d.getTime() > today.getTime() || d.getTime() < d2.getTime();
          }}
        />
      </CalendarContext.Provider>
    );

    const cells = (
      (
        getByRole('menu', { hidden: true }).querySelector(
          '.rs-calendar-month-dropdown-year-active'
        ) as HTMLElement
      ).parentNode as HTMLElement
    ).querySelectorAll('.rs-calendar-month-dropdown-cell');

    expect(cells[6]).to.have.class('disabled');
    expect(cells[7]).to.have.class('rs-calendar-month-dropdown-cell');
    expect(cells[8]).to.have.class('rs-calendar-month-dropdown-cell-active');
    expect(cells[9]).to.have.class('disabled');
  });

  it('Should have a custom className', () => {
    const { getByRole } = render(<MonthDropdown className="custom" />);
    expect(getByRole('menu', { hidden: true })).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const { getByRole } = render(<MonthDropdown style={{ fontSize: 12 }} />);

    expect(getByRole('menu', { hidden: true })).to.have.style('font-size', '12px');
  });

  it('Should have a custom className prefix', () => {
    const { getByRole } = render(<MonthDropdown classPrefix="custom-prefix" />);
    expect(getByRole('menu', { hidden: true })).to.have.class('rs-custom-prefix');
  });
});
