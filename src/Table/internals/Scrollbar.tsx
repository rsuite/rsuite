import React, { useState, useRef, useCallback, useImperativeHandle, useLayoutEffect } from 'react';
import DOMMouseMoveTracker from 'dom-lib/DOMMouseMoveTracker';
import addStyle, { CSSProperty } from 'dom-lib/addStyle';
import getOffset from 'dom-lib/getOffset';
import { SCROLLBAR_MIN_WIDTH, TRANSITION_DURATION, BEZIER } from './constants';
import { useClassNames, useUpdateEffect, useTable } from './hooks';
import type { StandardProps } from './types';

export interface ScrollbarProps extends Omit<StandardProps, 'onScroll'> {
  vertical?: boolean;
  length?: number;
  scrollLength?: number;
  tableId?: string;
  onScroll?: (delta: number, event: React.MouseEvent) => void;
  onMouseDown?: (event: React.MouseEvent) => void;
}

export interface ScrollbarInstance {
  root: HTMLDivElement;
  handle: HTMLDivElement;
  onWheelScroll: (delta: number, momentum?: boolean) => void;
  resetScrollBarPosition: (forceDelta?: number) => void;
}

const Scrollbar = React.forwardRef((props: ScrollbarProps, ref) => {
  const {
    length = 1,
    scrollLength = 1,
    classPrefix = 'scrollbar',
    vertical,
    className,
    tableId,
    onMouseDown,
    onScroll,
    ...rest
  } = props;

  const { setCssPosition } = useTable();
  const [handlePressed, setHandlePressed] = useState(false);
  const scrollOffset = useRef(0);
  const scrollRange = useRef(scrollLength);
  const barRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const mouseMoveTracker = useRef<DOMMouseMoveTracker | null>(null);

  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);

  // Recalculated at click time to avoid stale offset when the scrollbar
  // position changes (e.g. `position: fixed` toggled by useAffix).
  const getBarOffset = () => (barRef.current ? getOffset(barRef.current) : null);
  const classes = merge(
    className,
    withClassPrefix({ vertical, horizontal: !vertical, pressed: handlePressed }),
    // keep the 'fixed' class name if it has already been given by useAffix hook
    barRef.current?.classList.contains('fixed') && 'fixed'
  );

  const width = (length / scrollLength) * 100;
  const styles: React.CSSProperties = {
    [vertical ? 'height' : 'width']: `${width}%`,
    [vertical ? 'minHeight' : 'minWidth']: SCROLLBAR_MIN_WIDTH
  };
  const valuenow = (scrollOffset.current / length) * 100 + width;

  useLayoutEffect(() => {
    return () => {
      releaseMouseMoves();
    };
  }, []);

  useUpdateEffect(() => {
    if (scrollOffset.current) {
      // Update the position of the scroll bar when the height of the table content area changes.
      scrollOffset.current = (scrollRange.current / scrollLength) * scrollOffset.current;
      updateScrollBarPosition(0);
    }

    scrollRange.current = scrollLength;
  }, [scrollLength]);

  useImperativeHandle(ref, () => ({
    get root() {
      return barRef.current;
    },
    get handle() {
      return handleRef.current;
    },
    onWheelScroll: (delta: number, momentum?: boolean) => {
      const nextDelta = delta / (scrollLength / length);

      updateScrollBarPosition(nextDelta, undefined, momentum);
    },
    resetScrollBarPosition: (forceDelta = 0) => {
      scrollOffset.current = 0;
      updateScrollBarPosition(0, forceDelta);
    }
  }));

  const updateScrollBarPosition = useCallback(
    (delta: number, forceDelta?: number, momentum?: boolean) => {
      const max =
        scrollLength && length
          ? length - Math.max((length / scrollLength) * length, SCROLLBAR_MIN_WIDTH + 2)
          : 0;
      const styles = momentum
        ? {
            'transition-duration': `${TRANSITION_DURATION}ms`,
            'transition-timing-function': BEZIER
          }
        : {};

      const getSafeValue = (value = 0) => {
        return Math.min(Math.max(value, 0), max);
      };

      if (typeof forceDelta === 'undefined') {
        scrollOffset.current += delta;
        scrollOffset.current = getSafeValue(scrollOffset.current);
      } else {
        scrollOffset.current = getSafeValue(forceDelta);
      }

      if (vertical) {
        setCssPosition?.(styles as CSSStyleDeclaration, 0, scrollOffset.current);
      } else {
        setCssPosition?.(styles as CSSStyleDeclaration, scrollOffset.current, 0);
      }
      if (handleRef.current) {
        addStyle(handleRef.current, styles as CSSProperty);
      }
    },
    [length, scrollLength, setCssPosition, vertical]
  );

  const handleScroll = useCallback(
    (delta: number, event: React.MouseEvent) => {
      const scrollDelta = delta * (scrollLength / length);

      updateScrollBarPosition(delta);
      onScroll?.(scrollDelta, event);
    },
    [length, onScroll, scrollLength, updateScrollBarPosition]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (handleRef.current && handleRef.current?.contains(event.target as Node)) {
        return;
      }

      const currentOffset = getBarOffset();
      if (typeof currentOffset?.top !== 'number' || typeof currentOffset?.left !== 'number') {
        return;
      }

      const offset = vertical ? event.pageY - currentOffset.top : event.pageX - currentOffset.left;

      const handleWidth = (length / scrollLength) * length;
      const delta = offset - handleWidth;

      const nextDelta =
        offset > scrollOffset.current
          ? delta - scrollOffset.current
          : offset - scrollOffset.current;
      handleScroll(nextDelta, event);
    },
    [handleScroll, length, scrollLength, vertical]
  );

  const releaseMouseMoves = useCallback(() => {
    mouseMoveTracker.current?.releaseMouseMoves?.();
    mouseMoveTracker.current = null;
  }, []);

  const handleDragMove = useCallback(
    (deltaX: number, deltaY: number, event: React.MouseEvent) => {
      if (!mouseMoveTracker.current || !mouseMoveTracker.current.isDragging()) {
        return;
      }

      if (event?.buttons === 0 || window?.event?.['buttons'] === 0) {
        releaseMouseMoves();
        return;
      }

      handleScroll(vertical ? deltaY : deltaX, event);
    },
    [handleScroll, releaseMouseMoves, vertical]
  );

  const handleDragEnd = useCallback(() => {
    releaseMouseMoves();
    setHandlePressed(false);
  }, [releaseMouseMoves]);

  const getMouseMoveTracker = useCallback(() => {
    return (
      mouseMoveTracker.current ||
      new DOMMouseMoveTracker(handleDragMove, handleDragEnd, document.body)
    );
  }, [handleDragEnd, handleDragMove]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      mouseMoveTracker.current = getMouseMoveTracker();
      mouseMoveTracker?.current?.captureMouseMoves(event);

      setHandlePressed(true);
      onMouseDown?.(event);
    },
    [getMouseMoveTracker, onMouseDown]
  );

  return (
    <div
      role="scrollbar"
      aria-controls={tableId}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={valuenow}
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      {...rest}
      ref={barRef}
      className={classes}
      onClick={handleClick}
    >
      <div
        ref={handleRef}
        className={prefix('handle')}
        style={styles}
        onMouseDown={handleMouseDown}
        role="button"
        tabIndex={-1}
      />
    </div>
  );
});

Scrollbar.displayName = 'Table.Scrollbar';

export default Scrollbar;
