import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { setStatic } from 'recompose';
import bindElementResize, { unbind as unbindElementResize } from 'element-resize-event';
import BaseModal from './BaseModal';
import Bounce from '../Animation/Bounce';
import { on, getHeight } from 'dom-lib';
import { prefix, defaultProps, createChainedFunction } from '../utils';
import ModalDialog, { modalDialogPropTypes } from './ModalDialog';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';
import { ModalProps } from './Modal.d';
import { SIZE } from '../constants';
import ModalContext from './ModalContext';
import mergeRefs from '../utils/mergeRefs';

const BACKDROP_TRANSITION_DURATION = 150;

interface ModalState {
  bodyStyles?: React.CSSProperties;
}

class Modal extends React.Component<ModalProps, ModalState> {
  static propTypes = {
    classPrefix: PropTypes.string,
    size: PropTypes.oneOf(SIZE),
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onRendered: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
    dialogClassName: PropTypes.string,
    backdropClassName: PropTypes.string,
    style: PropTypes.object,
    dialogStyle: PropTypes.object,
    backdropStyle: PropTypes.object,
    show: PropTypes.bool,
    full: PropTypes.bool,
    backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    keyboard: PropTypes.bool,
    transition: PropTypes.elementType,
    dialogTransitionTimeout: PropTypes.number,
    backdropTransitionTimeout: PropTypes.number,
    autoFocus: PropTypes.bool,
    enforceFocus: PropTypes.bool,
    overflow: PropTypes.bool,
    drawer: PropTypes.bool,
    dialogComponentClass: PropTypes.elementType,
    animation: PropTypes.any,
    animationProps: PropTypes.object,
    animationTimeout: PropTypes.number,
    onEscapeKeyUp: PropTypes.func,
    onBackdropClick: PropTypes.func,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func
  };

  static defaultProps = {
    size: 'sm',
    backdrop: true,
    keyboard: true,
    autoFocus: true,
    enforceFocus: true,
    animation: Bounce,
    animationTimeout: 300,
    dialogComponentClass: ModalDialog,
    overflow: true
  };

  dialogElement: HTMLDivElement;

  // for test
  modalRef: React.Ref<any>;

  constructor(props) {
    super(props);
    this.state = {
      bodyStyles: {}
    };

    this.modalRef = React.createRef();
  }

  componentWillUnmount() {
    this.destroyEvent();
  }

  getBodyStylesByDialog(dialogElement?: HTMLElement, entering?: boolean) {
    const { overflow, drawer } = this.props;
    const node = dialogElement || this.dialogElement;
    const scrollHeight = node ? node.scrollHeight : 0;

    if (!overflow) {
      return {};
    }

    const bodyStyles: React.CSSProperties = {
      overflow: 'auto'
    };

    if (node) {
      // default margin
      let headerHeight = 46;
      let footerHeight = 46;
      let contentHeight = 30;

      const headerDOM = node.querySelector(`.${this.addPrefix('header')}`);
      const footerDOM = node.querySelector(`.${this.addPrefix('footer')}`);
      const contentDOM = node.querySelector(`.${this.addPrefix('content')}`);

      headerHeight = headerDOM ? getHeight(headerDOM) + headerHeight : headerHeight;
      footerHeight = footerDOM ? getHeight(footerDOM) + headerHeight : headerHeight;
      contentHeight = contentDOM ? getHeight(contentDOM) + contentHeight : contentHeight;

      if (drawer) {
        bodyStyles.height = contentHeight - (headerHeight + footerHeight);
      } else {
        /**
         * Header height + Footer height + Dialog margin
         */
        const excludeHeight = headerHeight + footerHeight + (entering ? 76 : 60);
        const bodyHeight = getHeight(window) - excludeHeight;
        const maxHeight = scrollHeight >= bodyHeight ? bodyHeight : scrollHeight;
        bodyStyles.maxHeight = maxHeight;
      }
    }

    return bodyStyles;
  }

