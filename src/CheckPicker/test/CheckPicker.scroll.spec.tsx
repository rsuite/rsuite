import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import CheckPicker from '..';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

const modes = [
  { name: 'scrollable list', count: 3, height: 72, virtualized: false, gap: false },
  { name: 'list without overflow', count: 3, height: 240, virtualized: false, gap: false },
  { name: 'disabled option gaps', count: 40, height: 72, virtualized: false, gap: true },
  { name: 'virtualized list', count: 80, height: 108, virtualized: true, gap: false }
];

function expectVisibleOption(value: number) {
  const option = screen.getByRole('option', { name: `Option ${value}` });
  const combobox = screen.getByRole('combobox');
  const listbox = screen.getByRole('listbox');
  const viewport = (option.closest('.rs-virt-list') || listbox) as HTMLElement;
  const bounds = option.getBoundingClientRect();
  const viewportBounds = viewport.getBoundingClientRect();
  const top = viewportBounds.top + viewport.clientTop;

  expect(option).to.have.focus;
  expect(combobox).to.have.attribute('aria-activedescendant', option.id);
  expect(document.getElementById(option.id)).toBe(option);
  expect(document.getElementById(combobox.getAttribute('aria-controls')!)).to.contain(option);
  expect(bounds.height).toBeGreaterThan(0);
  expect(viewport.clientHeight).toBeGreaterThan(0);
  expect(bounds.top).toBeGreaterThanOrEqual(top - 1);
  expect(bounds.bottom).toBeLessThanOrEqual(top + viewport.clientHeight + 1);
  return viewport;
}

describe.each(['ArrowDown', 'ArrowUp'] as const)('CheckPicker native %s scrolling', key => {
  it.each(modes)('keeps every focused option visible in a $name', async mode => {
    const down = key === 'ArrowDown';
    const initial = mode.virtualized && down ? mode.count - 1 : 0;
    const data = Array.from({ length: mode.count }, (_, value) => ({
      value,
      label: `Option ${value}`
    }));
    const disabled = mode.gap
      ? data.map(item => item.value).filter(value => ![0, 25, 39].includes(value))
      : [];
    const targets = mode.virtualized
      ? Array.from({ length: 13 }, (_, index) => (down ? index : mode.count - 1 - index))
      : mode.gap
        ? down
          ? [25, 39, 0, 25]
          : [39, 25, 0, 39]
        : down
          ? [1, 2, 0, 1]
          : [2, 1, 0, 2];
    const onChange = vi.fn();
    const onSelect = vi.fn();
    const onEntered = vi.fn();
    const keys: KeyboardEvent[] = [];
    const capture = (event: KeyboardEvent) => keys.push(event);
    render(
      <CustomProvider reduceMotion>
        <CheckPicker
          data={data}
          defaultValue={[initial]}
          defaultOpen
          responsive={false}
          searchable={false}
          virtualized={mode.virtualized}
          listProps={{ itemSize: 36, overscanCount: 0 }}
          listboxMaxHeight={mode.height}
          disabledItemValues={disabled}
          onChange={onChange}
          onSelect={onSelect}
          onEntered={onEntered}
        />
      </CustomProvider>
    );
    expect(onEntered).toHaveBeenCalledOnce();
    act(() => screen.getByRole('combobox').focus());
    expect(screen.getByRole('combobox')).to.have.focus;
    const pageTop = window.scrollY;
    const positions: number[] = [];
    document.addEventListener('keydown', capture, true);
    try {
      for (const value of targets) {
        await act(async () => {
          await userEvent.keyboard(`{${key}}`);
        });
        await waitFor(() => expectVisibleOption(value));
        const viewport = expectVisibleOption(value);
        positions.push(viewport.scrollTop);
        if (mode.name === 'list without overflow') {
          expect(viewport.scrollHeight).toBeLessThanOrEqual(viewport.clientHeight);
          expect(viewport.scrollTop).toBe(0);
        } else {
          expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight);
          if (value === 0) expect(viewport.scrollTop).toBe(0);
        }
        expect(window.scrollY).toBe(pageTop);
        expect(screen.getByRole('combobox')).to.have.attribute('aria-expanded', 'true');
      }
      expect(keys.map(event => event.key)).toEqual(targets.map(() => key));
      expect(keys.every(event => event.isTrusted)).toBe(true);
      expect(onChange).not.toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
      if (mode.name !== 'list without overflow') {
        expect(positions.some(position => position > 0)).toBe(true);
      }
    } finally {
      document.removeEventListener('keydown', capture, true);
    }
  });
});
