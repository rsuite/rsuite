import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import Fade from '../Fade';
import '../styles/index.scss';

describe.each([false, true])('Animation child focus with reduceMotion=%s', reduceMotion => {
  it('focuses the child ref on enter and restores it after unmounting and reopening', async () => {
    const childRef = React.createRef<HTMLInputElement>();
    const entered = vi.fn(() => childRef.current?.focus());
    const keyDown = vi.fn();
    const Fixture = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Open field</button>
          <button onClick={() => setOpen(false)}>Close field</button>
          <Fade in={open} unmountOnExit reduceMotion={reduceMotion} onEntered={entered}>
            <input ref={childRef} aria-label="Animated field" onKeyDown={keyDown} />
          </Fade>
        </>
      );
    };
    render(<Fixture />);
    expect(childRef.current).toBeNull();
    await act(() => userEvent.click(screen.getByRole('button', { name: 'Open field' })));
    await waitFor(() => expect(entered).toHaveBeenCalledTimes(1));
    const first = screen.getByRole('textbox', { name: 'Animated field' });
    expect(childRef.current).toBe(first);
    expect(first).to.have.focus;
    await userEvent.keyboard('hello');
    expect(first).to.have.value('hello');
    expect(keyDown).toHaveBeenCalledTimes(5);
    expect(keyDown.mock.calls.every(([event]) => event.nativeEvent.isTrusted)).toBe(true);

    await act(() => userEvent.click(screen.getByRole('button', { name: 'Close field' })));
    await waitFor(() => expect(screen.queryByRole('textbox')).toBeNull());
    expect(childRef.current).toBeNull();
    await act(() => userEvent.click(screen.getByRole('button', { name: 'Open field' })));
    await waitFor(() => expect(entered).toHaveBeenCalledTimes(2));
    const second = screen.getByRole('textbox', { name: 'Animated field' });
    expect(second).not.toBe(first);
    expect(childRef.current).toBe(second);
    expect(second).to.have.focus;
  });
});
