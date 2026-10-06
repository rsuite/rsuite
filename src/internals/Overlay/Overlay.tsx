import React, { useState, useRef, useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';
import Fade from '../../Animation/Fade';
import Position, { PositionProps, getPositionStyle } from './Position';
import { useOverlay } from './OverlayProvider';
import { useRootClose, useIsomorphicLayoutEffect } from '../hooks';
import { mergeRefs, mergeStyles } from '@/internals/utils';
import type { Placement, AnimationEventProps, ReactElement } from '@/internals/types';
import type { CursorPosition, PositionChildProps } from './types';
import { TooltipDescriptionObserverContext } from './TooltipDescriptionContext';

interface OverlayElementProps {
  child: ReactElement;
  childProps?: React.HTMLAttributes<HTMLElement>;
  childRef: React.RefObject<HTMLElement | null>;
  overlayTarget: React.MutableRefObject<HTMLElement | null>;
  position: PositionChildProps;
  className?: string;
}

// A stable leaf keeps ref callbacks unchanged when publishing a description rerenders Whisper.
function OverlayElement({
  child,
  childProps,
  childRef,
  overlayTarget,
  position,
  className
}: OverlayElementProps) {
  const description = useContext(TooltipDescriptionObserverContext);
  const onNodeChange = description?.onNodeChange;
  const ref = useMemo(
    () => mergeRefs(mergeRefs(childRef, overlayTarget), onNodeChange),
    [childRef, overlayTarget, onNodeChange]
  );

  useIsomorphicLayoutEffect(() => {
    description?.refresh();
  });

  const props = {
    ...childProps,
    ...child.props,
    id: child.props.id ?? childProps?.id,
    className: classNames(child.props.className, className),
    style: mergeStyles(getPositionStyle(position.left, position.top), child.props.style),
    ref
  };
  return React.cloneElement(child, props);
}

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

          return (
            <OverlayElement
              child={children as ReactElement}
              childProps={childrenProps}
              childRef={childRef}
              overlayTarget={overlayTarget}
              position={positionChildProps}
              className={className}
            />
          );
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
