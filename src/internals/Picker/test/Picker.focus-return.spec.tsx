import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import TreePicker from '../../../TreePicker';
import CheckTreePicker from '../../../CheckTreePicker';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import '../../../SelectPicker/styles/index.scss';
import '../../../CheckPicker/styles/index.scss';
import '../../../TreePicker/styles/index.scss';
import '../../../CheckTreePicker/styles/index.scss';
import '../../../Cascader/styles/index.scss';
import '../../../MultiCascader/styles/index.scss';
import '../../../Drawer/styles/index.scss';
import Modal from '../../../Modal';
import Drawer from '../../../Drawer';
import InputPicker from '../../../InputPicker';
import TagPicker from '../../../TagPicker';
import TagInput from '../../../TagInput';
import '../../../Modal/styles/index.scss';
import '../../../InputPicker/styles/index.scss';
import '../../../TagPicker/styles/index.scss';
import '../../../TagInput/styles/index.scss';

const data = [
  { label: 'Alpha', value: 'a' },
  { label: 'Beta', value: 'b' }
];
const pickers = [
  { name: 'SelectPicker', Component: SelectPicker },
  { name: 'CheckPicker', Component: CheckPicker },
  { name: 'TreePicker', Component: TreePicker },
  { name: 'CheckTreePicker', Component: CheckTreePicker },
  { name: 'Cascader', Component: Cascader },
  { name: 'MultiCascader', Component: MultiCascader }
];

async function focus(element: HTMLElement) {
  await act(async () => element.focus());
  expect(element).toHaveFocus();
}

async function press(key: string) {
  await act(async () => userEvent.keyboard(key));
}

