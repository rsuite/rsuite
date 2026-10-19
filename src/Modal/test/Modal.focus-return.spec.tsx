import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import Modal from '..';
import Drawer from '../../Drawer';
import '../styles/index.scss';
import '../../Drawer/styles/index.scss';

describe.each([
  ['Modal', Modal],
  ['Drawer', Drawer]
] as const)('%s completed-exit focus', (_name, Component) => {
  it.each([false, true])('honors onExited focus with removed opener=%s', async removeOpener => {
    const entered = vi.fn();
    const exited = vi.fn();
    function Example() {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          {(!removeOpener || !open) && <button onClick={() => setOpen(true)}>Open dialog</button>}
          <button>Next task</button>
          <Component
            open={open}
            animationTimeout={0}
            onEntered={entered}
            onClose={() => setOpen(false)}
            onExited={() => {
              exited();
              screen.getByRole('button', { name: 'Next task' }).focus();
            }}
          >
            <button>Dialog task</button>
          </Component>
        </>
      );
    }
    render(<Example />);
    await act(async () => {
      screen.getByRole('button', { name: 'Open dialog' }).focus();
      await userEvent.keyboard('{Enter}');
    });
    await waitFor(() => expect(entered).toHaveBeenCalledOnce());
    await act(async () => {
      screen.getByRole('button', { name: 'Dialog task' }).focus();
      await userEvent.keyboard('{Escape}');
    });
    await waitFor(() => expect(exited).toHaveBeenCalledOnce());
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Next task' })).toHaveFocus();
  });
});
