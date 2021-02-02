import * as React from 'react';
import classNames from 'classnames';
import { ownerDocument, activeElement, contains, getContainer, on } from 'dom-lib';
import canUseDom from 'dom-lib/lib/query/canUseDOM';
import Portal from '../Portal';
import ModalManager from './ModalManager';
import Fade from '../Animation/Fade';
import { ModalProps } from './Modal.d';
import getDOMNode from '../utils/getDOMNode';
import mergeRefs from '../utils/mergeRefs';

class RefHolder extends React.Component<any> {
  render() {
    return this.props.children || null;
  }
}

interface BaseModalProps extends ModalProps {
  container?: HTMLElement | (() => HTMLElement);
  onRendered?: Function;
  transition: React.ElementType;
  onEscapeKeyUp?: React.KeyboardEventHandler;
  onBackdropClick?: React.MouseEventHandler;
  containerClassName?: string;
  dialogTransitionTimeout?: number;
  backdropTransitionTimeout?: number;
  role?: string;
  animationProps?: any;
}

interface BaseModalState {
  exited?: boolean;
}

const modalManager = new ModalManager();

class BaseModal extends React.Component<BaseModalProps, BaseModalState> {
  static manager = modalManager;
  static defaultProps = {
    backdrop: true,
    keyboard: true,
    autoFocus: true,
    enforceFocus: true
  };

  mountNode = null;
  modalNodeRef = null;
  backdropRef = null;
  dialogRef: React.RefObject<any> = null;
  lastFocus = null;
  onDocumentKeyupListener = null;
  onFocusinListener = null;

  constructor(props: BaseModalProps) {
    super(props);
    this.state = { exited: !props.show };
    this.backdropRef = React.createRef();
    this.modalNodeRef = React.createRef();
    this.dialogRef = React.createRef();
  }
  componentDidMount() {
    if (this.props.show) {
      this.onShow();
    }
  }

  static getDerivedStateFromProps(nextProps: BaseModalProps) {
    if (nextProps.show) {
      return { exited: false };
    } else if (!nextProps.transition) {
      // Otherwise let handleHidden take care of marking exited.
      return { exited: true };
    }
    return null;
  }

  getSnapshotBeforeUpdate(prevProps: BaseModalProps) {
    if (this.props.show && !prevProps.show) {
      this.checkForFocus();
    }
    return null;
  }

  componentDidUpdate(prevProps: BaseModalProps) {
    const { transition } = this.props;

    if (prevProps.show && !this.props.show && !transition) {
      // Otherwise handleHidden will call this.
      this.onHide();
    } else if (!prevProps.show && this.props.show) {
      this.onShow();
    }
  }

  componentWillUnmount() {
    const { show, transition } = this.props;

    if (show || (transition && !this.state.exited)) {
      this.onHide();
    }
  }

  onShow() {
    const doc = ownerDocument(this);
    const container = getContainer(this.props.container, doc.body);
    const { containerClassName } = this.props;

    modalManager.add(this, container, containerClassName);

    this.onDocumentKeyupListener = on(doc, 'keyup', this.handleDocumentKeyUp);
    this.onFocusinListener = on(doc, 'focus', this.enforceFocus);
    this.props.onShow?.();
  }

  onHide() {
    modalManager.remove(this);
    this.onDocumentKeyupListener?.off();
    this.onFocusinListener?.off();
    this.restoreLastFocus();
  }

  getDialogElement(): any {
    return getDOMNode(this.dialogRef.current);
  }

  setMountNodeRef = (ref: any) => {
    this.mountNode = ref?.getMountNode?.();
  };

  isTopModal() {
    return modalManager.isTopModal(this);
  }

  handleHidden = (args: any) => {
    this.setState({ exited: true });
    this.onHide();
    this.props.onExited?.(args);
  };

  handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    const { onBackdropClick, backdrop, onHide } = this.props;

    onBackdropClick?.(event);
    backdrop && onHide?.(event);
  };

  handleDocumentKeyUp = (event: React.KeyboardEvent) => {
    const { keyboard, onHide, onEscapeKeyUp } = this.props;
    if (keyboard && event.keyCode === 27 && this.isTopModal()) {
      onEscapeKeyUp?.(event);
      onHide?.(event);
    }
  };

  checkForFocus() {
    if (canUseDom) {
      this.lastFocus = activeElement();
    }
  }

  restoreLastFocus() {
    // Support: <=IE11 doesn't support `focus()` on svg elements
    if (this.lastFocus) {
      this.lastFocus.focus?.();
      this.lastFocus = null;
    }
  }

  enforceFocus = () => {
    const { enforceFocus } = this.props;

    if (!enforceFocus || !this.isTopModal()) {
      return;
    }

    const active = activeElement(ownerDocument(this));
    const modal = this.getDialogElement();

    if (modal && modal !== active && !contains(modal, active)) {
      modal.focus();
    }
  };

  renderBackdrop() {
    const {
      transition,
      backdrop,
      backdropTransitionTimeout,
      backdropStyle,
      backdropClassName
    } = this.props;

    const backdropPorps = {
      style: backdropStyle,
      onClick: backdrop === true ? this.handleBackdropClick : undefined
    };

    if (transition) {
      return (
        <Fade transitionAppear in={this.props.show} timeout={backdropTransitionTimeout}>
          {(props, ref) => {
            const { className, ...rest } = props;
            return (
              <div
                {...rest}
                {...backdropPorps}
                className={classNames(backdropClassName, className)}
                ref={mergeRefs(this.backdropRef, ref)}
              />
            );
          }}
        </Fade>
      );
    }

    return <div ref={this.backdropRef} className={backdropClassName} {...backdropPorps} />;
  }

  render() {
    const {
      children,
      transition: Transition,
      backdrop,
      dialogTransitionTimeout,
      style,
      className,
      container,
      animationProps,
      onExit,
      onExiting,
      onEnter,
      onEntering,
      onEntered,
      ...rest
    } = this.props;

    const show = !!rest.show;
    const mountModal = show || (Transition && !this.state.exited);

    if (!mountModal) {
      return null;
    }

    let dialog = children;

    if (Transition) {
      dialog = (
        <Transition
          {...animationProps}
          transitionAppear
          unmountOnExit
          in={show}
          timeout={dialogTransitionTimeout}
          onExit={onExit}
          onExiting={onExiting}
          onExited={this.handleHidden}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
        >
          {dialog}
        </Transition>
      );
    }

    return (
      <Portal ref={this.setMountNodeRef} container={container}>
        <div ref={this.modalNodeRef} role={rest.role} style={style} className={className}>
          {backdrop && this.renderBackdrop()}
          <RefHolder ref={this.dialogRef}>{dialog}</RefHolder>
        </div>
      </Portal>
    );
  }
}

export default BaseModal;
