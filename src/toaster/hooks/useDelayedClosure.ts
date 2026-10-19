import { useCallback, useContext, useEffect, useRef } from 'react';
import on from 'dom-lib/on';
import { useTimeout } from '@/internals/hooks';
import ToastContext from '../ToastContext';

interface UseDelayedClosureProps {
  /**
   * Callback function to be called when the closure is triggered.
   */
  onClose?: (event?: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * The duration (in milliseconds) after which the closure should be triggered.
   */
  duration: number;

  /**
   * Optional reference to the target element.
   */
  targetRef?: React.RefObject<HTMLElement | null>;

  /**
   * Reset the hide timer if the mouse moves over the target element.
   */
  mouseReset?: boolean;
}

/**
 * A hook that delays the closure of the message box.
 */
function useDelayedClosure(props: UseDelayedClosureProps) {
  const { onClose, duration: durationProp, targetRef } = props;
  const { usedToaster, duration = durationProp, mouseReset } = useContext(ToastContext);
  const paused = useRef(false);
  const dismissed = useRef(false);

  const { clear, reset } = useTimeout(onClose, duration, usedToaster && duration > 0);

  const dismiss = useCallback(() => {
    dismissed.current = true;
    clear();
  }, [clear]);

  // Read the committed element on every render, including when `as` replaces the host.
  useEffect(() => {
    if (dismissed.current) {
      clear();
      return;
    }

    const element = targetRef?.current;
    if (!element) return;

    let hovered = !!mouseReset && element.matches(':hover');
    let focused = element.matches(':focus-within');
    const update = () => {
      if (dismissed.current) return;
      const next = hovered || focused;
      if (next) clear();
      else if (paused.current) reset();
      paused.current = next;
    };
    update();

    const focusIn = on(element, 'focusin', () => {
      focused = true;
      update();
    });
    const focusOut = on(element, 'focusout', event => {
      focused = element.contains(event.relatedTarget as Node | null);
      update();
    });
    const mouseEnter = mouseReset
      ? on(element, 'mouseenter', () => {
          hovered = true;
          update();
        })
      : null;
    const mouseLeave = mouseReset
      ? on(element, 'mouseleave', () => {
          hovered = false;
          update();
        })
      : null;

    return () => {
      focusIn.off();
      focusOut.off();
      mouseEnter?.off();
      mouseLeave?.off();
    };
  });

  return { clear: dismiss, reset };
}

export default useDelayedClosure;
