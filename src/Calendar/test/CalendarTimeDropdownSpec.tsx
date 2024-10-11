import React from 'react';
import sinon from 'sinon';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import TimeDropdown from '../TimeDropdown';
import { CalendarProvider } from '../CalendarProvider';
import en_US from '../../locales/en_US';

describe('Calendar - TimeDropdown', () => {
  testStandardProps(<TimeDropdown show />);

  it('Should render a div with `time-dropdown` class', () => {
    render(<TimeDropdown />);

    expect(screen.getByRole('group', { hidden: true })).to.have.class('rs-calendar-time-dropdown');
  });

  it('Should render hours, minutes and seconds', () => {
    render(
      <CalendarProvider
        value={{
          format: 'HH:mm:ss',
          date: new Date(2022, 10, 2),
          locale: en_US.Calendar,
          isoWeek: false,
          weekStart: 0
        }}
      >
        <TimeDropdown />
      </CalendarProvider>
    );

    expect(screen.queryByText('Hours')).to.exist;
    expect(screen.queryByText('Minutes')).to.exist;
    expect(screen.queryByText('Seconds')).to.exist;
  });

  it('Should render hours and minutes', () => {
    render(
      <CalendarProvider
        value={{
          format: 'HH:mm',
          date: new Date(2022, 10, 2),
          locale: en_US.Calendar,
          isoWeek: false,
          weekStart: 0
        }}
      >
        <TimeDropdown />
      </CalendarProvider>
    );

    expect(screen.queryByText('Hours')).to.exist;
    expect(screen.queryByText('Minutes')).to.exist;
    expect(screen.queryByText('Seconds')).to.not.exist;
  });

  it('Should only render hours', () => {
    render(
      <CalendarProvider
        value={{
          format: 'HH',
          date: new Date(2022, 10, 2),
          locale: en_US.Calendar,
          isoWeek: false,
          weekStart: 0
        }}
      >
        <TimeDropdown />
      </CalendarProvider>
    );

    expect(screen.queryByText('Hours')).to.exist;
    expect(screen.queryByText('Minutes')).to.not.exist;
    expect(screen.queryByText('Seconds')).to.not.exist;
  });

  it('Should call `onChangeTime` callback', () => {
    const onChangeTime = sinon.spy();

    render(
      <CalendarProvider
        value={{
          onChangeTime,
          date: new Date(),
          format: 'HH',
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <TimeDropdown />
      </CalendarProvider>
    );

    fireEvent.click(screen.getByRole('option', { name: '1 hours', hidden: true }));

    expect(onChangeTime).to.have.been.calledOnce;
  });

  it('Should set aria-disabled attribute for disabled hours', () => {
    render(
      <CalendarProvider
        value={{
          format: 'HH',
          date: new Date(2022, 10, 2),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <TimeDropdown
          disabledHours={h => {
            return h > 10;
          }}
        />
      </CalendarProvider>
    );

    screen.getAllByRole('option', { hidden: true }).forEach((option, index) => {
      expect(option).to.have.attribute('aria-disabled', index > 10 ? 'true' : 'false');
    });
  });

  it('Should not render hours hidden by `hideHours`', () => {
    render(
      <CalendarProvider
        value={{
          format: 'HH',
          date: new Date(2022, 10, 2),
          locale: {},
          isoWeek: false,
          weekStart: 0
        }}
      >
        <TimeDropdown
          hideHours={h => {
            return h > 10;
          }}
        />
      </CalendarProvider>
    );

    expect(screen.getAllByRole('option', { hidden: true })).to.have.length(11);
  });
});
