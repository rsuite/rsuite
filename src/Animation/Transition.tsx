import * as React from 'react';
import PropTypes from 'prop-types';
import { on, transition } from 'dom-lib';
import classNames from 'classnames';
import getUnhandledProps from '../utils/getUnhandledProps';
import getDOMNode from '../utils/getDOMNode';
import getAnimationEnd from './getAnimationEnd';

import { TransitionProps } from './Animation.d';
import { animationPropTypes } from './propTypes';

export const UNMOUNTED = 0;
export const EXITED = 1;
export const ENTERING = 2;
export const ENTERED = 3;
export const EXITING = 4;

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

class Transition extends React.Component<TransitionProps, TransitionState> {
  static propTypes = transitionPropTypes;
  static displayName = 'Transition';
  static defaultProps = {
    timeout: 1000
  };

  animationEventListener = null;
  instanceElement = null;
  nextCallback: any = null;
  needsUpdate = null;
  childRef: React.RefObject<any>;

  constructor(props: TransitionProps) {
    super(props);

    let initialStatus: number;
    if (props.in) {
      initialStatus = props.transitionAppear ? EXITED : ENTERED;
    } else {
      initialStatus = props.unmountOnExit ? UNMOUNTED : EXITED;
    }

    this.state = {
      status: initialStatus
    };

    this.nextCallback = null;
    this.childRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps: TransitionProps, prevState: TransitionState) {
    if (nextProps.in && nextProps.unmountOnExit) {
      if (prevState.status === UNMOUNTED) {
        // Start enter transition in componentDidUpdate.
        return { status: EXITED };
      }
    }
    return null;
  }

  componentDidMount() {
    if (this.props.transitionAppear && this.props.in) {
      this.performEnter(this.props);
    }
  }

  getSnapshotBeforeUpdate() {
    if (!this.props.in || !this.props.unmountOnExit) {
      this.needsUpdate = true;
    }
    return null;
  }

  componentDidUpdate() {
    const { status } = this.state;
    const { unmountOnExit } = this.props;

    if (unmountOnExit && status === EXITED) {
      if (this.props.in) {
        this.performEnter(this.props);
      } else {
        if (this.instanceElement) {
          this.setState({ status: UNMOUNTED });
        }
      }
      return;
    }

    if (this.needsUpdate) {
      this.needsUpdate = false;

      if (this.props.in) {
        if (status === EXITING || status === EXITED) {
          this.performEnter(this.props);
        }
      } else if (status === ENTERING || status === ENTERED) {
        this.performExit(this.props);
      }
    }
  }

  componentWillUnmount() {
    this.cancelNextCallback();
    this.instanceElement = null;
  }

  onTransitionEnd(node: React.ReactNode, handler: React.AnimationEventHandler) {
    this.setNextCallback(handler);

    this.animationEventListener?.off();

    if (node) {
      const { timeout, animation } = this.props;
      this.animationEventListener = on(
        node,
        animation ? getAnimationEnd() : transition.end,
        this.nextCallback
      );
      if (timeout !== null) {
        setTimeout(this.nextCallback, timeout);
      }
    } else {
      setTimeout(this.nextCallback, 0);
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

    this.safeSetState({ status: ENTERING }, () => {
      onEntering?.(node);
      this.onTransitionEnd(node, () => {
        this.safeSetState({ status: ENTERED }, () => {
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

    this.safeSetState({ status: EXITING }, () => {
      onExiting?.(node);

      this.onTransitionEnd(node, () => {
        this.safeSetState({ status: EXITED }, () => {
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

    if (status === UNMOUNTED) {
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

    const childProps = getUnhandledProps(Transition, rest);

    let transitionClassName;
    if (status === EXITED) {
      transitionClassName = exitedClassName;
    } else if (status === ENTERING) {
      transitionClassName = enteringClassName;
    } else if (status === ENTERED) {
      transitionClassName = enteredClassName;
    } else if (status === EXITING) {
      transitionClassName = exitingClassName;
    }

    if (typeof children === 'function') {
      return children(
        {
          ...childProps,
          className: classNames(className, transitionClassName)
        },
        this.childRef
      );
    }

    const child = React.Children.only(children) as React.DetailedReactHTMLElement<any, HTMLElement>;

    return React.cloneElement(child, {
      ...childProps,
      className: classNames(child.props.className, className, transitionClassName)
    });
  }
}

export default Transition;
