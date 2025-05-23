import React from 'react';
import Header from '../CalendarHeader';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';
import { CalendarProvider } from '../CalendarProvider';

describe('Calendar-Header', () => {
  testStandardProps(<Header />);

  it('Should render a div with "calendar-header" class', () => {
    const { container } = render(<Header />);

    expect(container.firstChild).to.match('div.rs-calendar-header');
  });

  it('Should call `onMoveForward` callback', () => {
    const onMoveForward = vi.fn();

    render(<Header showMonth onMoveForward={onMoveForward} />);

    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(onMoveForward).toHaveBeenCalledTimes(1);
  });

  it('Should call `onMoveBackward` callback', () => {
    const onMoveBackward = vi.fn();

    render(<Header showMonth onMoveBackward={onMoveBackward} />);

    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));

    expect(onMoveBackward).toHaveBeenCalledTimes(1);
  });

  it('Should call `onToggleMonthDropdown` callback', () => {
    const onToggleMonthDropdown = vi.fn();

    render(<Header showMonth onToggleMonthDropdown={onToggleMonthDropdown} />);

    fireEvent.click(screen.getByRole('button', { name: 'Select month' }));

    expect(onToggleMonthDropdown).toHaveBeenCalledTimes(1);
  });

  it('Should call `onToggleTimeDropdown` callback', () => {
    const onToggleTimeDropdown = vi.fn();

    render(
      <CalendarProvider
        value={{ date: new Date(), format: 'HH:mm:ss', locale: {}, isoWeek: false, weekStart: 0 }}
      >
        <Header showTime onToggleTimeDropdown={onToggleTimeDropdown} />
      </CalendarProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select time' }));

    expect(onToggleTimeDropdown).toHaveBeenCalledTimes(1);
  });
});
