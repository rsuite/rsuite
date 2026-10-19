import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import DatePicker from '../../DatePicker';
import TimePicker from '../../TimePicker';
import DateRangePicker from '../../DateRangePicker';
import TimeRangePicker from '../../TimeRangePicker';
import CustomProvider from '../../CustomProvider';
import '../../DatePicker/styles/index.scss';
import '../../DateRangePicker/styles/index.scss';

const start = new Date(2022, 9, 14, 9, 20, 30);
const end = new Date(2022, 9, 15, 14, 40, 45);
const press = (key: string) => act(() => userEvent.keyboard(key));

describe.each(['DatePicker', 'TimePicker', 'DateRangePicker', 'TimeRangePicker'])(
  '%s keyboard time constraints',
  name => {
    it.each(
      ['hidden', 'disabled'].flatMap(kind =>
        [false, true].map(showMeridiem => ({ kind, showMeridiem }))
      )
    )(
      'skips dynamically $kind options, twelve-hour=$showMeridiem',
      async ({ kind, showMeridiem }) => {
        const range = name.includes('Range');
        const onChange = vi.fn();
        const hour = (value: number, date: Date) =>
          value === (showMeridiem ? date.getHours() % 12 : date.getHours()) + 1;
        const minute = (value: number, date: Date) => value === date.getMinutes() + 1;
        const second = (value: number, date: Date) => value === date.getSeconds() + 1;
        const props = {
          defaultOpen: true,
          responsive: false,
          showMeridiem,
          format: `${name.startsWith('Date') ? 'yyyy-MM-dd ' : ''}${showMeridiem ? 'hh:mm:ss aa' : 'HH:mm:ss'}`,
          onChange,
          ...(kind === 'hidden'
            ? { hideHours: hour, hideMinutes: minute, hideSeconds: second }
            : { shouldDisableHour: hour, shouldDisableMinute: minute, shouldDisableSecond: second })
        };
        const Component = name === 'TimePicker' ? TimePicker : DatePicker;
        const RangeComponent = name === 'TimeRangePicker' ? TimeRangePicker : DateRangePicker;
        render(
          <CustomProvider reduceMotion>
            {range ? (
              <RangeComponent {...props} defaultValue={[start, end]} />
            ) : (
              <Component {...props} defaultValue={start} />
            )}
          </CustomProvider>
        );
        if (name.startsWith('Date')) {
          for (const button of screen.getAllByRole('button', { name: 'Select time' })) {
            await act(() => userEvent.click(button));
          }
        }

        const dates = range ? [start, end] : [start];
        for (const [index, date] of dates.entries()) {
          for (const [unit, value] of [
            ['minutes', date.getMinutes()],
            ['seconds', date.getSeconds()],
            ['hours', showMeridiem ? date.getHours() % 12 : date.getHours()]
          ] as const) {
            const column = screen.getAllByRole('listbox', { name: `Select ${unit}` })[index];
            const blocked = within(column).queryByRole('option', { name: `${value + 1} ${unit}` });
            if (kind === 'hidden') expect(blocked).not.to.exist;
            else expect(blocked).to.have.attribute('aria-disabled', 'true');
            act(() =>
              within(column)
                .getByRole('option', { name: `${value} ${unit}` })
                .focus()
            );
            await press('{ArrowDown}');
            const selected = within(column).getByRole('option', { name: `${value + 2} ${unit}` });
            expect(selected).to.have.focus;
            expect(selected).to.have.attribute('aria-selected', 'true');
            const nextBlocked = within(column).queryByRole('option', {
              name: `${value + 3} ${unit}`
            });
            if (kind === 'hidden') expect(nextBlocked).not.to.exist;
            else if (unit !== 'hours' || !showMeridiem || value + 3 < 12) {
              expect(nextBlocked).to.have.attribute('aria-disabled', 'true');
            }
          }
        }

        expect(onChange).not.toHaveBeenCalled();
        act(() => screen.getByRole('button', { name: 'OK' }).focus());
        await press('{Enter}');
        const expected = dates.map(date => {
          const next = new Date(date);
          next.setHours(date.getHours() + 2, date.getMinutes() + 2, date.getSeconds() + 2);
          return next;
        });
        expect(onChange).toHaveBeenCalledExactlyOnceWith(
          range ? expected : expected[0],
          expect.anything()
        );
        expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
      }
    );
  }
);
