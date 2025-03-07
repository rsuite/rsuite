import React, { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import Fade from '../../Animation/Fade';
import Position, { PositionProps, getPositionStyle } from './Position';
import { useOverlay } from './OverlayProvider';
import { useRootClose } from '../hooks';
import { mergeRefs, mergeStyles } from '@/internals/utils';
import type { Placement, AnimationEventProps, ReactElement } from '@/internals/types';
import type { CursorPosition, PositionChildProps } from './types';

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
  cursorPosition?: CursorPosition | null;
  containerPadding?: number;
  followCursor?: boolean;
  open?: boolean;
  placement?: Placement;
  preventOverflow?: boolean;
  rootClose?: boolean;
  triggerTarget?: React.RefObject<any>;
  transition?: React.ElementType;
  onClose?: React.ReactEventHandler;
}

/**
 * Overlay is a powerful component that helps you create floating components.
 * @private
 */
const Overlay = React.forwardRef((props: OverlayProps, ref) => {
  const { overlayContainer } = useOverlay();
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
    const { className } = transitionProps || {};
    return (
      <Position {...positionProps} {...transitionProps} ref={mergeRefs(ref, transitionRef)}>
        {(positionChildProps, childRef) => {
          // Position will return coordinates and className
          const { left, top } = positionChildProps;

          // Components returned by function children need to control their own positioning information. For example: Picker
          if (typeof children === 'function') {
            return children(
              {
                className,
                //dataAttributes,
                ...positionChildProps,
                ...childrenProps
              },
              mergeRefs(childRef, overlayTarget)
            );
          }

          const childElement = children as ReactElement;
          const childStyles = mergeStyles(getPositionStyle(left, top), childElement.props.style);

          return React.cloneElement(childElement, {
            ...childrenProps,
            ...childElement.props,
            className: classNames(childElement.props.className, className),
            style: childStyles,
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
