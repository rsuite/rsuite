import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import CalendarContainer from '../CalendarContainer';
import DatePicker from '../../DatePicker';
import TimePicker from '../../TimePicker';
import DateRangePicker from '../../DateRangePicker';
import TimeRangePicker from '../../TimeRangePicker';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';
import '../../DatePicker/styles/index.scss';
import '../../DateRangePicker/styles/index.scss';

const initial = new Date(2022, 9, 14, 10, 20, 30);

const press = (key: string) => act(() => userEvent.keyboard(key));
const focus = (element: HTMLElement) => act(() => element.focus());
const option = (name: string) => screen.getByRole('option', { name });

describe.each(['DatePicker', 'TimePicker'])('%s time keyboard', name => {
  it.each(
    [false, true].flatMap(controlled =>
      [
        ['ArrowDown', 11],
        ['ArrowUp', 9],
        ['Home', 0],
        ['End', 23]
      ].map(([key, hour]) => ({ controlled, key, hour: hour as number }))
    )
  )('selects with $key and confirms, controlled=$controlled', async ({ controlled, key, hour }) => {
    const Component = name === 'TimePicker' ? TimePicker : DatePicker;
    const onSelect = vi.fn();
    const onChange = vi.fn();
    const onOk = vi.fn();
    render(
      <CustomProvider reduceMotion>
        <Component
          defaultOpen
          responsive={false}
          format={name === 'TimePicker' ? 'HH:mm:ss' : 'yyyy-MM-dd HH:mm:ss'}
          {...(controlled ? { value: initial } : { defaultValue: initial })}
          onSelect={onSelect}
          onChange={onChange}
          onOk={onOk}
        />
      </CustomProvider>
    );
    if (name === 'DatePicker') {
      await act(() => userEvent.click(screen.getByRole('button', { name: 'Select time' })));
    }
    focus(option('10 hours'));
    await press(`{${key}}`);
    const next = new Date(initial);
    next.setHours(hour);
    expect(option(`${hour} hours`)).to.have.focus;
    expect(option(`${hour} hours`)).to.have.attribute('aria-selected', 'true');
    expect(onSelect).toHaveBeenCalledExactlyOnceWith(next, expect.anything());
    expect(onSelect.mock.calls[0][1].type).toBe('keydown');
    expect(onSelect.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
    expect(onOk).not.toHaveBeenCalled();
    await press('{Enter}');
    expect(onOk).toHaveBeenCalledExactlyOnceWith(next, expect.anything());
    expect(onChange).toHaveBeenCalledExactlyOnceWith(next, expect.anything());
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
    expect(screen.queryByRole('dialog')).not.to.exist;
  });
});

describe('Time listbox focus and typeahead', () => {
  it.each(
    ['minutes', 'seconds'].flatMap(unit =>
      [
        ['ArrowDown', 1],
        ['ArrowUp', -1],
        ['Home', 0],
        ['End', 59]
      ].map(([key, value]) => ({ unit, key, value: value as number }))
    )
  )('selects $unit with $key and retains other fields', async ({ unit, key, value }) => {
    const onOk = vi.fn();
    render(
      <TimePicker
        defaultOpen
        responsive={false}
        format="HH:mm:ss"
        defaultValue={initial}
        onOk={onOk}
      />
    );
    const start = unit === 'minutes' ? 20 : 30;
    const next = key === 'Home' || key === 'End' ? value : start + value;
    focus(option(`${start} ${unit}`));
    await press(`{${key}}`);
    expect(option(`${next} ${unit}`)).to.have.focus;
    await press('{Enter}');
    const expected = new Date(initial);
    if (unit === 'minutes') expected.setMinutes(next);
    else expected.setSeconds(next);
    expect(onOk).toHaveBeenCalledExactlyOnceWith(expected, expect.anything());
  });

  it.each(['ArrowDown', 'End'])('selects PM with %s', async key => {
    render(
      <TimePicker
        defaultOpen
        responsive={false}
        format="hh:mm aa"
        showMeridiem
        defaultValue={initial}
      />
    );
    focus(option('AM'));
    await press(`{${key}}`);
    expect(option('PM')).to.have.focus;
    expect(option('PM')).to.have.attribute('aria-selected', 'true');
    await press('{Home}');
    expect(option('AM')).to.have.focus;
    expect(option('AM')).to.have.attribute('aria-selected', 'true');
  });

  it('matches displayed 12 in the twelve-hour column', async () => {
    const onOk = vi.fn();
    render(
      <TimePicker
        defaultOpen
        responsive={false}
        format="hh:mm:ss aa"
        showMeridiem
        defaultValue={initial}
        onOk={onOk}
      />
    );
    focus(option('10 hours'));
    await press('12');
    expect(option('0 hours')).to.have.focus;
    expect(option('0 hours')).to.have.attribute('aria-selected', 'true');
    await press('{Enter}');
    const expected = new Date(initial);
    expected.setHours(0);
    expect(onOk).toHaveBeenCalledExactlyOnceWith(expected, expect.anything());
  });

  it('opens from the native button onto the selected hour and navigates', async () => {
    render(
      <CustomProvider reduceMotion>
        <TimePicker openOnInputClick={false} responsive={false} defaultValue={initial} />
      </CustomProvider>
    );
    focus(screen.getByRole('button', { name: 'Open picker' }));
    await press('{Enter}');
    await expect.poll(() => document.activeElement).toBe(option('10 hours'));
    await press('{ArrowDown}');
    expect(option('11 hours')).to.have.focus;
  });

  it('retains the native mouse event on pointer selection', async () => {
    const onSelect = vi.fn();
    render(
      <TimePicker
        defaultOpen
        responsive={false}
        format="HH:mm:ss"
        defaultValue={initial}
        onSelect={onSelect}
      />
    );
    await act(() => userEvent.click(option('11 hours')));
    const expected = new Date(initial);
    expected.setHours(11);
    expect(onSelect).toHaveBeenCalledExactlyOnceWith(expected, expect.anything());
    expect(onSelect.mock.calls[0][1].type).toBe('click');
    expect(onSelect.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
  });

  it('tabs through one option per column and then the OK button', async () => {
    render(
      <CustomProvider reduceMotion>
        <TimePicker defaultOpen responsive={false} format="HH:mm:ss" defaultValue={initial} />
      </CustomProvider>
    );
    const hours = screen.getByRole('listbox', { name: 'Select hours' });
    expect(
      within(hours)
        .getAllByRole('option')
        .filter(el => el.tabIndex === 0)
    ).toEqual([option('10 hours')]);
    focus(option('10 hours'));
    await press('{Tab}');
    expect(option('20 minutes')).to.have.focus;
    await press('{Tab}');
    expect(option('30 seconds')).to.have.focus;
    await press('{Tab}');
    expect(screen.getByRole('button', { name: 'Now' })).to.have.focus;
    await press('{Tab}');
    expect(screen.getByRole('button', { name: 'OK' })).to.have.focus;
    await press('{Shift>}{Tab}{/Shift}');
    expect(screen.getByRole('button', { name: 'Now' })).to.have.focus;
    await press('{Shift>}{Tab}{/Shift}');
    expect(option('30 seconds')).to.have.focus;
  });

  it.each(['05', '55', '59'])('selects minutes by typing %s', async text => {
    render(<TimePicker defaultOpen responsive={false} format="HH:mm:ss" defaultValue={initial} />);
    focus(option('20 minutes'));
    await press(text);
    expect(option(`${Number(text)} minutes`)).to.have.focus;
    expect(option(`${Number(text)} minutes`)).to.have.attribute('aria-selected', 'true');
  });

  it('selects meridiem with a letter and keeps the date and smaller units', async () => {
    const onOk = vi.fn();
    render(
      <TimePicker
        defaultOpen
        responsive={false}
        format="hh:mm:ss aa"
        showMeridiem
        defaultValue={initial}
        onOk={onOk}
      />
    );
    focus(option('AM'));
    await press('p');
    expect(option('PM')).to.have.focus;
    expect(option('PM')).to.have.attribute('aria-selected', 'true');
    await press('{Enter}');
    const expected = new Date(initial);
    expected.setHours(22);
    expect(onOk).toHaveBeenCalledExactlyOnceWith(expected, expect.anything());
  });

  it('clamps at the column ends without duplicate selection callbacks', async () => {
    const onSelect = vi.fn();
    render(
      <TimePicker defaultOpen responsive={false} defaultValue={initial} onSelect={onSelect} />
    );
    focus(option('10 hours'));
    await press('{End}');
    onSelect.mockClear();
    await press('{ArrowDown}');
    expect(option('23 hours')).to.have.focus;
    expect(onSelect).not.toHaveBeenCalled();
    await press('{Home}');
    onSelect.mockClear();
    await press('{ArrowUp}');
    expect(option('0 hours')).to.have.focus;
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('does not handle modified shortcuts or prevented events', async () => {
    const onSelect = vi.fn();
    render(
      <div
        onKeyDownCapture={event => {
          if (event.key === 'End') event.preventDefault();
        }}
      >
        <TimePicker defaultOpen responsive={false} defaultValue={initial} onSelect={onSelect} />
      </div>
    );
    focus(option('10 hours'));
    await press('{Control>}{ArrowDown}{/Control}{End}');
    expect(option('10 hours')).to.have.focus;
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('keeps a keyboard-selected option visible in its scrollable column', async () => {
    render(<TimePicker defaultOpen responsive={false} defaultValue={initial} />);
    focus(option('20 minutes'));
    await press('{End}');
    const last = option('59 minutes');
    const list = screen.getByRole('listbox', { name: 'Select minutes' });
    expect(last).to.have.focus;
    expect(last.matches(':focus-visible')).toBe(true);
    expect(getComputedStyle(last).outlineWidth).toBe('2px');
    await expect
      .poll(() => {
        const item = last.getBoundingClientRect();
        const box = list.getBoundingClientRect();
        return item.top >= box.top && item.bottom <= box.bottom;
      })
      .toBe(true);
  });
});

describe('Time column eligibility', () => {
  it('keeps one tab stop when a controlled calendar declines selection', async () => {
    const onChangeTime = vi.fn();
    render(<CalendarContainer calendarDate={initial} format="HH:mm" onChangeTime={onChangeTime} />);
    focus(option('10 hours'));
    await press('{ArrowDown}');
    expect(option('11 hours')).to.have.focus;
    expect(option('11 hours')).to.have.attribute('tabindex', '0');
    expect(option('10 hours')).to.have.attribute('aria-selected', 'true');
    expect(option('10 hours')).to.have.attribute('tabindex', '-1');
    expect(onChangeTime).toHaveBeenCalledTimes(1);
    await press('{Tab}');
    expect(option('20 minutes')).to.have.focus;
    await press('{Shift>}{Tab}{/Shift}');
    expect(option('10 hours')).to.have.focus;
  });

  it('focuses an unavailable column without selecting a disabled option', async () => {
    const onChangeTime = vi.fn();
    render(
      <CalendarContainer
        calendarDate={initial}
        format="HH:mm"
        disabledHours={() => true}
        onChangeTime={onChangeTime}
      />
    );
    const hours = screen.getByRole('listbox', { name: 'Select hours' });
    focus(hours);
    await press('{Home}{End}{ArrowDown}1{Space}');
    expect(hours).to.have.focus;
    expect(hours).to.have.attribute('aria-disabled', 'true');
    expect(onChangeTime).not.toHaveBeenCalled();
    expect(
      within(hours)
        .getAllByRole('option')
        .every(el => el.tabIndex === -1)
    ).toBe(true);
    await press('{Tab}');
    expect(option('20 minutes')).to.have.focus;
  });

  it('selects an unselected fallback option with Space', async () => {
    const onChangeTime = vi.fn();
    render(
      <CalendarContainer
        calendarDate={initial}
        format="HH:mm"
        hideHours={h => h === 10}
        onChangeTime={onChangeTime}
      />
    );
    focus(option('0 hours'));
    await press('{Space}');
    expect(onChangeTime).toHaveBeenCalledTimes(1);
    expect(onChangeTime.mock.calls[0][0].getHours()).toBe(0);
    expect(onChangeTime.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
  });

  it('recovers focus when the current hour becomes disabled', async () => {
    const view = render(<CalendarContainer calendarDate={initial} format="HH:mm" />);
    focus(option('10 hours'));
    view.rerender(
      <CalendarContainer calendarDate={initial} format="HH:mm" disabledHours={h => h === 10} />
    );
    expect(option('0 hours')).to.have.focus;
  });

  it('does not take focus from another control when options change', () => {
    const view = render(
      <>
        <button>Other</button>
        <CalendarContainer calendarDate={initial} format="HH:mm" />
      </>
    );
    focus(option('10 hours'));
    focus(screen.getByRole('button', { name: 'Other' }));
    view.rerender(
      <>
        <button>Other</button>
        <CalendarContainer calendarDate={initial} format="HH:mm" hideHours={h => h === 10} />
      </>
    );
    expect(screen.getByRole('button', { name: 'Other' })).to.have.focus;
    expect(option('0 hours')).to.have.attribute('tabindex', '0');
  });

  it('skips hidden and disabled hours and retains a trusted keyboard event', async () => {
    const changed = vi.fn();
    function Calendar() {
      const [date, setDate] = React.useState(initial);
      return (
        <CalendarContainer
          calendarDate={date}
          format="HH:mm:ss"
          disabledHours={h => h === 11}
          hideHours={h => h === 12}
          onChangeTime={(next, event) => {
            changed(next, event);
            setDate(next);
          }}
        />
      );
    }
    render(<Calendar />);
    focus(option('10 hours'));
    await press('{ArrowDown}');
    expect(option('13 hours')).to.have.focus;
    expect(option('13 hours')).to.have.attribute('aria-selected', 'true');
    expect(changed).toHaveBeenCalledTimes(1);
    expect(changed.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
    expect(changed.mock.calls[0][1].key).toBe('ArrowDown');
    expect(option('11 hours')).to.have.attribute('tabindex', '-1');
    expect(screen.queryByRole('option', { name: '12 hours' })).not.to.exist;
  });

  it.each(['hidden', 'disabled'])(
    'exposes the first eligible tab stop when the selected hour is %s',
    kind => {
      render(
        <CalendarContainer
          calendarDate={initial}
          format="HH:mm"
          disabledHours={h => h === 0 || (kind === 'disabled' && h === 10)}
          hideHours={h => kind === 'hidden' && h === 10}
        />
      );
      const hours = screen.getByRole('listbox', { name: 'Select hours' });
      expect(
        within(hours)
          .getAllByRole('option')
          .filter(el => el.tabIndex === 0)
      ).toEqual([option('1 hours')]);
    }
  );

  it('allows an empty column to be passed with Tab', async () => {
    render(<CalendarContainer calendarDate={initial} format="HH:mm" hideHours={() => true} />);
    const hours = screen.getByRole('listbox', { name: 'Select hours' });
    focus(hours);
    await press('{ArrowDown}{Tab}');
    expect(option('20 minutes')).to.have.focus;
  });

  it('recovers focus when the focused option is removed', async () => {
    const view = render(<CalendarContainer calendarDate={initial} format="HH:mm" />);
    focus(option('10 hours'));
    view.rerender(
      <CalendarContainer calendarDate={initial} format="HH:mm" hideHours={h => h === 10} />
    );
    expect(option('0 hours')).to.have.focus;
    expect(option('0 hours')).to.have.attribute('tabindex', '0');
  });
});

describe.each(['DateRangePicker', 'TimeRangePicker'])('%s time keyboard', name => {
  it('edits both endpoints and commits them with the native OK button', async () => {
    const Component = name === 'TimeRangePicker' ? TimeRangePicker : DateRangePicker;
    const end = new Date(2022, 9, 15, 16, 40, 30);
    const onChange = vi.fn();
    render(
      <CustomProvider reduceMotion>
        <Component
          defaultOpen
          responsive={false}
          format={name === 'TimeRangePicker' ? 'HH:mm:ss' : 'yyyy-MM-dd HH:mm:ss'}
          defaultValue={[initial, end]}
          onChange={onChange}
        />
      </CustomProvider>
    );
    if (name === 'DateRangePicker') {
      const buttons = screen.getAllByRole('button', { name: 'Select time' });
      for (const button of buttons) await act(() => userEvent.click(button));
    }
    const columns = screen.getAllByRole('listbox', { name: 'Select hours' });
    focus(within(columns[0]).getByRole('option', { name: '10 hours' }));
    await press('{ArrowDown}');
    focus(within(columns[1]).getByRole('option', { name: '16 hours' }));
    await press('{ArrowUp}');
    expect(onChange).not.toHaveBeenCalled();
    focus(screen.getByRole('button', { name: 'OK' }));
    await press('{Enter}');
    const expectedStart = new Date(initial);
    expectedStart.setHours(11);
    const expectedEnd = new Date(end);
    expectedEnd.setHours(15);
    expect(onChange).toHaveBeenCalledExactlyOnceWith(
      [expectedStart, expectedEnd],
      expect.anything()
    );
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
  });
});
