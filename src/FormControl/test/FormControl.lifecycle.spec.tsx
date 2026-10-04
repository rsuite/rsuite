import React, { StrictMode, useEffect } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form from '../../Form';
import Schema from '../../Schema';
import useFormControl from '../../useFormControl';
import type { FormInstance } from '../../Form/hooks/useFormRef';

type Mode = 'visible' | 'hidden';
const Activity = (
  React as unknown as {
    Activity?: React.ComponentType<{ mode: Mode; children: React.ReactNode }>;
  }
).Activity;
const ActivityBoundary =
  Activity ?? (({ children }: { mode: Mode; children: React.ReactNode }) => <>{children}</>);

describe.skipIf(!Activity).each(['form', 'field'] as const)(
  'Actual Activity hiding the %s',
  scope => {
    it.each([false, true])(
      'retains the same DOM, draft and error with shouldReset=%s',
      async reset => {
        const ref = React.createRef<FormInstance>();
        const onChange = vi.fn();
        const onCheck = vi.fn();
        const onSubmit = vi.fn();
        const ui = (mode: Mode) => {
          const control = (
            <Form.Control name="username" aria-label="Username" shouldResetWithUnmount={reset} />
          );
          const form = (
            <Form
              ref={ref}
              checkTrigger={null}
              formDefaultValue={{ username: 'initial' }}
              onChange={onChange}
              onCheck={onCheck}
              onSubmit={onSubmit}
            >
              {scope === 'field' ? (
                <ActivityBoundary mode={mode}>{control}</ActivityBoundary>
              ) : (
                control
              )}
            </Form>
          );
          return scope === 'form' ? <ActivityBoundary mode={mode}>{form}</ActivityBoundary> : form;
        };
        const { rerender } = render(ui('visible'));
        const input = screen.getByRole('textbox') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'saved draft' } });
        act(() => ref.current!.resetErrors({ username: 'Server error' }));
        expect(screen.getByRole('alert')).toHaveTextContent('Server error');
        expect(input).toHaveAttribute('aria-invalid', 'true');
        onChange.mockClear();
        onCheck.mockClear();

        await act(async () => rerender(ui('hidden')));
        const hidden = {
          connected: input.isConnected,
          value: input.value,
          changes: onChange.mock.calls.map(([value]) => value),
          errors: onCheck.mock.calls.map(([value]) => value),
          hasFormHandle: Boolean(ref.current)
        };
        expect(input).toBeInTheDocument();
        expect(input).not.toBeVisible();
        await act(async () => rerender(ui('visible')));
        const revealed = {
          value: input.value,
          error: screen.queryByRole('alert')?.textContent ?? null,
          invalid: input.getAttribute('aria-invalid')
        };
        expect(hidden.connected).toBe(true);
        expect(hidden.value).toBe('saved draft');
        expect(hidden.changes).toEqual([]);
        expect(hidden.errors).toEqual([]);
        act(() => ref.current!.submit());
        expect(screen.getByRole('textbox')).toBe(input);
        expect(input).toHaveValue('saved draft');
        expect(revealed.error).toBe('Server error');
        expect(revealed.invalid).toBe('true');
        expect(onChange).not.toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ username: 'saved draft' }, undefined);
      }
    );

    it('re-registers inline validation after repeated hide and reveal', async () => {
      const ref = React.createRef<FormInstance>();
      const checkRule = vi.fn(() => false);
      const rule = Schema.Types.StringType().addRule(checkRule, 'Inline error');
      const onCheck = vi.fn();
      const ui = (mode: Mode) => {
        const control = <Form.Control name="username" aria-label="Username" rule={rule} />;
        const form = (
          <Form
            ref={ref}
            checkTrigger={null}
            formDefaultValue={{ username: 'draft' }}
            onCheck={onCheck}
          >
            {scope === 'field' ? (
              <ActivityBoundary mode={mode}>{control}</ActivityBoundary>
            ) : (
              control
            )}
          </Form>
        );
        return scope === 'form' ? <ActivityBoundary mode={mode}>{form}</ActivityBoundary> : form;
      };
      const { rerender } = render(ui('visible'));
      const hiddenChecks: boolean[] = [];
      for (let cycle = 0; cycle < 3; cycle++) {
        act(() => expect(ref.current!.check()).toBe(false));
        expect(screen.getByRole('alert')).toHaveTextContent('Inline error');
        await act(async () => rerender(ui('hidden')));
        if (scope === 'field') {
          act(() => hiddenChecks.push(ref.current!.check()));
        }
        await act(async () => rerender(ui('visible')));
      }
      act(() => expect(ref.current!.check()).toBe(false));
      expect(screen.getByRole('alert')).toHaveTextContent('Inline error');
      expect(checkRule).toHaveBeenCalledTimes(4);
      expect(hiddenChecks).toEqual(scope === 'field' ? [true, true, true] : []);
    });
  }
);

