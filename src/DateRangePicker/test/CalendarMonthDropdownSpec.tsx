import React from 'react';
import { render } from '@testing-library/react';
import CalendarContext from '../../Calendar/CalendarContext';
import MonthDropdown from '../../Calendar/MonthDropdown';
import { DateUtils } from '../../utils';

describe('DateRangePicker-MonthDropdown', () => {
  it('Should output year and month of previous and current year', () => {
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
    const previousYear = currentYear - 1;
    expect(getAllByRole('row', { hidden: true })).to.be.lengthOf(2);
    expect(getAllByRole('rowheader', { hidden: true })[0].innerText).to.be.eq(
      previousYear.toString()
    );
    expect(getAllByRole('rowheader', { hidden: true })[1].innerText).to.be.eq(
      currentYear.toString()
    );
  });
});
