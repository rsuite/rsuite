import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, it, expect, vi } from 'vitest';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import TreePicker from '../../../TreePicker';
import CheckTreePicker from '../../../CheckTreePicker';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import InputPicker from '../../../InputPicker';
import TagPicker from '../../../TagPicker';
import useToggleKeyDownEvent from '../hooks/useToggleKeyDownEvent';
import '../../../SelectPicker/styles/index.scss';
import '../../../TreePicker/styles/index.scss';
import '../../../InputPicker/styles/index.scss';
import '../../../TagPicker/styles/index.scss';

const data = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' }
];
const pickers: [string | undefined, React.ElementType][] = [
  SelectPicker,
  CheckPicker,
  TreePicker,
  CheckTreePicker,
  Cascader,
  MultiCascader
].map(Picker => [Picker.displayName, Picker]);

// Cancel after observing the picker so a failing baseline cannot navigate the test page.
function observeBackspace() {
  const events: { prevented: boolean; trusted: boolean }[] = [];
  const onKeyDown = vi.fn((event: React.KeyboardEvent) => {
    if (event.key !== 'Backspace') return;
    events.push({ prevented: event.defaultPrevented, trusted: event.nativeEvent.isTrusted });
    event.preventDefault();
  });
  return { events, onKeyDown };
}

