import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MonthDropdown from '../MonthDropdown';
import CalendarContext from '../CalendarContext';

describe('Calendar-MonthDropdown', () => {
  it('Should output year and month ', () => {
    const { getAllByRole } = render(
      <CalendarContext.Provider
        value={{
          date: new Date()
        }}
      >
        <MonthDropdown show />
      </CalendarContext.Provider>
    );

    expect(getAllByRole('rowheader', { hidden: true })).to.be.lengthOf(7);
    expect(getAllByRole('gridcell', { hidden: true })).to.be.lengthOf(7);
    expect(getAllByRole('gridcell', { hidden: true })[0].childNodes).to.be.lengthOf(12);
  });

  it('Should call `onChangeMonth` callback ', () => {
    const onChangeMonthSpy = sinon.spy();
    const { getByRole } = render(
      <CalendarContext.Provider value={{ onChangeMonth: onChangeMonthSpy, date: new Date() }}>
        <MonthDropdown show />
      </CalendarContext.Provider>
    );

    fireEvent.click(
      getByRole('menu', { hidden: true }).querySelector('.rs-calendar-month-dropdown-cell')
    );

    expect(onChangeMonthSpy).to.be.calledOnce;
  });

  it('Should disable month', () => {
    const { getByRole } = render(
      <CalendarContext.Provider value={{ date: new Date(2019, 8, 1) }}>
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

    const cells = getByRole('menu', { hidden: true })
      .querySelector('.rs-calendar-month-dropdown-year-active')
      .parentNode.querySelectorAll('.rs-calendar-month-dropdown-cell');

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
