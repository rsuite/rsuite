import * as React from 'react';
import Portal from '../Portal';
import Position from './Position';
import RootCloseWrapper from './RootCloseWrapper';
import { TypeAttributes, AnimationEventProps } from '../@types/common';

export interface BaseOverlayProps extends AnimationEventProps {
  container?: HTMLElement | (() => HTMLElement);
  onRendered?: Function;
  children?: React.ReactNode;
  className?: string;
  containerPadding?: number;
  placement?: TypeAttributes.Placement;
  shouldUpdatePosition?: boolean;
  preventOverflow?: boolean;
  show?: boolean;
  rootClose?: boolean;
  transition?: React.ElementType;
  positionRef?: React.Ref<any>;
  target?: () => HTMLElement;
  onHide?: () => void;
}

interface BaseOverlayState {
  exited?: boolean;
}

class BaseOverlay extends React.Component<BaseOverlayProps, BaseOverlayState> {
  constructor(props: BaseOverlayProps) {
    super(props);
    this.state = { exited: !props.show };
  }

  static getDerivedStateFromProps(nextProps: BaseOverlayProps) {
    if (nextProps.show) {
      return { exited: false };
    } else if (!nextProps.transition) {
      return { exited: true };
    }
    return null;
  }

  handleHidden = (args: any) => {
    this.setState({ exited: true });
    this.props.onExited?.(args);
  };

  render() {
    const {
      container,
      containerPadding,
      target,
      placement,
      shouldUpdatePosition,
      rootClose,
      children,
      transition: Transition,
      show,
      onHide,
      positionRef,
      preventOverflow,
      ...props
    } = this.props;

    const mountOverlay = show || (Transition && !this.state.exited);

    if (!mountOverlay) {
      return null;
    }

    let child = children;

    const positionProps = {
      container,
      containerPadding,
      target,
      placement,
      shouldUpdatePosition,
      preventOverflow
    };

    child = (
      <Position {...positionProps} ref={positionRef}>
        {child}
      </Position>
    );

    if (Transition) {
      const { onExit, onExiting, onEnter, onEntering, onEntered } = props;
      child = (
        <Transition
          in={show}
          transitionAppear
          onExit={onExit}
          onExiting={onExiting}
          onExited={this.handleHidden}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
        >
          {child}
        </Transition>
      );
    }

    if (rootClose) {
      child = (
        <RootCloseWrapper target={target} onRootClose={onHide}>
          {child}
        </RootCloseWrapper>
      );
    }

    return <Portal container={container}>{child}</Portal>;
  }
}

export default BaseOverlay;