describe('Picker Backspace browser default', () => {
  it.each(pickers)('%s prevents history navigation from its toggle', async (_name, Picker) => {
    const { events, onKeyDown } = observeBackspace();
    render(<Picker data={data} onKeyDown={onKeyDown} />);
    act(() => screen.getByRole('combobox').focus());
    await act(async () => userEvent.keyboard('{Backspace}'));
    expect(onKeyDown).toHaveBeenCalledOnce();
    expect(events).toEqual([{ prevented: true, trusted: true }]);
  });

  it('keeps the defaults of ArrowRight, Enter and Escape', async () => {
    const events: { key: string; prevented: boolean; trusted: boolean }[] = [];
    render(
      <SelectPicker
        data={data}
        onKeyDown={event =>
          events.push({
            key: event.key,
            prevented: event.defaultPrevented,
            trusted: event.nativeEvent.isTrusted
          })
        }
      />
    );
    const combo = screen.getByRole('combobox');
    act(() => combo.focus());
    await act(async () => userEvent.keyboard('{ArrowRight}'));
    await act(async () => userEvent.keyboard('{Enter}'));
    await waitFor(() => expect(combo).toHaveAttribute('aria-expanded', 'true'));
    await act(async () => userEvent.keyboard('{Escape}'));
    await waitFor(() => expect(combo).toHaveAttribute('aria-expanded', 'false'));
    expect(events).toEqual(
      ['ArrowRight', 'Enter', 'Escape'].map(key => ({ key, prevented: false, trusted: true }))
    );
  });

  it('clears the selected value before calling the public handler once', async () => {
    const order: string[] = [];
    const onChange = vi.fn<(value: unknown, event: React.SyntheticEvent) => void>(() => {
      order.push('change');
    });
    const { events, onKeyDown } = observeBackspace();
    render(
      <SelectPicker
        data={data}
        defaultValue="alpha"
        onChange={onChange}
        onKeyDown={event => {
          order.push('key');
          onKeyDown(event);
        }}
      />
    );
    act(() => screen.getByRole('combobox').focus());
    await act(async () => userEvent.keyboard('{Backspace}'));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0][0]).toBe(null);
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
    expect(order).toEqual(['change', 'key']);
    expect(events).toEqual([{ prevented: true, trusted: true }]);
    expect(screen.getByRole('combobox')).not.toHaveTextContent('Alpha');
  });

  it('clears TreePicker from its selected row before reporting the key', async () => {
    const onChange = vi.fn();
    const { events, onKeyDown } = observeBackspace();
    render(
      <TreePicker
        data={data}
        defaultValue="beta"
        defaultOpen
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
    const beta = await screen.findByRole('treeitem', { name: 'Beta' });
    await waitFor(() => expect(beta).toHaveFocus());
    await act(async () => userEvent.keyboard('{Backspace}'));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0][0]).toBe(null);
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
    expect(events).toEqual([{ prevented: true, trusted: true }]);
    expect(onKeyDown).toHaveBeenCalledOnce();
    expect(screen.getByRole('combobox')).not.toHaveTextContent('Beta');
  });

  it.each(['readOnly', 'loading'] as const)('%s preserves the selected value', async state => {
    const { events, onKeyDown } = observeBackspace();
    const onChange = vi.fn();
    render(
      <SelectPicker
        data={data}
        defaultValue="alpha"
        {...{ [state]: true }}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
    act(() => screen.getByRole('combobox').focus());
    await act(async () => userEvent.keyboard('{Backspace}'));
    expect(events).toEqual([{ prevented: true, trusted: true }]);
    expect(onKeyDown).toHaveBeenCalledOnce();
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('combobox')).toHaveTextContent('Alpha');
  });

  it('protects a disabled hook target without invoking its clear callback', async () => {
    const { events, onKeyDown } = observeBackspace();
    const onExit = vi.fn();
    function DisabledTarget() {
      const target = React.useRef<HTMLDivElement>(null);
      const trigger = React.useRef(null);
      const onToggle = useToggleKeyDownEvent({
        disabled: true,
        trigger,
        target,
        onExit,
        onKeyDown
      });
      return (
        <div ref={target} role="combobox" tabIndex={0} onKeyDown={onToggle}>
          Alpha
        </div>
      );
    }
    render(<DisabledTarget />);
    act(() => screen.getByRole('combobox').focus());
    await act(async () => userEvent.keyboard('{Backspace}'));
    expect(events).toEqual([{ prevented: true, trusted: true }]);
    expect(onKeyDown).toHaveBeenCalledOnce();
    expect(onExit).not.toHaveBeenCalled();
    expect(screen.getByRole('combobox')).toHaveTextContent('Alpha');
  });

  it.each(['input', 'textarea', 'contenteditable', 'nested-contenteditable'] as const)(
    'preserves native text deletion in %s',
    async kind => {
      const events: { prevented: boolean; trusted: boolean }[] = [];
      const onKeyDown = vi.fn((event: React.KeyboardEvent) => {
        if (event.key === 'Backspace')
          events.push({ prevented: event.defaultPrevented, trusted: event.nativeEvent.isTrusted });
      });
      render(
        <SelectPicker
          data={data}
          defaultOpen
          onKeyDown={onKeyDown}
          renderExtraFooter={() =>
            kind === 'input' ? (
              <input aria-label="Editor" defaultValue="abc" />
            ) : kind === 'textarea' ? (
              <textarea aria-label="Editor" defaultValue="abc" />
            ) : (
              <div
                role="textbox"
                aria-label="Editor"
                contentEditable
                suppressContentEditableWarning
              >
                {kind === 'nested-contenteditable' ? <span>abc</span> : 'abc'}
              </div>
            )
          }
        />
      );
      const editor = screen.getByRole('textbox', { name: 'Editor' });
      act(() => {
        editor.focus();
        if (kind === 'input' || kind === 'textarea')
          (editor as HTMLInputElement).setSelectionRange(3, 3);
        else {
          const range = document.createRange();
          range.selectNodeContents(editor);
          range.collapse(false);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      });
      await act(async () => userEvent.keyboard('{Backspace}'));
      expect(events).toEqual([{ prevented: false, trusted: true }]);
      if (kind === 'input' || kind === 'textarea') expect(editor).toHaveValue('ab');
      else expect(editor).toHaveTextContent('ab');
      expect(editor).toHaveFocus();
    }
  );

  it.each(['readonly-input', 'readonly-textarea', 'checkbox', 'noneditable-content'] as const)(
    'protects %s in the popup',
    async kind => {
      const { events, onKeyDown } = observeBackspace();
      render(
        <SelectPicker
          data={data}
          defaultOpen
          onKeyDown={onKeyDown}
          renderExtraFooter={() =>
            kind === 'readonly-input' ? (
              <input data-testid="control" readOnly defaultValue="abc" />
            ) : kind === 'readonly-textarea' ? (
              <textarea data-testid="control" readOnly defaultValue="abc" />
            ) : kind === 'checkbox' ? (
              <input data-testid="control" type="checkbox" />
            ) : (
              <div contentEditable suppressContentEditableWarning>
                <span data-testid="control" contentEditable={false} tabIndex={0}>
                  abc
                </span>
              </div>
            )
          }
        />
      );
      const control = screen.getByTestId('control');
      act(() => control.focus());
      await act(async () => userEvent.keyboard('{Backspace}'));
      expect(events).toEqual([{ prevented: true, trusted: true }]);
      expect(onKeyDown).toHaveBeenCalledOnce();
      if (kind.startsWith('readonly')) expect(control).toHaveValue('abc');
      if (kind === 'checkbox') expect(control).not.toBeChecked();
      expect(control).toHaveFocus();
    }
  );

  it.each([InputPicker, TagPicker])(
    '%s preserves native deletion in its editable input',
    async Picker => {
      const { container } = render(<Picker data={data} />);
      const inputs = container.querySelectorAll<HTMLInputElement>(
        'input:not([aria-hidden="true"])'
      );
      expect(inputs).toHaveLength(1);
      const input = inputs[0];
      act(() => input.focus());
      await act(async () => userEvent.keyboard('abc'));
      await waitFor(() => expect(input).toHaveValue('abc'));
      const events: { prevented: boolean; trusted: boolean }[] = [];
      const onBackspace = (event: KeyboardEvent) => {
        if (event.key === 'Backspace')
          events.push({ prevented: event.defaultPrevented, trusted: event.isTrusted });
      };
      window.addEventListener('keydown', onBackspace);
      try {
        await act(async () => userEvent.keyboard('{Backspace}'));
      } finally {
        window.removeEventListener('keydown', onBackspace);
      }
      expect(events).toEqual([{ prevented: false, trusted: true }]);
      expect(input).toHaveValue('ab');
      expect(input).toHaveFocus();
    }
  );
});
