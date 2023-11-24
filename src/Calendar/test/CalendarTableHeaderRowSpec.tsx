import React from 'react';
import { render, screen } from '@testing-library/react';
import TableHeaderRow from '../TableHeaderRow';
import CalendarContext from '../CalendarContext';
import { testStandardProps } from '@test/commonCases';

describe('Calendar-TableHeaderRow', () => {
  testStandardProps(<TableHeaderRow />);

  it('Should render a div with "table-header-row" class', () => {
    render(<TableHeaderRow />);

    expect(screen.getByRole('row')).to.have.class('rs-calendar-table-header-row');
  });

  it('Should render an empty cell for a week number column', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CalendarContext.Provider
        value={{ showWeekNumbers: true, date: new Date(2022, 10, 2), locale: {}, isoWeek: false }}
      >
        <TableHeaderRow ref={ref} />
      </CalendarContext.Provider>
    );

    expect((ref.current as HTMLDivElement).childNodes).to.be.length(8);
  });

  describe('Accessibility', () => {
    it('Should have a columnheader attribute on header cell ', () => {
      render(<TableHeaderRow />);
      expect(screen.queryAllByRole('columnheader')).to.be.length(7);
    });

    it('Should have a aria-label attribute on header cell ', () => {
      render(<TableHeaderRow />);
      expect(screen.getByLabelText(/sunday/i)).to.exist;
    });
  });
});
