// @flow
import * as React from 'react';
import setStatic from 'recompose/setStatic';
import classNames from 'classnames';
import _ from 'lodash';
import { setDisplayName } from 'recompose';
import { on, off } from 'dom-lib';
import {
  setInlineStyles,
  setTranslate3d,
  setTransitionDuration,
  closest,
  getPosition,
  getEdgeOffset,
  getScrollingParent
} from './utils';
import { prefix, defaultProps, getUnhandledProps } from '../utils';
import ListItem from './ListItem';
import Manager from './Manager';
import AutoScroller from './AutoScroller';

const NodeType = {
  Anchor: 'A',
  Button: 'BUTTON',
  Canvas: 'CANVAS',
  Input: 'INPUT',
  Option: 'OPTION',
  Textarea: 'TEXTAREA',
  Select: 'SELECT'
};
const interactiveElements = [
  NodeType.Input,
  NodeType.Textarea,
  NodeType.Select,
  NodeType.Option,
  NodeType.Button
];
const EVENTS = {
  end: ['touchend', 'touchcancel', 'mouseup'],
  move: ['touchmove', 'mousemove'],
  start: ['touchstart', 'mousedown']
};

type SortCallback = (
  payload: {
    collection?: number | string,
    newIndex?: number,
    oldIndex?: number
  },
  event: Event
) => void;

type Axis = {
  x: number,
  y: number
};
type Props = {
  bordered?: boolean,
  hover?: boolean,
  sortable?: boolean,
  size?: 'lg' | 'md' | 'sm',
  autoScroll?: boolean,
  pressDelay?: number,
  pressThreshold?: number,
  transitionDuration?: number,
  onSortStart?: (
    payload: { collection?: number | string, index?: number, node?: HTMLElement },
    event: Event
  ) => void,
  onSortMove?: (event: Event) => void,
  onSortOver?: (payload: {
    collection: number | string,
    index?: number,
    newIndex?: number,
    oldIndex?: number
  }) => void,
  onSortEnd?: SortCallback,
  onSort?: SortCallback,
  className?: string,
  classPrefix: string,
  children?: React.Node
};
type Context = {
  bordered?: boolean,
  size?: 'lg' | 'md' | 'sm',
  manager?: Manager | null
};
type Position = {
  top?: number,
  left?: number,
  bottom?: number,
  right?: number
};

const defaultContext = {
  bordered: false,
  size: 'md',
  manager: null
};
export const { Provider, Consumer }: React.Context<Context> = React.createContext(defaultContext);

/*
* Main Class
* */
class List extends React.Component<Props> {
  static defaultProps = {
    size: 'md',
    autoScroll: true,
    pressDelay: 0,
    pressThreshold: 5,
    transitionDuration: 300
  };
  static handledProps = ['onSortStart', 'onSortMove', 'onSortOver', 'onSortEnd', 'onSort'];

  node: Element;
  sortableGhost: Element;
  helper: Element | null;
  container: Element | Text | null;
  scrollContainer: Element;
  listenerNode: Element;
  autoScroller: AutoScroller;
  manager: Manager = new Manager();
  touched: boolean;
  sorting: boolean;
  position: Axis;
  height: number;
  width: number;
  margin: Position;
  marginOffset: Axis;
  index: number;
  newIndex: number;
  pressTimer: TimeoutID;
  cancelTimer: TimeoutID;
  translate: Axis;
  minTranslate: Axis;
  maxTranslate: Axis;
  initialOffset: Axis;
  offsetEdge: Position;
  initialScroll: Position;
  initialWindowScroll: Position;
  boundingClientRect: ClientRect;
  containerBoundingRect: ClientRect;
  animatedNodeOffset: Array<Axis> = [];

  componentDidMount() {
    if (this.container instanceof Element) {
      this.scrollContainer = getScrollingParent(this.container) || this.container;
      this.autoScroller = new AutoScroller(this.scrollContainer, this.onAutoScroll);
      this.dealListener('add');
    }
  }

  componentWillUnmount() {
    this.dealListener('remove');
  }

  dealListener = (action: 'add' | 'remove') => {
    const eventFunctions = {
      end: this.handleEnd,
      move: this.handleMove,
      start: this.handleStart
    };
    switch (action) {
      case 'add':
        return Object.keys(eventFunctions).forEach(key =>
          EVENTS[key].forEach(
            (eventName: TouchEventTypes | MouseEventTypes) =>
              this.container &&
              on(this.container, eventName, eventFunctions[key], { passive: false })
          )
        );
      case 'remove':
        return Object.keys(eventFunctions).forEach(key =>
          EVENTS[key].forEach(
            (eventName: TouchEventTypes | MouseEventTypes) =>
              this.container && off(this.container, eventName, eventFunctions[key])
          )
        );
    }
  };

