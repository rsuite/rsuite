import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { parseISO } from '../../utils/dateUtils';
import { testStandardProps } from '@test/commonCases';
import CalendarContainer from '../CalendarContainer';

describe('CalendarContainer', () => {
  testStandardProps(<CalendarContainer />);

  it('Should render a div with `calendar` class', () => {
    const { getByTestId } = render(
      <CalendarContainer calendarDate={new Date(2021, 11, 24)} data-testid="calendar" />
    );

    expect(getByTestId('calendar')).to.have.class('rs-calendar');
  });

  it('Should output valid one day', () => {
    const { getAllByRole } = render(
      <CalendarContainer
        format="yyyy-MM-dd"
        calendarDate={parseISO('2018-07-01')}
        data-testid="calendar"
      />
    );
    expect(getAllByRole('row')[1].children[0]).to.attribute('aria-label', '01 Jul 2018');
  });

  it('Should call `onSelect` callback with the date being clicked', () => {
    const onSelect = sinon.spy();

    const { getByRole } = render(
      <CalendarContainer
        format="yyyy-MM-dd"
        calendarDate={new Date(2021, 11, 24)}
        onSelect={onSelect}
      />
    );
    fireEvent.click(getByRole('gridcell', { name: '24 Dec 2021' }).firstChild);

    expect(onSelect).to.have.been.calledWith(new Date(2021, 11, 24));
  });

  it('Should render a button that can close the month view', () => {
    const { container, getByRole } = render(
      <CalendarContainer calendarDate={new Date(2022, 8, 15)} format="yyyy-MM-dd" />
    );
    expect(container.querySelector('.rs-calendar-btn-close')).to.be.null;

    fireEvent.click(getByRole('button', { name: '2022-09' }));

    expect(getByRole('button', { name: 'Collapse month view' })).to.have.class(
      'rs-calendar-btn-close'
    );

    fireEvent.click(getByRole('button', { name: 'Collapse month view' }));

    expect(container.querySelector('.rs-calendar-btn-close')).to.be.null;
  });

  it('Should render a button that can close the time view', () => {
    const { container, getByRole } = render(
      <CalendarContainer
        calendarDate={new Date(2022, 8, 15, 0, 0, 0)}
        format="yyyy-MM-dd HH:mm:ss"
      />
    );
    expect(container.querySelector('.rs-calendar-btn-close')).to.be.null;

    fireEvent.click(getByRole('button', { name: '00:00:00' }));

    expect(getByRole('button', { name: 'Collapse time view' })).to.have.class(
      'rs-calendar-btn-close'
    );

    fireEvent.click(getByRole('button', { name: 'Collapse time view' }));

    expect(container.querySelector('.rs-calendar-btn-close')).to.be.null;
  });
});
