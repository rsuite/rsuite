import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import TableRow from '../TableRow';
import { getDate, format } from '../../utils/dateUtils';
import CalendarContext from '../CalendarContext';
import Sinon from 'sinon';

describe('Calendar-TableRow', () => {
  it('Should render a div with `table-row` class', () => {
    const instance = getDOMNode(<TableRow />);
    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\btable-row\b/));
  });

  it('Should be active today', () => {
    const instance = getDOMNode(<TableRow />);

    assert.equal(
      (instance.querySelector('.rs-calendar-table-cell-is-today') as HTMLElement).textContent,
      getDate(new Date()) + ''
    );
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
      (ref.current as HTMLDivElement).querySelector(
        '.rs-calendar-table-cell .rs-calendar-table-cell-content'
      ) as HTMLElement
    );

    expect(onSelect).to.have.been.calledOnce;
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TableRow className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TableRow style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TableRow classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
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
    assert.equal(
      (
        (ref.current as HTMLDivElement).querySelector(
          '.rs-calendar-table-cell-week-number'
        ) as HTMLElement
      ).textContent,
      format(new Date(), 'w')
    );
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
    assert.equal(
      (
        (ref.current as HTMLDivElement).querySelector(
          '.rs-calendar-table-cell-week-number'
        ) as HTMLElement
      ).textContent,
      format(new Date(), 'I')
    );
  });
});
