import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { ownerDocument, getContainer, on } from 'dom-lib';
import positionUtils from './positionUtils';
import shallowEqual from '../utils/shallowEqual';
import getDOMNode from '../utils/getDOMNode';
import { TypeAttributes } from '../@types/common';

interface PositionProps {
  children?: React.ReactNode;
  className?: string;
  target?: (props: PositionProps) => HTMLElement;
  container?: HTMLElement | (() => HTMLElement);
  containerPadding?: number;
  placement?: TypeAttributes.Placement;
  shouldUpdatePosition?: boolean;
  preventOverflow?: boolean;
}

interface PositionState {
  positionLeft?: number;
  positionTop?: number;
  arrowOffsetLeft?: null | number;
  arrowOffsetTop?: null | number;
  positionClassName?: string;
}

class Position extends React.Component<PositionProps, PositionState> {
  static displayName = 'Position';
  static defaultProps = {
    containerPadding: 0,
    placement: 'right',
    shouldUpdatePosition: false
  };

  utils = null;
  lastTarget: any = false;
  needsFlush = null;
  container = null;
  containerScrollListener = null;
  childRef: React.RefObject<any>;

  constructor(props: PositionProps) {
    super(props);
    this.state = {
      positionLeft: 0,
      positionTop: 0,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };
    this.utils = positionUtils({
      placement: props.placement,
      preventOverflow: props.preventOverflow,
      padding: props.containerPadding
    });
    this.childRef = React.createRef();
  }

  getHTMLElement() {
    /**
     * findDOMNode is deprecated in StrictMode.
     * Replace findDOMNode with ref. Provided for `Transition` calls.
     * https://fb.me/react-strict-mode-find-node
     */
    return getDOMNode(this.childRef.current);
  }

  componentDidMount() {
    this.updatePosition(false);
    if (this.container && this.props.preventOverflow) {
      this.containerScrollListener = on(
        this.container.tagName === 'BODY' ? window : this.container,
        'scroll',
        this.updatePosition
      );
    }
  }

  shouldComponentUpdate(nextProps: PositionProps, nextState: PositionState) {
    if (!shallowEqual(nextProps, this.props)) {
      this.needsFlush = true;
      return true;
    }

    if (!shallowEqual(nextState, this.state)) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps: PositionProps) {
    if (this.needsFlush) {
      this.needsFlush = false;
      this.updatePosition(prevProps.placement !== this.props.placement);
    }
  }

  componentWillUnmount() {
    this.lastTarget = null;
    this.containerScrollListener?.off();
  }

  getTargetSafe() {
    const { target } = this.props;
    if (!target) {
      return null;
    }

    const targetSafe = target(this.props);

    if (!targetSafe) {
      return null;
    }

    return targetSafe;
  }

  updatePosition = (placementChanged = true) => {
    const target = this.getTargetSafe();
    const { shouldUpdatePosition } = this.props;

    /**
     * 如果 target 没有变化，同时不允许更新位置，placement 位置也没有改变，则返回
     */
    if (target === this.lastTarget && !shouldUpdatePosition && !placementChanged) {
      return;
    }

    this.lastTarget = target;

    if (!target) {
      this.setState({
        positionLeft: 0,
        positionTop: 0,
        arrowOffsetLeft: null,
        arrowOffsetTop: null
      });
      return;
    }

    const overlay = getDOMNode(this);
    const container = getContainer(this.props.container, ownerDocument(this).body);
    const nextPosition = this.utils.calcOverlayPosition(overlay, target, container);

    this.container = container;
    this.setState(nextPosition);
  };

  render() {
    const { children, className, ...rest } = this.props;
    const { positionLeft, positionTop, positionClassName, ...arrowPosition } = this.state;

    if (typeof children === 'function') {
      return children(
        {
          className: classNames(className, positionClassName),
          left: positionLeft,
          top: positionTop
        },
        this.childRef
      );
    }

    const child = React.Children.only(children) as React.DetailedReactHTMLElement<any, HTMLElement>;

    return React.cloneElement(child, {
      ..._.omit(rest, ['target', 'container', 'containerPadding', 'preventOverflow']),
      ...arrowPosition,
      positionLeft,
      positionTop,
      className: classNames(className, positionClassName, child.props.className),
      htmlElementRef: this.childRef,
      style: {
        ...child.props.style,
        left: positionLeft,
        top: positionTop
      }
    });
  }
}

export default Position;
