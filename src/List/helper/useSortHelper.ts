import on from 'dom-lib/on';
import { MouseEventHandler, TouchEventHandler, useCallback, useRef, useState } from 'react';
import AutoScroller from './AutoScroller';
import {
  Axis,
  closestNode,
  getEdgeOffset,
  getScrollingParent,
  isContainInteractiveElement,
  setInlineStyles,
  setTransitionDuration,
  setTranslate3d
} from './utils';
import type { EdgeOffset } from './utils';
import { useIsMounted } from '@/internals/hooks';
import useManager, { Collection, ManagedItem } from './useManager';

export interface MovedItemInfo {
  collection: Collection;
  node: HTMLElement;
  newIndex: number;
  oldIndex: number;
}

export type SortConfig = {
  /* Auto scroll when overflow */
  autoScroll?: boolean;

  /* Delay before trigger sort */
  pressDelay?: number;

  /* Duration of sort animation */
  transitionDuration?: number;

  /* Callback of beginning of sorting */
  onSortStart?(payload?: MovedItemInfo, event?: MouseEvent | TouchEvent): void;

  /* Callback of moving */
  onSortMove?(payload?: MovedItemInfo, event?: MouseEvent | TouchEvent): void;

  /* Callback of end of sorting */
  onSortEnd?(payload?: MovedItemInfo, event?: MouseEvent | TouchEvent): void;

  /* Callback of end of sorting */
  onSort?(payload?: MovedItemInfo, event?: MouseEvent | TouchEvent): void;
};

const helperElementClass = 'rs-list-item-helper';
const holderElementClass = 'rs-list-item-holder';

