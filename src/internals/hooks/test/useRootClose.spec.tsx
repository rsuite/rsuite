import React from 'react';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import { useRootClose } from '../useRootClose';

function TestComponent({
  onRootClose,
  disabled = false,
  listenEscape = true
}: {
  onRootClose?: React.ReactEventHandler;
  disabled?: boolean;
  listenEscape?: boolean;
}) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useRootClose(onRootClose, {
    disabled,
    triggerTarget: triggerRef,
    overlayTarget: overlayRef,
    listenEscape
  });

  return (
    <div>
      <button ref={triggerRef} data-testid="trigger">
        Trigger
      </button>
      <div ref={overlayRef} data-testid="overlay">
        Overlay
      </div>
      <button data-testid="outside">Outside</button>
    </div>
  );
}

describe('internals/hooks/useRootClose', () => {
  it('honors Escape cancellation after the document capture listener', () => {
    const onRootClose = vi.fn();
    const { getByRole } = render(
      <>
        <TestComponent onRootClose={onRootClose} />
        <input onKeyDown={event => event.preventDefault()} />
      </>
    );
    const input = getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Escape' });
    fireEvent.keyUp(input, { key: 'Escape' });
    expect(onRootClose).not.toHaveBeenCalled();
    fireEvent.keyDown(document, { key: 'Escape' });
    fireEvent.keyUp(document, { key: 'Escape' });
    expect(onRootClose).toHaveBeenCalledTimes(1);
  });

  it.each([
    { key: 'Escape', isComposing: true, keyCode: 27 },
    { key: 'Escape', isComposing: false, keyCode: 229 },
    { key: 'Process', isComposing: false, keyCode: 229 }
  ])('keeps the IME keyup after a callback update: %j', keydown => {
    const first = vi.fn();
    const latest = vi.fn();
    const { rerender } = render(<TestComponent onRootClose={first} />);
    fireEvent.keyDown(document, keydown);
    rerender(<TestComponent onRootClose={latest} />);
    fireEvent.compositionEnd(document);
    fireEvent.keyUp(document, { key: 'Escape', isComposing: false });
    expect(first).not.toHaveBeenCalled();
    expect(latest).not.toHaveBeenCalled();

    fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 });
    fireEvent.keyUp(document, { key: 'Escape' });
    expect(latest).toHaveBeenCalledTimes(1);
  });

  it('ignores a composing keyup and retains standalone normal Escape keyup', () => {
    const onRootClose = vi.fn();
    render(<TestComponent onRootClose={onRootClose} />);
    fireEvent.keyUp(document, { key: 'Escape', isComposing: true });
    expect(onRootClose).not.toHaveBeenCalled();
    fireEvent.keyUp(document, { key: 'Escape' });
    expect(onRootClose).toHaveBeenCalledTimes(1);
  });

  it('does not confuse an unrelated keyup with release of the composing Escape', () => {
    const onRootClose = vi.fn();
    render(<TestComponent onRootClose={onRootClose} />);
    fireEvent.keyDown(document, { key: 'Escape', isComposing: true });
    fireEvent.keyUp(document, { key: 'Shift' });
    fireEvent.compositionEnd(document);
    fireEvent.keyUp(document, { key: 'Escape' });
    expect(onRootClose).not.toHaveBeenCalled();
  });

  it('handles normal Escape after a different composing key', () => {
    const onRootClose = vi.fn();
    render(<TestComponent onRootClose={onRootClose} />);
    fireEvent.keyDown(document, { key: 'k', isComposing: true });
    fireEvent.keyUp(document, { key: 'k', isComposing: true });
    fireEvent.compositionEnd(document);
    fireEvent.keyDown(document, { key: 'Escape' });
    fireEvent.keyUp(document, { key: 'Escape' });
    expect(onRootClose).toHaveBeenCalledTimes(1);
  });

  it('observes composing keydown even when an input stops propagation', () => {
    const onRootClose = vi.fn();
    const { getByRole } = render(
      <>
        <TestComponent onRootClose={onRootClose} />
        <input onKeyDown={event => event.stopPropagation()} />
      </>
    );
    const input = getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Escape', isComposing: true });
    fireEvent.compositionEnd(input);
    fireEvent.keyUp(input, { key: 'Escape' });
    expect(onRootClose).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: 'Escape' });
    fireEvent.keyUp(input, { key: 'Escape' });
    expect(onRootClose).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Should call onRootClose when clicking outside the trigger and overlay', () => {
    const onRootClose = vi.fn();

    const { getByTestId } = render(<TestComponent onRootClose={onRootClose} />);

    act(() => {
      fireEvent.mouseDown(getByTestId('outside'));
    });

    expect(onRootClose).toHaveBeenCalledTimes(1);
  });

  it('Should not call onRootClose when clicking inside the trigger', () => {
    const onRootClose = vi.fn();

    const { getByTestId } = render(<TestComponent onRootClose={onRootClose} />);

    act(() => {
      fireEvent.mouseDown(getByTestId('trigger'));
    });

    expect(onRootClose).not.toHaveBeenCalled();
  });

  it('Should not call onRootClose when clicking inside the overlay', () => {
    const onRootClose = vi.fn();

    const { getByTestId } = render(<TestComponent onRootClose={onRootClose} />);

    act(() => {
      fireEvent.mouseDown(getByTestId('overlay'));
    });

    expect(onRootClose).not.toHaveBeenCalled();
  });

  it('Should not call onRootClose when disabled', () => {
    const onRootClose = vi.fn();

    const { getByTestId } = render(<TestComponent onRootClose={onRootClose} disabled />);

    act(() => {
      fireEvent.mouseDown(getByTestId('outside'));
    });

    expect(onRootClose).not.toHaveBeenCalled();
  });

  it('Should call onRootClose when Escape key is pressed', () => {
    const onRootClose = vi.fn();

    render(<TestComponent onRootClose={onRootClose} />);

    act(() => {
      fireEvent.keyUp(document, { key: 'Escape' });
    });

    expect(onRootClose).toHaveBeenCalledTimes(1);
  });

  it('Should not call onRootClose on Escape when listenEscape is false', () => {
    const onRootClose = vi.fn();

    render(<TestComponent onRootClose={onRootClose} listenEscape={false} />);

    act(() => {
      fireEvent.keyUp(document, { key: 'Escape' });
    });

    expect(onRootClose).not.toHaveBeenCalled();
  });

  it('Should not call onRootClose on non-Escape key press', () => {
    const onRootClose = vi.fn();

    render(<TestComponent onRootClose={onRootClose} />);

    act(() => {
      fireEvent.keyUp(document, { key: 'Enter' });
    });

    expect(onRootClose).not.toHaveBeenCalled();
  });

  it('Should not call onRootClose on right-click outside', () => {
    const onRootClose = vi.fn();

    const { getByTestId } = render(<TestComponent onRootClose={onRootClose} />);

    act(() => {
      fireEvent.mouseDown(getByTestId('outside'), { button: 2 });
    });

    expect(onRootClose).not.toHaveBeenCalled();
  });

  it('Should not call onRootClose on middle-click outside', () => {
    const onRootClose = vi.fn();

    const { getByTestId } = render(<TestComponent onRootClose={onRootClose} />);

    act(() => {
      fireEvent.mouseDown(getByTestId('outside'), { button: 1 });
    });

    expect(onRootClose).not.toHaveBeenCalled();
  });

  it('Should not call onRootClose on Ctrl+click outside', () => {
    const onRootClose = vi.fn();

    const { getByTestId } = render(<TestComponent onRootClose={onRootClose} />);

    act(() => {
      fireEvent.mouseDown(getByTestId('outside'), { ctrlKey: true });
    });

    expect(onRootClose).not.toHaveBeenCalled();
  });

  it('Should not call onRootClose on Meta+click outside', () => {
    const onRootClose = vi.fn();

    const { getByTestId } = render(<TestComponent onRootClose={onRootClose} />);

    act(() => {
      fireEvent.mouseDown(getByTestId('outside'), { metaKey: true });
    });

    expect(onRootClose).not.toHaveBeenCalled();
  });

  it('Should not call onRootClose when alt key is held during click', () => {
    const onRootClose = vi.fn();

    const { getByTestId } = render(<TestComponent onRootClose={onRootClose} />);

    act(() => {
      fireEvent.mouseDown(getByTestId('outside'), { altKey: true });
    });

    expect(onRootClose).not.toHaveBeenCalled();
  });

  it('Should not call onRootClose when shift key is held during click', () => {
    const onRootClose = vi.fn();

    const { getByTestId } = render(<TestComponent onRootClose={onRootClose} />);

    act(() => {
      fireEvent.mouseDown(getByTestId('outside'), { shiftKey: true });
    });

    expect(onRootClose).not.toHaveBeenCalled();
  });

  it('Should not throw error when onRootClose is undefined', () => {
    expect(() => {
      const { getByTestId } = render(<TestComponent onRootClose={undefined} />);

      act(() => {
        fireEvent.mouseDown(getByTestId('outside'));
      });
    }).not.toThrow();
  });
});
