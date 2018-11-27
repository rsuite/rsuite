// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable react/no-find-dom-node */
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import _ from 'lodash';
import setDisplayName from 'recompose/setDisplayName';
import setStatic from 'recompose/setStatic';
import bindElementResize, { unbind as unbindElementResize } from 'element-resize-event';

import BaseModal from 'rsuite-utils/lib/Overlay/Modal';
import Bounce from 'rsuite-utils/lib/Animation/Bounce';
import { on, getHeight, isOverflowing, getScrollbarSize, ownerDocument } from 'dom-lib';

import { prefix, ReactChildren, defaultProps, createChainedFunction } from './utils';

import type { Size } from './utils/TypeDefinition';

import ModalDialog from './ModalDialog';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

type Props = {
  classPrefix: string,
  size: Size,
  container?: React.ElementType | Function,
  onRendered?: Function,
  className?: string,
  children?: React.Node,
  dialogClassName?: string,
  backdropClassName?: string,
  style?: Object,
  dialogStyle?: Object,
  backdropStyle?: Object,
  show?: boolean,
  full?: boolean,
  backdrop?: boolean | 'static',
  keyboard?: boolean,
  transition?: React.ElementType,
  dialogTransitionTimeout?: number,
  backdropTransitionTimeout?: number,
  autoFocus?: boolean,
  enforceFocus?: boolean,
  overflow?: boolean,
  drawer?: boolean,
  animation?: boolean | Object,
  dialogComponentClass: React.ElementType,
  onEscapeKeyUp?: () => void,
  onBackdropClick?: () => void,
  onShow?: (event: SyntheticEvent<*>) => void,
  onHide?: (event: SyntheticEvent<*>) => void,
  onEnter?: () => void,
  onEntering?: () => void,
  onEntered?: () => void,
  onExit?: () => void,
  onExiting?: () => void,
  onExited?: () => void,
  animationProps?: Object
};

type State = {
  modalStyles?: Object,
  bodyStyles?: Object
};

class Modal extends React.Component<Props, State> {
  static defaultProps = {
    size: 'sm',
    backdrop: true,
    keyboard: true,
    autoFocus: true,
    enforceFocus: true,
    animation: Bounce,
    dialogComponentClass: ModalDialog,
    overflow: true
  };

  static childContextTypes = {
    onModalHide: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      modalStyles: {},
      bodyStyles: {}
    };
  }

  getChildContext() {
    return {
      onModalHide: this.props.onHide
    };
  }
  componentWillUnmount() {
    this.destroyEvent();
  }

  getStyles(dialogElement?: HTMLElement) {
    const { container, overflow, drawer } = this.props;
    const node: any = dialogElement || findDOMNode(this.dialog);
    const doc: any = ownerDocument(node);
    const body: any = container || doc.body;
    const scrollHeight = node ? node.scrollHeight : 0;

    const bodyIsOverflowing = isOverflowing(findDOMNode(body));
    const modalIsOverflowing = scrollHeight > doc.documentElement.clientHeight;

    const styles: Object = {
      modalStyles: {
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? getScrollbarSize() : 0,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? getScrollbarSize() : 0
      },
      bodyStyles: {}
    };

    if (!overflow) {
      return styles;
    }

    const bodyStyles: Object = {
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

  modal = null;
  dialog = null;
  windowResizeListener = null;
  contentElement = null;

  handleShow = () => {
    const dialogElement: any = findDOMNode(this.dialog);

    this.updateModalStyles(dialogElement);
    this.contentElement = dialogElement.querySelector(`.${this.addPrefix('content')}`);
    this.windowResizeListener = on(window, 'resize', this.handleResize);

    bindElementResize(this.contentElement, this.handleResize);
  };
  handleHide = () => {
    this.destroyEvent();
  };
  handleDialogClick = (event: SyntheticEvent<*>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    const { onHide } = this.props;
    onHide && onHide(event);
  };

  handleResize = () => {
    this.updateModalStyles();
  };

  destroyEvent() {
    if (this.windowResizeListener) {
      this.windowResizeListener.off();
    }
    if (this.contentElement) {
      unbindElementResize(this.contentElement);
    }
  }

  updateModalStyles(dialogElement) {
    this.setState(this.getStyles(dialogElement));
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  dialogRef = ref => {
    this.dialog = ref;
  };
  modalRef = ref => {
    this.modal = ref;
  };

  render() {
    const {
      className,
      children,
      dialogClassName,
      backdropClassName,
      dialogStyle,
      overflow,
      animation,
      classPrefix,
      style,
      show,
      size,
      full,
      dialogComponentClass,
      animationProps,
      ...rest
    } = this.props;

    const { modalStyles, bodyStyles } = this.state;
    const inClass = { in: show && !animation };
    const Dialog: React.ElementType = dialogComponentClass;

    const parentProps = _.pick(rest, BaseModal.handledProps);
    let items = null;

    if (children) {
      items = ReactChildren.mapCloneElement(children, child => {
        let displayName = child.type.displayName;
        if (displayName && displayName.indexOf('Body') !== -1) {
          return {
            style: bodyStyles
          };
        }
        return null;
      });
    }

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
        ref={this.dialogRef}
      >
        {items}
      </Dialog>
    );

    return (
      <BaseModal
        ref={this.modalRef}
        show={show}
        className={this.addPrefix('wrapper')}
        onEntering={createChainedFunction(this.handleShow, this.props.onEntering)}
        onExited={createChainedFunction(this.handleHide, this.props.onExited)}
        backdropClassName={classNames(this.addPrefix('backdrop'), backdropClassName, inClass)}
        containerClassName={classNames(this.addPrefix('open'), {
          [this.addPrefix('has-backdrop')]: rest.backdrop
        })}
        transition={animation ? animation : undefined}
        animationProps={animationProps}
        dialogTransitionTimeout={TRANSITION_DURATION}
        backdropTransitionTimeout={BACKDROP_TRANSITION_DURATION}
        {...parentProps}
      >
        {modal}
      </BaseModal>
    );
  }
}

const EnhancedModal = defaultProps({
  classPrefix: 'modal'
})(Modal);

setStatic('Body', ModalBody)(EnhancedModal);
setStatic('Header', ModalHeader)(EnhancedModal);
setStatic('Title', ModalTitle)(EnhancedModal);
setStatic('Footer', ModalFooter)(EnhancedModal);
setStatic('Dialog', ModalDialog)(EnhancedModal);

export default setDisplayName('Modal')(EnhancedModal);
