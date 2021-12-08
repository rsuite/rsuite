import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import canUseDOM from 'dom-lib/canUseDOM';
import contains from 'dom-lib/contains';
import getContainer from 'dom-lib/getContainer';
import on from 'dom-lib/on';
import ModalManager, { ModalElements } from './ModalManager';
import Fade from '../Animation/Fade';
import { animationPropTypes } from '../Animation/utils';
import { mergeRefs, getDOMNode, usePortal, createChainedFunction, useWillUnmount } from '../utils';
import { WithAsProps, AnimationEventProps, RsRefForwardingComponent } from '../@types/common';

export interface BaseModalProps extends WithAsProps, AnimationEventProps {
  /** Animation-related properties */
  animationProps?: any;

  /** Primary content */
  children?: React.ReactNode;

  /**
   * Add an optional extra class name to .modal-backdrop
   * It could end up looking like class="modal-backdrop foo-modal-backdrop in"
   */
  backdropClassName?: string;

  /** CSS style applied to backdrop DOM nodes  */
  backdropStyle?: React.CSSProperties;

  /** Open  modal */
  open?: boolean;

  /**
   * When set to true, the Modal will display the background when it is opened.
   * Clicking on the background will close the Modal. If you do not want to close the Modal,
   * set it to 'static'.
   */
  backdrop?: boolean | 'static';

  /** Close Modal when esc key is pressed */
  keyboard?: boolean;

  /**
   * When set to true, the Modal is opened and is automatically focused on its own,
   * accessible to screen readers
   */
  autoFocus?: boolean;

  /**
   * When set to true, Modal will prevent the focus from leaving when opened,
   * making it easier for the secondary screen reader to access
   */
  enforceFocus?: boolean;

  /** Called when Modal is displayed */
  onOpen?: () => void;

  /** Called when Modal is closed */
  onClose?: (event: React.SyntheticEvent) => void;
}

interface ModalProps extends BaseModalProps {
  children: (props, ref) => React.ReactElement;
  container?: HTMLElement | (() => HTMLElement);
  containerClassName?: string;
  backdropTransitionTimeout?: number;
  dialogTransitionTimeout?: number;
  transition?: React.ElementType;
  onEscapeKeyUp?: React.KeyboardEventHandler;
  onBackdropClick?: React.MouseEventHandler;
}

let manager: ModalManager;

function getManager() {
  if (!manager) manager = new ModalManager();
  return manager;
}

const useModalManager = () => {
  const modalManager = getManager();
  const modal = useRef<ModalElements>({ dialog: null, backdrop: null });

  return {
    add: (containerElement: HTMLElement, containerClassName?: string) =>
      modalManager.add(modal.current, containerElement, containerClassName),
    remove: () => modalManager.remove(modal.current),
    isTopModal: () => modalManager.isTopModal(modal.current),
    setDialogRef: useCallback((ref: HTMLElement | null) => {
      modal.current.dialog = ref;
    }, []),
    setBackdropRef: useCallback((ref: HTMLElement | null) => {
      modal.current.backdrop = ref;
    }, [])
  };
};

const Modal: RsRefForwardingComponent<'div', ModalProps> = React.forwardRef<
  HTMLDivElement,
  ModalProps
