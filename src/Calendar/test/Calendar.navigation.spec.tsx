import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import Calendar from '..';
import CalendarContainer from '../CalendarContainer';
import DatePicker from '../../DatePicker';
import DateRangePicker from '../../DateRangePicker';
import CustomProvider from '../../CustomProvider';
import { enGB, zhCN, type CalendarLocale } from '../../locales';
import '../styles/index.scss';
import '../../DatePicker/styles/index.scss';
import '../../DateRangePicker/styles/index.scss';

const initial = new Date(2022, 9, 14, 10, 20);
const labels = {
  previousMonth: 'Earlier month',
  nextMonth: 'Later month',
  selectMonth: 'Choose month',
  selectTime: 'Choose time'
};
const chinese = {
  previousMonth: '上个月',
  nextMonth: '下个月',
  selectMonth: '选择月份',
  selectTime: '选择时间'
};

function Fixture({ name, locale }: { name: string; locale?: CalendarLocale }) {
  if (name === 'Calendar') return <Calendar defaultValue={initial} locale={locale} />;
  if (name === 'DatePicker') {
    return (
      <DatePicker
        defaultValue={initial}
        defaultOpen
        responsive={false}
        format="yyyy-MM-dd HH:mm"
        locale={locale}
      />
    );
  }
  return (
    <DateRangePicker
      defaultValue={[initial, new Date(2022, 10, 15, 11, 20)]}
      defaultOpen
      responsive={false}
      format="yyyy-MM-dd HH:mm"
      locale={locale}
    />
  );
}

describe.each(['Calendar', 'DatePicker', 'DateRangePicker'])('%s navigation labels', name => {
  it.each(['bundle', 'provider defaults', 'instance'])(
    'uses %s labels during native navigation',
    async source => {
      const expected = source === 'bundle' ? chinese : labels;
      render(
        <CustomProvider
          reduceMotion
          locale={zhCN}
          components={
            source === 'provider defaults'
              ? {
                  Calendar: { defaultProps: { locale: labels } },
                  DatePicker: { defaultProps: { locale: labels } },
                  DateRangePicker: { defaultProps: { locale: labels } }
                }
              : undefined
          }
        >
          <Fixture name={name} locale={source === 'instance' ? labels : undefined} />
        </CustomProvider>
      );
      const title = screen.getAllByRole('button', { name: expected.selectMonth })[0];
      const before = title.textContent;
      const next = screen.getAllByRole('button', { name: expected.nextMonth })[0];
      const clicks: MouseEvent[] = [];
      const capture = (event: MouseEvent) => clicks.push(event);
      next.addEventListener('click', capture);
      try {
        await act(() => userEvent.click(next));
        expect(title.textContent).not.toBe(before);
        expect(clicks).toHaveLength(1);
        expect(clicks[0].isTrusted).toBe(true);
        const previous = screen.getAllByRole('button', { name: expected.previousMonth })[0];
        await act(() => userEvent.click(previous));
        expect(title.textContent).toBe(before);
        await act(() => userEvent.click(title));
        expect(screen.getByRole('button', { name: 'Collapse month view' })).to.exist;
        await act(() => userEvent.click(title));
        expect(screen.queryByRole('button', { name: 'Collapse month view' })).not.to.exist;
        if (name !== 'Calendar') {
          const time = screen.getAllByRole('button', { name: expected.selectTime })[0];
          await act(() => userEvent.click(time));
          expect(screen.getByRole('button', { name: 'Collapse time view' })).to.exist;
        }
      } finally {
        next.removeEventListener('click', capture);
      }
    }
  );

  it('keeps default names for legacy locale objects', () => {
    render(
      <CustomProvider
        reduceMotion
        locale={{
          ...enGB,
          Calendar: enGB.DateTimeFormats,
          DatePicker: enGB.DateTimeFormats,
          DateRangePicker: { ...enGB.DateTimeFormats, last7Days: 'Last week' }
        }}
      >
        <Fixture name={name} />
      </CustomProvider>
    );
    for (const label of ['Previous month', 'Next month', 'Select month']) {
      expect(screen.getAllByRole('button', { name: label })).not.toHaveLength(0);
    }
    if (name !== 'Calendar') {
      expect(screen.getAllByRole('button', { name: 'Select time' })).not.toHaveLength(0);
    }
  });

  it('merges partial instance translations with the provider locale', () => {
    render(
      <CustomProvider reduceMotion locale={zhCN}>
        <Fixture name={name} locale={{ nextMonth: 'More dates' }} />
      </CustomProvider>
    );
    expect(screen.getAllByRole('button', { name: 'More dates' })).not.toHaveLength(0);
    expect(screen.getAllByRole('button', { name: chinese.previousMonth })).not.toHaveLength(0);
    expect(screen.getAllByRole('button', { name: chinese.selectMonth })).not.toHaveLength(0);
  });
});

describe('Calendar navigation disabled state', () => {
  it.each(['backward', 'forward'])(
    'exposes disabled %s navigation, skips it with Tab and restores it',
    async direction => {
      const onMove = vi.fn();
      const props = {
        calendarDate: initial,
        format: 'yyyy-MM-dd',
        locale: {},
        onMoveBackward: onMove,
        onMoveForward: onMove
      };
      const fixture = (disabled: boolean) => (
        <>
          <button>Before calendar</button>
          <CalendarContainer
            {...props}
            disabledBackward={direction === 'backward' && disabled}
            disabledForward={direction === 'forward' && disabled}
          />
          <button>After calendar</button>
        </>
      );
      const { rerender } = render(fixture(true));
      const target = screen.getByRole('button', {
        name: direction === 'backward' ? 'Previous month' : 'Next month'
      }) as HTMLButtonElement;
      expect(target.disabled).toBe(true);
      expect(target).to.have.attribute('aria-disabled', 'true');
      await act(() => userEvent.click(target, { force: true }));
      expect(onMove).not.toHaveBeenCalled();
      const before = screen.getByRole('button', {
        name: direction === 'backward' ? 'Before calendar' : 'Select month'
      });
      act(() => before.focus());
      await act(() => userEvent.tab());
      expect(target).not.to.have.focus;
      expect(
        direction === 'backward'
          ? screen.getByRole('button', { name: 'Select month' })
          : screen.getByRole('gridcell', { name: '14 Oct 2022' })
      ).to.have.focus;
      expect(onMove).not.toHaveBeenCalled();
      rerender(fixture(false));
      expect(target.disabled).toBe(false);
      act(() => target.focus());
      await act(() => userEvent.keyboard('{Enter}'));
      expect(onMove).toHaveBeenCalledExactlyOnceWith(
        new Date(2022, direction === 'backward' ? 8 : 10, 14, 10, 20)
      );
    }
  );
});
