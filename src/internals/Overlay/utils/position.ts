import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import ownerDocument from 'dom-lib/ownerDocument';
import scrollTop from 'dom-lib/scrollTop';
import scrollLeft from 'dom-lib/scrollLeft';
import nodeName from 'dom-lib/nodeName';
import type { Offset, Placement } from '@/internals/types';
import type { CursorPosition, Dimensions, PositionOptions, PositionType } from '../types';

export const AutoPlacement = {
  left: 'Start',
  right: 'End',
  top: 'Start',
  bottom: 'End'
} as const;

// Cache dimensions without retaining containers after they are unmounted.
const dimensionsCache = new WeakMap<HTMLElement, { dimensions: Dimensions; timestamp: number }>();

// Cache expiry time (milliseconds)
const CACHE_EXPIRY = 100;

function getOffset(node: HTMLElement): Offset {
  // Document.contains excludes shadow-tree descendants, including connected ones.
  if (!node.isConnected) {
    return { top: 0, left: 0, width: 0, height: 0 };
  }

  const { top, left, width, height } = node.getBoundingClientRect();
  if (!width && !height) return { top, left, width, height };

  const { documentElement, defaultView } = node.ownerDocument;
  return {
    top: top + (defaultView?.scrollY ?? documentElement.scrollTop) - documentElement.clientTop,
    left: left + (defaultView?.scrollX ?? documentElement.scrollLeft) - documentElement.clientLeft,
    width,
    height
  };
}

function getRelativeOffset(offset: Offset, container: HTMLElement): Offset {
  if (container.tagName === 'BODY') return offset;

  const containerOffset =
    nodeName(container) === 'html' ? { top: 0, left: 0 } : getOffset(container);
  return {
    ...offset,
    top: offset.top - containerOffset.top - container.clientTop + scrollTop(container),
    left: offset.left - containerOffset.left - container.clientLeft + scrollLeft(container)
  };
}

/**
 * Get the external dimensions of the container with memoization for performance
 * @param containerNode Container element
 * @returns Container dimensions information
 */
function getContainerDimensions(containerNode: HTMLElement): Dimensions {
  // Check cache
  const cached = dimensionsCache.get(containerNode);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_EXPIRY) {
    return cached.dimensions;
  }

  // Calculate new dimensions
  let width: number;
  let height: number;
  let scrollX: number;
  let scrollY: number;

  if (containerNode.tagName === 'BODY') {
    const { defaultView, documentElement } = ownerDocument(containerNode);
    width = defaultView?.innerWidth ?? documentElement.clientWidth;
    height = defaultView?.innerHeight ?? documentElement.clientHeight;
    scrollY = scrollTop(ownerDocument(containerNode).documentElement) || scrollTop(containerNode);
    scrollX = scrollLeft(ownerDocument(containerNode).documentElement) || scrollLeft(containerNode);
  } else {
    ({ width, height } = getOffset(containerNode) as Offset);
    scrollY = scrollTop(containerNode);
    scrollX = scrollLeft(containerNode);
  }

  const dimensions = { width, height, scrollX, scrollY };

  // Update cache
  dimensionsCache.set(containerNode, { dimensions, timestamp: now });

  return dimensions;
}

