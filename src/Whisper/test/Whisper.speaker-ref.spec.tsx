import React from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Whisper, { WhisperInstance } from '../Whisper';
import Tooltip from '../../Tooltip';
import Popover from '../../Popover';
import CustomProvider from '../../CustomProvider';
import { mergeRefs } from '@/internals/utils';

const ForwardSpeaker = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <div {...props} ref={ref} />
);

function fixture(
  speaker: React.ReactElement,
  props: Partial<React.ComponentProps<typeof Whisper>> = {}
) {
  return (
    <CustomProvider reduceMotion>
      <Whisper defaultOpen placement="bottom" speaker={speaker} {...props}>
        <button type="button">Anchor</button>
      </Whisper>
    </CustomProvider>
  );
}

async function entered(callback: ReturnType<typeof vi.fn>) {
  await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));
  return screen.getByTestId('speaker');
}

describe('Whisper speaker refs', () => {
  afterEach(() => {
    cleanup();
    expect(vi.mocked(console.error).mock.calls).toEqual([]);
  });

  for (const [name, Speaker] of [
    ['Tooltip', Tooltip],
    ['Popover', Popover],
    ['DOM', 'div'],
    ['forwardRef', ForwardSpeaker]
  ] as const) {
    it(`preserves the ${name} object ref and internal positioning/close targets`, async () => {
      const speakerRef = React.createRef<HTMLDivElement>();
      const whisperRef = React.createRef<WhisperInstance>();
      const onEntered = vi.fn();
      const onExited = vi.fn();
      render(
        fixture(
          <Speaker ref={speakerRef} data-testid="speaker">
            Content
          </Speaker>,
          {
            ref: whisperRef,
            onEntered,
            onExited
          }
        )
      );
      const node = await entered(onEntered);
      expect(speakerRef.current).toBe(node);
      expect(Number.parseFloat(node.style.getPropertyValue('--rs-position-y'))).toBeGreaterThan(0);
      act(() => whisperRef.current?.updatePosition());
      fireEvent.mouseDown(node);
      expect(whisperRef.current?.getState().open).toBe(true);
      fireEvent.mouseDown(document.body);
      await waitFor(() => expect(onExited).toHaveBeenCalledTimes(1));
      expect(speakerRef.current).toBeNull();
      expect(node.isConnected).toBe(false);
    });
  }

  it('keeps a callback attached through positioning and automatic description updates', async () => {
    const speakerRef = vi.fn();
    const whisperRef = React.createRef<WhisperInstance>();
    const onEntered = vi.fn();
    const content = (id?: string) =>
      fixture(
        <Tooltip ref={speakerRef} id={id} data-testid="speaker">
          Content
        </Tooltip>,
        {
          ref: whisperRef,
          onEntered
        }
      );
    const view = render(content());
    const node = await entered(onEntered);
    expect(speakerRef.mock.calls).toEqual([[node]]);
    expect(screen.getByRole('button').getAttribute('aria-describedby')).toBe(node.id);
    act(() => whisperRef.current?.updatePosition());
    view.rerender(content('authored-description'));
    await waitFor(() =>
      expect(screen.getByRole('button').getAttribute('aria-describedby')).toBe(
        'authored-description'
      )
    );
    expect(screen.getByTestId('speaker')).toBe(node);
    expect(speakerRef.mock.calls).toEqual([[node]]);
    view.unmount();
    expect(speakerRef.mock.calls).toEqual([[node], [null]]);
  });

  it('detaches the old object ref when a new ref is supplied to the same speaker', async () => {
    const first = React.createRef<HTMLDivElement>();
    const second = React.createRef<HTMLDivElement>();
    const onEntered = vi.fn();
    const content = (ref: React.Ref<HTMLDivElement>) =>
      fixture(
        <Tooltip ref={ref} data-testid="speaker">
          Content
        </Tooltip>,
        { onEntered }
      );
    const view = render(content(first));
    const node = await entered(onEntered);
    expect(first.current).toBe(node);
    view.rerender(content(second));
    expect(first.current).toBeNull();
    expect(second.current).toBe(node);
    expect(screen.getByTestId('speaker')).toBe(node);
    view.unmount();
    expect(second.current).toBeNull();
  });

  it('detaches and reattaches a callback when closing and reopening the speaker', async () => {
    const speakerRef = vi.fn();
    const onEntered = vi.fn();
    const onExited = vi.fn();
    const content = (open: boolean) =>
      fixture(
        <Tooltip ref={speakerRef} data-testid="speaker">
          Content
        </Tooltip>,
        {
          open,
          onEntered,
          onExited
        }
      );
    const view = render(content(true));
    const first = await entered(onEntered);
    expect(speakerRef.mock.calls).toEqual([[first]]);
    view.rerender(content(false));
    await waitFor(() => expect(onExited).toHaveBeenCalledTimes(1));
    expect(speakerRef.mock.calls).toEqual([[first], [null]]);
    view.rerender(content(true));
    await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(2));
    const second = screen.getByTestId('speaker');
    expect(second).not.toBe(first);
    expect(speakerRef.mock.calls).toEqual([[first], [null], [second]]);
    view.unmount();
    expect(speakerRef.mock.calls).toEqual([[first], [null], [second], [null]]);
  });

  it('updates a stable callback when the speaker DOM node is replaced', async () => {
    const speakerRef = vi.fn();
    const onEntered = vi.fn();
    const content = (key: string) =>
      fixture(
        <Tooltip key={key} ref={speakerRef} data-testid="speaker">
          Content
        </Tooltip>,
        {
          onEntered
        }
      );
    const view = render(content('first'));
    const first = await entered(onEntered);
    expect(speakerRef.mock.calls).toEqual([[first]]);
    view.rerender(content('second'));
    const second = screen.getByTestId('speaker');
    expect(second).not.toBe(first);
    expect(first.isConnected).toBe(false);
    expect(speakerRef.mock.calls).toEqual([[first], [null], [second]]);
    view.unmount();
    expect(speakerRef.mock.calls).toEqual([[first], [null], [second], [null]]);
  });

  it.skipIf(Number.parseInt(React.version, 10) < 19)(
    'honors a React 19 callback cleanup exactly once without a null callback',
    async () => {
      const released = vi.fn();
      const speakerRef = vi.fn((node: HTMLDivElement | null) => {
        if (!node) throw new Error('Expected the returned ref cleanup');
        return () => released(node);
      });
      const onEntered = vi.fn();
      const content = (text: string) =>
        fixture(
          <Tooltip ref={speakerRef} data-testid="speaker">
            {text}
          </Tooltip>,
          { onEntered }
        );
      const view = render(content('First'));
      const node = await entered(onEntered);
      expect(speakerRef.mock.calls).toEqual([[node]]);
      view.rerender(content('Updated'));
      expect(speakerRef.mock.calls).toEqual([[node]]);
      expect(released).not.toHaveBeenCalled();
      view.unmount();
      expect(released).toHaveBeenCalledExactlyOnceWith(node);
      expect(speakerRef).toHaveBeenCalledTimes(1);
    }
  );

  it('keeps render-prop speakers in control of their composed refs', async () => {
    const speakerRef = React.createRef<HTMLDivElement>();
    const onEntered = vi.fn();
    const view = render(
      <CustomProvider reduceMotion>
        <Whisper
          defaultOpen
          onEntered={onEntered}
          speaker={({ className, left, top }, ref) => (
            <div
              ref={mergeRefs(ref, speakerRef)}
              className={className}
              style={{ position: 'absolute', left, top }}
              data-testid="speaker"
            >
              Content
            </div>
          )}
        >
          <button>Anchor</button>
        </Whisper>
      </CustomProvider>
    );
    const node = await entered(onEntered);
    expect(speakerRef.current).toBe(node);
    view.unmount();
    expect(speakerRef.current).toBeNull();
  });
});
