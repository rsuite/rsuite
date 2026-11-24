import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import TimePicker from '../TimePicker';
import TimeRangePicker from '../../TimeRangePicker';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';
import '../../TimeRangePicker/styles/index.scss';

const initial = new Date(2022, 9, 14, 10, 20, 30);
const end = new Date(2022, 9, 14, 12, 40, 50);
const click = (element: HTMLElement) => act(() => userEvent.click(element));
const units = [
  { unit: 'hours', disabledValue: 11, enabledValue: 12 },
  { unit: 'minutes', disabledValue: 21, enabledValue: 22 },
  { unit: 'seconds', disabledValue: 31, enabledValue: 32 }
] as const;

describe.each(['single', 'range'])('Time picker public props (%s)', kind => {
  it.each(units)(
    'disables $unit and passes each calendar date to the callback',
    async ({ unit, disabledValue, enabledValue }) => {
      const disabled = vi.fn((value: number) => value === disabledValue);
      const onOk = vi.fn();
      const shared = {
        defaultOpen: true,
        responsive: false,
        format: 'HH:mm:ss',
        shouldDisableHour: unit === 'hours' ? disabled : undefined,
        shouldDisableMinute: unit === 'minutes' ? disabled : undefined,
        shouldDisableSecond: unit === 'seconds' ? disabled : undefined,
        onOk
      };
      render(
        <CustomProvider reduceMotion>
          {kind === 'single' ? (
            <TimePicker {...shared} defaultValue={initial} />
          ) : (
            <TimeRangePicker {...shared} defaultValue={[initial, end]} />
          )}
        </CustomProvider>
      );
      const dates = kind === 'single' ? [initial] : [initial, end];
      dates.forEach(date => expect(disabled).toHaveBeenCalledWith(disabledValue, date));
      const options = screen.getAllByRole('option', { name: `${disabledValue} ${unit}` });
      expect(options).toHaveLength(dates.length);
      for (const option of options) {
        expect(option).to.have.attribute('aria-disabled', 'true');
        await act(() => userEvent.hover(option));
        // The option deliberately has aria-disabled; send the native pointer event anyway.
        await act(() => userEvent.click(option, { force: true }));
        expect(option).to.have.attribute('aria-selected', 'false');
      }
      expect(onOk).not.toHaveBeenCalled();
      for (const option of screen.getAllByRole('option', { name: `${enabledValue} ${unit}` })) {
        expect(option).not.to.have.attribute('aria-disabled', 'true');
        await click(option);
        expect(option).to.have.attribute('aria-selected', 'true');
      }
      await click(screen.getByRole('button', { name: 'OK' }));
      const expected = dates.map(date => {
        const value = new Date(date);
        if (unit === 'hours') value.setHours(enabledValue);
        else if (unit === 'minutes') value.setMinutes(enabledValue);
        else value.setSeconds(enabledValue);
        return value;
      });
      expect(onOk).toHaveBeenCalledExactlyOnceWith(
        kind === 'single' ? expected[0] : expected,
        expect.objectContaining({ nativeEvent: expect.objectContaining({ isTrusted: true }) })
      );
    }
  );
});

describe('TimePicker shortcuts', () => {
  it.each(['static', 'dynamic', 'clear'])('accepts a %s shortcut', async kind => {
    const value = kind === 'clear' ? null : new Date(2022, 9, 14, 15, 45, 25);
    const calculate = vi.fn(() => value);
    const onChange = vi.fn();
    const onShortcutClick = vi.fn();
    render(
      <CustomProvider reduceMotion>
        <TimePicker
          defaultOpen
          responsive={false}
          defaultValue={initial}
          format="HH:mm:ss"
          ranges={[
            {
              label: 'Custom time',
              value: kind === 'dynamic' ? calculate : value,
              closeOverlay: true
            }
          ]}
          onChange={onChange}
          onShortcutClick={onShortcutClick}
        />
      </CustomProvider>
    );
    expect(screen.queryByRole('button', { name: 'Now' })).not.to.exist;
    if (kind === 'dynamic') expect(calculate).toHaveBeenCalledWith(initial);
    await click(screen.getByRole('button', { name: 'Custom time' }));
    expect(screen.getByRole('textbox')).to.have.value(kind === 'clear' ? '' : '15:45:25');
    expect(screen.queryByRole('dialog')).not.to.exist;
    expect(onChange).toHaveBeenCalledExactlyOnceWith(value, expect.anything());
    expect(onShortcutClick).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ label: 'Custom time', value }),
      expect.objectContaining({ nativeEvent: expect.objectContaining({ isTrusted: true }) })
    );
    if (kind === 'dynamic') expect(calculate).toHaveBeenCalled();
  });

  it('allows an empty shortcut list to remove the default Now action', () => {
    render(<TimePicker defaultOpen responsive={false} ranges={[]} />);
    expect(screen.queryByRole('button', { name: 'Now' })).not.to.exist;
    expect(screen.getByRole('button', { name: 'OK' })).to.exist;
  });
});
