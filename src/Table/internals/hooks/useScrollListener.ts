import React, { useRef, useCallback, useState, useEffect } from 'react';
import WheelHandler from 'dom-lib/WheelHandler';
import scrollLeft from 'dom-lib/scrollLeft';
import scrollTop from 'dom-lib/scrollTop';
import on from 'dom-lib/on';
import removeStyle from 'dom-lib/removeStyle';
import { useUpdateEffect } from '@/internals/hooks';
import useMount from './useMount';
import isSupportTouchEvent from '../utils/isSupportTouchEvent';
import flushSync from '../utils/flushSync';
import defer from '../utils/defer';
import { requestAnimationTimeout, cancelAnimationTimeout } from '../utils/requestAnimationTimeout';
import type { AnimationFrameHandle } from '../utils/requestAnimationTimeout';
import { SCROLLBAR_WIDTH, TRANSITION_DURATION, BEZIER } from '../constants';
import type { ScrollbarInstance } from '../Scrollbar';
import type { ListenerCallback, RowDataType } from '../types';

// Inertial sliding start time threshold
const momentumTimeThreshold = 300;

// Inertial sliding start vertical distance threshold
const momentumYThreshold = 15;

//List of Arrow Keys for scrolling through keys
const arrowKeysList = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

interface ScrollListenerProps {
  rtl: boolean;
  data: readonly RowDataType[];
  height: number;
  getTableHeight: () => number;
  contentHeight: React.MutableRefObject<number>;
  headerHeight: number;
  autoHeight?: boolean;
  maxHeight?: number;
  tableBodyRef: React.RefObject<HTMLDivElement | null>;
  scrollbarXRef: React.RefObject<ScrollbarInstance | null>;
  scrollbarYRef: React.RefObject<ScrollbarInstance | null>;
  disabledScroll?: boolean;
  loading?: boolean;
  tableRef: React.RefObject<HTMLDivElement | null>;
  contentWidth: React.MutableRefObject<number>;
  tableWidth: React.MutableRefObject<number>;
  scrollY: React.MutableRefObject<number>;
  minScrollY: React.MutableRefObject<number>;
  minScrollX: React.MutableRefObject<number>;
  scrollX: React.MutableRefObject<number>;
  setScrollX: (v: number) => void;
  setScrollY: (v: number) => void;
  virtualized?: boolean;
  forceUpdatePosition: (extDuration?: number, nextBezier?: string) => void;
  deferUpdatePosition: (extDuration?: number, nextBezier?: string) => void;
  onScroll?: (scrollX: number, scrollY: number) => void;
  onTouchStart?: (event: React.TouchEvent) => void;
  onTouchMove?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
}

/**
 * Calculate the distance of inertial sliding.
 */
const momentum = (current: number, start: number, duration: number) => {
  // Inertial sliding acceleration.
  const deceleration = 0.003;

  const distance = current - start;
  const speed = (2 * Math.abs(distance)) / duration;
  const destination = current + (speed / deceleration) * (distance < 0 ? -1 : 1);

  return {
    delta: current - destination,
    duration: TRANSITION_DURATION,
    bezier: BEZIER
  };
};

/**
 * Add scroll, touch, and wheel monitoring events to the table,
 * and update the scroll position of the table.
 * @param props
 * @returns
 */
