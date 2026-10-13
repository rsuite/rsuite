import React from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Whisper, { WhisperInstance } from '../Whisper';
import Tooltip from '../../Tooltip';
import Button from '../../Button';
import CustomProvider from '../../CustomProvider';
import { mergeRefs } from '@/internals/utils';

const ForwardTrigger = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  (props, ref) => <button {...props} ref={ref} />
);

function fixture(
  children: React.ReactNode,
  props: Partial<React.ComponentProps<typeof Whisper>> = {}
) {
  return (
    <CustomProvider reduceMotion>
      <Whisper trigger="click" placement="bottom" speaker={<Tooltip>Details</Tooltip>} {...props}>
        {children}
      </Whisper>
    </CustomProvider>
  );
}

describe('Whisper trigger refs', () => {
  afterEach(() => {
    cleanup();
    expect(vi.mocked(console.error).mock.calls).toEqual([]);
  });

  for (const [name, Trigger] of [
    ['DOM', 'button'],
    ['Button', Button],
    ['forwardRef', ForwardTrigger]
  ] as const) {
    it(`preserves the ${name} object ref and internal trigger behavior`, async () => {
      const triggerRef = React.createRef<HTMLButtonElement>();
      const whisperRef = React.createRef<WhisperInstance>();
      const onClick = vi.fn();
      const view = render(
        fixture(
          <Trigger ref={triggerRef} onClick={onClick}>
            Anchor
          </Trigger>,
          { ref: whisperRef }
        )
      );
      const node = screen.getByRole('button', { name: 'Anchor' });
      expect(triggerRef.current).toBe(node);
      expect(whisperRef.current?.root).toBe(node);
      act(() => triggerRef.current?.focus());
      expect(document.activeElement).toBe(node);
      fireEvent.click(node);
      const tooltip = await screen.findByRole('tooltip');
      await waitFor(() => expect(node.getAttribute('aria-describedby')).toBe(tooltip.id));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(Number.parseFloat(tooltip.style.getPropertyValue('--rs-position-y'))).toBeGreaterThan(
        0
      );
      fireEvent.mouseDown(node);
      expect(whisperRef.current?.getState().open).toBe(true);
      fireEvent.mouseDown(document.body);
      await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
      expect(triggerRef.current).toBe(node);
      expect(whisperRef.current?.root).toBe(node);
      view.unmount();
      expect(triggerRef.current).toBeNull();
    });
  }

  it('keeps a callback attached through positioning, description changes and speaker close/reopen', async () => {
    const triggerRef = vi.fn();
    const whisperRef = React.createRef<WhisperInstance>();
    const content = (open: boolean, id?: string) =>
      fixture(<button ref={triggerRef}>Anchor</button>, {
        open,
        ref: whisperRef,
        speaker: <Tooltip id={id}>Details</Tooltip>
      });
    const view = render(content(true));
    const node = screen.getByRole('button');
    const tooltip = await screen.findByRole('tooltip');
    await waitFor(() => expect(node.getAttribute('aria-describedby')).toBe(tooltip.id));
    expect(triggerRef.mock.calls).toEqual([[node]]);
    act(() => whisperRef.current?.updatePosition());
    view.rerender(content(true, 'authored-description'));
    await waitFor(() => expect(node.getAttribute('aria-describedby')).toBe('authored-description'));
    view.rerender(content(false));
    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
    expect(triggerRef.mock.calls).toEqual([[node]]);
    view.rerender(content(true));
    await screen.findByRole('tooltip');
    expect(screen.getByRole('button')).toBe(node);
    expect(triggerRef.mock.calls).toEqual([[node]]);
    view.unmount();
    expect(triggerRef.mock.calls).toEqual([[node], [null]]);
  });

  it('replaces an object ref without replacing the trigger or its internal target', () => {
    const first = React.createRef<HTMLButtonElement>();
    const second = React.createRef<HTMLButtonElement>();
    const whisperRef = React.createRef<WhisperInstance>();
    const content = (ref: React.Ref<HTMLButtonElement>) =>
      fixture(<button ref={ref}>Anchor</button>, { ref: whisperRef });
    const view = render(content(first));
    const node = screen.getByRole('button');
    expect(first.current).toBe(node);
    view.rerender(content(second));
    expect(first.current).toBeNull();
    expect(second.current).toBe(node);
    expect(whisperRef.current?.root).toBe(node);
    expect(screen.getByRole('button')).toBe(node);
    view.unmount();
    expect(second.current).toBeNull();
  });

  it('updates a stable callback and the internal target when the trigger node is replaced', () => {
    const triggerRef = vi.fn();
    const whisperRef = React.createRef<WhisperInstance>();
    const content = (key: string) =>
      fixture(
        <button key={key} ref={triggerRef}>
          Anchor
        </button>,
        { ref: whisperRef }
      );
    const view = render(content('first'));
    const first = screen.getByRole('button');
    expect(triggerRef.mock.calls).toEqual([[first]]);
    view.rerender(content('second'));
    const second = screen.getByRole('button');
    expect(second).not.toBe(first);
    expect(first.isConnected).toBe(false);
    expect(whisperRef.current?.root).toBe(second);
    expect(triggerRef.mock.calls).toEqual([[first], [null], [second]]);
    view.unmount();
    expect(triggerRef.mock.calls).toEqual([[first], [null], [second], [null]]);
  });

  it.skipIf(Number.parseInt(React.version, 10) < 19)(
    'honors React 19 ref cleanup on replacement and unmount',
    () => {
      const firstCleanup = vi.fn();
      const secondCleanup = vi.fn();
      const callback = (cleanup: typeof firstCleanup) =>
        vi.fn((node: HTMLButtonElement | null) => {
          if (!node) throw new Error('Expected the returned ref cleanup');
          return () => cleanup(node);
        });
      const first = callback(firstCleanup);
      const second = callback(secondCleanup);
      const content = (ref: React.Ref<HTMLButtonElement>) =>
        fixture(<button ref={ref}>Anchor</button>);
      const view = render(content(first));
      const node = screen.getByRole('button');
      expect(first.mock.calls).toEqual([[node]]);
      view.rerender(content(second));
      expect(firstCleanup).toHaveBeenCalledExactlyOnceWith(node);
      expect(first).toHaveBeenCalledTimes(1);
      expect(second.mock.calls).toEqual([[node]]);
      expect(secondCleanup).not.toHaveBeenCalled();
      view.unmount();
      expect(firstCleanup).toHaveBeenCalledTimes(1);
      expect(secondCleanup).toHaveBeenCalledExactlyOnceWith(node);
      expect(second).toHaveBeenCalledTimes(1);
    }
  );

  it.skipIf(Number.parseInt(React.version, 10) < 19)(
    'preserves ref props on React 19 function components',
    () => {
      const RefPropTrigger = ({ ref, ...props }: React.ComponentPropsWithRef<'button'>) => (
        <button {...props} ref={ref} />
      );
      const triggerRef = React.createRef<HTMLButtonElement>();
      const view = render(fixture(<RefPropTrigger ref={triggerRef}>Anchor</RefPropTrigger>));
      expect(triggerRef.current).toBe(screen.getByRole('button'));
      view.unmount();
      expect(triggerRef.current).toBeNull();
    }
  );

  it('leaves render-prop triggers in control of their composed refs', async () => {
    const triggerRef = React.createRef<HTMLButtonElement>();
    const whisperRef = React.createRef<WhisperInstance>();
    const view = render(
      <CustomProvider reduceMotion>
        <Whisper ref={whisperRef} trigger="click" speaker={<Tooltip>Details</Tooltip>}>
          {(props, ref) => (
            <button {...props} ref={mergeRefs(ref, triggerRef)}>
              Anchor
            </button>
          )}
        </Whisper>
      </CustomProvider>
    );
    const node = screen.getByRole('button');
    expect(triggerRef.current).toBe(node);
    expect(whisperRef.current?.root).toBe(node);
    fireEvent.click(node);
    await screen.findByRole('tooltip');
    view.unmount();
    expect(triggerRef.current).toBeNull();
  });

  it.each(['text', 'fragment'])('keeps the wrapper target for %s children', async kind => {
    const whisperRef = React.createRef<WhisperInstance>();
    const children =
      kind === 'text' ? (
        'Wrapped anchor'
      ) : (
        <>
          <span>Wrapped anchor</span>
        </>
      );
    render(fixture(children, { ref: whisperRef }));
    const node = whisperRef.current?.root as HTMLElement;
    expect(node.tagName).toBe('SPAN');
    expect(node.textContent).toBe('Wrapped anchor');
    fireEvent.click(node);
    await screen.findByRole('tooltip');
  });
});
