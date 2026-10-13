import React from 'react';
import { act, cleanup, fireEvent, renderHook, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CustomProvider from '../../CustomProvider';
import Message from '../../Message';
import Notification from '../../Notification';
import useToaster from '../useToaster';

describe.each([
  { name: 'Message', Component: Message, defaultDuration: 2000 },
  { name: 'Notification', Component: Notification, defaultDuration: 4500 }
])('$name through useToaster', ({ Component, defaultDuration }) => {
  describe.each([false, true])('StrictMode=%s', strict => {
    let toaster: ReturnType<typeof useToaster>;
    let unmount: () => void;
    const onClose = vi.fn();

    beforeEach(() => {
      vi.useFakeTimers();
      const Wrapper = strict ? React.StrictMode : React.Fragment;
      const view = renderHook(() => useToaster(), {
        wrapper: ({ children }) => (
          <Wrapper>
            <CustomProvider>{children}</CustomProvider>
          </Wrapper>
        )
      });
      toaster = view.result.current;
      unmount = view.unmount;
    });

    afterEach(() => {
      cleanup();
      vi.clearAllTimers();
      vi.useRealTimers();
    });

    const advance = (duration: number) =>
      act(() => {
        vi.advanceTimersByTime(duration);
      });

    const push = (duration?: number) => {
      let key: ReturnType<typeof toaster.push>;
      act(() => {
        key = toaster.push(
          <Component closable data-testid="toast" onClose={onClose}>
            Toast content
          </Component>,
          { duration }
        );
      });
      expect(typeof key).toBe('string');
      expect(screen.getByTestId('toast')).to.have.class('rs-toast-fade-entered');
      return key as string;
    };

    it('calls onClose at the configured deadline and retains the exit animation', () => {
      push(200);
      advance(199);
      expect(onClose).not.toHaveBeenCalled();
      expect(screen.getByTestId('toast')).to.have.class('rs-toast-fade-entered');
      advance(1);
      expect(onClose).toHaveBeenCalledExactlyOnceWith();
      expect(screen.getByTestId('toast')).to.have.class('rs-toast-fade-exiting');
      advance(399);
      expect(screen.getByTestId('toast')).to.exist;
      advance(1);
      expect(screen.queryByTestId('toast')).not.to.exist;
      advance(10000);
      expect(onClose).toHaveBeenCalledOnce();
    });

    it('uses the component default duration when no override is provided', () => {
      push();
      advance(defaultDuration - 1);
      expect(onClose).not.toHaveBeenCalled();
      advance(1);
      expect(onClose).toHaveBeenCalledExactlyOnceWith();
      advance(400);
      expect(screen.queryByTestId('toast')).not.to.exist;
    });

    it('keeps duration zero open across hover and timer advancement', () => {
      push(0);
      const toast = screen.getByTestId('toast');
      fireEvent.mouseEnter(toast);
      fireEvent.mouseLeave(toast);
      advance(10000);
      expect(onClose).not.toHaveBeenCalled();
      expect(toast).to.have.class('rs-toast-fade-entered');
    });

    it('cancels automatic closing after a native close button click', async () => {
      push(200);
      advance(100);
      await act(() => userEvent.click(screen.getByRole('button', { name: 'Close' })));
      expect(onClose).toHaveBeenCalledOnce();
      expect(onClose.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
      advance(399);
      expect(screen.getByTestId('toast')).to.exist;
      advance(1);
      expect(screen.queryByTestId('toast')).not.to.exist;
      advance(10000);
      expect(onClose).toHaveBeenCalledOnce();
    });

    it('cancels pending callbacks when its provider unmounts', () => {
      push(200);
      advance(100);
      unmount();
      advance(10000);
      expect(onClose).not.toHaveBeenCalled();
      expect(screen.queryByTestId('toast')).not.to.exist;
    });

    it.each(['remove', 'clear'] as const)(
      'does not automatically close an already exiting toast after %s',
      method => {
        const key = push(200);
        advance(100);
        act(() => (method === 'remove' ? toaster.remove(key) : toaster.clear()));
        expect(screen.getByTestId('toast')).to.have.class('rs-toast-fade-exiting');
        advance(100);
        expect(onClose).not.toHaveBeenCalled();
        advance(299);
        expect(screen.getByTestId('toast')).to.exist;
        advance(1);
        expect(screen.queryByTestId('toast')).not.to.exist;
        advance(10000);
        expect(onClose).not.toHaveBeenCalled();
      }
    );

    it('does not restart automatic closing from an exiting toast', () => {
      push(200);
      const toast = screen.getByTestId('toast');
      advance(200);
      expect(onClose).toHaveBeenCalledOnce();
      expect(toast).to.have.class('rs-toast-fade-exiting');
      // The DOM remains mounted for its exit animation, but its timer is finished.
      fireEvent.mouseEnter(toast);
      fireEvent.mouseLeave(toast);
      advance(200);
      expect(onClose).toHaveBeenCalledOnce();
      advance(200);
      expect(screen.queryByTestId('toast')).not.to.exist;
    });

    it('ignores a second native close request during the exit animation', async () => {
      push(0);
      const button = screen.getByRole('button', { name: 'Close' });
      await act(() => userEvent.click(button));
      expect(onClose).toHaveBeenCalledOnce();
      expect(onClose.mock.calls[0][0].nativeEvent.isTrusted).toBe(true);
      await act(() => userEvent.click(button));
      expect(onClose).toHaveBeenCalledOnce();
      advance(400);
      expect(screen.queryByTestId('toast')).not.to.exist;
    });
  });
});
