import { useContext, useRef } from 'react';
import on from 'dom-lib/on';
import { useTimeout, useMount } from '@/internals/hooks';
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
  targetRef?: React.RefObject<HTMLElement>;

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
  const mouseEnterRef = useRef<ReturnType<typeof on>>();
  const mouseLeaveRef = useRef<ReturnType<typeof on>>();

  const { clear, reset } = useTimeout(onClose, duration, usedToaster && duration > 0);

  useMount(() => {
    if (targetRef?.current && mouseReset) {
      if (mouseEnterRef.current || mouseLeaveRef.current) {
        return;
      }

      mouseEnterRef.current = on(targetRef.current, 'mouseenter', clear);
      mouseLeaveRef.current = on(targetRef.current, 'mouseleave', reset);

      return () => {
        mouseEnterRef.current?.off();
        mouseLeaveRef.current?.off();
      };
    }
  });

  return { clear, reset };
}

export default useDelayedClosure;
