import React from 'react';
import sinon from 'sinon';
import GridRow from '../Grid/GridRow';
import { getDate, format } from 'date-fns';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarProvider } from '../CalendarProvider';
import { testStandardProps } from '@test/utils';
import { isToday } from 'date-fns';

describe('Calendar-GridRow', () => {
  testStandardProps(<GridRow />);

  it('Should render a div with `table-row` class', () => {
    render(<GridRow />);
    expect(screen.getByRole('row')).to.have.class('rs-calendar-table-row');
  });

  it('Should be active today', () => {
    // FIXME-Doma
    // GridRow should always require dates specified
    render(<GridRow />);

    expect(screen.getByTitle(/today/i)).to.have.text(getDate(new Date()) + '');
  });

  it('Should call `onSelect` callback', () => {
    const onSelect = sinon.spy();
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarProvider
        value={{ onSelect, date: new Date(2022, 10, 2), locale: {}, isoWeek: false, weekStart: 0 }}
      >
        <GridRow ref={ref} />
      </CalendarProvider>
    );
    fireEvent.click(
      (ref.current as HTMLDivElement).querySelector(
        '.rs-calendar-table-cell .rs-calendar-table-cell-content'
      ) as HTMLElement
    );

    expect(onSelect).to.have.been.calledOnce;
  });

  it('Should render a week number', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarProvider
        value={{
          showWeekNumbers: true,
          date: new Date(2022, 10, 2),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <GridRow ref={ref} />
      </CalendarProvider>
    );
    expect(
      (ref.current as HTMLDivElement).querySelector(
        '.rs-calendar-table-cell-week-number'
      ) as HTMLElement
    ).to.have.text(format(new Date(), 'w'));
  });

  it('Should render a ISO week number', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarProvider
        value={{
          showWeekNumbers: true,
          isoWeek: true,
          date: new Date(2022, 10, 2),
          weekStart: 0,
          locale: {}
        }}
      >
        <GridRow ref={ref} />
      </CalendarProvider>
    );
    expect(
      (ref.current as HTMLDivElement).querySelector(
        '.rs-calendar-table-cell-week-number'
      ) as HTMLElement
    ).to.have.text(format(new Date(), 'I'));
  });

  it('Should have a additional className', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarProvider
        value={{
          showWeekNumbers: true,
          isoWeek: true,
          date: new Date(),
          weekStart: 0,
          locale: {},
          cellClassName: (date: Date) => {
            if (isToday(date)) {
              return 'custom-cell';
            }
          }
        }}
      >
        <GridRow ref={ref} />
      </CalendarProvider>
    );

    expect(
      (ref.current as HTMLDivElement).querySelector(
        '.rs-calendar-table-cell-is-today'
      ) as HTMLElement
    ).to.have.class('custom-cell');
  });

  describe('Accessibility', () => {
    it('Should have a role attribute', () => {
      render(<GridRow />);
      expect(screen.getByRole('row')).to.have.attribute('role', 'row');
    });
  });
});
