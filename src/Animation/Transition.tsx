import React from 'react';
import PropTypes from 'prop-types';
import getTransitionEnd from 'dom-lib/getTransitionEnd';
import on from 'dom-lib/on';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import { getDOMNode } from '../utils';
import { AnimationEventProps } from '../@types/common';
import { getAnimationEnd, animationPropTypes } from './utils';

export enum STATUS {
  UNMOUNTED = 0,
  EXITED = 1,
  ENTERING = 2,
  ENTERED = 3,
  EXITING = 4
}

export interface TransitionProps extends AnimationEventProps {
  animation?: boolean;

  /** Primary content */
  children?: ((props: any, ref: React.Ref<any>) => React.ReactNode) | React.ReactNode;

  /** Additional classes */
  className?: string;

  /** Show the component; triggers the enter or exit animation */
  in?: boolean;

  /** Unmount the component (remove it from the DOM) when it is not shown */
  unmountOnExit?: boolean;

  /** Run the enter animation when the component mounts, if it is initially shown */
  transitionAppear?: boolean;

  /** A Timeout for the animation */
  timeout?: number;

  /** CSS class or classes applied when the component is exited */
  exitedClassName?: string;

  /** CSS class or classes applied while the component is exiting */
  exitingClassName?: string;

  /** CSS class or classes applied when the component is entered */
  enteredClassName?: string;

  /** CSS class or classes applied while the component is entering */
  enteringClassName?: string;
}

interface TransitionState {
  status?: number;
}

export const transitionPropTypes = {
  ...animationPropTypes,
  animation: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  in: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  transitionAppear: PropTypes.bool,
  timeout: PropTypes.number,

  exitedClassName: PropTypes.string,
  exitingClassName: PropTypes.string,
  enteredClassName: PropTypes.string,
  enteringClassName: PropTypes.string
};

type EventToken = { off: () => void };

class Transition extends React.Component<TransitionProps, TransitionState> {
  static propTypes = transitionPropTypes;
  static displayName = 'Transition';
  static defaultProps = {
    timeout: 1000
  };

  animationEventListener: EventToken | null = null;
  instanceElement = null;
  nextCallback: React.AnimationEventHandler | null = null;
  needsUpdate: boolean | null = null;
  childRef: React.RefObject<any>;

  constructor(props: TransitionProps) {
    super(props);

    let initialStatus: number;
    if (props.in) {
      initialStatus = props.transitionAppear ? STATUS.EXITED : STATUS.ENTERED;
    } else {
      initialStatus = props.unmountOnExit ? STATUS.UNMOUNTED : STATUS.EXITED;
    }

    this.state = {
      status: initialStatus
    };

    this.nextCallback = null;
    this.childRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps: TransitionProps, prevState: TransitionState) {
    if (nextProps.in && nextProps.unmountOnExit) {
      if (prevState.status === STATUS.UNMOUNTED) {
        // Start enter transition in componentDidUpdate.
        return { status: STATUS.EXITED };
      }
    }
    return null;
  }

  getSnapshotBeforeUpdate() {
    if (!this.props.in || !this.props.unmountOnExit) {
      this.needsUpdate = true;
    }
    return null;
  }

  componentDidMount() {
    if (this.props.transitionAppear && this.props.in) {
      this.performEnter(this.props);
    }
  }

  componentDidUpdate() {
    const { status } = this.state;
    const { unmountOnExit } = this.props;

    if (unmountOnExit && status === STATUS.EXITED) {
      if (this.props.in) {
        this.performEnter(this.props);
      } else {
        if (this.instanceElement) {
          this.setState({ status: STATUS.UNMOUNTED });
        }
      }
      return;
    }

    if (this.needsUpdate) {
      this.needsUpdate = false;

      if (this.props.in) {
        if (status === STATUS.EXITING || status === STATUS.EXITED) {
          this.performEnter(this.props);
        }
      } else if (status === STATUS.ENTERING || status === STATUS.ENTERED) {
        this.performExit(this.props);
      }
    }
  }

  componentWillUnmount() {
    this.cancelNextCallback();
    this.instanceElement = null;
  }

  onTransitionEnd(node: HTMLElement, handler: React.AnimationEventHandler) {
    this.setNextCallback(handler);

    this.animationEventListener?.off();

    if (node) {
      const { timeout, animation } = this.props;
      this.animationEventListener = on(
        node,
        animation ? getAnimationEnd() : getTransitionEnd(),
        this.nextCallback!
      );
      if (timeout !== null) {
        setTimeout(this.nextCallback!, timeout);
      }
    } else {
      setTimeout(this.nextCallback!, 0);
    }
  }

  setNextCallback(callback: React.AnimationEventHandler) {
    let active = true;

    this.nextCallback = (event?: React.AnimationEvent) => {
      if (!active) {
        return;
      }

      if (event) {
        if (this.instanceElement === event.target) {
          callback(event);
          active = false;
          this.nextCallback = null;
        }
        return;
      }

      callback(event);
      active = false;
      this.nextCallback = null;
    };

    this.nextCallback.cancel = () => {
      active = false;
    };

    return this.nextCallback;
  }
  getChildElement() {
    if (this.childRef.current) {
      return getDOMNode(this.childRef.current);
    }
    return getDOMNode(this);
  }

  performEnter(props: TransitionProps) {
    const { onEnter, onEntering, onEntered } = props || this.props;

    this.cancelNextCallback();
    const node = this.getChildElement();

    this.instanceElement = node;
    onEnter?.(node);

    this.safeSetState({ status: STATUS.ENTERING }, () => {
      onEntering?.(node);
      this.onTransitionEnd(node, () => {
        this.safeSetState({ status: STATUS.ENTERED }, () => {
          onEntered?.(node);
        });
      });
    });
  }

  performExit(props: TransitionProps) {
    const { onExit, onExiting, onExited } = props || this.props;

    this.cancelNextCallback();
    const node = this.getChildElement();

    this.instanceElement = node;
    onExit?.(node);

    this.safeSetState({ status: STATUS.EXITING }, () => {
      onExiting?.(node);

      this.onTransitionEnd(node, () => {
        this.safeSetState({ status: STATUS.EXITED }, () => {
          onExited?.(node);
        });
      });
    });
  }

  cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  }

  safeSetState(nextState: TransitionState, callback: React.AnimationEventHandler) {
    if (this.instanceElement) {
      this.setState(nextState, this.setNextCallback(callback));
    }
  }

  render() {
    const status = this.state.status;

    if (status === STATUS.UNMOUNTED) {
      return null;
    }

    const {
      children,
      className,
      exitedClassName,
      enteringClassName,
      enteredClassName,
      exitingClassName,
      ...rest
    } = this.props;

    const childProps: any = omit(rest, Object.keys(transitionPropTypes));

    let transitionClassName;
    if (status === STATUS.EXITED) {
      transitionClassName = exitedClassName;
    } else if (status === STATUS.ENTERING) {
      transitionClassName = enteringClassName;
    } else if (status === STATUS.ENTERED) {
      transitionClassName = enteredClassName;
    } else if (status === STATUS.EXITING) {
      transitionClassName = exitingClassName;
    }

    if (isFunction(children)) {
      childProps.className = classNames(className, transitionClassName);
      return children(childProps, this.childRef);
    }

    const child = React.Children.only(children) as React.DetailedReactHTMLElement<any, HTMLElement>;

    return React.cloneElement(child, {
      ...childProps,
      ref: this.childRef,
      className: classNames(className, child.props?.className, transitionClassName)
    });
  }
}

export default Transition;