function ReplayProbe({ onSetup, onCleanup }: { onSetup: () => void; onCleanup: () => void }) {
  useEffect(() => {
    onSetup();
    return onCleanup;
  }, [onSetup, onCleanup]);
  return null;
}

describe.each([false, true])('Initial public Form with StrictMode=%s', strict => {
  it.each([false, true])('retains saved value when shouldResetWithUnmount=%s', reset => {
    const ref = React.createRef<FormInstance>();
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    const onSetup = vi.fn();
    const onCleanup = vi.fn();
    const attachedNodes: HTMLInputElement[] = [];
    const inputRef = (node: HTMLInputElement | null) => {
      if (node) attachedNodes.push(node);
    };
    const form = (
      <Form
        ref={ref}
        formDefaultValue={{ username: 'saved draft' }}
        checkTrigger={null}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <ReplayProbe onSetup={onSetup} onCleanup={onCleanup} />
        <Form.Control
          name="username"
          aria-label="Username"
          shouldResetWithUnmount={reset}
          inputRef={inputRef}
        />
      </Form>
    );
    render(strict ? <StrictMode>{form}</StrictMode> : form);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    act(() => ref.current!.submit());
    expect(onSetup).toHaveBeenCalledTimes(strict ? 2 : 1);
    expect(onCleanup).toHaveBeenCalledTimes(strict ? 1 : 0);
    expect(attachedNodes.length).toBeGreaterThan(0);
    expect(attachedNodes.every(node => node === input)).toBe(true);
    expect(input).toHaveValue('saved draft');
    expect(onChange).not.toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ username: 'saved draft' }, undefined);
  });
});

describe('Non-StrictMode physical Form.Control unmount', () => {
  it.each([false, true])('preserves actual unmount shouldReset=%s behavior', reset => {
    const ref = React.createRef<FormInstance>();
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    const ui = (mounted: boolean) => (
      <Form
        ref={ref}
        formDefaultValue={{ username: 'saved draft' }}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        {mounted && (
          <Form.Control name="username" aria-label="Username" shouldResetWithUnmount={reset} />
        )}
      </Form>
    );
    const { rerender } = render(ui(true));
    const input = screen.getByRole('textbox');
    rerender(ui(false));
    expect(input).not.toBeInTheDocument();
    if (reset) {
      expect(onChange).toHaveBeenCalledExactlyOnceWith({});
    } else {
      expect(onChange).not.toHaveBeenCalled();
    }
    act(() => ref.current!.submit());
    expect(onSubmit).toHaveBeenCalledExactlyOnceWith(
      reset ? {} : { username: 'saved draft' },
      undefined
    );
  });
});

