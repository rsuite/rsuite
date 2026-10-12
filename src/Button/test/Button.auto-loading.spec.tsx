import React, { StrictMode } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Button from '..';
import ButtonGroup from '../../ButtonGroup';
import IconButton from '../../IconButton';
import '../styles/index.scss';

function deferred() {
  let resolve!: (value?: unknown) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<unknown>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}

const view = (children: React.ReactNode) => <StrictMode>{children}</StrictMode>;
const busy = (button: HTMLElement) => button.getAttribute('aria-busy');
const settle = async (callback: () => void) => {
  await act(async () => callback());
};

describe('Button automatic loading', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('tracks a returned promise, retains focus and blocks repeat activation until completion', async () => {
    const task = deferred();
    const onClick = vi.fn(() => task.promise);
    const ancestor = vi.fn();
    render(
      view(
        <div onClick={ancestor}>
          <Button autoLoading onClick={onClick}>
            Save
          </Button>
        </div>
      )
    );
    const button = screen.getByRole('button');
    button.focus();
    fireEvent.click(button);
    expect(busy(button)).toBe('true');
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.hasAttribute('disabled')).toBe(false);
    expect(document.activeElement).toBe(button);
    expect(button.querySelector('.rs-btn-spin')).not.toBe(null);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(ancestor).toHaveBeenCalledTimes(1);
    await settle(() => task.resolve());
    expect(busy(button)).toBe(null);
    expect(button.getAttribute('aria-disabled')).toBe(null);
    expect(document.activeElement).toBe(button);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(2);
    await settle(() => {});
  });

  it('leaves ordinary promise-returning handlers unchanged unless enabled', async () => {
    const task = deferred();
    const onClick = vi.fn(() => task.promise);
    render(view(<Button onClick={onClick}>Save</Button>));
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(busy(button)).toBe(null);
    expect(button.hasAttribute('data-loading')).toBe(false);
    await settle(() => task.resolve());
  });

  it.each([undefined, 42, false, {}, () => {}])(
    'does not treat the synchronous result %s as a task',
    result => {
      const onClick = vi.fn(() => result);
      render(
        view(
          <Button autoLoading onClick={onClick}>
            Save
          </Button>
        )
      );
      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(2);
      expect(busy(button)).toBe(null);
      expect(button.hasAttribute('data-loading')).toBe(false);
    }
  );

  it('keeps controlled loading in effect when the tracked task finishes', async () => {
    const task = deferred();
    const onClick = vi.fn(() => task.promise);
    const content = (loading: boolean) =>
      view(
        <Button autoLoading loading={loading} onClick={onClick}>
          Save
        </Button>
      );
    const { rerender } = render(content(true));
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    rerender(content(false));
    fireEvent.click(button);
    rerender(content(true));
    await settle(() => task.resolve());
    expect(busy(button)).toBe('true');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(content(false));
    expect(busy(button)).toBe(null);
  });

  it.each([false, true])('respects disabled state supplied by ButtonGroup: %s', group => {
    const onClick = vi.fn();
    const button = (
      <Button autoLoading disabled={group ? undefined : true} onClick={onClick}>
        Save
      </Button>
    );
    render(view(group ? <ButtonGroup disabled>{button}</ButtonGroup> : button));
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
    expect(busy(screen.getByRole('button'))).toBe(null);
  });

  it.each(['click', 'toggle'])('blocks synchronous reentrant activation from %s', async source => {
    const task = deferred();
    const ref = React.createRef<HTMLButtonElement>();
    const onClick = vi.fn(() => {
      if (source === 'click') ref.current!.click();
      return task.promise;
    });
    const onToggle = vi.fn(() => {
      if (source === 'toggle') ref.current!.click();
    });
    render(
      view(
        <Button ref={ref} autoLoading toggleable onClick={onClick} onToggle={onToggle}>
          Save
        </Button>
      )
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledTimes(1);
    await settle(() => task.resolve());
  });

  it('delivers the original rejection and event, unlocks and allows another task', async () => {
    const task = deferred();
    const next = deferred();
    const onError = vi.fn();
    const onClick = vi.fn().mockReturnValueOnce(task.promise).mockReturnValueOnce(next.promise);
    render(
      view(
        <Button autoLoading onClick={onClick} onClickError={onError}>
          Save
        </Button>
      )
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const error = new Error('Save failed');
    await settle(() => task.reject(error));
    expect(onError).toHaveBeenCalledExactlyOnceWith(error, onClick.mock.calls[0][0]);
    expect(busy(button)).toBe(null);
    fireEvent.click(button);
    expect(busy(button)).toBe('true');
    await settle(() => next.resolve());
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it.each([new Error('Uncaught action'), undefined])(
    'reports a rejection globally when no error callback owns it',
    async error => {
      const report = vi.fn();
      vi.stubGlobal('reportError', report);
      const task = deferred();
      render(
        view(
          <Button autoLoading onClick={() => task.promise}>
            Save
          </Button>
        )
      );
      const button = screen.getByRole('button');
      fireEvent.click(button);
      await settle(() => task.reject(error));
      expect(report).toHaveBeenCalledExactlyOnceWith(error);
      expect(busy(button)).toBe(null);
    }
  );

  it('keeps the error callback associated with the task that started it', async () => {
    const task = deferred();
    const first = vi.fn();
    const second = vi.fn();
    const content = (onClickError: (error: unknown) => void) =>
      view(
        <Button autoLoading onClick={() => task.promise} onClickError={onClickError}>
          Save
        </Button>
      );
    const { rerender } = render(content(first));
    fireEvent.click(screen.getByRole('button'));
    rerender(content(second));
    await settle(() => task.reject('failure'));
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).not.toHaveBeenCalled();
  });

  it.each(['click', 'toggle', 'accessor'])(
    'handles synchronous %s errors and unlocks the button',
    source => {
      const error = new Error('Activation failed');
      const onError = vi.fn();
      const onClick = () => {
        if (source === 'click') throw error;
        return Object.defineProperty({}, 'then', {
          get() {
            throw error;
          }
        });
      };
      render(
        view(
          <Button
            autoLoading
            toggleable
            onClick={onClick}
            onToggle={() => {
              if (source === 'toggle') throw error;
            }}
            onClickError={onError}
          >
            Save
          </Button>
        )
      );
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError.mock.calls[0][0]).toBe(error);
      expect(busy(button)).toBe(null);
      fireEvent.click(button);
      expect(onError).toHaveBeenCalledTimes(2);
    }
  );

  it('reads a thenable accessor once and invokes it with its original receiver', async () => {
    const task = deferred();
    const receivers: unknown[] = [];
    const getter = vi.fn(
      () =>
        function (
          this: unknown,
          resolve: (value: unknown) => void,
          reject: (error: unknown) => void
        ) {
          receivers.push(this);
          return task.promise.then(resolve, reject);
        }
    );
    const thenable = Object.defineProperty({}, 'then', { get: getter });
    render(
      view(
        <Button autoLoading onClick={() => thenable}>
          Save
        </Button>
      )
    );
    fireEvent.click(screen.getByRole('button'));
    expect(busy(screen.getByRole('button'))).toBe('true');
    await settle(() => task.resolve());
    expect(getter).toHaveBeenCalledTimes(1);
    expect(receivers).toEqual([thenable]);
    expect(busy(screen.getByRole('button'))).toBe(null);
  });

  it('honors only the first settlement of a thenable', async () => {
    const onError = vi.fn();
    const thenable = {
      then(resolve: (value: unknown) => void, reject: (error: unknown) => void) {
        resolve('done');
        reject('late failure');
        throw new Error('after resolution');
      }
    };
    render(
      view(
        <Button autoLoading onClick={() => thenable} onClickError={onError}>
          Save
        </Button>
      )
    );
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(busy(screen.getByRole('button'))).toBe(null));
    expect(onError).not.toHaveBeenCalled();
  });

  it('continues reporting task failures after unmount', async () => {
    const task = deferred();
    const onError = vi.fn();
    const { unmount } = render(
      view(
        <Button autoLoading onClick={() => task.promise} onClickError={onError}>
          Save
        </Button>
      )
    );
    fireEvent.click(screen.getByRole('button'));
    unmount();
    await settle(() => task.reject('failure after navigation'));
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toBe('failure after navigation');
  });

  it('does not let a removed button settle another instance task', async () => {
    const first = deferred();
    const second = deferred();
    const { unmount } = render(
      view(
        <Button autoLoading onClick={() => first.promise}>
          First
        </Button>
      )
    );
    fireEvent.click(screen.getByRole('button'));
    unmount();
    render(
      view(
        <Button autoLoading onClick={() => second.promise}>
          Second
        </Button>
      )
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await settle(() => first.resolve());
    expect(busy(button)).toBe('true');
    await settle(() => second.resolve());
    expect(busy(button)).toBe(null);
  });

  it('keeps ownership of a pending task when autoLoading is turned off', async () => {
    const task = deferred();
    const onClick = vi.fn(() => task.promise);
    const content = (autoLoading: boolean) =>
      view(
        <Button autoLoading={autoLoading} onClick={onClick}>
          Save
        </Button>
      );
    const { rerender } = render(content(true));
    const button = screen.getByRole('button');
    fireEvent.click(button);
    rerender(content(false));
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(busy(button)).toBe('true');
    await settle(() => task.resolve());
    fireEvent.click(button);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(3);
    expect(busy(button)).toBe(null);
  });

  it('provides the same automatic loading behavior through IconButton', async () => {
    const task = deferred();
    const onClick = vi.fn(() => task.promise);
    render(
      view(
        <IconButton icon={<span>+</span>} autoLoading onClick={onClick}>
          Save
        </IconButton>
      )
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(busy(button)).toBe('true');
    expect(onClick).toHaveBeenCalledTimes(1);
    await settle(() => task.resolve());
    expect(busy(button)).toBe(null);
  });
});