export function calcPosition(options: PositionOptions) {
  const { placement, preventOverflow, padding } = options;
  // Ensure placement is a valid type
  const currentPlacement = placement as Placement;

  function getTopDelta(top: number, overlayHeight: number, container: HTMLElement) {
    if (!preventOverflow) {
      return 0;
    }
    const containerDimensions = getContainerDimensions(container);
    const { height: containerHeight, scrollY } = containerDimensions;

    const topEdgeOffset = top - padding - scrollY;
    const bottomEdgeOffset = top + padding + overlayHeight - scrollY;

    if (topEdgeOffset < 0) {
      return -topEdgeOffset;
    } else if (bottomEdgeOffset > containerHeight) {
      return containerHeight - bottomEdgeOffset;
    }

    return 0;
  }

  function getLeftDelta(left: number, overlayWidth: number, container: HTMLElement) {
    if (!preventOverflow) {
      return 0;
    }
    const containerDimensions = getContainerDimensions(container);
    const { scrollX, width: containerWidth } = containerDimensions;

    const leftEdgeOffset = left - padding - scrollX;
    const rightEdgeOffset = left + padding + overlayWidth - scrollX;

    if (leftEdgeOffset < 0) {
      return -leftEdgeOffset;
    } else if (rightEdgeOffset > containerWidth) {
      return containerWidth - rightEdgeOffset;
    }

    return 0;
  }

  function getPositionTop(container: HTMLElement, overlayHeight: number, top: number) {
    if (!preventOverflow) {
      return top;
    }
    const { scrollY, height: containerHeight } = getContainerDimensions(container);

    // Check if the bottom of the overlay overflows, set top
    if (overlayHeight + top > containerHeight + scrollY) {
      return containerHeight - overlayHeight + scrollY;
    }

    // The minimum value of top should not be less than the vertical scroll bar y value
    return Math.max(scrollY, top);
  }

  function getPositionLeft(container: HTMLElement, overlayWidth: number, left: number) {
    if (!preventOverflow) {
      return left;
    }

    const { scrollX, width: containerWidth } = getContainerDimensions(container);

    if (overlayWidth + left > containerWidth + scrollX) {
      return containerWidth - overlayWidth + scrollX;
    }

    // The minimum value of left should not be less than the horizontal scroll bar x value
    return Math.max(scrollX, left);
  }

  return {
    getPosition(target: HTMLElement, container: HTMLElement) {
      // The overlay is positioned in the container even when its trigger is fixed.
      return getRelativeOffset(getOffset(target), container);
    },

    getCursorOffsetPosition(container: HTMLElement, cursorPosition: CursorPosition): Offset {
      // Mouse page coordinates use the same document space as element offsets.
      return getRelativeOffset({ ...cursorPosition, width: 10, height: 10 }, container);
    },

    /**
     * Calculate the optimal auto placement position
     * @param targetOffset Target element offset
     * @param container Container element
     * @param overlay Overlay dimensions
     * @returns Calculated optimal placement position
     */
    calcAutoPlacement(
      targetOffset: Offset,
      container: HTMLElement,
      overlay: { width: number; height: number }
    ): Placement {
      // Get container dimensions and scroll position
      const { width, height, scrollX, scrollY } = getContainerDimensions(container);

      // Calculate available space in each direction
      const availableSpace = {
        left: targetOffset.left - scrollX - overlay.width,
        top: targetOffset.top - scrollY - overlay.height,
        right: width - targetOffset.left - targetOffset.width + scrollX - overlay.width,
        bottom: height - targetOffset.top - targetOffset.height + scrollY - overlay.height
      };

      // Group available space into horizontal and vertical directions
      const horizontal = [
        { key: 'left' as const, value: availableSpace.left },
        { key: 'right' as const, value: availableSpace.right }
      ];
      const vertical = [
        { key: 'top' as const, value: availableSpace.top },
        { key: 'bottom' as const, value: availableSpace.bottom }
      ];

      // Constants for auto placement
      const AV = 'autoVertical';
      const AH = 'autoHorizontal';

      // Handle specific auto vertical placement
      if (currentPlacement.indexOf(AV) !== -1) {
        const bestDirection = maxBy(vertical, o => o.value);
        if (!bestDirection) return 'bottom'; // Default value
        return (
          currentPlacement === AV
            ? bestDirection.key
            : `${bestDirection.key}${currentPlacement.replace(AV, '')}`
        ) as Placement;
      }

      // Handle specific auto horizontal placement
      if (currentPlacement.indexOf(AH) !== -1) {
        const bestDirection = maxBy(horizontal, o => o.value);
        if (!bestDirection) return 'right'; // Default value
        return (
          currentPlacement === AH
            ? bestDirection.key
            : `${bestDirection.key}${currentPlacement.replace(AH, '')}`
        ) as Placement;
      }

      // By default, vertical direction takes precedence
      // Find the direction with the most space to use as main direction
      const bestDirection = maxBy([...vertical, ...horizontal], o => o.value);
      if (!bestDirection) return 'bottom'; // 默认值

      // Determine alignment based on main direction
      const isHorizontal = bestDirection.key === 'left' || bestDirection.key === 'right';
      const bestAlign = isHorizontal
        ? minBy(vertical, o => o.value) // If main direction is horizontal, align vertically
        : minBy(horizontal, o => o.value); // If main direction is vertical, align horizontally

      if (!bestAlign) return bestDirection.key as Placement; // If no alignment, return main direction

      // Return final placement position
      return `${bestDirection.key}${AutoPlacement[bestAlign.key]}` as Placement;
    },

    // Calculate the position of the overlay
    calcOverlayPosition(
      overlayNode: HTMLElement,
      target: HTMLElement,
      container: HTMLElement,
      cursorPosition?: CursorPosition | null
    ): PositionType {
      // Share measurements within this calculation, while honoring every position update.
      dimensionsCache.delete(container);

      // Cache commonly used values to avoid repeated calculations
      const ARROW_OFFSET_FACTOR = 50; // Arrow offset calculation factor
      const isRTL = ownerDocument(container).dir === 'rtl';

      // Get target element offset
      const childOffset: Offset = cursorPosition
        ? this.getCursorOffsetPosition(container, cursorPosition)
        : (this.getPosition(target, container) as Offset);
      const { height: overlayHeight, width: overlayWidth } = getOffset(overlayNode) as Offset;
      const { top, left } = childOffset;

      // Determine placement position
      let nextPlacement = currentPlacement;

      if (currentPlacement && currentPlacement.indexOf('auto') >= 0) {
        nextPlacement = this.calcAutoPlacement(childOffset, container, {
          height: overlayHeight,
          width: overlayWidth
        });
      }

      // Initialize position and arrow offset values
      let positionLeft;
      let positionTop;
      let arrowOffsetLeft: PositionType['arrowOffsetLeft'];
      let arrowOffsetTop: PositionType['arrowOffsetTop'];

      // Handle basic left/right positions
      if (nextPlacement === 'left' || nextPlacement === 'right') {
        // Vertical centering
        positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;
        const topDelta = getTopDelta(positionTop, overlayHeight, container);
        positionTop += topDelta;
        arrowOffsetTop = `${ARROW_OFFSET_FACTOR * (1 - (2 * topDelta) / overlayHeight)}%`;
        arrowOffsetLeft = undefined;
      }
      // Handle basic top/bottom positions
      else if (nextPlacement === 'top' || nextPlacement === 'bottom') {
        // Horizontal centering
        positionLeft = left + (childOffset.width - overlayWidth) / 2;
        const leftDelta = getLeftDelta(positionLeft, overlayWidth, container);
        positionLeft += leftDelta;
        arrowOffsetLeft = `${ARROW_OFFSET_FACTOR * (1 - (2 * leftDelta) / overlayWidth)}%`;
        arrowOffsetTop = undefined;
      }

      // Helper function: Check if placement matches specified prefix
      const matchesPlacement = (prefix: string) => {
        return (
          nextPlacement === prefix ||
          nextPlacement === `${prefix}Start` ||
          nextPlacement === `${prefix}End`
        );
      };

      // Handle top position series
      if (matchesPlacement('top')) {
        positionTop = getPositionTop(container, overlayHeight, childOffset.top - overlayHeight);
      }

      // Handle bottom position series
      if (matchesPlacement('bottom')) {
        positionTop = getPositionTop(
          container,
          overlayHeight,
          childOffset.top + childOffset.height
        );
      }

      // Handle left position series
      if (matchesPlacement('left')) {
        positionLeft = getPositionLeft(container, overlayWidth, childOffset.left - overlayWidth);
      }

      // Handle right position series
      if (matchesPlacement('right')) {
        positionLeft = getPositionLeft(
          container,
          overlayWidth,
          childOffset.left + childOffset.width
        );
      }

      // Handle horizontal position adjustment in RTL mode
      if (isRTL && (matchesPlacement('left') || matchesPlacement('right'))) {
        /**
         * When laying out in RTL, if the width of the container
         * is less than the width of the container scrolling,
         * you need to recalculate the left value.
         */
        const { width: containerWidth } = getContainerDimensions(container);
        if (container.scrollWidth > containerWidth) {
          positionLeft = containerWidth + positionLeft - container.scrollWidth;
        }
      }

      // Handle Start variant positions
      if (nextPlacement === 'topStart' || nextPlacement === 'bottomStart') {
        if (isRTL) {
          const nextLeft = left + (childOffset.width - overlayWidth);
          positionLeft = nextLeft + getLeftDelta(nextLeft, overlayWidth, container);
        } else {
          positionLeft = left + getLeftDelta(left, overlayWidth, container);
        }
      }

      // Handle End variant positions
      if (nextPlacement === 'topEnd' || nextPlacement === 'bottomEnd') {
        if (isRTL) {
          positionLeft = left + getLeftDelta(left, overlayWidth, container);
        } else {
          const nextLeft = left + (childOffset.width - overlayWidth);
          positionLeft = nextLeft + getLeftDelta(nextLeft, overlayWidth, container);
        }
      }

      // Handle leftStart and rightStart
      if (nextPlacement === 'leftStart' || nextPlacement === 'rightStart') {
        positionTop = top + getTopDelta(top, overlayHeight, container);
      }

      // Handle leftEnd and rightEnd
      if (nextPlacement === 'leftEnd' || nextPlacement === 'rightEnd') {
        const nextTop = top + (childOffset.height - overlayHeight);
        positionTop = nextTop + getTopDelta(nextTop, overlayHeight, container);
      }

      return {
        placement: nextPlacement,
        positionLeft,
        positionTop,
        arrowOffsetLeft,
        arrowOffsetTop
      };
    }
  };
}
