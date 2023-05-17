import React from 'react';
import { render } from '@testing-library/react';
import TableHeaderRow from '../TableHeaderRow';
import CalendarContext from '../CalendarContext';
import { testStandardProps } from '@test/commonCases';

describe('Calendar-TableHeaderRow', () => {
  testStandardProps(<TableHeaderRow />);

  it('Should render a div with "table-header-row" class', () => {
    const { container } = render(<TableHeaderRow />);

    expect(container.firstChild).to.match('div.rs-calendar-table-header-row');
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
    assert.equal((ref.current as HTMLDivElement).childNodes.length, 8);
  });
});