const useSortHelper = (config: SortConfig) => {
  const { autoScroll, pressDelay, transitionDuration, onSort, onSortEnd, onSortMove, onSortStart } =
    config;
  const [sorting, setSorting] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pressTimer = useRef<any>();
  const { listItemRegister, getManagedItem, getOrderedItems } = useManager();
  const isMounted = useIsMounted();

  /**
   * start dragging
   * */
  const handlePress = useCallback(
    (event, _targetNode, curManagedItem: ManagedItem) => {
      if (!isMounted()) return;
      // data
      const containerElement = containerRef.current as HTMLDivElement;
      const activeNode = curManagedItem.node;
      const activeNodeOldIndex = curManagedItem.info.index ?? 0;
      let activeNodeNextIndex: number = curManagedItem.info.index ?? 0;
      let activeNodeHolderTranslate: Axis = { x: 0, y: 0 };
      let animatedNodesOffset: Axis[] = []; // all list item offset

      // Get initial position from event
      const isTouchEvent = 'touches' in event;
      const initialPosition = {
        pageX: isTouchEvent ? event.touches[0].pageX : event.pageX,
        pageY: isTouchEvent ? event.touches[0].pageY : event.pageY
      };

      // init scroller
      const scrollContainer = getScrollingParent(containerElement) || containerElement;
      const initScroll: Axis = {
        x: scrollContainer.scrollLeft,
        y: scrollContainer.scrollTop
      };
      const autoScroller = new AutoScroller(scrollContainer, (offset: EdgeOffset) => {
        activeNodeHolderTranslate.x += offset.left as number;
        activeNodeHolderTranslate.y += offset.top as number;
      });

      const activeNodeBoundingClientRect = activeNode.getBoundingClientRect();
      const activeNodeOffsetEdge = getEdgeOffset(activeNode, containerElement);
      const activeNodeStyle = getComputedStyle(activeNode);
      let activeNodeHelper: HTMLElement | null = activeNode.cloneNode(true) as HTMLElement;
      activeNodeHelper?.classList.add(helperElementClass);
      setInlineStyles(activeNodeHelper, {
        position: 'fixed',
        width: `${activeNodeBoundingClientRect.width}px`,
        height: `${activeNodeBoundingClientRect.height}px`,
        left: `${activeNodeBoundingClientRect.left - parseFloat(activeNodeStyle.marginLeft)}px`,
        top: `${activeNodeBoundingClientRect.top - parseFloat(activeNodeStyle.marginTop)}px`
      });
      activeNode.classList.add(holderElementClass);
      document.body.appendChild(activeNodeHelper);

      const getContainerScrollDelta = (): EdgeOffset => ({
        left: scrollContainer.scrollLeft - initScroll.x,
        top: scrollContainer.scrollTop - initScroll.y
      });
      const getHolderTranslate = (): Axis =>
        animatedNodesOffset.reduce(
          (acc, item) => ({
            x: acc.x + item.x,
            y: acc.y + item.y
          }),
          { x: 0, y: 0 }
        );

      // Common handler for both mouse and touch move events
      const handleSortMove = (moveEvent: MouseEvent | TouchEvent) => {
        // Prevent default to stop page scrolling during touch drag
        if ('touches' in moveEvent) {
          moveEvent.preventDefault();
        }

        // Get current position from event
        const isTouchMoveEvent = 'touches' in moveEvent;
        const currentPosition = {
          pageX: isTouchMoveEvent ? moveEvent.touches[0].pageX : moveEvent.pageX,
          pageY: isTouchMoveEvent ? moveEvent.touches[0].pageY : moveEvent.pageY
        };

        // Update helper position
        const offset = {
          x: currentPosition.pageX,
          y: currentPosition.pageY
        };
        const containerScrollDelta = getContainerScrollDelta();
        const containerBoundingRect = scrollContainer.getBoundingClientRect();

        activeNodeHolderTranslate = {
          x: offset.x - initialPosition.pageX,
          y: offset.y - initialPosition.pageY
        };

        if (activeNodeHelper) {
          setTranslate3d(activeNodeHelper, activeNodeHolderTranslate);
        }

        // animate
        activeNodeNextIndex = -1;
        const listItemManagerRefs = getOrderedItems(curManagedItem.info.collection);
        const aTop = activeNodeOffsetEdge.top || 0;
        const cTop = containerScrollDelta.top || 0;
        const sortingOffsetY = aTop + activeNodeHolderTranslate.y + cTop;

        for (let i = 0, len = listItemManagerRefs.length; i < len; i++) {
          const currentNode = listItemManagerRefs[i].node;
          const currentNodeIndex = listItemManagerRefs[i].info.index ?? 0;
          const offsetY =
            activeNodeBoundingClientRect.height > currentNode.offsetHeight
              ? currentNode.offsetHeight / 2
              : activeNodeBoundingClientRect.height / 2;

          const translate: Axis = { x: 0, y: 0 };

          // If we haven't cached the node's offsetTop / offsetLeft value
          const curEdgeOffset =
            listItemManagerRefs[i].edgeOffset || getEdgeOffset(currentNode, containerElement);
          listItemManagerRefs[i].edgeOffset = curEdgeOffset;

          // Get a reference to the next node
          const prvNode = i > 0 && listItemManagerRefs[i - 1];
          const nextNode = i < len - 1 && listItemManagerRefs[i + 1];

          // Also cache the node's edge offset if needed.
          if (prvNode && !prvNode.edgeOffset) {
            prvNode.edgeOffset = getEdgeOffset(prvNode.node, containerElement);
          }
          if (nextNode && !nextNode.edgeOffset) {
            nextNode.edgeOffset = getEdgeOffset(nextNode.node, containerElement);
          }

          // If the node is the one we're currently animating, skip it
          if (currentNodeIndex === activeNodeOldIndex) {
            continue;
          }

          const curEdgeOffsetTop = curEdgeOffset.top || 0;

          if (
            prvNode &&
            currentNodeIndex > activeNodeOldIndex &&
            sortingOffsetY + offsetY >= curEdgeOffsetTop
          ) {
            const yOffset = (prvNode.edgeOffset?.top || 0) - curEdgeOffsetTop;

            translate.y = yOffset;

            animatedNodesOffset[currentNodeIndex] = {
              x: 0,
              y: -yOffset
            };
            activeNodeNextIndex = currentNodeIndex;
          } else if (
            nextNode &&
            currentNodeIndex < activeNodeOldIndex &&
            sortingOffsetY <= curEdgeOffsetTop + offsetY
          ) {
            const yOffset = (nextNode.edgeOffset?.top || 0) - curEdgeOffsetTop;

            translate.y = yOffset;
            animatedNodesOffset[currentNodeIndex] = {
              x: 0,
              y: -yOffset
            };
            if (activeNodeNextIndex === -1) {
              activeNodeNextIndex = currentNodeIndex;
            }
          } else {
            animatedNodesOffset[currentNodeIndex] = {
              x: 0,
              y: 0
            };
          }

          setTransitionDuration(currentNode, transitionDuration);
          setTranslate3d(currentNode, translate);

          // translate holder
          setTranslate3d(activeNode, getHolderTranslate());
        }

        if (activeNodeNextIndex === -1) {
          activeNodeNextIndex = activeNodeOldIndex;
        }

        // auto scroll
        if (autoScroll) {
          autoScroller.update({
            width: activeNodeBoundingClientRect.width,
            height: activeNodeBoundingClientRect.height,
            translate: activeNodeHolderTranslate,
            maxTranslate: {
              x: 0,
              y:
                containerBoundingRect.top +
                containerBoundingRect.height -
                activeNodeBoundingClientRect.top -
                activeNodeBoundingClientRect.height / 2
            },
            minTranslate: {
              x: 0,
              y:
                containerBoundingRect.top -
                activeNodeBoundingClientRect.top -
                activeNodeBoundingClientRect.height / 2
            }
          });
        }

        onSortMove?.(
          {
            collection: curManagedItem.info.collection,
            node: activeNode,
            oldIndex: activeNodeOldIndex,
            newIndex: activeNodeNextIndex
          },
          moveEvent
        );
      };

      // Common handler for both mouse and touch end events
      const handleSortEnd = (endEvent: MouseEvent | TouchEvent) => {
        // Remove the event listeners
        sortMouseMoveListener.off();
        sortMouseEndListener.off();
        sortTouchMoveListener?.off();
        sortTouchEndListener?.off();

        // Enable page scrolling again
        if (document.body.style.overflow === 'hidden') {
          document.body.style.overflow = '';
        }

        const holderTranslate = getHolderTranslate();
        const containerScrollDelta = getContainerScrollDelta();

        if (activeNodeHelper) {
          setTranslate3d(activeNodeHelper, {
            x: holderTranslate.x - (containerScrollDelta.left || 0),
            y: holderTranslate.y - (containerScrollDelta.top || 0)
          });
          setTransitionDuration(activeNodeHelper, transitionDuration);
        }

        // wait for animation
        setTimeout(() => {
          if (!isMounted()) return;
          // Remove the helper from the DOM
          activeNodeHelper?.parentNode?.removeChild(activeNodeHelper);
          activeNodeHelper = null;

          // Remove redundant styles
          activeNode.classList.remove(holderElementClass);
          setTranslate3d(activeNode, null);
          animatedNodesOffset = [];

          for (const item of getOrderedItems(curManagedItem.info.collection)) {
            // Clear the cached offsetTop / offsetLeft value
            item.edgeOffset = null;

            // Remove the transforms / transitions
            const el = item.node;
            setTranslate3d(el, null);
            setTransitionDuration(el, null);
          }

          // Stop autoScroll
          autoScroller.clear();

          // Update manager state
          setSorting(false);

          // callbacks
          const callbackPayload = {
            collection: curManagedItem.info.collection,
            node: curManagedItem.node,
            newIndex: activeNodeNextIndex,
            oldIndex: activeNodeOldIndex
          };
          onSortEnd?.(callbackPayload, endEvent);
          onSort?.(callbackPayload, endEvent);
        }, transitionDuration);
      };

      // Set up mouse event listeners
      const sortMouseMoveListener = on(window, 'mousemove', handleSortMove, { passive: false });

      const sortMouseEndListener = on(window, 'mouseup', handleSortEnd, { passive: false });

      // Set up touch event listeners
      let sortTouchMoveListener;
      let sortTouchEndListener;

      if (isTouchEvent) {
        // Disable page scrolling during touch drag
        document.body.style.overflow = 'hidden';

        sortTouchMoveListener = on(
          window,
          'touchmove',
          handleSortMove,
          { passive: false } // Important: passive: false allows preventDefault() to work
        );

        sortTouchEndListener = on(window, 'touchend', handleSortEnd, { passive: false });
      }

      setSorting(true);
      // start callback
      onSortStart?.(
        {
          collection: curManagedItem.info.collection,
          node: activeNode,
          oldIndex: activeNodeOldIndex,
          newIndex: activeNodeNextIndex
        },
        event
      );
    },
    [
      autoScroll,
      getOrderedItems,
      isMounted,
      onSort,
      onSortEnd,
      onSortMove,
      onSortStart,
      transitionDuration
    ]
  );

  /**
   * Determine whether to start dragging
   * */
  const handleStart: MouseEventHandler = useCallback(
    mouseDownEvent => {
      const triggeredNode = mouseDownEvent.target as HTMLElement;
      const targetNode = closestNode(triggeredNode, el =>
        Boolean(getManagedItem(el))
      ) as HTMLElement;
      const curManagedItem = getManagedItem(targetNode) as ManagedItem;
      if (
        // is not secondary button pressed
        mouseDownEvent.button !== 2 &&
        // is list item
        Boolean(curManagedItem) &&
        !curManagedItem.info.disabled &&
        // is not sorting
        !sorting &&
        // is valid node
        targetNode instanceof HTMLElement &&
        // excludes interactive elements
        !targetNode.contains(closestNode(triggeredNode, isContainInteractiveElement))
      ) {
        mouseDownEvent.preventDefault();
        pressTimer.current = setTimeout(
          handlePress,
          pressDelay,
          mouseDownEvent,
          targetNode,
          curManagedItem
        );
      }
    },
    [getManagedItem, handlePress, pressDelay, sorting]
  );

  /**
   * Handle touch start for mobile devices
   */
  const handleTouchStart: TouchEventHandler = useCallback(
    touchStartEvent => {
      const triggeredNode = touchStartEvent.target as HTMLElement;
      const targetNode = closestNode(triggeredNode, el =>
        Boolean(getManagedItem(el))
      ) as HTMLElement;
      const curManagedItem = getManagedItem(targetNode) as ManagedItem;
      if (
        // is list item
        Boolean(curManagedItem) &&
        !curManagedItem.info.disabled &&
        // is not sorting
        !sorting &&
        // is valid node
        targetNode instanceof HTMLElement &&
        // excludes interactive elements
        !targetNode.contains(closestNode(triggeredNode, isContainInteractiveElement))
      ) {
        // Prevent scrolling while sorting
        touchStartEvent.preventDefault();

        pressTimer.current = setTimeout(
          handlePress,
          pressDelay,
          touchStartEvent,
          targetNode,
          curManagedItem
        );
      }
    },
    [getManagedItem, handlePress, pressDelay, sorting]
  );

  /**
   * Clear timer after drag
   * */
  const handleEnd: MouseEventHandler = useCallback(() => {
    clearTimeout(pressTimer.current);

    // Ensure page scrolling is re-enabled
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
    }
  }, []);

  /**
   * Clear timer after touch end
   */
  const handleTouchEnd: TouchEventHandler = useCallback(() => {
    clearTimeout(pressTimer.current);

    // Ensure page scrolling is re-enabled
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
    }
  }, []);

  return {
    handleStart,
    handleEnd,
    handleTouchStart,
    handleTouchEnd,
    containerRef,
    sorting,
    register: listItemRegister
  };
};

export default useSortHelper;
