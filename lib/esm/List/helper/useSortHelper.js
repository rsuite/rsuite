'use client';
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
import on from 'dom-lib/on';
import { useCallback, useRef, useState } from 'react';
import AutoScroller from "./AutoScroller.js";
import { closestNode, getEdgeOffset, getScrollingParent, isContainInteractiveElement, setInlineStyles, setTransitionDuration, setTranslate3d } from "./utils.js";
import { useIsMounted } from "../../internals/hooks/index.js";
import useManager from "./useManager.js";
var helperElementClass = 'rs-list-item-helper';
var holderElementClass = 'rs-list-item-holder';
var useSortHelper = function useSortHelper(config) {
  var autoScroll = config.autoScroll,
    pressDelay = config.pressDelay,
    transitionDuration = config.transitionDuration,
    onSort = config.onSort,
    onSortEnd = config.onSortEnd,
    onSortMove = config.onSortMove,
    onSortStart = config.onSortStart;
  var _useState = useState(false),
    sorting = _useState[0],
    setSorting = _useState[1];
  var containerRef = useRef(null);
  var pressTimer = useRef();
  var _useManager = useManager(),
    listItemRegister = _useManager.listItemRegister,
    getManagedItem = _useManager.getManagedItem,
    getOrderedItems = _useManager.getOrderedItems;
  var isMounted = useIsMounted();

  /**
   * start dragging
   * */
  var handlePress = useCallback(function (event, _targetNode, curManagedItem) {
    var _curManagedItem$info$, _curManagedItem$info$2, _activeNodeHelper;
    if (!isMounted()) return;
    // data
    var containerElement = containerRef.current;
    var activeNode = curManagedItem.node;
    var activeNodeOldIndex = (_curManagedItem$info$ = curManagedItem.info.index) !== null && _curManagedItem$info$ !== void 0 ? _curManagedItem$info$ : 0;
    var activeNodeNextIndex = (_curManagedItem$info$2 = curManagedItem.info.index) !== null && _curManagedItem$info$2 !== void 0 ? _curManagedItem$info$2 : 0;
    var activeNodeHolderTranslate = {
      x: 0,
      y: 0
    };
    var animatedNodesOffset = []; // all list item offset

    // Get initial position from event
    var isTouchEvent = 'touches' in event;
    var initialPosition = {
      pageX: isTouchEvent ? event.touches[0].pageX : event.pageX,
      pageY: isTouchEvent ? event.touches[0].pageY : event.pageY
    };

    // init scroller
    var scrollContainer = getScrollingParent(containerElement) || containerElement;
    var initScroll = {
      x: scrollContainer.scrollLeft,
      y: scrollContainer.scrollTop
    };
    var autoScroller = new AutoScroller(scrollContainer, function (offset) {
      activeNodeHolderTranslate.x += offset.left;
      activeNodeHolderTranslate.y += offset.top;
    });
    var activeNodeBoundingClientRect = activeNode.getBoundingClientRect();
    var activeNodeOffsetEdge = getEdgeOffset(activeNode, containerElement);
    var activeNodeStyle = getComputedStyle(activeNode);
    var activeNodeHelper = activeNode.cloneNode(true);
    (_activeNodeHelper = activeNodeHelper) === null || _activeNodeHelper === void 0 || _activeNodeHelper.classList.add(helperElementClass);
    setInlineStyles(activeNodeHelper, {
      position: 'fixed',
      width: activeNodeBoundingClientRect.width + "px",
      height: activeNodeBoundingClientRect.height + "px",
      left: activeNodeBoundingClientRect.left - parseFloat(activeNodeStyle.marginLeft) + "px",
      top: activeNodeBoundingClientRect.top - parseFloat(activeNodeStyle.marginTop) + "px"
    });
    activeNode.classList.add(holderElementClass);
    document.body.appendChild(activeNodeHelper);
    var getContainerScrollDelta = function getContainerScrollDelta() {
      return {
        left: scrollContainer.scrollLeft - initScroll.x,
        top: scrollContainer.scrollTop - initScroll.y
      };
    };
    var getHolderTranslate = function getHolderTranslate() {
      return animatedNodesOffset.reduce(function (acc, item) {
        return {
          x: acc.x + item.x,
          y: acc.y + item.y
        };
      }, {
        x: 0,
        y: 0
      });
    };

    // Common handler for both mouse and touch move events
    var handleSortMove = function handleSortMove(moveEvent) {
      // Prevent default to stop page scrolling during touch drag
      if ('touches' in moveEvent) {
        moveEvent.preventDefault();
      }

      // Get current position from event
      var isTouchMoveEvent = 'touches' in moveEvent;
      var currentPosition = {
        pageX: isTouchMoveEvent ? moveEvent.touches[0].pageX : moveEvent.pageX,
        pageY: isTouchMoveEvent ? moveEvent.touches[0].pageY : moveEvent.pageY
      };

      // Update helper position
      var offset = {
        x: currentPosition.pageX,
        y: currentPosition.pageY
      };
      var containerScrollDelta = getContainerScrollDelta();
      var containerBoundingRect = scrollContainer.getBoundingClientRect();
      activeNodeHolderTranslate = {
        x: offset.x - initialPosition.pageX,
        y: offset.y - initialPosition.pageY
      };
      if (activeNodeHelper) {
        setTranslate3d(activeNodeHelper, activeNodeHolderTranslate);
      }

      // animate
      activeNodeNextIndex = -1;
      var listItemManagerRefs = getOrderedItems(curManagedItem.info.collection);
      var aTop = activeNodeOffsetEdge.top || 0;
      var cTop = containerScrollDelta.top || 0;
      var sortingOffsetY = aTop + activeNodeHolderTranslate.y + cTop;
      for (var i = 0, len = listItemManagerRefs.length; i < len; i++) {
        var _listItemManagerRefs$;
        var currentNode = listItemManagerRefs[i].node;
        var currentNodeIndex = (_listItemManagerRefs$ = listItemManagerRefs[i].info.index) !== null && _listItemManagerRefs$ !== void 0 ? _listItemManagerRefs$ : 0;
        var offsetY = activeNodeBoundingClientRect.height > currentNode.offsetHeight ? currentNode.offsetHeight / 2 : activeNodeBoundingClientRect.height / 2;
        var translate = {
          x: 0,
          y: 0
        };

        // If we haven't cached the node's offsetTop / offsetLeft value
        var curEdgeOffset = listItemManagerRefs[i].edgeOffset || getEdgeOffset(currentNode, containerElement);
        listItemManagerRefs[i].edgeOffset = curEdgeOffset;

        // Get a reference to the next node
        var prvNode = i > 0 && listItemManagerRefs[i - 1];
        var nextNode = i < len - 1 && listItemManagerRefs[i + 1];

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
        var curEdgeOffsetTop = curEdgeOffset.top || 0;
        if (prvNode && currentNodeIndex > activeNodeOldIndex && sortingOffsetY + offsetY >= curEdgeOffsetTop) {
          var _prvNode$edgeOffset;
          var yOffset = (((_prvNode$edgeOffset = prvNode.edgeOffset) === null || _prvNode$edgeOffset === void 0 ? void 0 : _prvNode$edgeOffset.top) || 0) - curEdgeOffsetTop;
          translate.y = yOffset;
          animatedNodesOffset[currentNodeIndex] = {
            x: 0,
            y: -yOffset
          };
          activeNodeNextIndex = currentNodeIndex;
        } else if (nextNode && currentNodeIndex < activeNodeOldIndex && sortingOffsetY <= curEdgeOffsetTop + offsetY) {
          var _nextNode$edgeOffset;
          var _yOffset = (((_nextNode$edgeOffset = nextNode.edgeOffset) === null || _nextNode$edgeOffset === void 0 ? void 0 : _nextNode$edgeOffset.top) || 0) - curEdgeOffsetTop;
          translate.y = _yOffset;
          animatedNodesOffset[currentNodeIndex] = {
            x: 0,
            y: -_yOffset
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
            y: containerBoundingRect.top + containerBoundingRect.height - activeNodeBoundingClientRect.top - activeNodeBoundingClientRect.height / 2
          },
          minTranslate: {
            x: 0,
            y: containerBoundingRect.top - activeNodeBoundingClientRect.top - activeNodeBoundingClientRect.height / 2
          }
        });
      }
      onSortMove === null || onSortMove === void 0 || onSortMove({
        collection: curManagedItem.info.collection,
        node: activeNode,
        oldIndex: activeNodeOldIndex,
        newIndex: activeNodeNextIndex
      }, moveEvent);
    };

    // Common handler for both mouse and touch end events
    var handleSortEnd = function handleSortEnd(endEvent) {
      var _sortTouchMoveListene, _sortTouchEndListener;
      // Remove the event listeners
      sortMouseMoveListener.off();
      sortMouseEndListener.off();
      (_sortTouchMoveListene = sortTouchMoveListener) === null || _sortTouchMoveListene === void 0 || _sortTouchMoveListene.off();
      (_sortTouchEndListener = sortTouchEndListener) === null || _sortTouchEndListener === void 0 || _sortTouchEndListener.off();

      // Enable page scrolling again
      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = '';
      }
      var holderTranslate = getHolderTranslate();
      var containerScrollDelta = getContainerScrollDelta();
      if (activeNodeHelper) {
        setTranslate3d(activeNodeHelper, {
          x: holderTranslate.x - (containerScrollDelta.left || 0),
          y: holderTranslate.y - (containerScrollDelta.top || 0)
        });
        setTransitionDuration(activeNodeHelper, transitionDuration);
      }

      // wait for animation
      setTimeout(function () {
        var _activeNodeHelper2;
        if (!isMounted()) return;
        // Remove the helper from the DOM
        (_activeNodeHelper2 = activeNodeHelper) === null || _activeNodeHelper2 === void 0 || (_activeNodeHelper2 = _activeNodeHelper2.parentNode) === null || _activeNodeHelper2 === void 0 || _activeNodeHelper2.removeChild(activeNodeHelper);
        activeNodeHelper = null;

        // Remove redundant styles
        activeNode.classList.remove(holderElementClass);
        setTranslate3d(activeNode, null);
        animatedNodesOffset = [];
        for (var _iterator = _createForOfIteratorHelperLoose(getOrderedItems(curManagedItem.info.collection)), _step; !(_step = _iterator()).done;) {
          var item = _step.value;
          // Clear the cached offsetTop / offsetLeft value
          item.edgeOffset = null;

          // Remove the transforms / transitions
          var el = item.node;
          setTranslate3d(el, null);
          setTransitionDuration(el, null);
        }

        // Stop autoScroll
        autoScroller.clear();

        // Update manager state
        setSorting(false);

        // callbacks
        var callbackPayload = {
          collection: curManagedItem.info.collection,
          node: curManagedItem.node,
          newIndex: activeNodeNextIndex,
          oldIndex: activeNodeOldIndex
        };
        onSortEnd === null || onSortEnd === void 0 || onSortEnd(callbackPayload, endEvent);
        onSort === null || onSort === void 0 || onSort(callbackPayload, endEvent);
      }, transitionDuration);
    };

    // Set up mouse event listeners
    var sortMouseMoveListener = on(window, 'mousemove', handleSortMove, {
      passive: false
    });
    var sortMouseEndListener = on(window, 'mouseup', handleSortEnd, {
      passive: false
    });

    // Set up touch event listeners
    var sortTouchMoveListener;
    var sortTouchEndListener;
    if (isTouchEvent) {
      // Disable page scrolling during touch drag
      document.body.style.overflow = 'hidden';
      sortTouchMoveListener = on(window, 'touchmove', handleSortMove, {
        passive: false
      } // Important: passive: false allows preventDefault() to work
      );
      sortTouchEndListener = on(window, 'touchend', handleSortEnd, {
        passive: false
      });
    }
    setSorting(true);
    // start callback
    onSortStart === null || onSortStart === void 0 || onSortStart({
      collection: curManagedItem.info.collection,
      node: activeNode,
      oldIndex: activeNodeOldIndex,
      newIndex: activeNodeNextIndex
    }, event);
  }, [autoScroll, getOrderedItems, isMounted, onSort, onSortEnd, onSortMove, onSortStart, transitionDuration]);

  /**
   * Determine whether to start dragging
   * */
  var handleStart = useCallback(function (mouseDownEvent) {
    var triggeredNode = mouseDownEvent.target;
    var targetNode = closestNode(triggeredNode, function (el) {
      return Boolean(getManagedItem(el));
    });
    var curManagedItem = getManagedItem(targetNode);
    if (
    // is not secondary button pressed
    mouseDownEvent.button !== 2 &&
    // is list item
    Boolean(curManagedItem) && !curManagedItem.info.disabled &&
    // is not sorting
    !sorting &&
    // is valid node
    targetNode instanceof HTMLElement &&
    // excludes interactive elements
    !targetNode.contains(closestNode(triggeredNode, isContainInteractiveElement))) {
      mouseDownEvent.preventDefault();
      pressTimer.current = setTimeout(handlePress, pressDelay, mouseDownEvent, targetNode, curManagedItem);
    }
  }, [getManagedItem, handlePress, pressDelay, sorting]);

  /**
   * Handle touch start for mobile devices
   */
  var handleTouchStart = useCallback(function (touchStartEvent) {
    var triggeredNode = touchStartEvent.target;
    var targetNode = closestNode(triggeredNode, function (el) {
      return Boolean(getManagedItem(el));
    });
    var curManagedItem = getManagedItem(targetNode);
    if (
    // is list item
    Boolean(curManagedItem) && !curManagedItem.info.disabled &&
    // is not sorting
    !sorting &&
    // is valid node
    targetNode instanceof HTMLElement &&
    // excludes interactive elements
    !targetNode.contains(closestNode(triggeredNode, isContainInteractiveElement))) {
      // Prevent scrolling while sorting
      touchStartEvent.preventDefault();
      pressTimer.current = setTimeout(handlePress, pressDelay, touchStartEvent, targetNode, curManagedItem);
    }
  }, [getManagedItem, handlePress, pressDelay, sorting]);

  /**
   * Clear timer after drag
   * */
  var handleEnd = useCallback(function () {
    clearTimeout(pressTimer.current);

    // Ensure page scrolling is re-enabled
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
    }
  }, []);

  /**
   * Clear timer after touch end
   */
  var handleTouchEnd = useCallback(function () {
    clearTimeout(pressTimer.current);

    // Ensure page scrolling is re-enabled
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
    }
  }, []);
  return {
    handleStart: handleStart,
    handleEnd: handleEnd,
    handleTouchStart: handleTouchStart,
    handleTouchEnd: handleTouchEnd,
    containerRef: containerRef,
    sorting: sorting,
    register: listItemRegister
  };
};
export default useSortHelper;