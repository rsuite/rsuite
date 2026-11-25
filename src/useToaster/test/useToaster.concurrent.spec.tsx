import React from 'react';
import { act, cleanup, fireEvent, renderHook, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CustomProvider from '../../CustomProvider';
import Message from '../../Message';
import Notification from '../../Notification';
import useToaster from '../useToaster';

describe.each([false, true])('useToaster concurrent updates, StrictMode=%s', strict => {
  let toaster: ReturnType<typeof useToaster>;

  beforeEach(() => {
    vi.useFakeTimers();
    const Wrapper = strict ? React.StrictMode : React.Fragment;
    toaster = renderHook(() => useToaster(), {
      wrapper: ({ children }) => (
        <Wrapper>
          <CustomProvider>{children}</CustomProvider>
        </Wrapper>
      )
    }).result.current;
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  const push = (text: string, placement: 'topCenter' | 'bottomEnd' = 'topCenter') => {
    const key = toaster.push(<Message data-testid={text}>{text}</Message>, {
      duration: 0,
      placement
    });
    expect(typeof key).to.equal('string');
    return key as string;
  };

  const advance = (time: number) =>
    act(() => {
      vi.advanceTimersByTime(time);
    });

  it('preserves a new notification after a batched clear', () => {
    act(() => {
      push('old');
      toaster.clear();
      push('new');
    });
    expect(screen.getByTestId('old')).to.exist;
    expect(screen.getByTestId('new')).to.have.class('rs-toast-fade-entered');
    advance(399);
    expect(screen.getByTestId('old')).to.exist;
    advance(1);
    expect(screen.queryByTestId('old')).not.to.exist;
    expect(screen.getByTestId('new')).to.have.class('rs-toast-fade-entered');
  });

  it('removes only the chosen notification when pushes and removal are batched', () => {
    act(() => {
      const key = push('first');
      push('second');
      toaster.remove(key);
    });
    expect(screen.getByTestId('first')).to.exist;
    expect(screen.getByTestId('second')).to.have.class('rs-toast-fade-entered');
    advance(400);
    expect(screen.queryByTestId('first')).not.to.exist;
    expect(screen.getByTestId('second')).to.have.class('rs-toast-fade-entered');
  });

  it('retains each notification for its own exit deadline', () => {
    let first: string;
    let second: string;
    act(() => {
      first = push('first');
      second = push('second');
    });
    act(() => toaster.remove(first));
    advance(200);
    act(() => toaster.remove(second));
    advance(200);
    expect(screen.queryByTestId('first')).not.to.exist;
    expect(screen.getByTestId('second')).to.have.class('rs-toast-fade-exiting');
    advance(199);
    expect(screen.getByTestId('second')).to.exist;
    advance(1);
    expect(screen.queryByTestId('second')).not.to.exist;
  });

  it.each([
    ['Message', Message],
    ['Notification', Notification]
  ] as const)('preserves a follow-up pushed by the %s close callback', (_name, Component) => {
    const onClose = vi.fn(() => push('follow-up'));
    act(() => {
      toaster.push(
        <Component closable data-testid="original" onClose={onClose}>
          Original notification
        </Component>,
        { duration: 0 }
      );
    });
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('follow-up')).to.have.class('rs-toast-fade-entered');
    advance(400);
    expect(screen.queryByTestId('original')).not.to.exist;
    expect(screen.getByTestId('follow-up')).to.have.class('rs-toast-fade-entered');
  });

  it('does not let removal of an unknown key shorten a later exit', () => {
    act(() => {
      push('message');
    });
    act(() => toaster.remove('missing-key'));
    advance(200);
    act(() => toaster.clear());
    advance(200);
    expect(screen.getByTestId('message')).to.have.class('rs-toast-fade-exiting');
    advance(199);
    expect(screen.getByTestId('message')).to.exist;
    advance(1);
    expect(screen.queryByTestId('message')).not.to.exist;
  });

  it('preserves later messages in both placements after clearing every container', () => {
    act(() => {
      push('top-old');
      push('bottom-old', 'bottomEnd');
    });
    act(() => toaster.clear());
    advance(200);
    act(() => {
      push('top-new');
      push('bottom-new', 'bottomEnd');
    });
    advance(200);
    expect(screen.queryByTestId('top-old')).not.to.exist;
    expect(screen.queryByTestId('bottom-old')).not.to.exist;
    expect(screen.getByTestId('top-new')).to.have.class('rs-toast-fade-entered');
    expect(screen.getByTestId('bottom-new')).to.have.class('rs-toast-fade-entered');
    expect(screen.getByTestId('top-new').parentElement).not.to.equal(
      screen.getByTestId('bottom-new').parentElement
    );
  });
});