  handleStart = (event: TouchEvent | MouseEvent) => {
    const { sortable, pressDelay } = this.props;
    const targetNode = event.target instanceof Element && event.target;
    const node = closest(event.target, el => !!el.sortableInfo);
    if (
      targetNode &&
      //is sortable
      sortable &&
      //is list item
      node &&
      node.sortableInfo &&
      !node.sortableInfo.disabled &&
      //is not secondary button pressed
      event.button !== 2 &&
      //is this list
      node.sortableInfo.manager === this.manager &&
      //excludes interactive elements
      node instanceof Element &&
      !node.contains(
        closest(
          targetNode,
          el => interactiveElements.includes(el.tagName) || el.contentEditable === 'true'
        )
      ) &&
      //is not sorting
      !this.sorting
    ) {
      const { index, collection } = node.sortableInfo;
      this.touched = true;
      this.position = getPosition(event);
      this.manager.active = { collection, index };

      /*
       * Fixes a bug in Firefox where the :active state of anchor tags
       * prevent subsequent 'mousemove' events from being fired
       */
      if (
        !_.get(event, ['touches', 'length']) &&
        !_.get(event, ['changedTouches', 'length']) &&
        event.target instanceof Element &&
        event.target.tagName === NodeType.Anchor
      ) {
        event.preventDefault();
      }

      if (pressDelay === 0) {
        this.handlePress(event);
      } else {
        this.pressTimer = setTimeout(() => this.handlePress(event), pressDelay);
      }
    }
  };

  handleMove = (event: TouchEvent | MouseEvent) => {
    const { pressThreshold } = this.props;

    if (!this.sorting && this.touched) {
      const position = getPosition(event);
      const delta = {
        x: this.position.x - _.get(position, 'x', 0),
        y: this.position.y - _.get(position, 'y', 0)
      };
      const combinedDelta = Math.abs(+delta.x) + Math.abs(+delta.y);
      if (!pressThreshold || combinedDelta >= pressThreshold) {
        clearTimeout(this.cancelTimer);
        this.cancelTimer = setTimeout(this.cancel, 0);
      }
    }
  };

  handleEnd = () => {
    this.touched = false;
    this.cancel();
  };

  cancel = () => {
    if (!this.sorting) {
      clearTimeout(this.pressTimer);
      this.manager.active = null;
    }
  };

  handlePress = async (event: TouchEvent | MouseEvent) => {
    const active = this.manager.getActive();

    if (!active) {
      return;
    }
    const { classPrefix, onSortStart } = this.props;
    const { node, collection } = active;
    const { index } = node.sortableInfo;
    const addItemPrefix = prefix(classPrefix + '-item');
    const style = window.getComputedStyle(node);
    const margin = {
      bottom: parseFloat(style.marginBottom),
      left: parseFloat(style.marginLeft),
      right: parseFloat(style.marginRight),
      top: parseFloat(style.marginTop)
    };
    const dimensions = {
      height: node.offsetHeight,
      width: node.offsetWidth
    };
    this.node = node;
    this.margin = margin;
    this.width = dimensions.width;
    this.height = dimensions.height;
    this.marginOffset = {
      x: this.margin.left + this.margin.right,
      y: Math.max(this.margin.top, this.margin.bottom)
    };
    this.boundingClientRect = node.getBoundingClientRect();
    this.containerBoundingRect = this.scrollContainer.getBoundingClientRect();
    this.index = index;
    this.newIndex = index;
    this.offsetEdge = getEdgeOffset(node, this.container);
    this.initialOffset = getPosition(event);
    this.initialScroll = {
      left: this.scrollContainer.scrollLeft,
      top: this.scrollContainer.scrollTop
    };
    this.initialWindowScroll = {
      left: window.pageXOffset,
      top: window.pageYOffset
    };
    this.helper = document.body && document.body.appendChild(node.cloneNode(true));
    this.helper && this.helper.classList.add(addItemPrefix('helper'));
    setInlineStyles(this.helper, {
      width: `${this.width}px`,
      height: `${this.height}px`,
      position: 'fixed',
      left: `${this.boundingClientRect.left - margin.left}px`,
      top: `${this.boundingClientRect.top - margin.top}px`
    });
    this.sortableGhost = node;
    node.classList.add(addItemPrefix('holder'));
    this.minTranslate = {};
    this.maxTranslate = {};
    this.minTranslate.y =
      this.containerBoundingRect.top - this.boundingClientRect.top - this.height / 2;
    this.maxTranslate.y =
      this.containerBoundingRect.top +
      this.containerBoundingRect.height -
      this.boundingClientRect.top -
      this.height / 2;
    this.listenerNode = event.touches ? node : window;
    EVENTS.move.forEach((eventName: TouchEventTypes | MouseEventTypes) =>
      on(this.listenerNode, eventName, this.handleSortMove, { passive: false })
    );
    EVENTS.end.forEach((eventName: TouchEventTypes | MouseEventTypes) =>
      on(this.listenerNode, eventName, this.handleSortEnd, { passive: false })
    );
    this.sorting = true;

    if (onSortStart) {
      onSortStart({ collection, index, node }, event);
    }
  };

