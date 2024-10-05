import React from 'react';
import { render, screen } from '@testing-library/react';
import GirdHeaderRow from '../Grid/GridHeaderRow';
import { CalendarProvider } from '../CalendarProvider';
import { testStandardProps } from '@test/utils';

describe('Calendar-GirdHeaderRow', () => {
  testStandardProps(<GirdHeaderRow />);

  it('Should render a div with "table-header-row" class', () => {
    render(<GirdHeaderRow />);

    expect(screen.getByRole('row')).to.have.class('rs-calendar-table-header-row');
  });

  it('Should render an empty cell for a week number column', () => {
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
        <GirdHeaderRow ref={ref} />
      </CalendarProvider>
    );

    expect((ref.current as HTMLDivElement).childNodes).to.be.length(8);
  });

  describe('Accessibility', () => {
    it('Should have a columnheader attribute on header cell ', () => {
      render(<GirdHeaderRow />);
      expect(screen.queryAllByRole('columnheader')).to.be.length(7);
    });

    it('Should have a aria-label attribute on header cell ', () => {
      render(<GirdHeaderRow />);
      expect(screen.getByLabelText(/sunday/i)).to.exist;
    });
  });
});
