import React from 'react';
import sinon from 'sinon';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Header from '../CalendarHeader';
import { CalendarProvider } from '../CalendarProvider';

describe('Calendar-Header', () => {
  testStandardProps(<Header />);

  it('Should render a div with "calendar-header" class', () => {
    const { container } = render(<Header />);

    expect(container.firstChild).to.match('div.rs-calendar-header');
  });

  it('Should call `onMoveForward` callback', () => {
    const onMoveForward = sinon.spy();

    render(<Header showMonth onMoveForward={onMoveForward} />);

    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(onMoveForward).to.have.been.calledOnce;
  });

  it('Should call `onMoveBackward` callback', () => {
    const onMoveBackward = sinon.spy();

    render(<Header showMonth onMoveBackward={onMoveBackward} />);

    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));

    expect(onMoveBackward).to.have.been.calledOnce;
  });

  it('Should call `onToggleMonthDropdown` callback', () => {
    const onToggleMonthDropdown = sinon.spy();

    render(<Header showMonth onToggleMonthDropdown={onToggleMonthDropdown} />);

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

    expect(onToggleMonthDropdown).to.have.been.calledOnce;
  });

  it('Should call `onToggleTimeDropdown` callback', () => {
    const onToggleTimeDropdown = sinon.spy();

    render(
      <CalendarProvider
        value={{ date: new Date(), format: 'HH:mm:ss', locale: {}, isoWeek: false, weekStart: 0 }}
      >
        <Header showTime onToggleTimeDropdown={onToggleTimeDropdown} />
      </CalendarProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select time' }));

    expect(onToggleTimeDropdown).to.have.been.calledOnce;
  });
});
