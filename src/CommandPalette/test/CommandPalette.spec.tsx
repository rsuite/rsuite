import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CommandPalette from '../CommandPalette';
import CustomProvider from '../../CustomProvider';
import zhCN from '../../locales/zh_CN';
import type { CommandPaletteProps } from '../types';

const data = [
  { value: 'projects', label: 'Open projects', group: 'Workspace', keywords: ['dashboard'] },
  { value: 'archive', label: 'Archive project', group: 'Workspace', disabled: true },
  {
    value: 0,
    label: 'Open settings',
    group: 'Account',
    description: 'Your preferences',
    shortcut: '⌘ ,'
  }
] as const;
const renderPalette = (props: Partial<CommandPaletteProps> = {}) =>
  render(<CommandPalette open reduceMotion title="Run a command" data={data} {...props} />);
const input = () => screen.getByRole<HTMLInputElement>('combobox');
const activeOption = () => {
  const id = input().getAttribute('aria-activedescendant');
  return id ? input().ownerDocument.getElementById(id) : null;
};
const ready = () => screen.findByRole('option', { name: 'Open projects' });

describe('CommandPalette', () => {
  it('names the dialog and list and keeps the list out of its description', async () => {
    renderPalette();
    await ready();
    const dialog = screen.getByRole('dialog', { name: 'Run a command' });
    const list = screen.getByRole('listbox', { name: 'Run a command' });
    expect(dialog.getAttribute('aria-describedby')).toBe('');
    expect(input().getAttribute('aria-controls')).toBe(list.id);
    expect(input().getAttribute('aria-expanded')).toBe('true');
    expect(activeOption()?.textContent).toBe('Open projects');
    expect(input().ownerDocument.activeElement).toBe(input());
  });

  it('does not mount a closed dialog or install a global shortcut', () => {
    renderPalette({ open: false });
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders named groups and supplementary descriptions', async () => {
    renderPalette();
    await ready();
    expect(
      screen.getAllByRole('group').map(group => group.getAttribute('aria-labelledby'))
    ).toHaveLength(2);
    expect(
      screen.getByRole('group', { name: 'Workspace' }).querySelectorAll('[role="option"]').length
    ).toBe(2);
    const settings = screen.getByRole('option', { name: 'Open settings' });
    expect(
      settings
        .getAttribute('aria-describedby')
        ?.split(' ')
        .map(id => document.getElementById(id)?.textContent)
    ).toEqual(['Your preferences', '⌘ ,']);
  });

  it('skips disabled commands and wraps ArrowUp and ArrowDown', async () => {
    renderPalette();
    await ready();
    fireEvent.keyDown(input(), { key: 'ArrowDown' });
    expect(activeOption()?.getAttribute('aria-label')).toBe('Open settings');
    fireEvent.keyDown(input(), { key: 'ArrowDown' });
    expect(activeOption()?.getAttribute('aria-label')).toBe('Open projects');
    fireEvent.keyDown(input(), { key: 'ArrowUp' });
    expect(activeOption()?.getAttribute('aria-label')).toBe('Open settings');
    expect(document.activeElement).toBe(input());
  });

  it('selects a numeric zero with the original record and event', async () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();
    renderPalette({ onSelect, onClose });
    await ready();
    fireEvent.keyDown(input(), { key: 'ArrowDown' });
    expect(fireEvent.keyDown(input(), { key: 'Enter' })).toBe(false);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0]).toBe(0);
    expect(onSelect.mock.calls[0][1]).toBe(data[2]);
    expect(onSelect.mock.calls[0][2].type).toBe('keydown');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('ignores repeated Enter without allowing a form submission', async () => {
    const onSelect = vi.fn();
    renderPalette({ onSelect });
    await ready();
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(fireEvent.keyDown(input(), { key: 'Enter', repeat: true })).toBe(false);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it.each(['pointer', 'keyboard'])('lets onSelect cancel closing (%s)', async method => {
    const onClose = vi.fn();
    const onSelect = vi.fn((_value, _item, event) => event.preventDefault());
    renderPalette({ onSelect, onClose });
    const option = await ready();
    if (method === 'pointer') fireEvent.click(option);
    else fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('honors closeOnSelect=false', async () => {
    const onClose = vi.fn();
    renderPalette({ onClose, closeOnSelect: false });
    fireEvent.click(await ready());
    expect(onClose).not.toHaveBeenCalled();
  });

  it('keeps disabled commands visible and nonselectable by pointer', async () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();
    renderPalette({ onSelect, onClose });
    await ready();
    const disabled = screen.getByRole('option', { name: 'Archive project' });
    fireEvent.mouseMove(disabled);
    fireEvent.click(disabled);
    expect(disabled.getAttribute('aria-disabled')).toBe('true');
    expect(disabled.getAttribute('aria-selected')).toBe('false');
    expect(activeOption()?.getAttribute('aria-label')).toBe('Open projects');
    expect(onSelect).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it.each([
    { commands: [] },
    { commands: [{ value: 'disabled', label: 'Disabled', disabled: true }] }
  ])('handles empty or all-disabled data ($commands)', ({ commands }) => {
    const onSelect = vi.fn();
    renderPalette({ data: commands, onSelect, filter: false });
    expect(input().hasAttribute('aria-activedescendant')).toBe(false);
    fireEvent.keyDown(input(), { key: 'ArrowDown' });
    expect(fireEvent.keyDown(input(), { key: 'Enter' })).toBe(false);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it.each([
    { key: 'Enter', isComposing: true },
    { key: 'ArrowDown', isComposing: true },
    { key: 'Enter', keyCode: 229 },
    { key: 'ArrowDown', keyCode: 229 }
  ])('leaves synthetic composition-flagged keys alone (%j)', async key => {
    const onSelect = vi.fn();
    renderPalette({ onSelect });
    await ready();
    expect(fireEvent.keyDown(input(), key)).toBe(true);
    expect(activeOption()?.getAttribute('aria-label')).toBe('Open projects');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it.each([
    { key: 'Home' },
    { key: 'End' },
    { key: 'ArrowDown', shiftKey: true },
    { key: 'ArrowDown', altKey: true },
    { key: 'ArrowUp', ctrlKey: true },
    { key: 'Enter', metaKey: true }
  ])('preserves native editing and modified keys (%j)', async key => {
    const onSelect = vi.fn();
    renderPalette({ onSelect });
    await ready();
    expect(fireEvent.keyDown(input(), key)).toBe(true);
    expect(activeOption()?.getAttribute('aria-label')).toBe('Open projects');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('lets a caller input key handler prevent internal navigation and selection', async () => {
    const onSelect = vi.fn();
    const onKeyDown = vi.fn(event => event.preventDefault());
    renderPalette({ onSelect, inputProps: { onKeyDown } });
    await ready();
    fireEvent.keyDown(input(), { key: 'ArrowDown' });
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(activeOption()?.getAttribute('aria-label')).toBe('Open projects');
    expect(onKeyDown).toHaveBeenCalledTimes(2);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('searches labels, groups and keywords without mutating the source', async () => {
    const onSearch = vi.fn();
    renderPalette({ onSearch });
    await ready();
    fireEvent.change(input(), { target: { value: 'dashboard' } });
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1));
    expect(screen.getByRole('option').getAttribute('aria-label')).toBe('Open projects');
    expect(onSearch.mock.calls[0][0]).toBe('dashboard');
    expect(onSearch.mock.calls[0][1].type).toBe('change');
    fireEvent.change(input(), { target: { value: 'Account' } });
    await waitFor(() =>
      expect(screen.getByRole('option').getAttribute('aria-label')).toBe('Open settings')
    );
    expect(data).toHaveLength(3);
    expect(data[0].label).toBe('Open projects');
  });

  it.each([
    ['tr', 'ISPARTA', 'ısparta'],
    ['de', 'Straße', 'strasse'],
    ['en', 'Café', 'cafe'],
    ['en', '👩🏽‍💻 projects', '👩🏽‍💻']
  ])('uses real Intl matching (%s / %s)', async (searchLocale, label, query) => {
    renderPalette({ data: [{ value: label, label }], defaultSearchValue: query, searchLocale });
    expect((await screen.findByRole('option')).getAttribute('aria-label')).toBe(label);
  });

  it('does not treat a partial emoji grapheme as a command match', async () => {
    renderPalette({
      data: [{ value: 'developer', label: '👩🏽‍💻' }],
      defaultSearchValue: '👩',
      searchLocale: 'en'
    });
    await waitFor(() => expect(screen.getByRole('status').textContent).toBe('No results found'));
    expect(screen.queryByRole('option')).toBeNull();
  });

  it('respects controlled search and accepts updates from the caller', async () => {
    const onSearch = vi.fn();
    const view = renderPalette({ searchValue: 'projects', onSearch });
    await ready();
    fireEvent.change(input(), { target: { value: 'settings' } });
    expect(input().value).toBe('projects');
    expect(onSearch.mock.calls[0][0]).toBe('settings');
    view.rerender(
      <CommandPalette open reduceMotion title="Run a command" data={data} searchValue="settings" />
    );
    await waitFor(() =>
      expect(screen.getByRole('option').getAttribute('aria-label')).toBe('Open settings')
    );
  });

  it('accepts caller-owned results with filter=false and blocks loading selection', () => {
    const onSelect = vi.fn();
    const view = renderPalette({ filter: false, searchValue: 'unrelated', onSelect });
    expect(screen.getAllByRole('option')).toHaveLength(3);
    view.rerender(
      <CommandPalette
        open
        reduceMotion
        title="Run a command"
        data={data}
        filter={false}
        loading
        onSelect={onSelect}
      />
    );
    expect(screen.queryByRole('option')).toBeNull();
    expect(input().hasAttribute('aria-activedescendant')).toBe(false);
    expect(input().getAttribute('aria-busy')).toBe('true');
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('clears an active result synchronously when a new query is pending', async () => {
    const onSelect = vi.fn();
    renderPalette({ onSelect });
    await ready();
    fireEvent.change(input(), { target: { value: 'missing' } });
    expect(input().hasAttribute('aria-activedescendant')).toBe(false);
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onSelect).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole('option')).toBeNull());
  });

  it('does not retain an active command after its data disappears', () => {
    const onSelect = vi.fn();
    const view = renderPalette({ filter: false, onSelect });
    fireEvent.keyDown(input(), { key: 'ArrowDown' });
    view.rerender(
      <CommandPalette
        open
        reduceMotion
        title="Run a command"
        data={[]}
        filter={false}
        onSelect={onSelect}
      />
    );
    expect(input().hasAttribute('aria-activedescendant')).toBe(false);
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('preserves duplicate values, value types and original record identity', () => {
    const commands = [
      { value: 0, label: 'First', metadata: 1 },
      { value: '0', label: 'String zero', metadata: 2 },
      { value: 0, label: 'Duplicate', metadata: 3 }
    ];
    const onSelect = vi.fn();
    renderPalette({
      data: commands,
      filter: false,
      onSelect,
      renderItem: item => <strong>{item.label}</strong>
    });
    const options = screen.getAllByRole('option');
    expect(new Set(options.map(option => option.id)).size).toBe(3);
    fireEvent.click(screen.getByRole('option', { name: 'Duplicate' }));
    expect(onSelect.mock.calls[0][1]).toBe(commands[2]);
  });

  it('navigates groups in their displayed first-appearance order', () => {
    renderPalette({
      filter: false,
      data: [
        { value: 'a', label: 'A', group: 'First' },
        { value: 'b', label: 'B', group: 'Second' },
        { value: 'c', label: 'C', group: 'First' }
      ]
    });
    expect(screen.getAllByRole('option').map(option => option.getAttribute('aria-label'))).toEqual([
      'A',
      'C',
      'B'
    ]);
    fireEvent.keyDown(input(), { key: 'ArrowDown' });
    expect(activeOption()?.getAttribute('aria-label')).toBe('C');
  });

  it('shows a generic localized error, permits retry and recovers after a locale fix', async () => {
    const view = renderPalette({ searchLocale: 'invalid_locale' });
    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toBe('Unable to search commands.Try again');
    expect(input().hasAttribute('aria-activedescendant')).toBe(false);
    const retry = screen.getByRole('button', { name: 'Try again' });
    retry.focus();
    fireEvent.click(retry);
    expect(document.activeElement).toBe(input());
    await screen.findByRole('alert');
    view.rerender(
      <CommandPalette open reduceMotion title="Run a command" data={data} searchLocale="en" />
    );
    await ready();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('accepts custom empty and error renderers outside the listbox', async () => {
    const view = renderPalette({
      data: [],
      filter: false,
      renderEmpty: query => `Nothing for ${query}`,
      defaultSearchValue: 'x'
    });
    expect(screen.getByRole('status').textContent).toBe('Nothing for x');
    expect(screen.getByRole('listbox').contains(screen.getByRole('status'))).toBe(false);
    const renderError = vi.fn((_error, retry) => <button onClick={retry}>Retry search</button>);
    view.rerender(
      <CommandPalette
        open
        reduceMotion
        title="Run a command"
        data={data}
        searchLocale="invalid_locale"
        renderError={renderError}
      />
    );
    await screen.findByRole('alert');
    expect(renderError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(screen.getByRole('listbox').contains(screen.getByRole('alert'))).toBe(false);
  });

  it('uses provider defaults and existing Chinese translations with instance overrides', async () => {
    render(
      <CustomProvider
        locale={zhCN}
        components={{
          CommandPalette: {
            defaultProps: {
              title: '命令',
              data: [],
              filter: false,
              locale: { noResultsText: '没有命令' }
            }
          }
        }}
      >
        <CommandPalette open title="操作" data={[]} locale={{ searchPlaceholder: '搜索命令' }} />
      </CustomProvider>
    );
    expect(screen.getByRole('dialog', { name: '操作' })).toBeTruthy();
    expect(input().placeholder).toBe('搜索命令');
    expect(screen.getByRole('status').textContent).toBe('没有命令');
  });

  it('keeps search ownership when Input has incompatible provider defaults', async () => {
    const onPressEnter = vi.fn();
    render(
      <CustomProvider
        components={{
          Input: {
            defaultProps: {
              as: 'textarea',
              plaintext: true,
              disabled: true,
              readOnly: true,
              defaultValue: 'leak',
              autoFocus: true,
              onPressEnter
            }
          }
        }}
      >
        <CommandPalette open reduceMotion title="Commands" data={data} />
      </CustomProvider>
    );
    await ready();
    expect(input().tagName).toBe('INPUT');
    expect(input().value).toBe('');
    expect(input().disabled).toBe(false);
    expect(input().readOnly).toBe(false);
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onPressEnter).not.toHaveBeenCalled();
  });

  it('forwards the search ref and respects autoFocus=false', async () => {
    const ref = React.createRef<HTMLInputElement>();
    renderPalette({ inputRef: ref, autoFocus: false });
    await ready();
    expect(ref.current).toBe(input());
    expect(document.activeElement).not.toBe(input());
  });

  it('lets onOpen choose a focus target after the default search focus', async () => {
    const target = React.createRef<HTMLButtonElement>();
    renderPalette({
      footer: <button ref={target}>Help</button>,
      onOpen: () => target.current?.focus()
    });
    await ready();
    expect(document.activeElement).toBe(target.current);
  });

  it('gives multiple simultaneous instances distinct lists and descendants', async () => {
    render(
      <>
        <CommandPalette open reduceMotion title="First" data={data} />
        <CommandPalette open reduceMotion title="Second" data={data} />
      </>
    );
    await waitFor(() => expect(document.querySelectorAll('[role="option"]')).toHaveLength(6));
    const inputs = Array.from(document.querySelectorAll('[role="combobox"]'));
    const lists = inputs.map(element => element.getAttribute('aria-controls'));
    expect(new Set(lists).size).toBe(2);
    expect(
      inputs.every(
        element =>
          document.getElementById(element.getAttribute('aria-activedescendant') || '') !== null
      )
    ).toBe(true);
  });
});