>((props, ref) => {
  const {
    as: Component = 'div',
    children,
    transition: Transition,
    dialogTransitionTimeout,
    style,
    className,
    container,
    animationProps,
    containerClassName,
    keyboard = true,
    enforceFocus = true,
    backdrop = true,
    backdropTransitionTimeout,
    backdropStyle,
    backdropClassName,
    open,
    autoFocus = true,
    onBackdropClick,
    onEscapeKeyUp,
    onExit,
    onExiting,
    onExited,
    onEnter,
    onEntering,
    onEntered,
    onClose,
    onOpen,
    ...rest
  } = props;

  const [exited, setExited] = useState(!open);
  const { Portal } = usePortal({ container });
  const modal = useModalManager();

  if (open) {
    if (exited) setExited(false);
  } else if (!Transition && !exited) {
    setExited(true);
  }

  const mountModal = open || (Transition && !exited);

  const rootRef = useRef<HTMLElement>();
  const lastFocus = useRef<HTMLElement | null>(null);

  const handleDocumentKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (keyboard && event.keyCode === 27 && modal.isTopModal()) {
        onEscapeKeyUp?.(event);
        onClose?.(event);
      }
    },
    [keyboard, modal, onEscapeKeyUp, onClose]
  );

  const checkForFocus = useCallback(() => {
    if (canUseDOM) {
      lastFocus.current = document.activeElement as HTMLElement;
    }
  }, []);

  const restoreLastFocus = useCallback(() => {
    if (lastFocus.current) {
      lastFocus.current.focus?.();
      lastFocus.current = null;
    }
  }, []);

  const getDialogElement = useCallback(() => {
    return getDOMNode(rootRef.current) as HTMLElement;
  }, []);

  const handleEnforceFocus = useCallback(() => {
    if (!enforceFocus || !modal.isTopModal()) {
      return;
    }

    const currentActiveElement = document.activeElement as HTMLElement | null;
    const dialog = getDialogElement();

    if (
      dialog &&
      dialog !== currentActiveElement &&
      (isNil(currentActiveElement) || !contains(dialog, currentActiveElement))
    ) {
      dialog.focus();
    }
  }, [enforceFocus, getDialogElement, modal]);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      onBackdropClick?.(event);

      if (backdrop === true) {
        onClose?.(event);
      }
    },
    [backdrop, onBackdropClick, onClose]
  );

  const documentKeyupListener = useRef<{ off: () => void }>();
  const docusinListener = useRef<{ off: () => void }>();
  const handleOpen = useCallback(() => {
    const dialog = getDialogElement();
    // fixme getContainer() typing mistake
    const containerElement = getContainer(container!, document.body) as HTMLElement;
    modal.add(containerElement, containerClassName);

    documentKeyupListener.current = on(document, 'keydown', handleDocumentKeyUp);
    docusinListener.current = on(document, 'focus', handleEnforceFocus, true);
    onOpen?.();
    checkForFocus();

    if (autoFocus) {
      dialog?.focus();
    }
  }, [
    autoFocus,
    checkForFocus,
    container,
    containerClassName,
    getDialogElement,
    handleDocumentKeyUp,
    handleEnforceFocus,
    modal,
    onOpen
  ]);

  const handleClose = useCallback(() => {
    modal.remove();
    documentKeyupListener.current?.off();
    docusinListener.current?.off();
    restoreLastFocus();
  }, [modal, restoreLastFocus]);

  useEffect(() => {
    if (!open) {
      return;
    }
    handleOpen();
  }, [open, handleOpen]);

  useEffect(() => {
    if (!exited) {
      return;
    }
    handleClose();
  }, [exited, handleClose]);

  useWillUnmount(() => {
    handleClose();
  });

  const handleExited = useCallback(() => {
    setExited(true);
  }, []);

  if (!mountModal) {
    return null;
  }

  const renderBackdrop = () => {
    const backdropPorps = {
      style: backdropStyle,
      onClick: handleBackdropClick
    };

    if (Transition) {
      return (
        <Fade transitionAppear in={open} timeout={backdropTransitionTimeout}>
          {(fadeProps, ref) => {
            const { className, ...rest } = fadeProps;
            return (
              <div
                aria-hidden
                {...rest}
                {...backdropPorps}
                ref={mergeRefs(modal.setBackdropRef, ref)}
                className={classNames(backdropClassName, className)}
              />
            );
          }}
        </Fade>
      );
    }

    return <div aria-hidden {...backdropPorps} className={backdropClassName} />;
  };

  const dialogElement = Transition ? (
    <Transition
      {...animationProps}
      transitionAppear
      unmountOnExit
      in={open}
      timeout={dialogTransitionTimeout}
      onExit={onExit}
      onExiting={onExiting}
      onExited={createChainedFunction(handleExited, onExited)}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
    >
      {children}
    </Transition>
  ) : (
    children
  );

  return (
    <Portal>
      <Component
        {...rest}
        ref={mergeRefs(modal.setDialogRef, ref)}
        style={style}
        className={className}
        tabIndex={-1}
      >
        {backdrop && renderBackdrop()}
        {dialogElement}
      </Component>
    </Portal>
  );
});

export const modalPropTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  backdropClassName: PropTypes.string,
  style: PropTypes.object,
  backdropStyle: PropTypes.object,
  open: PropTypes.bool,
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  keyboard: PropTypes.bool,
  autoFocus: PropTypes.bool,
  enforceFocus: PropTypes.bool,
  animationProps: PropTypes.object,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

Modal.displayName = 'OverlayModal';
Modal.propTypes = {
  ...animationPropTypes,
  ...modalPropTypes,
  children: PropTypes.func,
  container: PropTypes.any,
  containerClassName: PropTypes.string,
  dialogTransitionTimeout: PropTypes.number,
  backdropTransitionTimeout: PropTypes.number,
  transition: PropTypes.any,
  onEscapeKeyUp: PropTypes.func,
  onBackdropClick: PropTypes.func
};

export default Modal;
