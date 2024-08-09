import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MonthDropdownItem from '../MonthDropdownItem';
import { format } from 'date-fns';
import CalendarContext from '../CalendarContext';
import Sinon from 'sinon';
import { testStandardProps } from '@test/utils';

describe('Calendar-MonthDropdownItem', () => {
  testStandardProps(<MonthDropdownItem />);

  it('Should render a month', () => {
    render(<MonthDropdownItem year={2024} month={1} />);

    expect(screen.getByRole('gridcell')).to.have.text('01');
  });

  it('Should call `onSelect` callback with correct date', () => {
    const onChangeMonth = Sinon.spy();

    render(
      <CalendarContext.Provider
        value={{ date: new Date(), onChangeMonth, locale: {}, isoWeek: false, weekStart: 0 }}
      >
        <MonthDropdownItem month={1} year={2017} />
      </CalendarContext.Provider>
    );

    fireEvent.click(screen.getByRole('gridcell'));

    expect(onChangeMonth).to.have.been.calledOnce;
    expect(format(onChangeMonth.firstCall.args[0], 'yyyy-MM')).to.equal('2017-01');
  });

  describe('Accessibility', () => {
    it('Should have a aria-disabled attribute', () => {
      render(<MonthDropdownItem disabled />);

      expect(screen.getByRole('gridcell')).to.have.attribute('aria-disabled');
    });

    it('Should have a aria-selected attribute', () => {
      render(<MonthDropdownItem active />);

      expect(screen.getByRole('gridcell')).to.have.attribute('aria-selected');
    });

    it('Should have a aria-label attribute', () => {
      render(
        <CalendarContext.Provider
          value={{ date: new Date(), locale: {}, isoWeek: false, weekStart: 0 }}
        >
          <MonthDropdownItem month={1} year={2023} />
        </CalendarContext.Provider>
      );
      expect(screen.getByRole('gridcell')).to.have.attribute('aria-label', 'Jan 2023');
    });

    it('Should have a tabIndex attribute', () => {
      const { rerender } = render(<MonthDropdownItem />);

      expect(screen.getByRole('gridcell')).to.have.attribute('tabindex', '-1');

      rerender(<MonthDropdownItem active />);

      expect(screen.getByRole('gridcell')).to.have.attribute('tabindex', '0');
    });
  });
});