  handleSortMove = (event: TouchEvent | MouseEvent) => {
    const { onSortMove } = this.props;

    // Prevent scrolling on mobile
    event.preventDefault();

    this.updateHelperPosition(event);
    this.animateNodes();
    this.autoScroll();

    if (onSortMove) {
      onSortMove(event);
    }
  };

  handleSortEnd = (event: TouchEvent | MouseEvent) => {
    const { onSortEnd, onSort, classPrefix, transitionDuration } = this.props;
    const ActiveCollection = _.get(this.manager, ['active', 'collection'], null);
    const nodes = this.manager.refs[ActiveCollection];
    const addItemPrefix = prefix(classPrefix + '-item');

    // Remove the event listeners if the node is still in the DOM
    if (this.listenerNode) {
      EVENTS.move.forEach((eventName: TouchEventTypes | MouseEventTypes) =>
        off(this.listenerNode, eventName, this.handleSortMove)
      );
      EVENTS.end.forEach((eventName: TouchEventTypes | MouseEventTypes) =>
        off(this.listenerNode, eventName, this.handleSortEnd)
      );
    }

    setTranslate3d(this.helper, this.holderTranslate);
    setTransitionDuration(this.helper, transitionDuration);

    // wait for animation
    setTimeout(() => {
      // Remove the helper from the DOM
      if (this.helper) {
        this.helper.parentNode && this.helper.parentNode.removeChild(this.helper);
        this.helper = null;
      }

      if (this.sortableGhost) {
        this.sortableGhost.classList.remove(addItemPrefix('holder'));
        setTranslate3d(this.sortableGhost, null);
        this.animatedNodeOffset = [];
      }

      for (let i = 0, len = nodes.length; i < len; i++) {
        const node = nodes[i];
        const el = node.node;

        // Clear the cached offsetTop / offsetLeft value
        node.edgeOffset = null;

        // Remove the transforms / transitions
        setTranslate3d(el, null);
        setTransitionDuration(el, null);
      }

      // Stop autoScroll
      this.autoScroller.clear();

      // Update manager state
      this.manager.active = null;
      this.sorting = false;

      if (typeof onSortEnd === 'function') {
        onSortEnd(
          {
            collection: ActiveCollection,
            newIndex: this.newIndex,
            oldIndex: this.index
          },
          event
        );
      }
      if (typeof onSort === 'function') {
        onSort(
          {
            collection: ActiveCollection,
            newIndex: this.newIndex,
            oldIndex: this.index
          },
          event
        );
      }
      this.touched = false;
    }, transitionDuration);
  };

  updateHelperPosition(event) {
    const offset = getPosition(event);
    const translate = {
      x: _.get(offset, 'x', 0) - this.initialOffset.x,
      y: _.get(offset, 'y', 0) - this.initialOffset.y
    };

    // Adjust for window scroll
    translate.y -= window.pageYOffset - (this.initialWindowScroll.top || 0);
    translate.x -= window.pageXOffset - (this.initialWindowScroll.left || 0);

    this.translate = translate;

    setTranslate3d(this.helper, translate);
  }

