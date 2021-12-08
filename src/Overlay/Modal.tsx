import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import canUseDOM from 'dom-lib/canUseDOM';
import contains from 'dom-lib/contains';
import getContainer from 'dom-lib/getContainer';
import on from 'dom-lib/on';
import ModalManager, { ModalInstance } from './ModalManager';
import Fade from '../Animation/Fade';
import { animationPropTypes } from '../Animation/utils';
import { mergeRefs, usePortal, createChainedFunction, useWillUnmount, KEY_VALUES } from '../utils';
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
  onEsc?: React.KeyboardEventHandler;
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
  const { Portal } = usePortal({ container });
  const modal = useModalManager();

  if (open) {
    if (exited) setExited(false);
  } else if (!Transition && !exited) {
    setExited(true);
  }

  const mountModal = open || (Transition && !exited);

  const lastFocus = useRef<HTMLElement | null>(null);

  const handleDocumentKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (keyboard && event.key === KEY_VALUES.ESC && modal.isTopModal()) {
        onEsc?.(event);
        onClose?.(event);
      }
    },
    [keyboard, modal, onEsc, onClose]
  );

  const restoreLastFocus = useCallback(() => {
    if (lastFocus.current) {
      lastFocus.current.focus?.();
      lastFocus.current = null;
    }
  }, []);

  const handleEnforceFocus = useCallback(() => {
    if (!enforceFocus || !modal.isTopModal()) {
      return;
    }

    const currentActiveElement = document.activeElement as HTMLElement;
    const dialog = modal.dialog;

    if (dialog && dialog !== currentActiveElement && !contains(dialog, currentActiveElement)) {
      dialog.focus();
    }
  }, [enforceFocus, modal]);

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

  const documentKeyDownListener = useRef<{ off: () => void } | null>();
  const documentFocusListener = useRef<{ off: () => void } | null>();

  const handleOpen = useCallback(() => {
    const containerElement = getContainer(
      container as Element | (() => Element),
      document.body
    ) as HTMLElement;
    modal.add(containerElement, containerClassName);

    if (!documentKeyDownListener.current) {
      documentKeyDownListener.current = on(document, 'keydown', handleDocumentKeyDown);
    }

    if (!documentFocusListener.current) {
      documentFocusListener.current = on(document, 'focus', handleEnforceFocus, true);
    }

    if (canUseDOM) {
      lastFocus.current = document.activeElement as HTMLElement;
    }

    if (autoFocus) {
      modal.dialog?.focus();
    }

    onOpen?.();
  }, [
    autoFocus,
    container,
    containerClassName,
    handleDocumentKeyDown,
    handleEnforceFocus,
    modal,
    onOpen
  ]);

  const handleClose = useCallback(() => {
    modal.remove();
    documentKeyDownListener.current?.off();
    documentKeyDownListener.current = null;
    documentFocusListener.current?.off();
    documentFocusListener.current = null;
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
        ref={mergeRefs(modal.setDialogRef, ref as any)}
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
  onEsc: PropTypes.func,
  onBackdropClick: PropTypes.func
};

export default Modal;
