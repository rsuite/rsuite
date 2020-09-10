import * as React from 'react';
import PropTypes from 'prop-types';
import { setStatic } from 'recompose';
import classNames from 'classnames';
import { on } from 'dom-lib';
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
import { ListProps } from './List.d';
import Manager from './Manager';
import AutoScroller from './AutoScroller';
import ListContext from './ListContext';

const NodeType = {
  Canvas: 'CANVAS',
  Anchor: 'A',
  Button: 'BUTTON',
  Input: 'INPUT',
  Option: 'OPTION',
  Textarea: 'TEXTAREA',
  Select: 'SELECT'
};
const interactiveElements = [
  NodeType.Anchor,
  NodeType.Button,
  NodeType.Input,
  NodeType.Option,
  NodeType.Textarea,
  NodeType.Select
];

export interface Axis {
  x?: number;
  y?: number;
}

export interface Position {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

interface State {
  sorting: boolean;
  manager: Manager;
}

interface Context {
  bordered?: boolean;
  size?: 'lg' | 'md' | 'sm';
  manager?: Manager;
}

class List extends React.Component<ListProps, State> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    bordered: PropTypes.bool,
    hover: PropTypes.bool,
    sortable: PropTypes.bool,
    size: PropTypes.oneOf(['lg', 'md', 'sm']),
    autoScroll: PropTypes.bool,
    pressDelay: PropTypes.number,
    transitionDuration: PropTypes.number,
    onSortStart: PropTypes.func,
    onSortMove: PropTypes.func,
    onSortEnd: PropTypes.func,
    onSort: PropTypes.func
  };
  static defaultProps = {
    size: 'md',
    autoScroll: true,
    pressDelay: 0,
    transitionDuration: 300
  };

  state = {
    sorting: false,
    manager: new Manager()
  };
  // actionEnv
  containerRef = React.createRef<HTMLElement>();
  containerBoundingRect: ClientRect;
  touched: boolean;
  scrollContainer: HTMLElement;
  scrollContainerInitialScroll: Position;
  autoScroller: AutoScroller;
  windowInitialScroll: Position;
  animatedNodeOffset: Axis[] = [];
  // activeNode
  activeNodeBoundingClientRect: ClientRect;
  activeNodeGhost: HTMLElement; // Placeholder
  activeNodeFlowBody: HTMLElement; // flow block follow cursor
  activeNodeFlowBodyTranslate: Axis;
  activeNodeMarginOffset: Axis;
  activeNodeOffsetEdge: Position;
  activeNodeOldIndex: number;
  activeNodeNextIndex: number;
  activeNodeTranslateMin: Axis;
  activeNodeTranslateMax: Axis;
  // events
  windowStartListener: { off: Function };
  windowEndListener: { off: Function };
  sortMouseMoveListener: { off: Function };
  sortMouseEndListener: { off: Function };
  cursorInitialOffset: Axis;
  cursorCurrentPosition: Axis;
  pressTimer: NodeJS.Timeout;

  componentDidMount() {
    if (this.containerRef.current instanceof HTMLElement) {
      this.scrollContainer =
        getScrollingParent(this.containerRef.current) || this.containerRef.current;
      this.autoScroller = new AutoScroller(this.scrollContainer, (offset: Position) => {
        this.activeNodeFlowBodyTranslate.x += offset.left;
        this.activeNodeFlowBodyTranslate.y += offset.top;
      });
      this.windowStartListener = on(this.containerRef.current, 'mousedown', this.handleStart, {
        passive: false
      });
      this.windowEndListener = on(this.containerRef.current, 'mouseup', this.handleEnd, {
        passive: false
      });
    }
  }

  componentWillUnmount() {
    this.windowStartListener?.off();
    this.windowEndListener?.off();
  }

  handleStart = (event: MouseEvent) => {
    const { sortable, pressDelay } = this.props;
    const { sorting, manager } = this.state;
    const node = closest(event.target, el => !!manager.getNodeManagerRef(el));
    const curManager = manager.getNodeManagerRef(node);
    if (!(event?.target && node instanceof HTMLElement && curManager)) {
      return;
    }
    const {
      info: { disabled, manager: curNodeManager }
    } = curManager;
    if (
      //is sortable
      sortable &&
      //is list item
      !disabled &&
      //is not secondary button pressed
      event.button !== 2 &&
      //is this list
      curNodeManager === manager &&
      //is not sorting
      !sorting &&
      //excludes interactive elements
      !node.contains(
        closest(
          event.target,
          el => interactiveElements.includes(el.tagName) || el.contentEditable === 'true'
        )
      )
    ) {
      event.preventDefault();
      this.touched = true;
      this.cursorCurrentPosition = getPosition(event);
      manager.setActive(curManager);
      this.pressTimer = setTimeout(() => this.handlePress(event), pressDelay);
    }
  };

  handleEnd = () => {
    const { sorting, manager } = this.state;
    this.touched = false;
    if (!sorting) {
      clearTimeout(this.pressTimer);
      manager.setActive(null);
    }
  };

  handlePress = async (event: MouseEvent) => {
    const { classPrefix, onSortStart } = this.props;
    const { manager } = this.state;
    const { node: activeNode, info } = manager.getActive();

    // return if no active node
    if (!activeNode || !info) {
      return;
    }

    const { index, collection } = info;
    const addItemPrefix = prefix(classPrefix + '-item');
    const style = window.getComputedStyle(activeNode);
    const activeNodeMargin = {
      bottom: parseFloat(style.marginBottom),
      left: parseFloat(style.marginLeft),
      right: parseFloat(style.marginRight),
      top: parseFloat(style.marginTop)
    };
    this.activeNodeMarginOffset = {
      x: activeNodeMargin.left + activeNodeMargin.right,
      y: Math.max(activeNodeMargin.top, activeNodeMargin.bottom)
    };
    this.activeNodeBoundingClientRect = activeNode.getBoundingClientRect();
    this.containerBoundingRect = this.scrollContainer.getBoundingClientRect();
    this.activeNodeOldIndex = index;
    this.activeNodeNextIndex = index;
    this.activeNodeOffsetEdge = getEdgeOffset(activeNode, this.containerRef.current);
    this.cursorInitialOffset = getPosition(event);
    this.scrollContainerInitialScroll = {
      left: this.scrollContainer.scrollLeft,
      top: this.scrollContainer.scrollTop
    };
    this.windowInitialScroll = {
      left: window.pageXOffset,
      top: window.pageYOffset
    };
    this.activeNodeFlowBody = document.body.appendChild(activeNode.cloneNode(true)) as HTMLElement;
    this.activeNodeFlowBody && this.activeNodeFlowBody.classList.add(addItemPrefix('helper'));
    setInlineStyles(this.activeNodeFlowBody, {
      position: 'fixed',
      width: `${this.activeNodeBoundingClientRect.width}px`,
      height: `${this.activeNodeBoundingClientRect.height}px`,
      left: `${this.activeNodeBoundingClientRect.left - activeNodeMargin.left}px`,
      top: `${this.activeNodeBoundingClientRect.top - activeNodeMargin.top}px`
    });
    this.activeNodeGhost = activeNode;
    activeNode.classList.add(addItemPrefix('holder'));
    this.activeNodeTranslateMin = {
      y:
        this.containerBoundingRect.top -
        this.activeNodeBoundingClientRect.top -
        this.activeNodeBoundingClientRect.height / 2
    };
    this.activeNodeTranslateMax = {
      y:
        this.containerBoundingRect.top +
        this.containerBoundingRect.height -
        this.activeNodeBoundingClientRect.top -
        this.activeNodeBoundingClientRect.height / 2
    };

    this.sortMouseMoveListener = on(window, 'mousemove', this.handleSortMove, { passive: false });
    this.sortMouseEndListener = on(window, 'mouseup', this.handleSortEnd, { passive: false });

    this.setState({ sorting: true });

    if (onSortStart) {
      onSortStart(
        {
          collection,
          node: activeNode,
          oldIndex: this.activeNodeOldIndex,
          newIndex: this.activeNodeNextIndex
        },
        event
      );
    }
  };

  handleSortMove = (event: MouseEvent) => {
    const { onSortMove, autoScroll } = this.props;
    const { manager } = this.state;

    // Update helper position
    const offset = getPosition(event);
    const translate = {
      x: offset.x - this.cursorInitialOffset.x,
      y: offset.y - this.cursorInitialOffset.y
    };
    // Adjust for window scroll
    translate.x -= window.pageXOffset - this.windowInitialScroll.left;
    translate.y -= window.pageYOffset - this.windowInitialScroll.top;
    this.activeNodeFlowBodyTranslate = translate;
    setTranslate3d(this.activeNodeFlowBody, translate);
    this.animateNodes();
    // auto scroll
    if (autoScroll) {
      this.autoScroller.update({
        width: this.activeNodeBoundingClientRect.width,
        height: this.activeNodeBoundingClientRect.height,
        translate: this.activeNodeFlowBodyTranslate,
        maxTranslate: this.activeNodeTranslateMax,
        minTranslate: this.activeNodeTranslateMin
      });
    }

    if (onSortMove) {
      onSortMove(
        {
          collection: manager.getActive().info.collection,
          node: manager.getActive().node,
          oldIndex: this.activeNodeOldIndex,
          newIndex: this.activeNodeNextIndex
        },
        event
      );
    }
  };

  handleSortEnd = (event: MouseEvent) => {
    const { onSortEnd, onSort, classPrefix, transitionDuration } = this.props;
    const { manager } = this.state;
    const activeManagerRef = manager.getActive();
    const activeCollection = activeManagerRef ? activeManagerRef.info.collection : 0;
    const managerRefs = manager.getOrderedRefs(activeCollection);
    const addItemPrefix = prefix(classPrefix + '-item');

    // Remove the event listeners
    this.sortMouseMoveListener.off();
    this.sortMouseEndListener.off();

    setTransitionDuration(this.activeNodeFlowBody, transitionDuration);
    setTranslate3d(this.activeNodeFlowBody, {
      x: this.holderTranslate.x - this.containerScrollDelta.left,
      y: this.holderTranslate.y - this.containerScrollDelta.top
    });

    // wait for animation
    setTimeout(() => {
      // Remove the helper from the DOM
      if (this.activeNodeFlowBody) {
        this.activeNodeFlowBody.parentNode &&
          this.activeNodeFlowBody.parentNode.removeChild(this.activeNodeFlowBody);
        this.activeNodeFlowBody = null;
      }

      if (this.activeNodeGhost) {
        this.activeNodeGhost.classList.remove(addItemPrefix('holder'));
        setTranslate3d(this.activeNodeGhost, null);
        this.animatedNodeOffset = [];
      }

      for (let i = 0, len = managerRefs.length; i < len; i++) {
        const managerRef = managerRefs[i];
        const el = managerRef.node;

        // Clear the cached offsetTop / offsetLeft value
        managerRef.edgeOffset = null;
        // Remove the transforms / transitions
        setTranslate3d(el, null);
        setTransitionDuration(el, null);
      }

      // Stop autoScroll
      this.autoScroller.clear();

      // Update manager state
      manager.setActive(null);
      this.setState({ sorting: false });

      if (typeof onSortEnd === 'function') {
        onSortEnd(
          {
            collection: activeCollection,
            node: activeManagerRef.node,
            newIndex: this.activeNodeNextIndex,
            oldIndex: this.activeNodeOldIndex
          },
          event
        );
      }
      if (typeof onSort === 'function') {
        onSort(
          {
            collection: activeCollection,
            node: activeManagerRef.node,
            newIndex: this.activeNodeNextIndex,
            oldIndex: this.activeNodeOldIndex
          },
          event
        );
      }
    }, transitionDuration);
  };

  animateNodes() {
    const { transitionDuration } = this.props;
    const { manager } = this.state;
    const listItemManagerRefs = manager.getOrderedRefs();
    const sortingOffset: Position = {
      left:
        this.activeNodeOffsetEdge.left +
        this.activeNodeFlowBodyTranslate.x +
        this.containerScrollDelta.left,
      top:
        this.activeNodeOffsetEdge.top +
        this.activeNodeFlowBodyTranslate.y +
        this.containerScrollDelta.top
    };
    this.activeNodeNextIndex = -1;
    for (let i = 0, len = listItemManagerRefs.length; i < len; i++) {
      const {
        node,
        info: { index },
        edgeOffset
      } = listItemManagerRefs[i];
      const width = node.offsetWidth;
      const height = node.offsetHeight;
      const offset = {
        height:
          this.activeNodeBoundingClientRect.height > height
            ? height / 2
            : this.activeNodeBoundingClientRect.height / 2,
        width:
          this.activeNodeBoundingClientRect.width > width
            ? width / 2
            : this.activeNodeBoundingClientRect.width / 2
      };

      const translate: Axis = {
        x: 0,
        y: 0
      };

      // If we haven't cached the node's offsetTop / offsetLeft value
      const curEdgeOffset = edgeOffset || getEdgeOffset(node, this.containerRef.current);
      listItemManagerRefs[i].edgeOffset = curEdgeOffset;

      // Get a reference to the next node
      const prvNode = i > 0 && listItemManagerRefs[i - 1];
      const nextNode = i < len - 1 && listItemManagerRefs[i + 1];

      // Also cache the node's edge offset if needed.
      if (prvNode && !prvNode.edgeOffset) {
        prvNode.edgeOffset = getEdgeOffset(prvNode.node, this.containerRef.current);
      }
      if (nextNode && !nextNode.edgeOffset) {
        nextNode.edgeOffset = getEdgeOffset(nextNode.node, this.containerRef.current);
      }

      // If the node is the one we're currently animating, skip it
      if (index === this.activeNodeOldIndex) {
        continue;
      }

      const distanceTop = sortingOffset.top + this.windowScrollDelta.top;
      if (
        prvNode &&
        index > this.activeNodeOldIndex &&
        distanceTop + offset.height >= curEdgeOffset.top
      ) {
        translate.y = prvNode.edgeOffset.top - curEdgeOffset.top;
        this.activeNodeNextIndex = index;
      } else if (
        nextNode &&
        index < this.activeNodeOldIndex &&
        distanceTop <= curEdgeOffset.top + offset.height
      ) {
        translate.y = nextNode.edgeOffset.top - curEdgeOffset.top;
        if (this.activeNodeNextIndex === -1) {
          this.activeNodeNextIndex = index;
        }
      }

      setTransitionDuration(node, transitionDuration);
      setTranslate3d(node, translate);

      // translate holder
      this.animatedNodeOffset[index] = translate;
      setTranslate3d(this.activeNodeGhost, this.holderTranslate);
    }

    if (this.activeNodeNextIndex === -1) {
      this.activeNodeNextIndex = this.activeNodeOldIndex;
    }
  }

  get containerScrollDelta(): Position {
    return {
      left: this.scrollContainer.scrollLeft - this.scrollContainerInitialScroll.left,
      top: this.scrollContainer.scrollTop - this.scrollContainerInitialScroll.top
    };
  }

  get windowScrollDelta(): Position {
    return {
      left: window.pageXOffset - this.windowInitialScroll.left,
      top: window.pageYOffset - this.windowInitialScroll.top
    };
  }

  get holderTranslate(): Axis {
    return this.animatedNodeOffset.reduce(
      (acc, item) => ({
        x: acc.x - item.x,
        y: acc.y - item.y
      }),
      { x: 0, y: 0 }
    );
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
    const { sorting, manager } = this.state;
    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(List, rest);
    const classes = classNames(classPrefix, className, {
      [addPrefix('bordered')]: bordered,
      [addPrefix('sortable')]: sortable,
      [addPrefix('sorting')]: sorting,
      [addPrefix('hover')]: hover
    });
    const contextValue: Context = {
      bordered,
      size,
      manager
    };
    return (
      <ListContext.Provider value={contextValue}>
        <div ref={this.containerRef} className={classes} {...unhandled}>
          {children}
        </div>
      </ListContext.Provider>
    );
  }
}

const EnhancedList = defaultProps({
  classPrefix: 'list'
})(List);

setStatic('Item', ListItem)(EnhancedList);

export default EnhancedList;
