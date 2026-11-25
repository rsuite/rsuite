import React from 'react';
import { expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { act, render, screen } from '@testing-library/react';
import AutoComplete from '../AutoComplete';

it.each(['pointer', 'keyboard'])(
  'restores controlled selection by %s after re-enabling',
  async inputMethod => {
    const onChange = vi.fn();
    const onSelect = vi.fn();
    const props = { open: true, value: 'Br', data: ['Bravo'], onChange, onSelect };
    const { rerender } = render(<AutoComplete {...props} />);

    expect(await screen.findByRole('option', { name: 'Bravo' })).toBeTruthy();
    const input = screen.getByRole('combobox');
    act(() => input.focus());
    await act(() => userEvent.keyboard('{ArrowDown}'));
    expect(input.getAttribute('aria-activedescendant')).toBeTruthy();

    rerender(<AutoComplete {...props} disabled />);
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(input.getAttribute('aria-controls')).toBeNull();
    expect(input.getAttribute('aria-activedescendant')).toBeNull();
    expect(screen.queryByRole('option', { name: 'Bravo' })).toBeNull();
    await act(() => userEvent.keyboard('{Enter}'));
    expect(onChange).not.toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();
    expect(input).to.have.value('Br');

    rerender(<AutoComplete {...props} />);
    const option = await screen.findByRole('option', { name: 'Bravo' });
    if (inputMethod === 'pointer') {
      await act(() => userEvent.click(option));
    } else {
      act(() => input.focus());
      await act(() => userEvent.keyboard('{ArrowDown}{Enter}'));
    }

    expect(onChange).toHaveBeenCalledExactlyOnceWith('Bravo', expect.anything());
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
    expect(onSelect).toHaveBeenCalledTimes(1);
  }
);

it('does not reopen an uncontrolled list just by re-enabling the input', () => {
  const inputRef = React.createRef<HTMLInputElement>();
  const props = { defaultValue: 'Br', data: ['Bravo'], inputRef };
  const { rerender } = render(<AutoComplete {...props} />);
  const input = screen.getByRole('combobox');
  expect(inputRef.current).toBe(input);
  act(() => input.focus());
  expect(screen.getByRole('option', { name: 'Bravo' })).toBeTruthy();

  rerender(<AutoComplete {...props} disabled />);
  expect(inputRef.current).toBe(input);
  expect(document.activeElement).not.toBe(input);
  expect(input.getAttribute('aria-expanded')).toBe('false');
  expect(screen.queryByRole('option', { name: 'Bravo' })).toBeNull();

  rerender(<AutoComplete {...props} />);
  expect(input.getAttribute('aria-expanded')).toBe('false');
  expect(screen.queryByRole('option', { name: 'Bravo' })).toBeNull();
  expect(input).to.have.value('Br');

  act(() => input.focus());
  expect(screen.getByRole('option', { name: 'Bravo' })).toBeTruthy();
});

it('does not let a pending blur close a newly opened list after re-enabling', () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  try {
    const onClose = vi.fn();
    const fixture = (disabled = false) => (
      <>
        <AutoComplete defaultValue="Br" data={['Bravo']} disabled={disabled} onClose={onClose} />
        <button type="button">Outside</button>
      </>
    );
    const { rerender } = render(fixture());
    const input = screen.getByRole('combobox');
    act(() => input.focus());
    expect(screen.getByRole('option', { name: 'Bravo' })).toBeTruthy();
    act(() => screen.getByRole('button', { name: 'Outside' }).focus());
    rerender(fixture(true));
    rerender(fixture());
    act(() => input.focus());
    expect(screen.getByRole('option', { name: 'Bravo' })).toBeTruthy();

    act(() => vi.advanceTimersByTime(350));
    expect(onClose).not.toHaveBeenCalled();
    expect(input.getAttribute('aria-expanded')).toBe('true');

    act(() => screen.getByRole('button', { name: 'Outside' }).focus());
    act(() => vi.advanceTimersByTime(350));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(input.getAttribute('aria-expanded')).toBe('false');
  } finally {
    vi.useRealTimers();
  }
});