  windowResizeListener = null;
  contentElement = null;
  getBodyStyles = () => {
    return this.state.bodyStyles;
  };
  bindDialogRef = ref => {
    this.dialogElement = ref;
  };

  handleShow = () => {
    const dialogElement = this.dialogElement;

    this.updateModalStyles(dialogElement);
    this.contentElement = dialogElement.querySelector(`.${this.addPrefix('content')}`);
    this.windowResizeListener = on(window, 'resize', this.handleResize);
    bindElementResize(this.contentElement, this.handleResize);
  };
  handleShowing = () => {
    this.updateModalStyles(this.dialogElement, true);
  };
  handleHide = () => {
    this.destroyEvent();
  };
  handleDialogClick = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    this.props?.onHide?.(event);
  };

  handleResize = () => {
    this.updateModalStyles(this.dialogElement);
  };

  destroyEvent() {
    this.windowResizeListener?.off?.();
    if (this.contentElement) {
      unbindElementResize(this.contentElement);
    }
  }

  updateModalStyles(dialogElement: HTMLElement, entering?: boolean) {
    this.setState({ bodyStyles: this.getBodyStylesByDialog(dialogElement, entering) });
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  render() {
    const {
      className,
      children,
      dialogClassName,
      backdropClassName,
      dialogStyle,
      animation,
      classPrefix,
      show,
      size,
      full,
      dialogComponentClass,
      animationProps,
      animationTimeout,
      onHide,
      ...rest
    } = this.props;

    const inClass = { in: show && !animation };
    const Dialog: React.ElementType = dialogComponentClass;

    const classes = classNames(this.addPrefix(size), className, {
      [this.addPrefix('full')]: full
    });

    return (
      <ModalContext.Provider
        value={{
          onModalHide: onHide,
          getBodyStyles: this.getBodyStyles
        }}
      >
        <BaseModal
          {...rest}
          ref={this.modalRef}
          show={show}
          onHide={onHide}
          className={this.addPrefix('wrapper')}
          onEntered={createChainedFunction(this.handleShow, this.props.onEntered)}
          onEntering={createChainedFunction(this.handleShowing, this.props.onEntering)}
          onExited={createChainedFunction(this.handleHide, this.props.onExited)}
          backdropClassName={classNames(this.addPrefix('backdrop'), backdropClassName, inClass)}
          containerClassName={classNames(this.addPrefix('open'), {
            [this.addPrefix('has-backdrop')]: rest.backdrop
          })}
          transition={animation ? animation : undefined}
          animationProps={animationProps}
          dialogTransitionTimeout={animationTimeout}
          backdropTransitionTimeout={BACKDROP_TRANSITION_DURATION}
        >
          {(transitionProps, ref) => {
            const { className: transitionClassName, ...transitionRest } = transitionProps;
            return (
              <Dialog
                {...transitionRest}
                {..._.pick(rest, Object.keys(modalDialogPropTypes))}
                classPrefix={classPrefix}
                className={classNames(classes, transitionClassName)}
                dialogClassName={dialogClassName}
                dialogStyle={dialogStyle}
                onClick={rest.backdrop === true ? this.handleDialogClick : null}
                dialogRef={mergeRefs(this.bindDialogRef, ref)}
              >
                {children}
              </Dialog>
            );
          }}
        </BaseModal>
      </ModalContext.Provider>
    );
  }
}

const EnhancedModal = defaultProps<ModalProps>({
  classPrefix: 'modal'
})(Modal);

setStatic('Body', ModalBody)(EnhancedModal);
setStatic('Header', ModalHeader)(EnhancedModal);
setStatic('Title', ModalTitle)(EnhancedModal);
setStatic('Footer', ModalFooter)(EnhancedModal);
setStatic('Dialog', ModalDialog)(EnhancedModal);

export default EnhancedModal;