const useScrollListener = (props: ScrollListenerProps) => {
  const {
    data,
    autoHeight,
    tableBodyRef,
    scrollbarXRef,
    scrollbarYRef,
    disabledScroll,
    loading,
    tableRef,
    contentWidth,
    tableWidth,
    scrollY,
    minScrollY,
    minScrollX,
    scrollX,
    setScrollX,
    setScrollY,
    virtualized,
    forceUpdatePosition,
    deferUpdatePosition,
    onScroll,
    onTouchMove,
    onTouchStart,
    onTouchEnd,
    height: heightProp,
    getTableHeight,
    contentHeight,
    headerHeight,
    rtl
  } = props;

  const wheelListener = useRef<ListenerCallback | undefined>(undefined);
  const touchStartListener = useRef<ListenerCallback | undefined>(undefined);
  const touchMoveListener = useRef<ListenerCallback | undefined>(undefined);
  const touchEndListener = useRef<ListenerCallback | undefined>(undefined);

  const [isScrolling, setScrolling] = useState(false);
  const touchX = useRef(0);
  const touchY = useRef(0);
  const disableEventsTimeoutId = useRef<AnimationFrameHandle | null>(null);
  const isTouching = useRef(false);

  // The start time within the inertial sliding range.
  const momentumStartTime = useRef(0);

  // The vertical starting value within the inertial sliding range.
  const momentumStartY = useRef<number>(0);

  const shouldHandleWheelX = useCallback(
    (delta: number) => {
      if (delta === 0 || disabledScroll || loading) {
        return false;
      }

      return true;
    },
    [disabledScroll, loading]
  );

  const shouldHandleWheelY = useCallback(
    (delta: number) => {
      if (delta === 0 || disabledScroll || loading || autoHeight) {
        return false;
      }

      if (typeof scrollY.current === 'number' && typeof minScrollY.current === 'number') {
        return (
          (delta >= 0 && scrollY.current > minScrollY.current) || (delta < 0 && scrollY.current < 0)
        );
      }
    },
    [autoHeight, disabledScroll, loading, minScrollY, scrollY]
  );

  const debounceScrollEndedCallback = useCallback(() => {
    disableEventsTimeoutId.current = null;

    // Forces the end of scrolling to be prioritized so that virtualized long lists can update rendering.
    // There will be no scrolling white screen.
    flushSync(() => setScrolling(false));
  }, []);

  /**
   * Triggered when scrolling, including: wheel/touch/scroll
   * @param deltaX
   * @param deltaY
   * @param momentumOptions The configuration of inertial scrolling is used for the touch event.
   */
  const handleWheel = useCallback(
    (
      deltaX: number,
      deltaY: number,
      momentumOptions?: { duration: number; bezier: string },
      event?: React.MouseEvent
    ) => {
      if (!tableRef.current) {
        return;
      }

      const nextScrollX = contentWidth.current <= tableWidth.current ? 0 : scrollX.current - deltaX;
      const nextScrollY = scrollY.current - deltaY;

      const y = Math.min(0, nextScrollY < minScrollY.current ? minScrollY.current : nextScrollY);
      const x = Math.min(0, nextScrollX < minScrollX.current ? minScrollX.current : nextScrollX);

      setScrollX(x);
      setScrollY(y);

      onScroll?.(Math.abs(x), Math.abs(y));

      if (virtualized) {
        // Add a state to the table during virtualized scrolling.
        // Make it set CSS `pointer-events:none` on the DOM to avoid wrong event interaction.

        flushSync(() => setScrolling(true));

        if (disableEventsTimeoutId.current) {
          cancelAnimationTimeout(disableEventsTimeoutId.current);
        }

        disableEventsTimeoutId.current = requestAnimationTimeout(
          debounceScrollEndedCallback,
          // When momentum is enabled, set a delay of 50ms rendering.
          momentumOptions?.duration ? 50 : 0
        );
      }

      // When the user clicks on the scrollbar, the scrollbar will be moved to the clicked position.
      if (event?.type === 'click') {
        /**
         * With virtualized enabled, the list will be re-rendered on every scroll.
         * Update the position of the rendered list with a delay.
         * fix: https://github.com/rsuite/rsuite/issues/2378
         */
        deferUpdatePosition(momentumOptions?.duration, momentumOptions?.bezier);
        return;
      }

      forceUpdatePosition(momentumOptions?.duration, momentumOptions?.bezier);
    },
    [
      tableRef,
      contentWidth,
      tableWidth,
      scrollX,
      scrollY,
      minScrollY,
      minScrollX,
      setScrollX,
      setScrollY,
      onScroll,
      forceUpdatePosition,
      deferUpdatePosition,
      virtualized,
      debounceScrollEndedCallback
    ]
  );

  const onWheel = useCallback(
    (deltaX: number, deltaY: number, momentumOptions?: { duration: number; bezier: string }) => {
      handleWheel(deltaX, deltaY, momentumOptions);

      scrollbarXRef.current?.onWheelScroll?.(deltaX);
      scrollbarYRef.current?.onWheelScroll?.(deltaY, momentumOptions?.duration ? true : false);
    },
    [handleWheel, scrollbarXRef, scrollbarYRef]
  );

  const wheelHandler = useRef<WheelHandler | null>(null);

  // Stop unending scrolling and remove transition
  const stopScroll = useCallback(() => {
    const wheelElement = tableBodyRef.current?.querySelector('.rs-table-body-wheel-area');
    const handleElement = scrollbarYRef.current?.handle;
    const transitionCSS = ['transition-duration', 'transition-timing-function'];

    if (!virtualized && wheelElement) {
      // Get the current translate position from the computed transform.
      // Handles both matrix (2D) and matrix3d (3D) formats.
      const transform = window.getComputedStyle(wheelElement).getPropertyValue('transform');

      if (transform && transform !== 'none') {
        const values = transform.match(/matrix(?:3d)?\(([^)]+)\)/)?.[1];
        if (values) {
          const parts = values.split(/,\s*/).map(Number);
          // For matrix3d, Y translation is the 14th value (index 13)
          // For matrix, Y translation is the 6th value (index 5)
          const offsetY = Math.round(parts.length === 16 ? parts[13] : parts[5]);

          setScrollY(offsetY);
        }
      }
    }

    if (wheelElement) {
      removeStyle(wheelElement, transitionCSS);
    }

    if (handleElement) {
      removeStyle(handleElement, transitionCSS);
    }
  }, [scrollbarYRef, setScrollY, tableBodyRef, virtualized]);

  // Handle the Touch event and initialize it when touchstart is triggered.
  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      const { pageX, pageY } = event.touches[0];
      touchX.current = pageX;
      touchY.current = pageY;

      momentumStartTime.current = new Date().getTime();
      momentumStartY.current = scrollY.current;
      isTouching.current = true;

      onTouchStart?.(event);

      // Stop unfinished scrolling when Touch starts.
      stopScroll();
    },
    [onTouchStart, scrollY, stopScroll]
  );

  // Handle the Touch event and update the scroll when touchmove is triggered.
  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (!isTouching.current) {
        return;
      }
      const { pageX, pageY } = event.touches[0];
      const deltaX = touchX.current - pageX;
      const deltaY = autoHeight ? 0 : touchY.current - pageY;

      if (!shouldHandleWheelY(deltaY) && !shouldHandleWheelX(deltaX)) {
        return;
      }

      /**
       * Prevent the default touch event when the table is scrollable.
       * fix: https://github.com/rsuite/rsuite-table/commit/21785fc18f430519ab5885c44540d9ffc30de366#commitcomment-36236425
       */
      if (!autoHeight && shouldHandleWheelY(deltaY)) {
        event.preventDefault?.();
      }

      const now = new Date().getTime();

      onWheel(deltaX, deltaY);

      touchX.current = pageX;
      touchY.current = pageY;

      // Record the offset value and time under the condition of triggering inertial scrolling.
      if (now - momentumStartTime.current > momentumTimeThreshold) {
        momentumStartY.current = scrollY.current;
        momentumStartTime.current = now;
      }

      onTouchMove?.(event);
    },
    [autoHeight, onWheel, onTouchMove, scrollY, shouldHandleWheelX, shouldHandleWheelY]
  );

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (!isTouching.current) {
        return;
      }
      isTouching.current = false;
      const touchDuration = new Date().getTime() - momentumStartTime.current;
      const absDeltaY = Math.abs(scrollY.current - momentumStartY.current);

      // Enable inertial sliding.
      if (touchDuration < momentumTimeThreshold && absDeltaY > momentumYThreshold) {
        const { delta, duration, bezier } = momentum(
          scrollY.current,
          momentumStartY.current,
          touchDuration
        );

        onWheel(0, delta, { duration, bezier });
      }

      onTouchEnd?.(event);
    },
    [onWheel, onTouchEnd, scrollY]
  );

  /**
   * When the user uses the tab key in the Table, the onScroll event is triggered,
   * and the scroll bar position should be updated at the same time.
   * https://github.com/rsuite/rsuite/issues/234
   */
  const onScrollBody = useCallback(
    event => {
      if (event.target !== tableBodyRef.current) {
        return;
      }

      const left = scrollLeft(event.target);
      const top = scrollTop(event.target);

      if (top === 0 && left === 0) {
        return;
      }

      onWheel(left, top);

      scrollLeft(event.target, 0);
      scrollTop(event.target, 0);
    },
    [onWheel, tableBodyRef]
  );

  const getControlledScrollTopValue = useCallback(
    value => {
      if (autoHeight) {
        return [0, 0];
      }

      const height = getTableHeight();

      // The maximum range of scrolling value is judged.
      value = Math.min(value, Math.max(0, contentHeight.current - (height - headerHeight)));

      // The value is a value of the theoretical scroll position of the table,
      // and the scrollY coordinate value and the value of the scroll bar position are calculated by value.
      return [
        -value,
        contentHeight.current ? (value / contentHeight.current) * (height - headerHeight) : 0
      ];
    },
    [autoHeight, contentHeight, getTableHeight, headerHeight]
  );

  const rerender = () => {
    setScrolling(true);
    defer(() => {
      if (tableBodyRef.current) {
        setScrolling(false);
      }
    });
  };

  const getControlledScrollLeftValue = value => {
    // The maximum range of scrolling value is judged.
    value = Math.min(value, Math.max(0, contentWidth.current - tableWidth.current));

    return [-value, contentWidth.current ? (value / contentWidth.current) * tableWidth.current : 0];
  };

  const onScrollTop = (top = 0) => {
    const [nextScrollY, handleScrollY] = getControlledScrollTopValue(top);
    const height = getTableHeight();

    if (!loading && nextScrollY !== scrollY.current) {
      onScroll?.(Math.abs(scrollX.current), Math.abs(nextScrollY));
    }

    setScrollY(nextScrollY);
    scrollbarYRef?.current?.resetScrollBarPosition?.(handleScrollY);
    deferUpdatePosition();

    /**
     * After calling `scrollTop`, a white screen will appear when `virtualized` is true.
     * The reason is that the coordinates of the DOM are directly manipulated,
     * but the component is not re-rendered. Need to call `rerender`.
     * Fix: rsuite#1044
     */
    if (virtualized && contentHeight.current > height) {
      rerender();
    }
  };

  const onScrollLeft = (left = 0) => {
    const [nextScrollX, scrollbarX] = getControlledScrollLeftValue(left);
    setScrollX(nextScrollX);
    !loading && onScroll?.(Math.abs(nextScrollX), Math.abs(scrollY.current));
    scrollbarXRef?.current?.resetScrollBarPosition?.(scrollbarX);

    deferUpdatePosition();
  };

  const onScrollTo = (coord: { x?: number; y?: number }) => {
    const { x, y } = coord || {};
    if (typeof x === 'number') {
      onScrollLeft(x);
    }
    if (typeof y === 'number') {
      onScrollTop(y);
    }
  };

  useUpdateEffect(() => {
    if (scrollY.current !== 0) {
      onScrollTop(Math.abs(scrollY.current));
    }

    // fix: #405 #404
    deferUpdatePosition();
  }, [heightProp, data]);

  const releaseListeners = useCallback(() => {
    wheelHandler.current = null;
    wheelListener.current?.off();
    touchStartListener.current?.off();
    touchMoveListener.current?.off();
    touchEndListener.current?.off();
  }, []);

  useEffect(() => {
    const options = { passive: false };
    const tableBody = tableBodyRef.current;
    if (tableBody) {
      // Reset the listener after props is updated.
      releaseListeners();
      wheelHandler.current = new WheelHandler(
        onWheel,
        shouldHandleWheelX,
        shouldHandleWheelY,
        false
      );

      wheelListener.current = on(tableBody, 'wheel', wheelHandler.current.onWheel, options);

      if (isSupportTouchEvent()) {
        touchStartListener.current = on(tableBody, 'touchstart', handleTouchStart, options);
        touchMoveListener.current = on(tableBody, 'touchmove', handleTouchMove, options);
        touchEndListener.current = on(tableBody, 'touchend', handleTouchEnd, options);
      }
    }
    return releaseListeners;
  }, [
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    onWheel,
    releaseListeners,
    shouldHandleWheelX,
    shouldHandleWheelY,
    tableBodyRef
  ]);

  const onScrollByKeydown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.currentTarget === event.target && arrowKeysList.indexOf(event.key) > -1) {
        event.preventDefault();
        const step = 40;

        switch (event.key) {
          case 'ArrowUp':
            onWheel(0, -step);
            break;
          case 'ArrowDown':
            onWheel(0, step);
            break;
          case 'ArrowLeft':
            onWheel(-step, 0);
            break;
          case 'ArrowRight':
            onWheel(step, 0);
            break;
        }
      }
    },
    [onWheel]
  );

  useMount(() => {
    if (rtl) {
      // Initialize scroll position
      setScrollX(tableWidth.current - contentWidth.current - SCROLLBAR_WIDTH);
      scrollbarXRef?.current?.resetScrollBarPosition?.(-scrollX.current);
      forceUpdatePosition();
    }
  });

  const onScrollHorizontal = useCallback((delta: number) => handleWheel(delta, 0), [handleWheel]);
  const onScrollVertical = useCallback(
    (delta: number, event) => handleWheel(0, delta, undefined, event),
    [handleWheel]
  );

  return {
    isScrolling,
    onScrollHorizontal,
    onScrollVertical,
    onScrollBody,
    onScrollTop,
    onScrollLeft,
    onScrollTo,
    onScrollByKeydown
  };
};

export default useScrollListener;
