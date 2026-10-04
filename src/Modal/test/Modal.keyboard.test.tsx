import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Modal from '..';
import Drawer from '../../Drawer';
import '../styles/index.scss';
import '../../Drawer/styles/index.scss';

let nativeKeys: KeyboardEvent[];
const recordKey = (event: KeyboardEvent) => nativeKeys.push(event);
beforeEach(() => {
  nativeKeys = [];
  document.addEventListener('keydown', recordKey, true);
});
afterEach(() => {
  document.removeEventListener('keydown', recordKey, true);
  expect(nativeKeys.every(event => event.isTrusted)).toBe(true);
});

describe.each([
  ['Modal', Modal],
  ['Drawer', Drawer]
] as const)('%s native Tab order', (_name, Component) => {
  it.each(['forward', 'backward'] as const)(
    'wraps %s between the first and last buttons',
    async direction => {
      const onEntered = vi.fn();
      render(
        <>
          <button>Outside before</button>
          <Component open animationTimeout={0} onEntered={onEntered}>
            <button>First action</button>
            <button disabled>Disabled action</button>
            <button style={{ display: 'none' }}>Hidden action</button>
            <button>Last action</button>
          </Component>
          <button>Outside after</button>
        </>
      );
      await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
      const start = screen.getByRole('button', {
        name: direction === 'forward' ? 'Last action' : 'First action'
      });
      const expected = screen.getByRole('button', {
        name: direction === 'forward' ? 'First action' : 'Last action'
      });
      const events: KeyboardEvent[] = [];
      const capture = (event: KeyboardEvent) => events.push(event);
      document.addEventListener('keydown', capture, true);
      try {
        await act(async () => {
          await userEvent.click(start);
          await userEvent.keyboard(direction === 'forward' ? '{Tab}' : '{Shift>}{Tab}{/Shift}');
        });
        expect(events.some(event => event.key === 'Tab')).toBe(true);
        expect(events.every(event => event.isTrusted)).toBe(true);
        await waitFor(() => expect(expected).toHaveFocus());
      } finally {
        document.removeEventListener('keydown', capture, true);
      }
    }
  );

  it('keeps native Tab order within content', async () => {
    const onEntered = vi.fn();
    render(
      <Component open animationTimeout={0} onEntered={onEntered}>
        <button>First action</button>
        <button disabled>Disabled action</button>
        <button>Last action</button>
      </Component>
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'First action' }));
      await userEvent.keyboard('{Tab}');
    });
    expect(screen.getByRole('button', { name: 'Last action' })).toHaveFocus();
  });

  it('allows external focus when enforcement is disabled', async () => {
    const onEntered = vi.fn();
    render(
      <>
        <Component open animationTimeout={0} enforceFocus={false} onEntered={onEntered}>
          <button>First action</button>
        </Component>
        <button>External action</button>
      </>
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    act(() => screen.getByRole('button', { name: 'External action' }).focus());
    expect(screen.getByRole('button', { name: 'External action' })).toHaveFocus();
  });

  it('uses positive tabindex order before ordinary buttons', async () => {
    const onEntered = vi.fn();
    render(
      <Component open animationTimeout={0} onEntered={onEntered}>
        <button>First DOM action</button>
        <button tabIndex={2}>Second ordered action</button>
        <button tabIndex={1}>First ordered action</button>
        <button>Last DOM action</button>
      </Component>
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Last DOM action' }));
      await userEvent.keyboard('{Tab}');
    });
    expect(screen.getByRole('button', { name: 'First ordered action' })).toHaveFocus();
    await act(async () => userEvent.keyboard('{Tab}'));
    expect(screen.getByRole('button', { name: 'Second ordered action' })).toHaveFocus();
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'First ordered action' }));
      await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    });
    expect(screen.getByRole('button', { name: 'Last DOM action' })).toHaveFocus();
  });

  it('keeps its positive-to-zero transition inside despite outside ordered buttons', async () => {
    const onEntered = vi.fn();
    render(
      <>
        <button tabIndex={3}>Outside ordered action</button>
        <Component open animationTimeout={0} onEntered={onEntered}>
          <button tabIndex={1}>First ordered action</button>
          <button tabIndex={2}>Last ordered action</button>
          <button>First ordinary action</button>
          <button>Last ordinary action</button>
        </Component>
      </>
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Last ordered action' }));
      await userEvent.keyboard('{Tab}');
    });
    expect(screen.getByRole('button', { name: 'First ordinary action' })).toHaveFocus();
    await act(async () => userEvent.keyboard('{Shift>}{Tab}{/Shift}'));
    expect(screen.getByRole('button', { name: 'Last ordered action' })).toHaveFocus();
  });

  it('excludes inert, invisible, negative tabindex and disabled fieldset controls', async () => {
    const onEntered = vi.fn();
    render(
      <Component open animationTimeout={0} onEntered={onEntered}>
        <div ref={node => node?.setAttribute('inert', '')}>
          <button>Inert action</button>
        </div>
        <button style={{ visibility: 'hidden' }}>Invisible action</button>
        <button tabIndex={-2}>Programmatic action</button>
        <fieldset disabled>
          <button tabIndex={0}>Fieldset action</button>
        </fieldset>
        <button>Only action</button>
      </Component>
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    const only = screen.getByRole('button', { name: 'Only action' });
    await act(async () => {
      await userEvent.click(only);
      await userEvent.keyboard('{Tab}');
    });
    expect(only).toHaveFocus();
    await act(async () => userEvent.keyboard('{Shift>}{Tab}{/Shift}'));
    expect(only).toHaveFocus();
  });

  it('uses the checked radio as its group tab stop', async () => {
    const onEntered = vi.fn();
    render(
      <Component open animationTimeout={0} onEntered={onEntered}>
        <label>
          <input type="radio" name="modal-options" defaultChecked />
          Checked option
        </label>
        <label>
          <input type="radio" name="modal-options" />
          Other option
        </label>
      </Component>
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    const checked = screen.getByRole('radio', { name: 'Checked option' });
    await act(async () => {
      await userEvent.click(checked);
      await userEvent.keyboard('{Tab}');
    });
    expect(checked).toHaveFocus();
    await act(async () => userEvent.keyboard('{Shift>}{Tab}{/Shift}'));
    expect(checked).toHaveFocus();
  });

  it.each(['visible', 'disabled', 'hidden', 'inert', 'negative'] as const)(
    'respects an external checked radio in the same form when it is %s',
    async state => {
      const onEntered = vi.fn();
      render(
        <>
          <form
            id="outside-radio-form"
            ref={node => {
              if (state === 'inert') node?.setAttribute('inert', '');
            }}
          >
            <input
              aria-label="Outside checked option"
              type="radio"
              name="shared-options"
              defaultChecked
              disabled={state === 'disabled'}
              tabIndex={state === 'negative' ? -1 : undefined}
              style={state === 'hidden' ? { display: 'none' } : undefined}
            />
          </form>
          <Component open animationTimeout={0} onEntered={onEntered}>
            <label>
              <input type="radio" name="shared-options" form="outside-radio-form" />
              Inside option
            </label>
            <button>Inside action</button>
          </Component>
        </>
      );
      await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
      const inside = screen.getByRole('radio', { name: 'Inside option' }) as HTMLInputElement;
      const outside = screen.getByLabelText('Outside checked option') as HTMLInputElement;
      const action = screen.getByRole('button', { name: 'Inside action' });
      expect(inside.form).toBe(outside.form);
      expect(outside.checked).toBe(true);
      expect(inside.checked).toBe(false);
      await act(async () => userEvent.keyboard('{Tab}'));
      expect(state === 'visible' ? action : inside).toHaveFocus();
      if (state !== 'visible') {
        await act(async () => userEvent.keyboard('{Tab}'));
        expect(action).toHaveFocus();
      }
      await act(async () => userEvent.keyboard('{Tab}'));
      expect(state === 'visible' ? action : inside).toHaveFocus();
      await act(async () => userEvent.keyboard('{Shift>}{Tab}{/Shift}'));
      expect(action).toHaveFocus();
      expect(outside.checked).toBe(true);
      expect(inside.checked).toBe(false);
    }
  );

  it('keeps a dialog focused when its only radio has an external checked group member', async () => {
    const onEntered = vi.fn();
    render(
      <>
        <form id="outside-radio-form">
          <input type="radio" name="shared-options" defaultChecked />
        </form>
        <Component open animationTimeout={0} onEntered={onEntered}>
          <label>
            <input type="radio" name="shared-options" form="outside-radio-form" />
            Inside option
          </label>
        </Component>
      </>
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    const dialog = screen.getByTestId(`${_name.toLowerCase()}-wrapper`);
    expect(dialog).toHaveFocus();
    await act(async () => userEvent.keyboard('{Tab}'));
    expect(dialog).toHaveFocus();
    await act(async () => userEvent.keyboard('{Shift>}{Tab}{/Shift}'));
    expect(dialog).toHaveFocus();
  });

  it('keeps an empty dialog focused in both directions', async () => {
    const onEntered = vi.fn();
    render(
      <Component open animationTimeout={0} onEntered={onEntered}>
        <p>Read-only content</p>
      </Component>
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    const dialog = screen.getByTestId(`${_name.toLowerCase()}-wrapper`);
    expect(dialog).toHaveFocus();
    await act(async () => userEvent.keyboard('{Tab}'));
    expect(dialog).toHaveFocus();
    await act(async () => userEvent.keyboard('{Shift>}{Tab}{/Shift}'));
    expect(dialog).toHaveFocus();
  });

  it('traps Tab when Escape closing is disabled', async () => {
    const onEntered = vi.fn();
    const onClose = vi.fn();
    render(
      <Component open keyboard={false} animationTimeout={0} onEntered={onEntered} onClose={onClose}>
        <button>Only action</button>
      </Component>
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    const only = screen.getByRole('button', { name: 'Only action' });
    await act(async () => {
      await userEvent.click(only);
      await userEvent.keyboard('{Escape}{Tab}');
    });
    expect(only).toHaveFocus();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('respects a child handling Tab itself', async () => {
    const onEntered = vi.fn();
    render(
      <Component open animationTimeout={0} onEntered={onEntered}>
        <button>First action</button>
        <button onKeyDown={event => event.preventDefault()}>Last action</button>
      </Component>
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    const last = screen.getByRole('button', { name: 'Last action' });
    await act(async () => {
      await userEvent.click(last);
      await userEvent.keyboard('{Tab}');
    });
    expect(last).toHaveFocus();
  });

  it('moves from the initially focused dialog to its last action with Shift+Tab', async () => {
    const onEntered = vi.fn();
    render(
      <Component open animationTimeout={0} onEntered={onEntered}>
        <button>First action</button>
        <button>Last action</button>
      </Component>
    );
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    expect(screen.getByTestId(`${_name.toLowerCase()}-wrapper`)).toHaveFocus();
    await act(async () => userEvent.keyboard('{Shift>}{Tab}{/Shift}'));
    expect(screen.getByRole('button', { name: 'Last action' })).toHaveFocus();
  });

  it.each([false, true])(
    'respects native nested-editor tab stops with explicit index=%s',
    async explicit => {
      const onEntered = vi.fn();
      render(
        <Component open animationTimeout={0} onEntered={onEntered}>
          <div data-testid="outer-editor" contentEditable suppressContentEditableWarning>
            Outer editor
            <div
              data-testid="inner-editor"
              contentEditable
              suppressContentEditableWarning
              tabIndex={explicit ? 0 : undefined}
            >
              Inner editor
            </div>
          </div>
        </Component>
      );
      await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
      await act(async () => userEvent.keyboard('{Shift>}{Tab}{/Shift}'));
      expect(screen.getByTestId(explicit ? 'inner-editor' : 'outer-editor')).toHaveFocus();
      await act(async () => userEvent.keyboard('{Tab}'));
      expect(screen.getByTestId('outer-editor')).toHaveFocus();
    }
  );
});

it('cycles only the top nested dialog and restores its opener after Escape', async () => {
  const entered = vi.fn();
  const closed = vi.fn();
  const outerClosed = vi.fn();
  function Example() {
    const [open, setOpen] = React.useState(false);
    return (
      <Modal open animationTimeout={0} onClose={outerClosed}>
        <button onClick={() => setOpen(true)}>Open inner dialog</button>
        <button>Outer action</button>
        <Drawer
          open={open}
          animationTimeout={0}
          onEntered={entered}
          onClose={() => {
            closed();
            setOpen(false);
          }}
        >
          <button>Inner first</button>
          <button>Inner last</button>
        </Drawer>
      </Modal>
    );
  }
  render(<Example />);
  const opener = screen.getByRole('button', { name: 'Open inner dialog' });
  await act(async () => userEvent.click(opener));
  await waitFor(() => expect(entered).toHaveBeenCalledOnce());
  await act(async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Inner last' }));
    await userEvent.keyboard('{Tab}');
  });
  expect(screen.getByRole('button', { name: 'Inner first' })).toHaveFocus();
  await act(async () => userEvent.keyboard('{Shift>}{Tab}{/Shift}'));
  expect(screen.getByRole('button', { name: 'Inner last' })).toHaveFocus();
  await act(async () => userEvent.keyboard('{Escape}'));
  await waitFor(() => expect(opener).toHaveFocus());
  expect(closed).toHaveBeenCalledOnce();
  expect(outerClosed).not.toHaveBeenCalled();
});
