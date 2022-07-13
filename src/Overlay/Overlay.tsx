import React, { useState, useRef, useCallback, useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Position, { PositionChildProps, PositionProps } from './Position';
import { TypeAttributes, AnimationEventProps, CursorPosition } from '../@types/common';
import { mergeRefs, useRootClose } from '../utils';
import Fade from '../Animation/Fade';
import OverlayContext from './OverlayContext';

export interface OverlayProps extends AnimationEventProps {
  container?: HTMLElement | (() => HTMLElement | null) | null;
  children:
    | React.ReactElement
    | ((
        props: PositionChildProps & React.HTMLAttributes<HTMLElement>,
        ref: React.RefCallback<HTMLElement>
      ) => React.ReactElement);
  childrenProps?: React.HTMLAttributes<HTMLElement>;
  className?: string;
  containerPadding?: number;
  placement?: TypeAttributes.Placement;
  preventOverflow?: boolean;
  open?: boolean;
  rootClose?: boolean;
  transition?: React.ElementType;
  triggerTarget?: React.RefObject<any>;
  onClose?: React.ReactEventHandler;
  followCursor?: boolean;
  cursorPosition?: CursorPosition | null;
}

export const overlayPropTypes = {
  container: PropTypes.any,
  children: PropTypes.any,
  childrenProps: PropTypes.object,
  className: PropTypes.string,
  containerPadding: PropTypes.number,
  placement: PropTypes.any,
  preventOverflow: PropTypes.bool,
  open: PropTypes.bool,
  rootClose: PropTypes.bool,
  transition: PropTypes.any,
  triggerTarget: PropTypes.any,
  onClose: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func
};

const Overlay = React.forwardRef((props: OverlayProps, ref) => {
  const { overlayContainer } = useContext(OverlayContext);
  const {
    container = overlayContainer,
    containerPadding,
    placement,
    rootClose,
    children,
    childrenProps,
    transition: Transition = Fade,
    open,
    preventOverflow,
    triggerTarget,
    onClose,
    onExited,
    onExit,
    onExiting,
    onEnter,
    onEntering,
    onEntered,
    followCursor,
    cursorPosition
  } = props;

  const [exited, setExited] = useState(!open);
  const overlayTarget = useRef(null);

  if (open) {
    if (exited) setExited(false);
  } else if (!Transition && !exited) {
    setExited(true);
  }

  const mountOverlay = open || (Transition && !exited);

  const handleExited = useCallback(
    (args: any) => {
      setExited(true);
      onExited?.(args);
    },
    [onExited]
  );

  useRootClose(onClose, { triggerTarget, overlayTarget, disabled: !rootClose || !mountOverlay });

  if (!mountOverlay) {
    return null;
  }

  const positionProps: Omit<PositionProps, 'children'> = {
    container,
    containerPadding,
    triggerTarget,
    placement,
    preventOverflow,
    followCursor,
    cursorPosition
  };

  const renderChildWithPosition = (transitionProps?, transitionRef?: React.RefObject<any>) => {
    return (
      <Position {...positionProps} {...transitionProps} ref={mergeRefs(ref, transitionRef)}>
        {(childProps, childRef) => {
          // overlayTarget is the ref on the DOM of the Overlay.
          if (typeof children === 'function') {
            return children(
              Object.assign(childProps, childrenProps),
              mergeRefs(childRef, overlayTarget)
            );
          }

          // Position will return coordinates and className
          const { left, top, className } = childProps;
          return React.cloneElement(children, {
            ...childrenProps,
            ...children.props,
            className: classNames(className, children.props.className),
            style: { left, top, ...children.props.style },
            ref: mergeRefs(childRef, overlayTarget)
          });
        }}
      </Position>
    );
  };

  if (Transition) {
    return (
      <Transition
        in={open}
        transitionAppear
        onExit={onExit}
        onExiting={onExiting}
        onExited={handleExited}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
      >
        {renderChildWithPosition}
      </Transition>
    );
  }

  return renderChildWithPosition();
});

Overlay.displayName = 'Overlay';
Overlay.propTypes = overlayPropTypes;

export default Overlay;
