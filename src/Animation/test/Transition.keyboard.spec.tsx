import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import Modal from '../../Modal';
import Drawer from '../../Drawer';
import { getAnimationEnd } from '../utils';
import '../../Modal/styles/index.scss';
import '../../Drawer/styles/index.scss';

describe.each([
  { name: 'Modal', Dialog: Modal },
  { name: 'Drawer', Dialog: Drawer }
])('$name interrupted animation', ({ Dialog }) => {
  it('preserves an open dialog when its owner reopens it during a native Escape exit', async () => {
    const onClose = vi.fn();
    const onExit = vi.fn();
    const onExited = vi.fn();
    const onEntered = vi.fn();
    const Fixture = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <Dialog
          open={open}
          onClose={event => {
            onClose(event);
            setOpen(false);
          }}
          onExit={() => {
            onExit();
            setOpen(true);
          }}
          onEntered={onEntered}
          onExited={onExited}
        >
          <input aria-label="Dialog field" />
        </Dialog>
      );
    };
    render(<Fixture />);
    const dialog = screen.getByRole('dialog');
    const input = screen.getByRole('textbox', { name: 'Dialog field' });
    fireEvent(dialog, new Event(getAnimationEnd()));
    expect(onEntered).toHaveBeenCalledTimes(1);
    await act(async () => {
      input.focus();
      await userEvent.keyboard('{Escape}');
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    const event = onClose.mock.calls[0][0];
    expect((event.nativeEvent || event).isTrusted).toBe(true);
    expect(onExit).toHaveBeenCalledTimes(1);
    fireEvent(dialog, new Event(getAnimationEnd()));

    expect(onEntered).toHaveBeenCalledTimes(2);
    expect(onExited).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBe(dialog);
    expect(input).to.have.focus;
  });
});