describe.each(pickers)('$name keyboard focus return', ({ Component }) => {
  const Picker: React.ElementType = Component;

  it.each([false, true])('returns Escape to the toggle with controlled=%s', async controlled => {
    const entered = vi.fn();
    const exited = vi.fn();
    const keyDown = vi.fn();
    function Example() {
      const [open, setOpen] = React.useState(true);
      return (
        <Picker
          data={data}
          responsive={false}
          {...(controlled ? { open } : { defaultOpen: true })}
          onClose={() => setOpen(false)}
          onEntered={entered}
          onExited={exited}
          onKeyDown={keyDown}
        />
      );
    }
    render(<Example />);
    await waitFor(() => expect(entered).toHaveBeenCalledOnce());
    const toggle = screen.getByRole('combobox');
    await focus(screen.getByRole('searchbox'));
    await press('{Escape}');
    await waitFor(() => expect(exited).toHaveBeenCalledOnce());
    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(keyDown).toHaveBeenCalledOnce();
    expect(keyDown.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
  });

  it.each(['forward', 'backward'])('continues %s Tab beside the closed picker', async direction => {
    const entered = vi.fn();
    const exited = vi.fn();
    const keyDown = vi.fn();
    render(
      <>
        <button>Before picker</button>
        <Picker
          data={data}
          defaultOpen
          responsive={false}
          onEntered={entered}
          onExited={exited}
          onKeyDown={keyDown}
        />
        <button>After picker</button>
      </>
    );
    await waitFor(() => expect(entered).toHaveBeenCalledOnce());
    await focus(screen.getByRole('searchbox'));
    await press(direction === 'forward' ? '{Tab}' : '{Shift>}{Tab}{/Shift}');
    await waitFor(() => expect(exited).toHaveBeenCalledOnce());
    expect(
      screen.getByRole('button', {
        name: direction === 'forward' ? 'After picker' : 'Before picker'
      })
    ).toHaveFocus();
    const event = keyDown.mock.calls.find(([event]) => event.key === 'Tab')![0];
    expect(event.nativeEvent.isTrusted).toBe(true);
    expect(event.defaultPrevented).toBe(false);
  });

  it.each(['onClose', 'onKeyDown', 'onExit'])('preserves focus moved by %s', async callback => {
    const entered = vi.fn();
    const exited = vi.fn();
    const moved = vi.fn(() => screen.getByRole('button', { name: 'Chosen destination' }).focus());
    render(
      <>
        <Picker
          data={data}
          defaultOpen
          responsive={false}
          onEntered={entered}
          onExited={exited}
          {...{ [callback]: moved }}
        />
        <button>Chosen destination</button>
      </>
    );
    await waitFor(() => expect(entered).toHaveBeenCalledOnce());
    await focus(screen.getByRole('searchbox'));
    await press('{Escape}');
    await waitFor(() => expect(exited).toHaveBeenCalledOnce());
    expect(moved).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Chosen destination' })).toHaveFocus();
  });

  it('keeps focus in a controlled popup that rejects Escape closure', async () => {
    const entered = vi.fn();
    const close = vi.fn();
    render(<Picker data={data} open responsive={false} onEntered={entered} onClose={close} />);
    await waitFor(() => expect(entered).toHaveBeenCalledOnce());
    const input = screen.getByRole('searchbox');
    await focus(input);
    await press('{Escape}');
    expect(close).toHaveBeenCalledOnce();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveFocus();
  });

  it.each(['forward', 'backward'])(
    'preserves %s Tab from an already closed toggle',
    async direction => {
      const close = vi.fn();
      render(
        <>
          <button>Before picker</button>
          <Picker data={data} responsive={false} onClose={close} />
          <button>After picker</button>
        </>
      );
      await focus(screen.getByRole('combobox'));
      await press(direction === 'forward' ? '{Tab}' : '{Shift>}{Tab}{/Shift}');
      expect(
        screen.getByRole('button', {
          name: direction === 'forward' ? 'After picker' : 'Before picker'
        })
      ).toHaveFocus();
      expect(close).not.toHaveBeenCalled();
    }
  );
});

describe.each(pickers)('$name focus boundaries', ({ Component }) => {
  const Picker: React.ElementType = Component;

  it.each(['forward', 'backward'])(
    'lets native %s Tab leave a controlled popup that stays open',
    async direction => {
      const entered = vi.fn();
      const close = vi.fn();
      render(
        <>
          <button>Before picker</button>
          <Picker data={data} open responsive={false} onEntered={entered} onClose={close} />
          <button>After picker</button>
        </>
      );
      await waitFor(() => expect(entered).toHaveBeenCalledOnce());
      await focus(screen.getByRole('searchbox'));
      await press(direction === 'forward' ? '{Tab}' : '{Shift>}{Tab}{/Shift}');
      expect(close).toHaveBeenCalledOnce();
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
      expect(
        screen.getByRole('button', {
          name: direction === 'forward' ? 'After picker' : 'Before picker'
        })
      ).toHaveFocus();
    }
  );

  it('preserves focus on a non-searchable toggle after Escape', async () => {
    const entered = vi.fn();
    const exited = vi.fn();
    render(
      <Picker
        data={data}
        defaultOpen
        searchable={false}
        responsive={false}
        onEntered={entered}
        onExited={exited}
      />
    );
    await waitFor(() => expect(entered).toHaveBeenCalledOnce());
    const toggle = screen.getByRole('combobox');
    await focus(toggle);
    await press('{Escape}');
    await waitFor(() => expect(exited).toHaveBeenCalledOnce());
    expect(toggle).toHaveFocus();
  });

  it.each(
    ['restore', 'onExited'].flatMap(callback =>
      [false, true].map(defaultOpen => ({ callback, defaultOpen }))
    )
  )(
    'handles responsive Escape focus with $callback and defaultOpen=$defaultOpen',
    async ({ callback, defaultOpen }) => {
      const entered = vi.fn();
      const exited = vi.fn();
      const chosen = vi.fn(() =>
        screen.getByRole('button', { name: 'Chosen destination' }).focus()
      );
      render(
        <>
          <Picker
            data={data}
            responsive="(min-width: 0px)"
            defaultOpen={defaultOpen}
            onEntered={entered}
            onExited={() => {
              exited();
              if (callback === 'onExited') chosen();
            }}
          />
          <button>Chosen destination</button>
        </>
      );
      const toggle = screen.getByRole('combobox');
      if (!defaultOpen) {
        await focus(toggle);
        await press('{Enter}');
      }
      await waitFor(() => expect(entered).toHaveBeenCalledOnce());
      expect(screen.getByRole('dialog')).toHaveClass('rs-drawer');
      await focus(screen.getByRole('searchbox'));
      await press('{Escape}');
      await waitFor(() => expect(exited).toHaveBeenCalledOnce());
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
      expect(
        callback === 'restore' ? toggle : screen.getByRole('button', { name: 'Chosen destination' })
      ).toHaveFocus();
      if (callback === 'onExited') expect(chosen).toHaveBeenCalledOnce();
    }
  );

  it.each(['onClose', 'onKeyDown'])(
    'keeps the responsive focus trap when %s rejects closure',
    async callback => {
      const entered = vi.fn();
      const attempted = vi.fn(() =>
        screen.getByRole('button', { name: 'Outside dialog', hidden: true }).focus()
      );
      const keyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') attempted();
      };
      render(
        <>
          <Picker
            data={data}
            open
            responsive="(min-width: 0px)"
            onEntered={entered}
            {...(callback === 'onClose' ? { onClose: attempted } : { onKeyDown: keyDown })}
          />
          <button>Outside dialog</button>
        </>
      );
      await waitFor(() => expect(entered).toHaveBeenCalledOnce());
      expect(screen.getByRole('dialog')).toHaveClass('rs-drawer');
      await focus(screen.getByRole('searchbox'));
      await press('{Escape}');
      expect(attempted).toHaveBeenCalledOnce();
      expect(screen.getByRole('combobox', { hidden: true })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(screen.getByTestId('drawer-wrapper').contains(document.activeElement)).toBe(true);
      expect(
        screen.getByRole('button', { name: 'Outside dialog', hidden: true })
      ).not.toHaveFocus();
    }
  );

  it.each([
    ['Modal', Modal],
    ['Drawer', Drawer]
  ] as const)(
    'returns to the toggle in a surrounding %s before the next Escape',
    async (_name, Dialog) => {
      const entered = vi.fn();
      const pickerEntered = vi.fn();
      const pickerExited = vi.fn();
      const close = vi.fn();
      const props = { open: true, animationTimeout: 0, onEntered: entered, onClose: close };
      const { rerender } = render(<Dialog {...props} />);
      await waitFor(() => expect(entered).toHaveBeenCalledOnce());
      rerender(
        <Dialog {...props}>
          <Picker
            data={data}
            defaultOpen
            responsive={false}
            container={() => screen.getByRole('dialog')}
            onEntered={pickerEntered}
            onExited={pickerExited}
          />
        </Dialog>
      );
      await waitFor(() => expect(pickerEntered).toHaveBeenCalledOnce());
      await focus(screen.getByRole('searchbox'));
      await press('{Escape}');
      await waitFor(() => expect(pickerExited).toHaveBeenCalledOnce());
      expect(close).not.toHaveBeenCalled();
      expect(screen.getByRole('combobox')).toHaveFocus();
      await press('{Escape}');
      expect(close).toHaveBeenCalledOnce();
    }
  );
});

const editablePickers = [
  { name: 'InputPicker', Component: InputPicker, role: 'combobox' },
  { name: 'TagPicker', Component: TagPicker, role: 'combobox' },
  { name: 'TagInput', Component: TagInput, role: 'textbox' }
];
describe.each(editablePickers)('$name existing input focus behavior', ({ Component, role }) => {
  const Picker: React.ElementType = Component;

  it.each(['Escape', 'Tab', 'ShiftTab'])('preserves native %s focus movement', async key => {
    const entered = vi.fn();
    const exited = vi.fn();
    const keys = vi.fn();
    render(
      <>
        <button>Before picker</button>
        <Picker
          data={data}
          defaultOpen
          responsive={false}
          onEntered={entered}
          onExited={exited}
          onKeyDown={keys}
        />
        <button>After picker</button>
      </>
    );
    await waitFor(() => expect(entered).toHaveBeenCalledOnce());
    const input = screen.getByRole(role);
    await focus(input);
    await press(key === 'ShiftTab' ? '{Shift>}{Tab}{/Shift}' : `{${key}}`);
    await waitFor(() => expect(exited).toHaveBeenCalledOnce());
    const expected =
      key === 'Escape'
        ? input
        : screen.getByRole('button', { name: key === 'Tab' ? 'After picker' : 'Before picker' });
    expect(expected).toHaveFocus();
    expect(keys.mock.calls.every(([event]) => event.nativeEvent.isTrusted)).toBe(true);
  });

  it.each(['onClose', 'onKeyDown', 'onExit'])(
    'preserves the focus selected by %s on Escape',
    async callback => {
      const entered = vi.fn();
      const exited = vi.fn();
      const chosen = vi.fn(() =>
        screen.getByRole('button', { name: 'Chosen destination' }).focus()
      );
      render(
        <>
          <Picker
            data={data}
            defaultOpen
            responsive={false}
            onEntered={entered}
            onExited={exited}
            {...{ [callback]: chosen }}
          />
          <button>Chosen destination</button>
        </>
      );
      await waitFor(() => expect(entered).toHaveBeenCalledOnce());
      await focus(screen.getByRole(role));
      await press('{Escape}');
      await waitFor(() => expect(exited).toHaveBeenCalledOnce());
      expect(screen.getByRole('button', { name: 'Chosen destination' })).toHaveFocus();
      expect(chosen).toHaveBeenCalledOnce();
    }
  );
});

describe('TagInput single native tab stop', () => {
  it.each([0, 3, -1])('uses the requested tabIndex=%s on its input', async tabIndex => {
    const tags = ['Alpha'];
    render(
      <>
        <button tabIndex={tabIndex > 0 ? tabIndex - 1 : 0}>Before tags</button>
        <TagInput defaultValue={tags} tabIndex={tabIndex} />
        <button tabIndex={tabIndex > 0 ? tabIndex + 1 : 0}>After tags</button>
      </>
    );
    const input = screen.getByRole('textbox');
    expect(input.tabIndex).toBe(tabIndex);
    expect(screen.getByRole('combobox').tabIndex).toBe(-1);
    const before = screen.getByRole('button', { name: 'Before tags' });
    const after = screen.getByRole('button', { name: 'After tags' });
    await focus(before);
    await press('{Tab}');
    if (tabIndex < 0) {
      expect(after).toHaveFocus();
    } else {
      expect(input).toHaveFocus();
      await press('{Tab}');
      expect(after).toHaveFocus();
      await press('{Shift>}{Tab}{/Shift}');
      expect(input).toHaveFocus();
      await press('{Shift>}{Tab}{/Shift}');
      expect(before).toHaveFocus();
    }
  });
});
