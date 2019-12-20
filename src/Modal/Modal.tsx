import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import setDisplayName from 'recompose/setDisplayName';
import setStatic from 'recompose/setStatic';
import bindElementResize, { unbind as unbindElementResize } from 'element-resize-event';
import BaseModal from 'rsuite-utils/lib/Overlay/Modal';
import Bounce from 'rsuite-utils/lib/Animation/Bounce';
import { on, getHeight, isOverflowing, getScrollbarSize, ownerDocument } from 'dom-lib';
import { prefix, defaultProps, createChainedFunction, isRTL } from '../utils';
import ModalDialog from './ModalDialog';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';
import { ModalProps } from './Modal.d';
import { SIZE } from '../constants';
import ModalContext from './ModalContext';

const BACKDROP_TRANSITION_DURATION = 150;

interface ModalState {
  modalStyles?: React.CSSProperties;
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
  dialogRef: React.RefObject<any>;
  modalRef: React.RefObject<unknown>;

  constructor(props) {
    super(props);
    this.state = {
      modalStyles: {},
      bodyStyles: {}
    };

    this.dialogRef = React.createRef();
    this.modalRef = React.createRef();
  }

  componentWillUnmount() {
    this.destroyEvent();
  }

  getStyles(dialogElement?: HTMLElement) {
    const { container, overflow, drawer } = this.props;
    const node: any = dialogElement || this.dialogRef.current;
    const doc: any = ownerDocument(node);
    const scrollHeight = node ? node.scrollHeight : 0;

    const bodyIsOverflowing = isOverflowing(container || doc.body);
    const modalIsOverflowing = scrollHeight > doc.documentElement.clientHeight;

    const styles: {
      modalStyles: React.CSSProperties;
      bodyStyles: React.CSSProperties;
    } = {
      modalStyles: {
        [isRTL() ? 'paddingLeft' : 'paddingRight']:
          bodyIsOverflowing && !modalIsOverflowing ? getScrollbarSize() : 0,
        [isRTL() ? 'paddingRight' : 'paddingLeft']:
          !bodyIsOverflowing && modalIsOverflowing ? getScrollbarSize() : 0
      },
      bodyStyles: {}
    };

    if (!overflow) {
      return styles;
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
        const excludeHeight = headerHeight + footerHeight + 60;
        const bodyHeight = getHeight(window) - excludeHeight;
        const maxHeight = scrollHeight >= bodyHeight ? bodyHeight : scrollHeight;
        bodyStyles.maxHeight = maxHeight;
      }
    }

    styles.bodyStyles = bodyStyles;

    return styles;
  }

  windowResizeListener = null;
  contentElement = null;
  getBodyStyles = () => {
    return this.state.bodyStyles;
  };

  handleShow = () => {
    const dialogElement = this.dialogRef.current;

    this.updateModalStyles(dialogElement);
    this.contentElement = dialogElement.querySelector(`.${this.addPrefix('content')}`);
    this.windowResizeListener = on(window, 'resize', this.handleResize);

    bindElementResize(this.contentElement, this.handleResize);
  };
  handleHide = () => {
    this.destroyEvent();
  };
  handleDialogClick = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    const { onHide } = this.props;
    onHide && onHide(event);
  };

  handleResize = () => {
    this.updateModalStyles(this.dialogRef.current);
  };

  destroyEvent() {
    if (this.windowResizeListener) {
      this.windowResizeListener.off();
    }
    if (this.contentElement) {
      unbindElementResize(this.contentElement);
    }
  }

  updateModalStyles(dialogElement: HTMLElement) {
    this.setState(this.getStyles(dialogElement));
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
      style,
      show,
      size,
      full,
      dialogComponentClass,
      animationProps,
      animationTimeout,
      onHide,
      ...rest
    } = this.props;

    const { modalStyles } = this.state;
    const inClass = { in: show && !animation };
    const Dialog: React.ElementType = dialogComponentClass;

    const parentProps = _.pick(rest, _.get(BaseModal, 'handledProps'));

    const classes = classNames(this.addPrefix(size), className, {
      [this.addPrefix('full')]: full
    });

    const modal = (
      <Dialog
        {..._.pick(rest, Object.keys(ModalDialog.propTypes || {}))}
        style={{ ...modalStyles, ...style }}
        classPrefix={classPrefix}
        className={classes}
        dialogClassName={dialogClassName}
        dialogStyle={dialogStyle}
        onClick={rest.backdrop === true ? this.handleDialogClick : null}
        dialogRef={this.dialogRef}
      >
        {children}
      </Dialog>
    );

    return (
      <ModalContext.Provider
        value={{
          onModalHide: onHide,
          getBodyStyles: this.getBodyStyles
        }}
      >
        <BaseModal
          ref={this.modalRef}
          show={show}
          onHide={onHide}
          className={this.addPrefix('wrapper')}
          onEntering={createChainedFunction(this.handleShow, this.props.onEntering)}
          onExited={createChainedFunction(this.handleHide, this.props.onExited)}
          backdropClassName={classNames(this.addPrefix('backdrop'), backdropClassName, inClass)}
          containerClassName={classNames(this.addPrefix('open'), {
            [this.addPrefix('has-backdrop')]: rest.backdrop
          })}
          transition={animation ? animation : undefined}
          animationProps={animationProps}
          dialogTransitionTimeout={animationTimeout}
          backdropTransitionTimeout={BACKDROP_TRANSITION_DURATION}
          {...parentProps}
        >
          {modal}
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

export default setDisplayName('Modal')(EnhancedModal);
