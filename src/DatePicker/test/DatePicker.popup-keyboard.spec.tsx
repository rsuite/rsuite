import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DatePicker from '..';
import TimePicker from '../../TimePicker';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

const initial = new Date(2022, 9, 14, 10, 20);

async function press(key: string) {
  await act(() => userEvent.keyboard(`{${key}>}`));
  act(() => vi.advanceTimersByTime(10));
  const heldFocus = document.activeElement;
  await act(() => userEvent.keyboard(`{/${key}}`));
  act(() => vi.advanceTimersByTime(10));
  return heldFocus;
}

afterEach(() => vi.useRealTimers());

describe.each([false, true])('DatePicker popup buttons controlled=%s', controlled => {
  it.each(
    ['Enter', 'Space'].flatMap(key =>
      [
        ['Previous month', 'Sep 2022'],
        ['Next month', 'Nov 2022'],
        ['Select month', 'Collapse month view'],
        ['Select time', 'Collapse time view']
      ].map(([name, result]) => ({ key, name, result }))
    )
  )('activates $name with $key without confirming the date', async ({ key, name, result }) => {
    const onOk = vi.fn();
    const onChange = vi.fn();
    const onClose = vi.fn();
    const keys: KeyboardEvent[] = [];
    const capture = (event: KeyboardEvent) => keys.push(event);
    const view = render(
      <CustomProvider reduceMotion>
        <DatePicker
          defaultOpen
          responsive={false}
          format="yyyy-MM-dd HH:mm"
          {...(controlled ? { value: initial } : { defaultValue: initial })}
          onOk={onOk}
          onChange={onChange}
          onClose={onClose}
        />
      </CustomProvider>
    );
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const button = screen.getByRole('button', { name });
    act(() => button.focus());
    button.addEventListener('keydown', capture);
    try {
      const heldFocus = await press(key);
      expect(heldFocus).toBe(button);
      expect(keys.map(event => event.key)).toEqual([key === 'Space' ? ' ' : key]);
      expect(keys.every(event => event.isTrusted)).toBe(true);
      expect(screen.getByRole('dialog')).to.exist;
      expect(onOk).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
      if (name.endsWith('month') && name !== 'Select month') {
        expect(screen.getByRole('button', { name: 'Select month' })).to.have.text(result);
      } else {
        expect(screen.getByRole('button', { name: result })).to.exist;
      }
    } finally {
      button.removeEventListener('keydown', capture);
      view.unmount();
      vi.useRealTimers();
    }
  });
});