describe('Form.Control host lifetime and public refs', () => {
  it('preserves a forwarded custom host and clears synchronously on removal', () => {
    const Host = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      (props, ref) => <section {...props} ref={ref} />
    );
    const ref = React.createRef<FormInstance>();
    const host = React.createRef<HTMLDivElement>();
    const onChange = vi.fn();
    const { unmount } = render(
      <StrictMode>
        <Form ref={ref} formDefaultValue={{ username: 'draft' }} onChange={onChange}>
          <Form.Control as={Host} ref={host} name="username" shouldResetWithUnmount />
        </Form>
      </StrictMode>
    );
    expect(host.current?.tagName).toBe('SECTION');
    expect(onChange).not.toHaveBeenCalled();
    unmount();
    expect(onChange).toHaveBeenCalledExactlyOnceWith({});
    expect(host.current).toBeNull();
  });

  it('forwards callback cleanup without detaching a stable ref on rerender', () => {
    const cleanup = vi.fn();
    const callback = vi.fn((node: HTMLDivElement | null) => {
      if (node) {
        expect(node.tagName).toBe('DIV');
      }
      return React.version.startsWith('18.') ? undefined : cleanup;
    });
    const onChange = vi.fn();
    const ui = (label: string) => (
      <Form aria-label={label} formDefaultValue={{ username: 'draft' }} onChange={onChange}>
        <Form.Control ref={callback} name="username" shouldResetWithUnmount />
      </Form>
    );
    const { rerender, unmount } = render(ui('Initial'));
    const host = callback.mock.calls[0][0];
    rerender(ui('Updated'));
    expect(callback).toHaveBeenCalledExactlyOnceWith(host);
    expect(cleanup).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    unmount();
    if (React.version.startsWith('18.')) {
      expect(callback.mock.calls).toEqual([[host], [null]]);
    } else {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(cleanup).toHaveBeenCalledTimes(1);
    }
    expect(onChange).toHaveBeenCalledExactlyOnceWith({});
  });

  it('forwards ref replacement without resetting the connected field', () => {
    const first = vi.fn();
    const second = vi.fn();
    const onChange = vi.fn();
    const ui = (ref: React.Ref<HTMLDivElement>) => (
      <Form formDefaultValue={{ username: 'draft' }} onChange={onChange}>
        <Form.Control ref={ref} name="username" shouldResetWithUnmount />
      </Form>
    );
    const { rerender, unmount } = render(ui(first));
    const host = first.mock.calls[0][0];
    rerender(ui(second));
    expect(first.mock.calls).toEqual([[host], [null]]);
    expect(second).toHaveBeenCalledExactlyOnceWith(host);
    expect(onChange).not.toHaveBeenCalled();
    unmount();
    expect(second.mock.calls).toEqual([[host], [null]]);
    expect(onChange).toHaveBeenCalledExactlyOnceWith({});
  });

  it('keeps legacy cleanup when a custom wrapper exposes a class instance, not a DOM ref', () => {
    class Host extends React.Component<{ children?: React.ReactNode }> {
      render() {
        return <div>{this.props.children}</div>;
      }
    }
    const callback = vi.fn();
    const onChange = vi.fn();
    const { unmount } = render(
      <StrictMode>
        <Form formDefaultValue={{ username: 'draft' }} onChange={onChange}>
          <Form.Control as={Host} ref={callback} name="username" shouldResetWithUnmount />
        </Form>
      </StrictMode>
    );
    expect(callback.mock.calls[0][0]).toBeInstanceOf(Host);
    expect(onChange).toHaveBeenCalledExactlyOnceWith({});
    onChange.mockClear();
    unmount();
    expect(callback).toHaveBeenLastCalledWith(null);
    expect(onChange).toHaveBeenCalledExactlyOnceWith({});
  });

  it('recognizes a connected iframe host without a current-window instanceof check', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const owner = iframe.contentDocument!;
    const container = owner.createElement('div');
    owner.body.appendChild(container);
    const ref = React.createRef<FormInstance>();
    const host = React.createRef<HTMLDivElement>();
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    const view = render(
      <StrictMode>
        <Form
          ref={ref}
          formDefaultValue={{ username: 'draft' }}
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <Form.Control ref={host} name="username" shouldResetWithUnmount />
        </Form>
      </StrictMode>,
      { container }
    );
    try {
      expect(host.current?.ownerDocument).toBe(owner);
      expect(host.current?.isConnected).toBe(true);
      expect(onChange).not.toHaveBeenCalled();
      act(() => ref.current!.submit());
      expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ username: 'draft' }, undefined);
      view.unmount();
      expect(onChange).toHaveBeenCalledExactlyOnceWith({});
      expect(host.current).toBeNull();
    } finally {
      view.unmount();
      iframe.remove();
    }
  });

  it('falls back safely when an imperative custom host supplies an undefined ref', () => {
    const Host = React.forwardRef<undefined, { children?: React.ReactNode }>((props, ref) => {
      React.useImperativeHandle(ref, () => undefined);
      return <div>{props.children}</div>;
    });
    const callback = vi.fn();
    const onChange = vi.fn();
    const { unmount } = render(
      <StrictMode>
        <Form formDefaultValue={{ username: 'draft' }} onChange={onChange}>
          <Form.Control as={Host} ref={callback} name="username" shouldResetWithUnmount />
        </Form>
      </StrictMode>
    );
    expect(callback).toHaveBeenCalledWith(undefined);
    expect(onChange).toHaveBeenCalledExactlyOnceWith({});
    onChange.mockClear();
    unmount();
    expect(onChange).toHaveBeenCalledExactlyOnceWith({});
  });
});

