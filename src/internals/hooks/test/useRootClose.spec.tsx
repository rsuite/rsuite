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
});
