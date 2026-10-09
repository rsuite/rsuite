import React from 'react';
import ToastContainer, { ToastContainerInstance } from '../ToastContainer';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('toaster - ToastContainer', () => {
  testStandardProps(<ToastContainer />);

  it('Should output a container', () => {
    const { container } = render(<ToastContainer />);
    expect(container.firstChild).to.have.class('rs-toast-container');
  });

  it('Should output a placement', () => {
    const { container } = render(<ToastContainer placement="topStart" />);
    expect(container.firstChild).to.have.class('rs-toast-container-top-start');
  });

  describe('Concurrent message updates', () => {
    let toasterRef: React.RefObject<ToastContainerInstance | null>;

    const push = (message: string) => {
      return toasterRef.current!.push(<div data-testid={message}>{message}</div>);
    };

    beforeEach(() => {
      vi.useFakeTimers();
      toasterRef = React.createRef<ToastContainerInstance>();
      render(<ToastContainer ref={toasterRef as React.RefObject<any>} />);
    });

    afterEach(() => {
      cleanup();
      vi.clearAllTimers();
      vi.useRealTimers();
    });

    it('Should preserve a message pushed while earlier messages are being cleared', () => {
      act(() => {
        push('first');
      });
      act(() => {
        toasterRef.current!.clear();
      });

      expect(screen.getByTestId('first')).to.have.class('rs-toast-fade-exiting');

      act(() => {
        vi.advanceTimersByTime(200);
        push('second');
      });
      act(() => {
        vi.advanceTimersByTime(199);
      });

      expect(screen.getByTestId('first')).to.exist;
      expect(screen.getByTestId('second')).to.have.class('rs-toast-fade-entered');

      act(() => {
        vi.advanceTimersByTime(1);
      });

      expect(screen.queryByTestId('first')).not.to.exist;
      expect(screen.getByTestId('second')).to.have.class('rs-toast-fade-entered');
    });

    it('Should apply batched pushes and clears in call order', () => {
      act(() => {
        push('first');
        toasterRef.current!.clear();
        push('second');
      });

      expect(screen.getByTestId('first')).to.exist;
      expect(screen.getByTestId('second')).to.have.class('rs-toast-fade-entered');

      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(screen.queryByTestId('first')).not.to.exist;
      expect(screen.getByTestId('second')).to.exist;
    });

    it('Should remove only the intended message after batched pushes', () => {
      act(() => {
        const key = push('first');
        push('second');
        toasterRef.current!.remove(key);
      });

      expect(screen.getByTestId('first')).to.exist;
      expect(screen.getByTestId('second')).to.have.class('rs-toast-fade-entered');

      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(screen.queryByTestId('first')).not.to.exist;
      expect(screen.getByTestId('second')).to.exist;
    });

    it('Should keep each removed message for its own exit duration', () => {
      let firstKey: string;
      let secondKey: string;

      act(() => {
        firstKey = push('first');
        secondKey = push('second');
      });
      act(() => {
        toasterRef.current!.remove(firstKey);
      });
      act(() => {
        vi.advanceTimersByTime(200);
      });
      act(() => {
        toasterRef.current!.remove(secondKey);
      });
      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(screen.queryByTestId('first')).not.to.exist;
      expect(screen.getByTestId('second')).to.have.class('rs-toast-fade-exiting');

      act(() => {
        vi.advanceTimersByTime(199);
      });

      expect(screen.getByTestId('second')).to.exist;

      act(() => {
        vi.advanceTimersByTime(1);
      });

      expect(screen.queryByTestId('second')).not.to.exist;
    });

    it('Should preserve later messages and exit deadlines across overlapping clears', () => {
      act(() => {
        push('first');
      });
      act(() => {
        toasterRef.current!.clear();
      });
      act(() => {
        vi.advanceTimersByTime(200);
        push('second');
      });
      act(() => {
        toasterRef.current!.clear();
      });
      act(() => {
        push('third');
        vi.advanceTimersByTime(200);
      });

      expect(screen.queryByTestId('first')).not.to.exist;
      expect(screen.getByTestId('second')).to.have.class('rs-toast-fade-exiting');
      expect(screen.getByTestId('third')).to.have.class('rs-toast-fade-entered');

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(screen.queryByTestId('second')).not.to.exist;
      expect(screen.getByTestId('third')).to.exist;
    });

    it('Should preserve the original exit deadline when a message is removed twice', () => {
      let key: string;

      act(() => {
        key = push('message');
      });
      act(() => {
        toasterRef.current!.remove(key);
      });
      act(() => {
        vi.advanceTimersByTime(200);
      });
      act(() => {
        toasterRef.current!.remove(key);
      });
      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(screen.queryByTestId('message')).not.to.exist;
    });
  });
});
