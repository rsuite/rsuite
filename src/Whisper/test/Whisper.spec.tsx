import React, { CSSProperties, Ref } from 'react';
import Whisper, { WhisperInstance } from '../Whisper';
import Tooltip from '../../Tooltip';
import { describe, expect, it, vi } from 'vitest';
import { act, render, fireEvent, waitFor, screen } from '@testing-library/react';

describe('Whisper', () => {
  it.each([
    ['top', '50%', 'absent'],
    ['bottom', '50%', 'absent'],
    ['left', 'absent', '50%'],
    ['right', 'absent', '50%'],
    ['bottomStart', 'absent', 'absent'],
    ['rightEnd', 'absent', 'absent']
  ] as const)('passes arrow offsets to a custom speaker for %s', async (placement, left, top) => {
    const onEntered = vi.fn();
    render(
      <Whisper
        defaultOpen
        placement={placement}
        onEntered={onEntered}
        speaker={({ arrowOffsetLeft, arrowOffsetTop, className, left, top }, ref) => (
          <div
            ref={ref}
            role="tooltip"
            className={className}
            data-offset-left={arrowOffsetLeft ?? 'absent'}
            data-offset-top={arrowOffsetTop ?? 'absent'}
            style={{ position: 'absolute', left, top, width: 100, height: 60 }}
          >
            Custom speaker
          </div>
        )}
      >
        <button>Anchor</button>
      </Whisper>
    );

    await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('tooltip').getAttribute('data-offset-left')).toBe(left);
    expect(screen.getByRole('tooltip').getAttribute('data-offset-top')).toBe(top);
  });

  it('Should create Whisper element', () => {
    const { container } = render(
      <Whisper speaker={<Tooltip>tooltip</Tooltip>}>
        <button type="button">button</button>
      </Whisper>
    );

    expect(container.firstChild).to.have.tagName('BUTTON');
  });

  it('Should maintain overlay classname when trigger click', () => {
    render(
      <Whisper
        trigger="click"
        speaker={
          <Tooltip className="test-whisper" data-testid="tooltip">
            test
          </Tooltip>
        }
      >
        <button>button</button>
      </Whisper>
    );
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('tooltip')).to.have.class('test-whisper');
  });

  it('Should maintain overlay classname when trigger focus', () => {
    render(
      <Whisper
        trigger="focus"
        speaker={
          <Tooltip className="test-whisper" data-testid="tooltip">
            test
          </Tooltip>
        }
      >
        <button>button</button>
      </Whisper>
    );

    fireEvent.focus(screen.getByRole('button'));
    expect(screen.getByTestId('tooltip')).to.have.class('test-whisper');
  });

  it('Should call onClick callback', () => {
    const onClick = vi.fn();
    render(
      <Whisper onClick={onClick} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should call onOpen callback', async () => {
    const onOpen = vi.fn();
    render(
      <Whisper onOpen={onOpen} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });

  it('Should call onOpen callback by open()', async () => {
    const onOpen = vi.fn();
    const ref = React.createRef<WhisperInstance>();
    render(
      <Whisper ref={ref} onOpen={onOpen} trigger="none" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    ref.current?.open();
    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });

  it('Should call onEntered callback', () => {
    const onEntered = vi.fn();

    vi.useFakeTimers();
    let view: ReturnType<typeof render> | undefined;
    try {
      view = render(
        <Whisper onEntered={onEntered} trigger="click" speaker={<Tooltip />}>
          <button>button</button>
        </Whisper>
      );

      fireEvent.click(screen.getByRole('button'));
      const tooltip = screen.getByRole('tooltip');
      expect(onEntered).not.toHaveBeenCalled();
      act(() => vi.advanceTimersByTime(299));
      expect(onEntered).not.toHaveBeenCalled();
      act(() => vi.advanceTimersByTime(1));
      expect(onEntered).toHaveBeenCalledExactlyOnceWith(tooltip);
      act(() => vi.advanceTimersByTime(300));
      expect(onEntered).toHaveBeenCalledTimes(1);
    } finally {
      view?.unmount();
      vi.useRealTimers();
    }
  });

  it('Should call onClose callback', async () => {
    const onClose = vi.fn();

    render(
      <Whisper onClose={onClose} trigger="click" speaker={<Tooltip />}>
        <button>button</button>
      </Whisper>
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('Should call onExited callback', () => {
    const onExited = vi.fn();

    vi.useFakeTimers();
    let view: ReturnType<typeof render> | undefined;
    try {
      view = render(
        <Whisper onExited={onExited} trigger="click" speaker={<Tooltip />}>
          <button>button</button>
        </Whisper>
      );

      fireEvent.click(screen.getByRole('button'));
      const tooltip = screen.getByRole('tooltip');
      fireEvent.click(screen.getByRole('button'));
      expect(onExited).not.toHaveBeenCalled();
      act(() => vi.advanceTimersByTime(299));
      expect(onExited).not.toHaveBeenCalled();
      act(() => vi.advanceTimersByTime(1));
      expect(onExited).toHaveBeenCalledExactlyOnceWith(tooltip);
      expect(screen.queryByRole('tooltip')).toBeNull();
      act(() => vi.advanceTimersByTime(300));
      expect(onExited).toHaveBeenCalledTimes(1);
    } finally {
      view?.unmount();
      vi.useRealTimers();
    }
  });

  it('Should pass transition callbacks to Transition', () => {
    const onExit = vi.fn();
    const onExiting = vi.fn();
    const onExited = vi.fn();
    const onEnter = vi.fn();
    const onEntering = vi.fn();
    const onEntered = vi.fn();

    vi.useFakeTimers();
    let view: ReturnType<typeof render> | undefined;
    try {
      view = render(
        <Whisper
          trigger="click"
          speaker={<Tooltip>test</Tooltip>}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
        >
          <button data-testid="btn">button</button>
        </Whisper>
      );

      fireEvent.click(screen.getByTestId('btn'));
      expect(onEnter).toHaveBeenCalledTimes(1);
      expect(onEntering).toHaveBeenCalledTimes(1);
      expect(onEntered).not.toHaveBeenCalled();

      // Drive Fade's fallback clock independently of the runner's scheduling.
      act(() => vi.advanceTimersByTime(300));
      expect(onEntered).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByTestId('btn'));
      expect(onExit).toHaveBeenCalledTimes(1);
      expect(onExiting).toHaveBeenCalledTimes(1);
      expect(onExited).not.toHaveBeenCalled();

      act(() => vi.advanceTimersByTime(300));
      expect(onExited).toHaveBeenCalledTimes(1);

      const callbacks = [onEnter, onEntering, onEntered, onExit, onExiting, onExited];
      const order = callbacks.map(callback => callback.mock.invocationCallOrder[0]);
      expect(order).toEqual([...order].sort((a, b) => a - b));
      for (const callback of callbacks) expect(callback).toHaveBeenCalledTimes(1);
    } finally {
      view?.unmount();
      vi.clearAllTimers();
      vi.useRealTimers();
    }
  });

  it('Should Overlay be closed, after call onClose', async () => {
    const ref = React.createRef<WhisperInstance>();
    const Overlay = React.forwardRef(
      (
        {
          style,
          onClose,
          ...rest
        }: {
          style: CSSProperties;
          onClose?: (delay?: number) => void | NodeJS.Timeout;
        } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        ref
      ) => {
        const handleClose = () => {
          if (onClose) {
            onClose();
          }
        };

        return (
          <div {...rest} style={style} ref={ref as Ref<HTMLDivElement>}>
            <button onClick={handleClose}>close</button>
          </div>
        );
      }
    );

    const onExited = vi.fn();

    render(
      <Whisper
        ref={ref}
        onExited={onExited}
        trigger="click"
        speaker={(props, ref) => {
          const { left, top, onClose } = props;
          return <Overlay style={{ left, top }} onClose={onClose} ref={ref} />;
        }}
      >
        <button>button</button>
      </Whisper>
    );

    fireEvent.click((ref.current as WhisperInstance).root as HTMLElement);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(onExited).toHaveBeenCalled();
    });
  });
});
