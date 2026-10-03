import React from 'react';
import on from 'dom-lib/on';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import { getDOMNode } from '@/internals/utils';
import { AnimationEventProps } from '@/internals/types';
import { CustomContext } from '@/internals/Provider/CustomContext';
import { getAnimationEnd, getTransitionEnd } from './utils';

export enum STATUS {
  UNMOUNTED = 0,
  EXITED = 1,
  ENTERING = 2,
  ENTERED = 3,
  EXITING = 4
}

export interface TransitionProps extends AnimationEventProps {
  animation?: boolean;

  /** Reduce motion; when omitted, use the provider setting or system preference. */
  reduceMotion?: boolean;

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
  systemReduceMotion: boolean;
  motionReduced: boolean;
}

type EventToken = { off: () => void };

const transitionProps = [
  'onEnter',
  'onEntering',
  'onEntered',
  'onExit',
  'onExiting',
  'onExited',
  'animation',
  'reduceMotion',
  'children',
  'className',
  'in',
  'unmountOnExit',
  'transitionAppear',
  'timeout',
  'exitedClassName',
  'exitingClassName',
  'enteredClassName',
  'enteringClassName'
];

/**
 * A Transition component for animation.
 * @see https://rsuitejs.com/components/animation/#transition
 */
class Transition extends React.Component<TransitionProps, TransitionState> {
  static displayName = 'Transition';
  static contextType = CustomContext;
  static defaultProps = {
    timeout: 1000
  };

  animationEventListener: EventToken | null = null;
  private transitionEndTimeout: ReturnType<typeof setTimeout> | null = null;
  private transitionEndCallback: (() => void) | null = null;
  private motionQuery: MediaQueryList | null = null;
  instanceElement: HTMLElement | null = null;
  nextCallback: {
    (event?: React.AnimationEvent): void;
    cancel: () => any;
  } | null = null;
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
      status: initialStatus,
      systemReduceMotion: false,
      motionReduced: props.reduceMotion === true
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

  getSnapshotBeforeUpdate(prevProps: TransitionProps) {
    if (prevProps.in !== this.props.in || !this.props.in || !this.props.unmountOnExit) {
      this.needsUpdate = true;
    }
    return null;
  }

  componentDidMount() {
    this.syncMotionQuery();
    this.finishReducedTransition();
    if (this.props.transitionAppear && this.props.in) {
      this.performEnter(this.props);
    }
  }

  componentDidUpdate() {
    this.syncMotionQuery();
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

    this.finishReducedTransition();
  }

  componentWillUnmount() {
    this.clearMotionQuery();
    this.cancelNextCallback();
    this.instanceElement = null;
  }

  onTransitionEnd(node: HTMLElement, handler: (event?: React.AnimationEvent) => void) {
    if (!this.instanceElement) {
      return;
    }

    this.clearTransitionEnd();
    const nextCallback = this.setNextCallback(event => {
      this.clearTransitionEnd();
      handler(event);
    });
    this.transitionEndCallback = nextCallback;

    if (this.isMotionReduced()) {
      nextCallback();
      return;
    }

    if (node) {
      const { timeout, animation } = this.props;
      this.animationEventListener = on(
        node,
        animation ? getAnimationEnd() : getTransitionEnd(),
        nextCallback
      );
      if (timeout !== null) {
        this.transitionEndTimeout = setTimeout(nextCallback, timeout);
      }
    } else {
      this.transitionEndTimeout = setTimeout(nextCallback, 0);
    }
  }

  setNextCallback(callback: (event?: React.AnimationEvent) => void) {
    let active = true;

    const nextCallback = ((event?: React.AnimationEvent) => {
      if (!active) {
        return;
      }

      if (event && this.instanceElement !== event.target) {
        return;
      }

      active = false;
      if (this.nextCallback === nextCallback) {
        this.nextCallback = null;
      }
      callback(event);
    }) as any;

    nextCallback.cancel = () => {
      active = false;
    };

    this.nextCallback = nextCallback;
    return nextCallback;
  }
  getChildElement(): HTMLElement {
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

    this.safeSetState({ status: STATUS.ENTERING, motionReduced: this.isMotionReduced() }, () => {
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

    this.safeSetState({ status: STATUS.EXITING, motionReduced: this.isMotionReduced() }, () => {
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
    this.clearTransitionEnd();
  }

  private clearTransitionEnd() {
    this.transitionEndCallback = null;
    this.animationEventListener?.off();
    this.animationEventListener = null;

    if (this.transitionEndTimeout !== null) {
      clearTimeout(this.transitionEndTimeout);
      this.transitionEndTimeout = null;
    }
  }

  private getMotionPolicy() {
    return (
      this.props.reduceMotion ??
      (this.context as React.ContextType<typeof CustomContext>)?.reduceMotion
    );
  }

  private isMotionReduced() {
    return this.getMotionPolicy() ?? this.motionQuery?.matches ?? this.state.systemReduceMotion;
  }

  private handleMotionChange = (event: MediaQueryListEvent) => {
    this.setState({ systemReduceMotion: event.matches });
  };

  private syncMotionQuery() {
    if (this.getMotionPolicy() !== undefined) {
      this.clearMotionQuery();
      return;
    }

    if (!this.motionQuery && typeof window !== 'undefined' && window.matchMedia) {
      this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.motionQuery.addEventListener('change', this.handleMotionChange);
      if (this.state.systemReduceMotion !== this.motionQuery.matches) {
        this.setState({ systemReduceMotion: this.motionQuery.matches });
      }
    }
  }

  private clearMotionQuery() {
    this.motionQuery?.removeEventListener('change', this.handleMotionChange);
    this.motionQuery = null;
  }

  private finishReducedTransition() {
    if (this.isMotionReduced()) {
      // Keep completed keyframes suppressed until the next enter/exit begins.
      if (!this.state.motionReduced) {
        this.setState({ motionReduced: true });
      }
      this.transitionEndCallback?.();
    }
  }

  safeSetState<K extends keyof TransitionState>(
    nextState: Pick<TransitionState, K>,
    callback: (event?: React.AnimationEvent) => void
  ) {
    if (this.instanceElement) {
      const nextCallback = this.setNextCallback(callback);
      this.setState(nextState, () => nextCallback?.());
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

    const childProps: any = omit(rest, transitionProps);
    childProps['data-rs-motion'] =
      this.isMotionReduced() || this.state.motionReduced
        ? 'reduce'
        : this.getMotionPolicy() === false
          ? 'allow'
          : 'auto';

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
