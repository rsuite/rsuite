import React, { useState, useRef, useCallback, useContext } from 'react';
import classNames from 'classnames';
import Fade from '../../Animation/Fade';
import OverlayContext from './OverlayContext';
import Position, { PositionChildProps, PositionProps } from './Position';
import { useRootClose } from '../hooks';
import { mergeRefs } from '@/internals/utils';
import type { Placement, AnimationEventProps } from '@/internals/types';
import type { CursorPosition } from './types';

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
  placement?: Placement;
  preventOverflow?: boolean;
  open?: boolean;
  rootClose?: boolean;
  transition?: React.ElementType;
  triggerTarget?: React.RefObject<any>;
  onClose?: React.ReactEventHandler;
  followCursor?: boolean;
  cursorPosition?: CursorPosition | null;
}

/**
 * Overlay is a powerful component that helps you create floating components.
 * @private
 */
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

export default Overlay;
