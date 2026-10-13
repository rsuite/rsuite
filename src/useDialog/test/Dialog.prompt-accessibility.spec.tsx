import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render as renderView,
  renderHook,
  screen
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CustomProvider from '../../CustomProvider';
import Dialog, { type DialogProps } from '../Dialog';
import useDialog from '../useDialog';

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const prompt = (props: Partial<DialogProps> = {}) => (
  <Dialog type="prompt" content="Your name" enforceFocus={false} {...props} />
);

function renderDialogs(element: React.ReactElement) {
  const view = renderView(element);
  act(() => vi.advanceTimersByTime(1000));
  return {
    ...view,
    rerender(next: React.ReactElement) {
      view.rerender(next);
      act(() => vi.advanceTimersByTime(1000));
    }
  };
}

function expectError(input: HTMLElement, message: string) {
  const error = screen.getByRole('alert');
  expect(error.textContent).toBe(message);
  expect(input.getAttribute('aria-invalid')).toBe('true');
  expect(error.id).not.toBe('');
  expect(input.getAttribute('aria-describedby')).toBe(error.id);
  expect(document.getElementById(error.id)).toBe(error);
  return error;
}

describe('Dialog prompt accessibility', () => {
  it('associates each label with its own input when prompts coexist', () => {
    renderDialogs(
      <>
        {prompt({ content: 'First name' })}
        {prompt({ content: 'Second name' })}
      </>
    );
    const inputs = screen.getAllByRole('textbox', { hidden: true });
    const first = screen.getByText('First name') as HTMLLabelElement;
    const second = screen.getByText('Second name') as HTMLLabelElement;
    expect(first.control).toBe(inputs[0]);
    expect(second.control).toBe(inputs[1]);
    expect(inputs[0].id).not.toBe(inputs[1].id);
  });

  it('retains the input ID and label association across updates', () => {
    const view = renderDialogs(prompt({ defaultValue: 'Ada' }));
    const input = screen.getByRole('textbox', { name: 'Your name' });
    const id = input.id;
    expect(id).not.toBe('');
    view.rerender(prompt({ content: 'Full name', title: 'Updated title' }));
    expect(screen.getByRole('textbox', { name: 'Full name' })).toBe(input);
    expect(input.id).toBe(id);
  });

  it('does not announce an error before validation', () => {
    renderDialogs(prompt({ validate: () => [false, 'Name is required'] }));
    const input = screen.getByRole('textbox', { name: 'Your name' });
    expect(input.getAttribute('aria-invalid')).not.toBe('true');
    expect(input.getAttribute('aria-describedby')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it.each(['button', 'Enter'])('associates a rejected %s submission with the input', method => {
    const onClose = vi.fn();
    renderDialogs(prompt({ validate: () => [false, 'Name is required'], onClose }));
    const input = screen.getByRole('textbox', { name: 'Your name' });
    if (method === 'button') {
      fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    } else {
      fireEvent.keyDown(input, { key: 'Enter' });
    }
    expectError(input, 'Name is required');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('associates the default error when validation provides no message', () => {
    renderDialogs(prompt({ validate: () => [false] }));
    const input = screen.getByRole('textbox');
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expectError(input, 'Invalid input');
  });

  it('clears stale error semantics while editing and reconnects the next error', () => {
    const view = renderDialogs(prompt({ validate: () => [false, 'First error'] }));
    const input = screen.getByRole('textbox');
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    const id = expectError(input, 'First error').id;
    const inputId = input.id;

    fireEvent.change(input, { target: { value: 'Updated' } });
    expect(input.getAttribute('aria-invalid')).not.toBe('true');
    expect(input.getAttribute('aria-describedby')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();
    expect(document.getElementById(id)).toBeNull();

    view.rerender(prompt({ validate: () => [false, 'Second error'] }));
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(expectError(input, 'Second error').id).toBe(id);
    expect(input.id).toBe(inputId);
  });

  it('keeps stacked prompt errors connected to their respective inputs', () => {
    const first = prompt({ content: 'First name', validate: () => [false, 'First error'] });
    const view = renderDialogs(<>{first}</>);
    const firstInput = screen.getByRole('textbox');
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    const firstError = expectError(firstInput, 'First error');

    view.rerender(
      <>
        {first}
        {prompt({ content: 'Second name', validate: () => [false, 'Second error'] })}
      </>
    );
    const inputs = screen.getAllByRole('textbox', { hidden: true });
    const buttons = screen.getAllByText('OK');
    fireEvent.click(buttons[1]);
    const errors = screen.getAllByRole('alert', { hidden: true });
    expect(errors).toHaveLength(2);
    expect(errors[0]).toBe(firstError);
    expect(errors[1].id).not.toBe(firstError.id);
    expect(inputs[0].getAttribute('aria-describedby')).toBe(firstError.id);
    expect(inputs[1].getAttribute('aria-describedby')).toBe(errors[1].id);
    expect(document.getElementById(errors[1].id)).toBe(errors[1]);
  });

  it('preserves label ownership through the public prompt API', async () => {
    const { result } = renderHook(() => useDialog(), {
      wrapper: ({ children }) => <CustomProvider>{children}</CustomProvider>
    });
    await act(async () => {
      void result.current.prompt('First prompt');
      void result.current.prompt('Second prompt');
    });
    act(() => vi.advanceTimersByTime(1000));
    const inputs = screen.getAllByRole('textbox', { hidden: true });
    expect((screen.getByText('First prompt') as HTMLLabelElement).control).toBe(inputs[0]);
    expect((screen.getByText('Second prompt') as HTMLLabelElement).control).toBe(inputs[1]);
  });

  it('closes a valid prompt with its input value', () => {
    const onClose = vi.fn();
    renderDialogs(prompt({ defaultValue: 'Ada', validate: () => [true], onClose }));
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    act(() => vi.advanceTimersByTime(300));
    expect(onClose).toHaveBeenCalledExactlyOnceWith('Ada');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it.each(['alert', 'confirm'] as const)('does not add prompt semantics to %s dialogs', type => {
    renderDialogs(prompt({ type }));
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