describe('Form.Control removal ownership', () => {
  it('clears each field exactly once when the whole form is physically removed', () => {
    const ref = React.createRef<FormInstance>();
    const onChange = vi.fn();
    const onCheck = vi.fn();
    const { unmount } = render(
      <Form
        ref={ref}
        formDefaultValue={{ first: 'one', second: 'two' }}
        onChange={onChange}
        onCheck={onCheck}
      >
        <Form.Control name="first" shouldResetWithUnmount />
        <Form.Control name="second" shouldResetWithUnmount />
      </Form>
    );
    act(() => ref.current!.resetErrors({ first: 'First error', second: 'Second error' }));
    onCheck.mockClear();
    unmount();
    expect(onChange.mock.calls).toEqual([[{ second: 'two' }], [{}]]);
    expect(onCheck.mock.calls).toEqual([[{ second: 'Second error' }], [{}]]);
    expect(ref.current).toBeNull();
  });

  it('clears a nested field immediately while retaining another mounted field', () => {
    const ref = React.createRef<FormInstance>();
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    const ui = (mounted: boolean) => (
      <Form
        ref={ref}
        nestedField
        formDefaultValue={{ profile: { username: 'draft' }, email: 'saved@example.com' }}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        {mounted && <Form.Control key="username" name="profile.username" shouldResetWithUnmount />}
        <Form.Control key="email" name="email" />
      </Form>
    );
    const { rerender } = render(ui(true));
    rerender(ui(false));
    const value = { profile: {}, email: 'saved@example.com' };
    expect(onChange).toHaveBeenCalledExactlyOnceWith(value);
    act(() => ref.current!.submit());
    expect(onSubmit).toHaveBeenCalledExactlyOnceWith(value, undefined);
  });

  it('retains both values on name change and removes only the latest name on unmount', () => {
    const ref = React.createRef<FormInstance>();
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    const ui = (name: string | null) => (
      <Form
        ref={ref}
        formDefaultValue={{ username: 'draft', email: 'mail' }}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        {name && <Form.Control name={name} shouldResetWithUnmount />}
      </Form>
    );
    const { rerender } = render(ui('username'));
    const host = screen.getByTestId('form-control-wrapper');
    rerender(ui('email'));
    expect(screen.getByTestId('form-control-wrapper')).toBe(host);
    expect(onChange).not.toHaveBeenCalled();
    rerender(ui(null));
    expect(onChange).toHaveBeenCalledExactlyOnceWith({ username: 'draft' });
    act(() => ref.current!.submit());
    expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ username: 'draft' }, undefined);
  });

  it('clears the removed keyed field without clearing its mounted replacement', () => {
    const ref = React.createRef<FormInstance>();
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    const ui = (name: string) => (
      <Form
        ref={ref}
        formDefaultValue={{ username: 'old', email: 'new' }}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <Form.Control key={name} name={name} shouldResetWithUnmount />
      </Form>
    );
    const { rerender } = render(ui('username'));
    const host = screen.getByTestId('form-control-wrapper');
    rerender(ui('email'));
    expect(host).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('new');
    expect(onChange).toHaveBeenCalledExactlyOnceWith({ email: 'new' });
    act(() => ref.current!.submit());
    expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ email: 'new' }, undefined);
  });

  it('keeps controlled values authoritative while reporting physical removal synchronously', () => {
    const ref = React.createRef<FormInstance>();
    const onChange = vi.fn();
    const onCheck = vi.fn();
    const onSubmit = vi.fn();
    const ui = (mounted: boolean) => (
      <StrictMode>
        <Form
          ref={ref}
          formValue={{ username: 'controlled draft' }}
          formError={{ username: 'Server error' }}
          onChange={onChange}
          onCheck={onCheck}
          onSubmit={onSubmit}
        >
          {mounted && <Form.Control name="username" shouldResetWithUnmount />}
        </Form>
      </StrictMode>
    );
    const { rerender } = render(ui(true));
    expect(screen.getByRole('textbox')).toHaveValue('controlled draft');
    expect(screen.getByRole('alert')).toHaveTextContent('Server error');
    expect(onChange).not.toHaveBeenCalled();
    expect(onCheck).not.toHaveBeenCalled();
    rerender(ui(false));
    expect(onChange).toHaveBeenCalledExactlyOnceWith({});
    expect(onCheck).toHaveBeenCalledExactlyOnceWith({});
    act(() => ref.current!.submit());
    expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ username: 'controlled draft' }, undefined);
  });

  it('does not change standalone useFormControl effect-cleanup behavior', () => {
    function Control() {
      const { value, onChange } = useFormControl({
        name: 'username',
        shouldResetWithUnmount: true
      });
      return <input value={value ?? ''} onChange={event => onChange(event.target.value, event)} />;
    }
    const onChange = vi.fn();
    render(
      <StrictMode>
        <Form formDefaultValue={{ username: 'draft' }} onChange={onChange}>
          <Control />
        </Form>
      </StrictMode>
    );
    expect(onChange).toHaveBeenCalledExactlyOnceWith({});
  });
});
