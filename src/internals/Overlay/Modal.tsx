import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import contains from 'dom-lib/contains';
import on from 'dom-lib/on';
import ModalManager, { ModalInstance } from './ModalManager';
import Fade from '../../Animation/Fade';
import OverlayContext from './OverlayContext';
import { KEY_VALUES } from '@/internals/constants';
import { usePortal, useWillUnmount, useEventCallback } from '@/internals/hooks';
import { forwardRef, mergeRefs, createChainedFunction } from '@/internals/utils';
import type { WithAsPropsWithoutChildren, AnimationEventProps } from '@/internals/types';

export interface BaseModalProps extends WithAsPropsWithoutChildren, AnimationEventProps {
  /** Animation-related properties */
  animationProps?: any;

  /** Primary content */
  children?: any;

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
  container?: HTMLElement | (() => HTMLElement);
  containerClassName?: string;
  backdropTransitionTimeout?: number;
  dialogTransitionTimeout?: number;
  transition?: React.ElementType;
  onEsc?: React.KeyboardEventHandler;
  onClick?: React.MouseEventHandler;
  onMouseDown?: React.MouseEventHandler;

  // @deprecated
  onBackdropClick?: React.MouseEventHandler;
}

let manager: ModalManager;

function getManager() {
  if (!manager) manager = new ModalManager();
  return manager;
}

const useModalManager = () => {
  const modalManager = getManager();
  const modal = useRef<ModalInstance>({ dialog: null, backdrop: null });

  return {
    get dialog() {
      return modal.current?.dialog;
    },
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

const Modal = forwardRef<'div', BaseModalProps, any, 'children'>((props, ref) => {
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
    onEsc,
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
  const { Portal, target: containerElement } = usePortal({ container });
  const modal = useModalManager();

  if (open) {
    if (exited) setExited(false);
  } else if (!Transition && !exited) {
    setExited(true);
  }

  const mountModal = open || (Transition && !exited);

  const lastFocus = useRef<HTMLElement | null>(null);

  const handleDocumentKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    if (keyboard && event.key === KEY_VALUES.ESC && modal.isTopModal()) {
      onEsc?.(event);
      onClose?.(event);
    }
  });

  const restoreLastFocus = useCallback(() => {
    if (lastFocus.current) {
      lastFocus.current.focus?.();
      lastFocus.current = null;
    }
  }, []);

  /**
   * Determines if the currently focused element is inside the dialog,
   * and if not, returns the focus to the dialog.
   *
   */
  const handleFocusDialog = useEventCallback((onBeforeFocusCallback?: () => void) => {
    const currentActiveElement = document.activeElement as HTMLElement;
    const dialog = modal.dialog;

    if (dialog && currentActiveElement && !contains(dialog, currentActiveElement)) {
      onBeforeFocusCallback?.();
      dialog.focus();
    }
  });

  const handleEnforceFocus = useEventCallback(() => {
    if (!enforceFocus || !modal.isTopModal()) {
      return;
    }

    handleFocusDialog();
  });

  const documentKeyDownListener = useRef<{ off: () => void } | null>();
  const documentFocusListener = useRef<{ off: () => void } | null>();

  const handleOpen = useEventCallback(() => {
    if (containerElement) {
      modal.add(containerElement, containerClassName);
    }

    if (!documentKeyDownListener.current) {
      documentKeyDownListener.current = on(document, 'keydown', handleDocumentKeyDown);
    }

    if (!documentFocusListener.current) {
      documentFocusListener.current = on(document, 'focus', handleEnforceFocus, true);
    }

    if (autoFocus) {
      handleFocusDialog(() => {
        lastFocus.current = document.activeElement as HTMLElement;
      });
    }

    onOpen?.();
  });

  const handleClose = useEventCallback(() => {
    modal.remove();
    documentKeyDownListener.current?.off();
    documentKeyDownListener.current = null;
    documentFocusListener.current?.off();
    documentFocusListener.current = null;
    restoreLastFocus();
  });

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

  const contextValue = useMemo(
    () => ({
      overlayContainer: () => {
        return modal.dialog;
      }
    }),
    [modal.dialog]
  );

  if (!mountModal) {
    return null;
  }

  const renderBackdrop = () => {
    if (Transition) {
      return (
        <Fade transitionAppear in={open} timeout={backdropTransitionTimeout}>
          {(fadeProps, ref) => {
            const { className, ...rest } = fadeProps;
            return (
              <div
                aria-hidden
                data-testid="backdrop"
                {...rest}
                style={backdropStyle}
                ref={mergeRefs(modal.setBackdropRef, ref)}
                className={classNames(backdropClassName, className)}
              />
            );
          }}
        </Fade>
      );
    }

    return <div aria-hidden style={backdropStyle} className={backdropClassName} />;
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
    <OverlayContext.Provider value={contextValue}>
      <Portal>
        {backdrop && renderBackdrop()}
        <Component
          {...rest}
          ref={mergeRefs(modal.setDialogRef, ref as any)}
          style={style}
          className={className}
          tabIndex={-1}
        >
          {dialogElement}
        </Component>
      </Portal>
    </OverlayContext.Provider>
  );
});

Modal.displayName = 'OverlayModal';

export default Modal;