describe('DatePicker popup key ownership', () => {
  it.each(['month', 'time'])('collapses the %s dropdown without confirming', async mode => {
    const onOk = vi.fn();
    render(
      <CustomProvider reduceMotion>
        <DatePicker
          defaultOpen
          responsive={false}
          format="yyyy-MM-dd HH:mm"
          defaultValue={initial}
          onOk={onOk}
        />
      </CustomProvider>
    );
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    await act(() => userEvent.click(screen.getByRole('button', { name: `Select ${mode}` })));
    const collapse = screen.getByRole('button', { name: `Collapse ${mode} view` });
    act(() => collapse.focus());
    await press('Enter');
    expect(screen.getByRole('dialog')).to.exist;
    expect(screen.queryByRole('button', { name: `Collapse ${mode} view` })).not.to.exist;
    expect(onOk).not.toHaveBeenCalled();
  });

  it.each(['DatePicker', 'TimePicker'])(
    'confirms %s exactly once from its native OK button',
    async name => {
      const Component = name === 'TimePicker' ? TimePicker : DatePicker;
      const onOk = vi.fn();
      const onClose = vi.fn();
      render(
        <CustomProvider reduceMotion>
          <Component
            defaultOpen
            responsive={false}
            defaultValue={initial}
            onOk={onOk}
            onClose={onClose}
          />
        </CustomProvider>
      );
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      act(() => screen.getByRole('button', { name: 'OK' }).focus());
      await press('Enter');
      expect(onOk).toHaveBeenCalledExactlyOnceWith(initial, expect.anything());
      expect(onOk.mock.calls[0][1].type).toBe('click');
      expect(onOk.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
      expect(onClose).toHaveBeenCalledOnce();
      expect(screen.queryByRole('dialog')).not.to.exist;
    }
  );

  it.each(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'])(
    'leaves %s on the toolbar button',
    async key => {
      const onOk = vi.fn();
      render(
        <CustomProvider reduceMotion>
          <DatePicker defaultOpen responsive={false} defaultValue={initial} onOk={onOk} />
        </CustomProvider>
      );
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const button = screen.getByRole('button', { name: 'Select month' });
      act(() => button.focus());
      const heldFocus = await press(key);
      expect(heldFocus).toBe(button);
      expect(button).to.have.focus;
      expect(screen.getByRole('gridcell', { name: '14 Oct 2022' })).to.have.attribute(
        'aria-selected',
        'true'
      );
      expect(onOk).not.toHaveBeenCalled();
    }
  );

  it.each(['yyyy-MM-dd', 'yyyy-MM'])('allows Tab to leave the selected %s cell', async format => {
    render(
      <CustomProvider reduceMotion>
        <DatePicker
          defaultOpen
          responsive={false}
          format={format}
          defaultValue={initial}
          ranges={[]}
        />
      </CustomProvider>
    );
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const cell = screen.getByRole('gridcell', {
      name: format === 'yyyy-MM' ? 'Oct 2022' : '14 Oct 2022'
    });
    act(() => cell.focus());
    await press('Tab');
    expect(screen.getByRole('button', { name: 'OK' })).to.have.focus;
    expect(screen.getByRole('dialog')).to.exist;
  });

  it('preserves a custom cell input and its native arrow keys', async () => {
    const onOk = vi.fn();
    render(
      <CustomProvider reduceMotion>
        <DatePicker
          defaultOpen
          responsive={false}
          defaultValue={initial}
          onOk={onOk}
          renderCell={date =>
            date.getDate() === 14 ? <input aria-label="Day note" defaultValue="note" /> : null
          }
        />
      </CustomProvider>
    );
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const input = screen.getByRole('textbox', { name: 'Day note' }) as HTMLInputElement;
    act(() => {
      input.focus();
      input.setSelectionRange(2, 2);
    });
    await press('ArrowLeft');
    expect(input).to.have.focus;
    expect(input.selectionStart).toBe(1);
    await press('Enter');
    expect(screen.getByRole('dialog')).to.exist;
    expect(onOk).not.toHaveBeenCalled();
    expect(screen.getByRole('gridcell', { name: '14 Oct 2022' })).to.have.attribute(
      'aria-selected',
      'true'
    );
  });

  it('respects a prevented grid event', async () => {
    const onOk = vi.fn();
    render(
      <div onKeyDownCapture={event => event.preventDefault()}>
        <CustomProvider reduceMotion>
          <DatePicker defaultOpen responsive={false} defaultValue={initial} onOk={onOk} />
        </CustomProvider>
      </div>
    );
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const cell = screen.getByRole('gridcell', { name: '14 Oct 2022' });
    act(() => cell.focus());
    await press('ArrowRight');
    await press('Enter');
    expect(cell).to.have.attribute('aria-selected', 'true');
    expect(screen.getByRole('dialog')).to.exist;
    expect(onOk).not.toHaveBeenCalled();
  });
});

describe.each(['yyyy-MM-dd', 'yyyy-MM'])('DatePicker %s grid keyboard', format => {
  it.each(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'])(
    'keeps %s navigation and Enter confirmation',
    async key => {
      const delta = {
        ArrowLeft: -1,
        ArrowRight: 1,
        ArrowUp: format === 'yyyy-MM' ? -6 : -7,
        ArrowDown: format === 'yyyy-MM' ? 6 : 7
      }[key]!;
      const expected = new Date(initial);
      if (format === 'yyyy-MM') expected.setMonth(expected.getMonth() + delta);
      else expected.setDate(expected.getDate() + delta);
      const onOk = vi.fn();
      const onChange = vi.fn();
      render(
        <CustomProvider reduceMotion>
          <DatePicker
            defaultOpen
            responsive={false}
            defaultValue={initial}
            format={format}
            onOk={onOk}
            onChange={onChange}
          />
        </CustomProvider>
      );
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      const cell = screen.getByRole('gridcell', {
        name: format === 'yyyy-MM' ? 'Oct 2022' : '14 Oct 2022'
      });
      act(() => cell.focus());
      await press(key);
      expect(document.activeElement).to.have.attribute('role', 'gridcell');
      expect(document.activeElement).to.have.attribute('aria-selected', 'true');
      expect(document.activeElement).not.toBe(cell);
      expect(onOk).not.toHaveBeenCalled();
      await press('Enter');
      expect(onOk).toHaveBeenCalledExactlyOnceWith(expected, expect.anything());
      expect(onChange).toHaveBeenCalledExactlyOnceWith(expected, expect.anything());
      expect(screen.queryByRole('dialog')).not.to.exist;
    }
  );
});

describe('DatePicker popup selection boundaries', () => {
  it.each(['DatePicker', 'TimePicker'])(
    'preserves %s time option confirmation without changing the date',
    async name => {
      const Component = name === 'TimePicker' ? TimePicker : DatePicker;
      const onOk = vi.fn();
      render(
        <CustomProvider reduceMotion>
          <Component
            defaultOpen
            responsive={false}
            defaultValue={initial}
            format={name === 'TimePicker' ? 'HH:mm' : 'yyyy-MM-dd HH:mm'}
            onOk={onOk}
          />
        </CustomProvider>
      );
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      if (name === 'DatePicker')
        await act(() => userEvent.click(screen.getByRole('button', { name: 'Select time' })));
      const option = screen.getByRole('option', { name: '10 hours' });
      act(() => option.focus());
      await press('ArrowRight');
      expect(option).to.have.focus;
      await press('Enter');
      expect(onOk).toHaveBeenCalledExactlyOnceWith(initial, expect.anything());
      expect(screen.queryByRole('dialog')).not.to.exist;
    }
  );

  it.each(['Enter', 'Space'])('activates a shortcut with %s without invoking OK', async key => {
    const onOk = vi.fn();
    const onChange = vi.fn();
    const onShortcutClick = vi.fn();
    const selected = new Date(2022, 9, 20, 10, 20);
    render(
      <CustomProvider reduceMotion>
        <DatePicker
          defaultOpen
          responsive={false}
          defaultValue={initial}
          ranges={[{ label: 'Appointment', value: selected }]}
          onOk={onOk}
          onChange={onChange}
          onShortcutClick={onShortcutClick}
        />
      </CustomProvider>
    );
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    act(() => screen.getByRole('button', { name: 'Appointment' }).focus());
    await press(key);
    expect(onChange).toHaveBeenCalledExactlyOnceWith(selected, expect.anything());
    expect(onShortcutClick).toHaveBeenCalledOnce();
    expect(onShortcutClick.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
    expect(onOk).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.to.exist;
  });

  it('keeps a disabled date out of native arrow navigation', async () => {
    render(
      <CustomProvider reduceMotion>
        <DatePicker
          defaultOpen
          responsive={false}
          defaultValue={initial}
          shouldDisableDate={date => date.getDate() === 15}
        />
      </CustomProvider>
    );
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const cell = screen.getByRole('gridcell', { name: '14 Oct 2022' });
    act(() => cell.focus());
    await press('ArrowRight');
    expect(cell).to.have.focus;
    expect(cell).to.have.attribute('aria-selected', 'true');
    expect(screen.getByRole('gridcell', { name: '15 Oct 2022' })).to.have.attribute(
      'aria-disabled',
      'true'
    );
  });
});

it('does not change the hidden date when the TimePicker popup itself receives arrow keys', async () => {
  const onOk = vi.fn();
  render(
    <CustomProvider reduceMotion>
      <TimePicker defaultOpen responsive={false} defaultValue={initial} onOk={onOk} />
    </CustomProvider>
  );
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  act(() => screen.getByRole('dialog').focus());
  await press('ArrowDown');
  await press('Enter');
  expect(onOk).toHaveBeenCalledExactlyOnceWith(initial, expect.anything());
  expect(screen.queryByRole('dialog')).not.to.exist;
});
