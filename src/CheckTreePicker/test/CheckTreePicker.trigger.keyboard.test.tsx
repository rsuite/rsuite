import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CheckTreePicker from '..';
import '../styles/index.scss';

const cursorValues = [0, '', 'normal'];
let keys: { key: string; role: string | null; label: string | null; trusted: boolean }[];
const recordKey = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement;
  keys.push({
    key: event.key,
    role: target.getAttribute('role'),
    label: target.getAttribute('aria-label'),
    trusted: event.isTrusted
  });
};
beforeEach(() => {
  keys = [];
  document.addEventListener('keydown', recordKey, true);
});
afterEach(() => document.removeEventListener('keydown', recordKey, true));

async function key(name: string) {
  await act(async () => {
    await userEvent.keyboard(`{${name}}`);
  });
}

function smallData(value: string | number) {
  return [
    { label: 'First row', value: 'first' },
    { label: 'Second row', value: 'second' },
    { label: 'Cursor row', value },
    { label: 'Last row', value: 'last' }
  ];
}

async function open(onEntered: ReturnType<typeof vi.fn>, count: number) {
  await key('Enter');
  await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(count));
}

async function close(onExited: ReturnType<typeof vi.fn>, count: number) {
  await key('Escape');
  await waitFor(() => expect(onExited).toHaveBeenCalledTimes(count));
  await waitFor(() => expect(screen.queryByRole('tree', { hidden: true })).toBeNull());
}

async function navigateToCursor() {
  for (const name of ['First row', 'Second row', 'Cursor row']) {
    await key('ArrowDown');
    await waitFor(() => expect(screen.getByRole('treeitem', { name })).toHaveFocus());
  }
}

it.each(
  [false, true].flatMap(virtualized => [false, true].map(checked => ({ virtualized, checked })))
)(
  'opener Enter toggles the first opening without changing selection (virtual=$virtualized, checked=$checked)',
  async ({ virtualized, checked }) => {
    const onEntered = vi.fn();
    const onChange = vi.fn();
    render(
      <CheckTreePicker
        data={smallData('normal')}
        defaultValue={checked ? ['normal'] : []}
        searchable={false}
        responsive={false}
        virtualized={virtualized}
        onEntered={onEntered}
        onChange={onChange}
      />
    );
    const toggle = screen.getByRole('combobox');
    toggle.focus();
    await open(onEntered, 1);
    expect(toggle).toHaveFocus();
    expect(screen.getByRole('treeitem', { name: 'Cursor row' })).toHaveAttribute(
      'aria-checked',
      String(checked)
    );
    await key('Enter');
    await waitFor(() => expect(screen.queryByRole('tree', { hidden: true })).toBeNull());
    expect(onChange).not.toHaveBeenCalled();
    expect(keys.every(event => event.trusted)).toBe(true);
  }
);

describe.each(cursorValues)('retained cursor value %j', value => {
  it.each([false, true])(
    'opener Enter closes after a fully closed/reopened popup (virtual=%s)',
    async virtualized => {
      const onEntered = vi.fn();
      const onExited = vi.fn();
      const onChange = vi.fn();
      render(
        <CheckTreePicker
          data={smallData(value)}
          defaultValue={[value]}
          searchable={false}
          responsive={false}
          virtualized={virtualized}
          onEntered={onEntered}
          onExited={onExited}
          onChange={onChange}
        />
      );
      const toggle = screen.getByRole('combobox');
      toggle.focus();
      await open(onEntered, 1);
      await navigateToCursor();
      await key('Enter');
      expect(onChange).toHaveBeenCalledExactlyOnceWith([], expect.anything());
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
      await close(onExited, 1);
      expect(toggle).toHaveFocus();
      await open(onEntered, 2);
      expect(toggle).toHaveFocus();
      await key('Enter');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(keys.every(event => event.trusted)).toBe(true);
      await waitFor(() => expect(screen.queryByRole('tree', { hidden: true })).toBeNull());
    }
  );

  it.each([false, true])(
    'opener Enter closes when explicitly focused after row navigation within the same popup (virtual=%s)',
    async virtualized => {
      const onEntered = vi.fn();
      const onChange = vi.fn();
      render(
        <CheckTreePicker
          data={smallData(value)}
          virtualized={virtualized}
          searchable={false}
          responsive={false}
          onEntered={onEntered}
          onChange={onChange}
        />
      );
      const toggle = screen.getByRole('combobox');
      toggle.focus();
      await open(onEntered, 1);
      await navigateToCursor();
      toggle.focus();
      await key('Enter');
      expect(onChange).not.toHaveBeenCalled();
      expect(keys.every(event => event.trusted)).toBe(true);
      await waitFor(() => expect(screen.queryByRole('tree', { hidden: true })).toBeNull());
    }
  );
});
