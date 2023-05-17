import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import TableRow from '../TableRow';
import { getDate, format } from '../../utils/dateUtils';
import CalendarContext from '../CalendarContext';
import Sinon from 'sinon';
import { testStandardProps } from '@test/commonCases';

describe('Calendar-TableRow', () => {
  testStandardProps(<TableRow />);

  it('Should render a div with `table-row` class', () => {
    const { container } = render(<TableRow />);

    expect(container.firstChild).to.match('div.rs-calendar-table-row');
  });

  it('Should be active today', () => {
    // FIXME-Doma
    // TableRow should always require dates specified
    render(<TableRow />);

    expect(screen.getByTitle(/today/i)).to.have.text(getDate(new Date()) + '');
  });

  it('Should call `onSelect` callback', () => {
    const onSelect = Sinon.spy();
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarContext.Provider
        value={{ onSelect, date: new Date(2022, 10, 2), locale: {}, isoWeek: false }}
      >
        <TableRow ref={ref} />
      </CalendarContext.Provider>
    );
    ReactTestUtils.Simulate.click(
      // eslint-disable-next-line testing-library/no-node-access
      (ref.current as HTMLDivElement).querySelector(
        '.rs-calendar-table-cell .rs-calendar-table-cell-content'
      ) as HTMLElement
    );

    expect(onSelect).to.have.been.calledOnce;
  });

  it('Should render a week number', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarContext.Provider
        value={{ showWeekNumbers: true, date: new Date(2022, 10, 2), locale: {}, isoWeek: false }}
      >
        <TableRow ref={ref} />
      </CalendarContext.Provider>
    );
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      (ref.current as HTMLDivElement).querySelector(
        '.rs-calendar-table-cell-week-number'
      ) as HTMLElement
    ).to.have.text(format(new Date(), 'w'));
  });

  it('Should render a ISO week number', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarContext.Provider
        value={{
          showWeekNumbers: true,
          isoWeek: true,
          date: new Date(2022, 10, 2),
          locale: {}
        }}
      >
        <TableRow ref={ref} />
      </CalendarContext.Provider>
    );
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      (ref.current as HTMLDivElement).querySelector(
        '.rs-calendar-table-cell-week-number'
      ) as HTMLElement
    ).to.have.text(format(new Date(), 'I'));
  });
});
