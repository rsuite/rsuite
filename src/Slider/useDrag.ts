import { useRef, useEffect, useCallback, useState } from 'react';
import PointerMoveTracker from 'dom-lib/PointerMoveTracker';
import addStyle from 'dom-lib/addStyle';
import getWidth from 'dom-lib/getWidth';
import { useEventCallback } from '@/internals/hooks';

interface DragProps {
  tooltip?: boolean;
  disabled?: boolean;
  onDragStart?: (event: React.MouseEvent) => void;
  onDragMove?: (event: React.DragEvent, dataset?: DOMStringMap) => void;
  onDragEnd?: (event: React.MouseEvent, dataset?: DOMStringMap) => void;
}

const useDrag = (props: DragProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { tooltip, disabled, onDragMove, onDragEnd, onDragStart } = props;
  const [active, setActive] = useState(false);
  const moveTracker = useRef<PointerMoveTracker | null>();

  // Release the move event
  const releaseMoves = useCallback(() => {
    moveTracker.current?.releaseMoves();
    moveTracker.current = null;
  }, []);

  const setTooltipPosition = useCallback(() => {
    const tooltipElement = tooltipRef.current;

    if (tooltip && tooltipElement) {
      const width = getWidth(tooltipElement);
      // Set the position of the tooltip
      addStyle(tooltipElement, 'left', `-${width / 2}px`);
    }
  }, [tooltip]);

  const handleDragMove = useEventCallback(
    (_deltaX: number, _deltaY: number, event: React.DragEvent) => {
      if (moveTracker.current?.isDragging()) {
        onDragMove?.(event, rootRef.current?.dataset);
        setTooltipPosition();
      }
    }
  );

  const handleDragEnd = useEventCallback((event: React.MouseEvent) => {
    setActive(false);
    releaseMoves();
    onDragEnd?.(event, rootRef.current?.dataset);
  });

  const getMouseMoveTracker = useCallback(() => {
    return (
      moveTracker.current ||
      new PointerMoveTracker(document.body, {
        onMove: handleDragMove,
        onMoveEnd: handleDragEnd,
        useTouchEvent: true
      })
    );
  }, [handleDragEnd, handleDragMove]);

  const onMoveStart = useEventCallback((event: React.MouseEvent) => {
    if (disabled) {
      return;
    }
    moveTracker.current = getMouseMoveTracker();
    moveTracker.current?.captureMoves(event);

    rootRef.current?.focus();

    setActive(true);
    onDragStart?.(event);
  });

  const onMouseEnter = useEventCallback(() => {
    setTooltipPosition();
  });

  useEffect(() => {
    return () => {
      releaseMoves();
    };
  }, [releaseMoves]);

  return {
    active,
    rootRef,
    tooltipRef,
    onMoveStart,
    onMouseEnter
  };
};

export default useDrag;
