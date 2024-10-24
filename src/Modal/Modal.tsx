import React, { useRef, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import on from 'dom-lib/on';
import getAnimationEnd from 'dom-lib/getAnimationEnd';
import BaseModal, { BaseModalProps, modalPropTypes } from '@/internals/Overlay/Modal';
import Bounce from '../Animation/Bounce';
import { useClassNames, useWillUnmount, useUniqueId } from '@/internals/hooks';
import { mergeRefs } from '@/internals/utils';
import ModalDialog, { modalDialogPropTypes } from './ModalDialog';
import { ModalContext, ModalContextProps } from './ModalContext';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';
import { useBodyStyles, ModalSize } from './utils';
import { RsRefForwardingComponent } from '@/internals/types';
import { deprecatePropType, oneOf } from '@/internals/propTypes';

const modalSizes: readonly ModalSize[] = ['xs', 'sm', 'md', 'lg', 'full'];

export interface ModalProps
  extends BaseModalProps,
    Pick<
      React.HTMLAttributes<HTMLElement>,
      'role' | 'id' | 'aria-labelledby' | 'aria-describedby'
    > {
  /** A modal can have different sizes */
  size?: ModalSize;

  /** Set the duration of the animation */
  animationTimeout?: number;

  /** Set an animation effect for Modal, the default is Bounce.  */
  animation?: React.ElementType;

  /** CSS class applied to Dialog DOM nodes */
  dialogClassName?: string;

  /** CSS style applied to dialog DOM nodes */
  dialogStyle?: React.CSSProperties;

  /**
   * Full screen
   * @deprecated Use size="full" instead.
   */
  full?: boolean;

  /** You can use a custom element type for Dialog */
  dialogAs?: React.ElementType;

  /** Automatically sets the height when the body content is too long. */
  overflow?: boolean;

  /** Indicates if the component should be displayed as a drawer */
  isDrawer?: boolean;

  /** Custom close button, used when rendered as a Drawer */
  closeButton?: React.ReactNode | boolean;
}
interface ModalComponent extends RsRefForwardingComponent<'div', ModalProps> {
  Body: typeof ModalBody;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Footer: typeof ModalFooter;
  Dialog: typeof ModalDialog;
}

/**
 * The `Modal` component is used to show content in a layer above the app.
 * @see https://rsuitejs.com/components/modal
 */
const Modal: ModalComponent = React.forwardRef((props: ModalProps, ref) => {
  const {
    animation = Bounce,
    animationProps,
    animationTimeout = 300,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    backdropClassName,
    backdrop = true,
    className,
    children,
    classPrefix = 'modal',
    dialogClassName,
    dialogStyle,
    dialogAs: Dialog = ModalDialog,
    enforceFocus: enforceFocusProp,
    full,
    overflow = true,
    open,
    onClose,
    onEntered,
    onEntering,
    onExited,
    role = 'dialog',
    size = 'sm',
    id: idProp,
    isDrawer = false,
    closeButton,
    ...rest
  } = props;

  const inClass = { in: open && !animation };
  const { merge, prefix } = useClassNames(classPrefix);
  const [shake, setShake] = useState(false);
  const classes = merge(className, prefix({ full, [size]: modalSizes.includes(size) }));
  const dialogRef = useRef<HTMLElement>(null);
  const transitionEndListener = useRef<{ off: () => void } | null>();

  // The style of the Modal body will be updated with the size of the window or container.
  const [bodyStyles, onChangeBodyStyles, onDestroyEvents] = useBodyStyles(dialogRef, {
    overflow,
    prefix,
    size
  });

  const dialogId = useUniqueId('dialog-', idProp);
  const modalContextValue = useMemo<ModalContextProps>(
    () => ({
      dialogId,
      onModalClose: onClose,
      getBodyStyles: () => bodyStyles,
      closeButton,
      isDrawer
    }),
    [dialogId, onClose, closeButton, isDrawer, bodyStyles]
  );

  const handleExited = useCallback(
    (node: HTMLElement) => {
      onExited?.(node);
      onDestroyEvents();
      transitionEndListener.current?.off();
      transitionEndListener.current = null;
    },
    [onDestroyEvents, onExited]
  );

  const handleEntered = useCallback(
    (node: HTMLElement) => {
      onEntered?.(node);
      onChangeBodyStyles();
    },
    [onChangeBodyStyles, onEntered]
  );

  const handleEntering = useCallback(
    (node: HTMLElement) => {
      onEntering?.(node);
      onChangeBodyStyles(true);
    },
    [onChangeBodyStyles, onEntering]
  );

  const backdropClick = React.useRef<boolean>();
  const handleMouseDown = useCallback(event => {
    backdropClick.current = event.target === event.currentTarget;
  }, []);

  const handleBackdropClick = useCallback(
    event => {
      // Ignore click events from non-backdrop.
      // fix: https://github.com/rsuite/rsuite/issues/3394
      if (!backdropClick.current) {
        return;
      }

      // Ignore click events from dialog.
      if (event.target === dialogRef.current) {
        return;
      }

      // Ignore click events from dialog children.
      if (event.target !== event.currentTarget) {
        return;
      }

      // When the value of `backdrop` is `static`, a jitter animation will be added to the dialog when clicked.
      if (backdrop === 'static') {
        setShake(true);
        if (!transitionEndListener.current && dialogRef.current) {
          //fix: https://github.com/rsuite/rsuite/blob/a93d13c14fb20cc58204babe3331d3c3da3fe1fd/src/Modal/styles/index.less#L59
          transitionEndListener.current = on(dialogRef.current, getAnimationEnd(), () => {
            setShake(false);
          });
        }
        return;
      }

      onClose?.(event);
    },
    [backdrop, onClose]
  );

  useWillUnmount(() => {
    transitionEndListener.current?.off();
  });

  let sizeKey = 'width';

  if (isDrawer) {
    const { placement } = animationProps || {};
    // The width or height of the drawer depends on the placement.
    sizeKey = placement === 'top' || placement === 'bottom' ? 'height' : 'width';
  }

  const enforceFocus = useMemo(() => {
    if (typeof enforceFocusProp === 'boolean') {
      return enforceFocusProp;
    }

    // When the Drawer is displayed and the backdrop is not displayed, the focus is not restricted.
    if (isDrawer && backdrop === false) {
      return false;
    }
  }, [backdrop, enforceFocusProp, isDrawer]);

  const wrapperClassName = merge(prefix`wrapper`, {
    [prefix`no-backdrop`]: backdrop === false
  });

  return (
    <ModalContext.Provider value={modalContextValue}>
      <BaseModal
        data-testid={isDrawer ? 'drawer-wrapper' : 'modal-wrapper'}
        {...rest}
        ref={ref}
        backdrop={backdrop}
        enforceFocus={enforceFocus}
        open={open}
        onClose={onClose}
        className={wrapperClassName}
        onEntered={handleEntered}
        onEntering={handleEntering}
        onExited={handleExited}
        backdropClassName={merge(prefix`backdrop`, backdropClassName, inClass)}
        containerClassName={prefix({ open, 'has-backdrop': backdrop })}
        transition={animation ? animation : undefined}
        animationProps={animationProps}
        dialogTransitionTimeout={animationTimeout}
        backdropTransitionTimeout={150}
        onClick={backdrop ? handleBackdropClick : undefined}
        onMouseDown={handleMouseDown}
      >
        {(transitionProps, transitionRef) => {
          const { className: transitionClassName, ...transitionRest } = transitionProps;
          return (
            <Dialog
              role={role}
              id={dialogId}
              aria-labelledby={ariaLabelledby ?? `${dialogId}-title`}
              aria-describedby={ariaDescribedby}
              style={{ [sizeKey]: modalSizes.includes(size) ? undefined : size }}
              {...transitionRest}
              {...pick(rest, Object.keys(modalDialogPropTypes))}
              ref={mergeRefs(dialogRef, transitionRef)}
              classPrefix={classPrefix}
              className={merge(classes, transitionClassName, prefix({ shake }))}
              dialogClassName={dialogClassName}
              dialogStyle={dialogStyle}
            >
              {children}
            </Dialog>
          );
        }}
      </BaseModal>
    </ModalContext.Provider>
  );
}) as unknown as ModalComponent;
Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Footer = ModalFooter;
Modal.Dialog = ModalDialog;
Modal.displayName = 'Modal';
Modal.propTypes = {
  ...modalPropTypes,
  animation: PropTypes.any,
  animationTimeout: PropTypes.number,
  classPrefix: PropTypes.string,
  dialogClassName: PropTypes.string,
  size: PropTypes.oneOfType([oneOf(modalSizes), PropTypes.number, PropTypes.string]),
  dialogStyle: PropTypes.object,
  dialogAs: PropTypes.elementType,
  full: deprecatePropType(PropTypes.bool, 'Use size="full" instead.'),
  overflow: PropTypes.bool
};

export default Modal;