  animateNodes() {
    const { transitionDuration, onSortOver } = this.props;
    const { containerScrollDelta, windowScrollDelta } = this;
    const nodes = this.manager.getOrderedRefs();
    const sortingOffset = {
      left: this.offsetEdge.left + this.translate.x + containerScrollDelta.left,
      top: this.offsetEdge.top + this.translate.y + containerScrollDelta.top
    };

    const prevIndex = this.newIndex;
    this.newIndex = -1;

    for (let i = 0, len = nodes.length; i < len; i++) {
      const { node } = nodes[i];
      const { index } = node.sortableInfo;
      const width = node.offsetWidth;
      const height = node.offsetHeight;
      const offset = {
        height: this.height > height ? height / 2 : this.height / 2,
        width: this.width > width ? width / 2 : this.width / 2
      };

      const translate: Axis = {
        x: 0,
        y: 0
      };
      let { edgeOffset } = nodes[i];

      // If we haven't cached the node's offsetTop / offsetLeft value
      if (!edgeOffset) {
        edgeOffset = getEdgeOffset(node, this.container);
        nodes[i].edgeOffset = edgeOffset;
      }

      // Get a reference to the next and previous node
      const nextNode = i < nodes.length - 1 && nodes[i + 1];

      // Also cache the next node's edge offset if needed.
      // We need this for calculating the animation in a grid setup
      if (nextNode && !nextNode.edgeOffset) {
        nextNode.edgeOffset = getEdgeOffset(nextNode.node, this.container);
      }

      // If the node is the one we're currently animating, skip it
      if (index === this.index) {
        continue;
      }

      setTransitionDuration(node, transitionDuration);
      const offsetY = this.height + this.marginOffset.y;
      const distanceTop = sortingOffset.top + windowScrollDelta.top;

      if (index > this.index && distanceTop + offset.height >= edgeOffset.top) {
        translate.y = -offsetY;
        this.newIndex = index;
      } else if (index < this.index && distanceTop <= edgeOffset.top + offset.height) {
        translate.y = offsetY;
        if (this.newIndex === -1) {
          this.newIndex = index;
        }
      }

      setTranslate3d(node, translate);

      // translate holder
      this.animatedNodeOffset[index] = translate;
      setTranslate3d(this.sortableGhost, this.holderTranslate);
    }

    if (this.newIndex === -1) {
      this.newIndex = this.index;
    }

    if (onSortOver && this.newIndex !== prevIndex) {
      onSortOver({
        collection: _.get(this.manager, ['active', 'collection']),
        index: this.index,
        newIndex: this.newIndex,
        oldIndex: prevIndex
      });
    }
  }

  autoScroll = () => {
    const { autoScroll } = this.props;

    if (!autoScroll) {
      return;
    }

    this.autoScroller.update({
      height: this.height,
      maxTranslate: this.maxTranslate,
      minTranslate: this.minTranslate,
      translate: this.translate,
      width: this.width
    });
  };

  onAutoScroll = offset => {
    this.translate.x += offset.left;
    this.translate.y += offset.top;

    this.animateNodes();
  };

  get containerScrollDelta(): Position {
    return {
      left: this.scrollContainer.scrollLeft - (this.initialScroll.left || 0),
      top: this.scrollContainer.scrollTop - (this.initialScroll.top || 0)
    };
  }

  get windowScrollDelta(): Position {
    return {
      left: window.pageXOffset - (this.initialWindowScroll.left || 0),
      top: window.pageYOffset - (this.initialWindowScroll.top || 0)
    };
  }

  get holderTranslate(): Axis {
    let translateX = 0;
    let translateY = 0;
    this.animatedNodeOffset.forEach(({ x, y }: Axis, index) => {
      const nodeItems = this.manager.getOrderedRefs();
      const nodeItem = nodeItems.find(
        nodeInfo => _.get(nodeInfo, ['node', 'sortableInfo', 'index']) === index
      );
      const node = _.get(nodeItem, 'node');
      if (!nodeItem || !node) {
        return;
      }
      const style = window.getComputedStyle(node);
      const margin = {
        bottom: parseFloat(style.marginBottom),
        left: parseFloat(style.marginLeft),
        right: parseFloat(style.marginRight),
        top: parseFloat(style.marginTop)
      };
      const marginOffset = {
        x: margin.left + margin.right,
        y: Math.max(margin.top, margin.bottom)
      };
      if (!nodeItem.edgeOffset) {
        nodeItem.edgeOffset = getEdgeOffset(node, this.container);
      }
      const offsetX = node.offsetWidth + marginOffset.x;
      const offsetY = node.offsetHeight + marginOffset.y;

      if (x) {
        translateX += +x / Math.abs(+x) * offsetX;
      }
      if (y) {
        translateY += +y / Math.abs(+y) * offsetY;
      }
    });
    return {
      x: (this.initialScroll.left || 0) - this.scrollContainer.scrollLeft - translateX,
      y: (this.initialScroll.top || 0) - this.scrollContainer.scrollTop - translateY
    };
  }

  render() {
    const {
      className,
      classPrefix,
      bordered,
      hover,
      size,
      sortable,
      children,
      ...rest
    } = this.props;
    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(List, rest);
    const classes = classNames(classPrefix, className, {
      [addPrefix('bordered')]: bordered,
      [addPrefix('sortable')]: sortable,
      [addPrefix('sorting')]: this.sorting,
      [addPrefix('hover')]: hover
    });
    const contextValue: Context = {
      bordered,
      size,
      manager: this.manager
    };
    return (
      <Provider value={contextValue}>
        <div ref={ref => (this.container = ref)} className={classes} {...unhandled}>
          {children}
        </div>
      </Provider>
    );
  }
}

const EnhancedList = defaultProps({
  classPrefix: 'list'
})(List);

setStatic('Item', ListItem)(EnhancedList);
const Component: EnhancedList = setDisplayName('List')(EnhancedList);

export default Component;
