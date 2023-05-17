import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import { parseISO } from '../../utils/dateUtils';
import { testStandardProps } from '@test/commonCases';
import sinon from 'sinon';
import CalendarContainer from '../CalendarContainer';

describe('CalendarContainer', () => {
  testStandardProps(
    <CalendarContainer calendarDate={new Date(2022, 10, 2)} format="yyyy-MM-dd" locale={{}} />
  );

  it('Should render a div with `calendar` class', () => {
    render(
      <CalendarContainer
        calendarDate={new Date(2021, 11, 24)}
        format="yyyy-MM-dd"
        locale={{}}
        data-testid="calendar"
      />
    );

    expect(screen.getByTestId('calendar')).to.have.class('rs-calendar');
  });

  it('Should output valid one day', () => {
    render(
      <CalendarContainer
        format="yyyy-MM-dd"
        calendarDate={parseISO('2018-07-01')}
        locale={{}}
        data-testid="calendar"
      />
    );
    expect(within(screen.getAllByRole('row')[1]).getAllByRole('gridcell')[0]).to.attribute(
      'aria-label',
      '01 Jul 2018'
    );
  });

  it('Should call `onSelect` callback with the date being clicked', () => {
    const onSelect = sinon.spy();

    render(
      <CalendarContainer
        format="yyyy-MM-dd"
        calendarDate={new Date(2021, 11, 24)}
        locale={{}}
        onSelect={onSelect}
      />
    );
    fireEvent.click(
      screen.getByRole('gridcell', { name: '24 Dec 2021' }).firstChild as HTMLElement
    );

    expect(onSelect).to.have.been.calledWith(new Date(2021, 11, 24));
  });

  it('Should render a button that can close the month view', () => {
    render(
      <CalendarContainer calendarDate={new Date(2022, 8, 15)} format="yyyy-MM-dd" locale={{}} />
    );
    expect(screen.queryByRole('button', { name: 'Collapse month view' })).not.to.exist;

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

    expect(screen.getByRole('button', { name: 'Collapse month view' })).to.have.class(
      'rs-calendar-btn-close'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Collapse month view' }));

    expect(screen.queryByRole('button', { name: 'Collapse month view' })).not.to.exist;
  });

  it('Should render a button that can close the time view', () => {
    render(
      <CalendarContainer
        calendarDate={new Date(2022, 8, 15, 0, 0, 0)}
        format="yyyy-MM-dd HH:mm:ss"
        locale={{}}
      />
    );
    expect(screen.queryByRole('button', { name: 'Collapse month view' })).not.to.exist;

    fireEvent.click(screen.getByRole('button', { name: '00:00:00' }));

    expect(screen.getByRole('button', { name: 'Collapse time view' })).to.have.class(
      'rs-calendar-btn-close'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Collapse time view' }));

    expect(screen.queryByRole('button', { name: 'Collapse month view' })).not.to.exist;
  });
});
