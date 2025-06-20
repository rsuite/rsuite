import { useCallback, useEffect, useState, RefObject } from 'react';
import isEqual from 'lodash/isEqual';
import { useElementResize } from '@/internals/hooks';

interface UseIndicatorPositionProps {
  containerRef: RefObject<HTMLDivElement | null>;
  activeIndex?: number;
  indicator: 'pill' | 'underline';
  data?: Array<{ value: string | number }>;
  block?: boolean;
}

/**
 * Updates the indicator position based on the active item
 */
const updateIndicatorPosition = (
  container: HTMLElement,
  activeIndex?: number,
  indicator?: 'pill' | 'underline'
): React.CSSProperties => {
  if (activeIndex === -1) return {};

  const activeItem = container.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;

  if (!activeItem) return {};

  const containerStyle = window.getComputedStyle(container);
  const paddingLeft = parseFloat(containerStyle.paddingLeft) || 0;

  return {
    transform: `translateX(${activeItem.offsetLeft - paddingLeft}px)`,
    width: activeItem.offsetWidth,
    height: indicator === 'underline' ? 2 : activeItem.offsetHeight
  };
};

/**
 * Custom hook to calculate and update the indicator position
 */
const useIndicatorPosition = ({
  containerRef,
  activeIndex,
  indicator,
  data
}: UseIndicatorPositionProps) => {
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  const updatePosition = useCallback(() => {
    if (!containerRef?.current) {
      return;
    }

    const newStyle = updateIndicatorPosition(containerRef.current, activeIndex, indicator);

    setIndicatorStyle(prev => (isEqual(prev, newStyle) ? prev : newStyle));
  }, [containerRef, activeIndex, indicator]);

  // Update position when active item or data changes
  useEffect(() => {
    updatePosition();
  }, [updatePosition, data]);

  // Set up resize observer
  useElementResize(containerRef, updatePosition);

  return {
    style: indicatorStyle
  };
};

export default useIndicatorPosition;
