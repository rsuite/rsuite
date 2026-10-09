import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import AutoComplete from '../AutoComplete';
import '../styles/index.scss';

const data = ['alpha', 'beta', 'gamma'];
const modes = ['uncontrolled', 'controlled'] as const;

async function key(value: string) {
  await act(() => userEvent.keyboard(`{${value}}`));
}

function callbacks() {
  return {
    onSelect: vi.fn(),
    onChange: vi.fn(),
    onClose: vi.fn(),
    onEntered: vi.fn(),
    onKeyDown: vi.fn()
  };
}

async function open(events: ReturnType<typeof callbacks>) {
  const input = screen.getByRole('combobox');
  await act(() => userEvent.click(input));
  const listbox = await screen.findByRole('listbox');
  await waitFor(() => expect(events.onEntered).toHaveBeenCalledTimes(1));
  expect(input).to.have.attribute('aria-controls', listbox.id);
  events.onClose.mockClear();
  return { input, listbox };
}

function expectActiveOption(input: HTMLElement, listbox: HTMLElement, name: string) {
  const option = screen.getByRole('option', { name });
  expect(input).to.have.attribute('aria-activedescendant', option.id);
  expect(document.getElementById(option.id)).toBe(option);
  expect(listbox).to.contain(option);
  expect(option.getBoundingClientRect().height).toBeGreaterThan(0);
  expect(input).to.have.focus;
}

describe.each(modes)('AutoComplete visible focus (%s)', mode => {
  const valueProps = (value: string) =>
    mode === 'controlled' ? { value } : { defaultValue: value };

  it('ignores Enter for a query that is not an option and allows subsequent navigation', async () => {
    const events = callbacks();
    render(<AutoComplete data={data} {...valueProps('a')} {...events} />);
    const { input, listbox } = await open(events);

    expect.soft(input.getAttribute('aria-activedescendant')).toBeNull();
    await key('Enter');
    expect(events.onSelect).not.toHaveBeenCalled();
    expect(events.onChange).not.toHaveBeenCalled();
    expect(events.onClose).not.toHaveBeenCalled();
    expect(input).to.have.value('a');
    expect(input).to.have.attribute('aria-expanded', 'true');

    await key('ArrowDown');
    expectActiveOption(input, listbox, 'alpha');
    await key('Enter');
    expect(events.onSelect).toHaveBeenCalledExactlyOnceWith(
      'alpha',
      { value: 'alpha', label: 'alpha' },
      expect.anything()
    );
    expect(events.onChange).toHaveBeenCalledExactlyOnceWith('alpha', expect.anything());
    expect(events.onClose).toHaveBeenCalledTimes(1);
    expect(events.onKeyDown.mock.calls.map(([event]) => event.key)).toEqual([
      'Enter',
      'ArrowDown',
      'Enter'
    ]);
    expect(events.onKeyDown.mock.calls.every(([event]) => event.nativeEvent.isTrusted)).toBe(true);
  });

  it.each(['data', 'filter'] as const)(
    'ignores a focused option removed by a %s update',
    async update => {
      const events = callbacks();
      const props = { ...valueProps('a'), ...events };
      const view = render(<AutoComplete data={data} {...props} />);
      const { input, listbox } = await open(events);
      await key('ArrowDown');
      expectActiveOption(input, listbox, 'alpha');

      view.rerender(
        <AutoComplete
          {...props}
          data={update === 'data' ? ['beta', 'gamma'] : data}
          filterBy={update === 'filter' ? (_, item) => item.value !== 'alpha' : undefined}
        />
      );
      expect(screen.queryByRole('option', { name: 'alpha' })).toBeNull();
      expect.soft(input.getAttribute('aria-activedescendant')).toBeNull();
      await key('Enter');
      expect(events.onSelect).not.toHaveBeenCalled();
      expect(events.onChange).not.toHaveBeenCalled();
      expect(events.onClose).not.toHaveBeenCalled();
      expect(input).to.have.value('a');

      await key('ArrowDown');
      expectActiveOption(input, listbox, 'beta');
      await key('Enter');
      expect(events.onSelect).toHaveBeenCalledExactlyOnceWith(
        'beta',
        { value: 'beta', label: 'beta' },
        expect.anything()
      );
      expect(events.onChange).toHaveBeenCalledExactlyOnceWith('beta', expect.anything());
      expect(events.onSelect.mock.calls[0][2].nativeEvent.isTrusted).toBe(true);
    }
  );

  it('preserves Enter selection of an initially matching option', async () => {
    const events = callbacks();
    render(<AutoComplete data={data} {...valueProps('alpha')} {...events} />);
    const { input, listbox } = await open(events);
    expectActiveOption(input, listbox, 'alpha');
    await key('Enter');
    expect(events.onSelect).toHaveBeenCalledExactlyOnceWith(
      'alpha',
      { value: 'alpha', label: 'alpha' },
      expect.anything()
    );
    expect(events.onChange).not.toHaveBeenCalled();
    expect(events.onClose).toHaveBeenCalledTimes(1);
    expect(events.onSelect.mock.calls[0][2].nativeEvent.isTrusted).toBe(true);
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
  });
});

it('ignores a focused option hidden by a controlled query update', async () => {
  const events = callbacks();
  const view = render(<AutoComplete data={data} value="a" {...events} />);
  const { input, listbox } = await open(events);
  await key('ArrowDown');
  expectActiveOption(input, listbox, 'alpha');

  view.rerender(<AutoComplete data={data} value="b" {...events} />);
  expect(screen.queryByRole('option', { name: 'alpha' })).toBeNull();
  expect.soft(input.getAttribute('aria-activedescendant')).toBeNull();
  await key('Enter');
  expect(events.onSelect).not.toHaveBeenCalled();
  expect(events.onChange).not.toHaveBeenCalled();
  expect(events.onClose).not.toHaveBeenCalled();
  expect(input).to.have.value('b');

  await key('ArrowDown');
  expectActiveOption(input, listbox, 'beta');
  await key('Enter');
  expect(events.onSelect).toHaveBeenCalledExactlyOnceWith(
    'beta',
    { value: 'beta', label: 'beta' },
    expect.anything()
  );
  expect(events.onChange).toHaveBeenCalledExactlyOnceWith('beta', expect.anything());
  expect(events.onSelect.mock.calls[0][2].nativeEvent.isTrusted).toBe(true);
});
