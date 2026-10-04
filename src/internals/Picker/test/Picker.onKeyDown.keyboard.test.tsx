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
import '../../../SelectPicker/styles/index.scss';
import '../../../CheckPicker/styles/index.scss';
import '../../../TreePicker/styles/index.scss';
import '../../../CheckTreePicker/styles/index.scss';
import '../../../Cascader/styles/index.scss';
import '../../../MultiCascader/styles/index.scss';
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
describe('Picker public keyboard handler composition', () => {
  it.each(pickers)('%s opens and closes with its public handler', async (_name, Picker) => {
    const onKeyDown = vi.fn();
    render(<Picker data={data} onKeyDown={onKeyDown} />);
    const combo = screen.getByRole('combobox');
    act(() => combo.focus());
    await act(async () => userEvent.keyboard('{Enter}'));
    expect(onKeyDown).toHaveBeenCalledOnce();
    expect(onKeyDown.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
    await waitFor(() => expect(combo).toHaveAttribute('aria-expanded', 'true'));
    await act(async () => userEvent.keyboard('{Escape}'));
    expect(onKeyDown).toHaveBeenCalledTimes(2);
    expect(onKeyDown.mock.calls[1][0].nativeEvent.isTrusted).toBe(true);
    await waitFor(() => expect(combo).toHaveAttribute('aria-expanded', 'false'));
    expect(combo).toHaveFocus();
  });
  it.each(pickers)('%s preserves focus assigned by its public handler', async (_name, Picker) => {
    const onKeyDown = vi.fn((event: React.KeyboardEvent) => {
      if (event.key === 'Enter') screen.getByRole('button', { name: 'Outside action' }).focus();
    });
    render(
      <>
        <button>Outside action</button>
        <Picker data={data} onKeyDown={onKeyDown} />
      </>
    );
    const combo = screen.getByRole('combobox');
    act(() => combo.focus());
    await act(async () => userEvent.keyboard('{Enter}'));
    expect(onKeyDown).toHaveBeenCalledOnce();
    expect(onKeyDown.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
    await waitFor(() => expect(combo).toHaveAttribute('aria-expanded', 'true'));
    expect(screen.getByRole('button', { name: 'Outside action' })).toHaveFocus();
  });
  describe.each(['readOnly', 'loading'] as const)('%s controls', state => {
    it.each(pickers)('%s reports the native key without opening', async (_name, Picker) => {
      const onKeyDown = vi.fn();
      const onChange = vi.fn();
      render(
        <Picker data={data} {...{ [state]: true }} onKeyDown={onKeyDown} onChange={onChange} />
      );
      const combo = screen.getByRole('combobox');
      act(() => combo.focus());
      await act(async () => userEvent.keyboard('{Enter}'));
      expect(onKeyDown).toHaveBeenCalledOnce();
      expect(onKeyDown.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
      expect(combo).toHaveAttribute('aria-expanded', 'false');
      expect(combo).toHaveFocus();
      await act(async () => userEvent.keyboard('{Backspace}'));
      expect(onKeyDown).toHaveBeenCalledTimes(2);
      expect(onKeyDown.mock.calls[1][0].nativeEvent.isTrusted).toBe(true);
      expect(onChange).not.toHaveBeenCalled();
    });
    it('keeps a selected value when Backspace is reported to the public handler', async () => {
      const onKeyDown = vi.fn();
      const onChange = vi.fn();
      const onClean = vi.fn();
      render(
        <SelectPicker
          data={data}
          defaultValue="alpha"
          {...{ [state]: true }}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onClean={onClean}
        />
      );
      const combo = screen.getByRole('combobox');
      expect(combo).toHaveTextContent('Alpha');
      act(() => combo.focus());
      await act(async () => userEvent.keyboard('{Backspace}'));
      expect(onKeyDown).toHaveBeenCalledOnce();
      expect(onKeyDown.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
      expect(onChange).not.toHaveBeenCalled();
      expect(onClean).not.toHaveBeenCalled();
      expect(combo).toHaveTextContent('Alpha');
    });
  });
});
