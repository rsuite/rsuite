// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable react/no-find-dom-node */
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import _ from 'lodash';
import setDisplayName from 'recompose/setDisplayName';
import setStatic from 'recompose/setStatic';

import BaseModal from 'rsuite-utils/lib/Overlay/Modal';
import Fade from 'rsuite-utils/lib/Animation/Fade';
import { on, getHeight, isOverflowing, getScrollbarSize, ownerDocument } from 'dom-lib';

import { prefix, ReactChildren, defaultProps } from './utils';

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
  animation?: boolean,
  dialogComponentClass: React.ElementType,
  onEscapeKeyUp?: Function,
  onBackdropClick?: Function,
  onShow?: Function,
  onHide?: Function,
  onEnter?: Function,
  onEntering?: Function,
  onEntered?: Function,
  onExit?: Function,
  onExiting?: Function,
  onExited?: Function
};

type State = {
  modalStyles?: Object,
  bodyStyles?: Object
};

const childContextTypes = {
  onModalHide: PropTypes.func
};

class Modal extends React.Component<Props, State> {
  static defaultProps = {
    size: 'sm',
    backdrop: true,
    keyboard: true,
    autoFocus: true,
    enforceFocus: true,
    animation: true,
    dialogComponentClass: ModalDialog,
    overflow: true
  };

  static childContextTypes = childContextTypes;

  state = {
    modalStyles: {},
    bodyStyles: {}
  };

  getChildContext() {
    return {
      onModalHide: this.props.onHide
    };
  }
  componentWillUnmount() {
    if (this.windowResizeListener) {
      this.windowResizeListener.off();
    }
  }

  getStyles() {
    const { container, overflow, classPrefix, drawer } = this.props;
    const node: any = findDOMNode(this.dialog);
    const doc: any = ownerDocument(node);
    const body: any = container || doc.body;
    const scrollHeight = node ? node.scrollHeight : 0;

    const bodyIsOverflowing = isOverflowing(findDOMNode(body));
    const modalIsOverflowing = scrollHeight > doc.documentElement.clientHeight;

    const styles: { modalStyles: Object, bodyStyles?: Object } = {
      modalStyles: {
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? getScrollbarSize() : 0,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? getScrollbarSize() : 0
      }
    };

    if (overflow) {
      const dialogDOM: any = findDOMNode(this.dialog);
      const bodyStyles: Object = {
        overflow: 'auto'
      };

      // default margin
      let headerHeight = 46;
      let footerHeight = 46;
      let contentHeight = 30;

      const headerDOM = dialogDOM.querySelector(`.${this.addPrefix('header')}`);
      const footerDOM = dialogDOM.querySelector(`.${this.addPrefix('footer')}`);
      const contentDOM = dialogDOM.querySelector(`.${this.addPrefix('content')}`);

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

      styles.bodyStyles = bodyStyles;
    }

    return styles;
  }

  modal = null;
  dialog = null;
  windowResizeListener = null;

  handleShow = (...args: Array<any>) => {
    this.windowResizeListener = on(window, 'resize', this.handleWindowResize);
    this.setState(this.getStyles());
    const { onEntering } = this.props;
    onEntering && onEntering(...args);
  };
  handleHide = (...args: Array<any>) => {
    if (this.windowResizeListener) {
      this.windowResizeListener.off();
    }
    const { onExited } = this.props;
    onExited && onExited(...args);
  };
  handleDialogClick = (event: SyntheticEvent<*>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    const { onHide } = this.props;
    onHide && onHide(event);
  };
  handleWindowResize = () => {
    this.setState(this.getStyles());
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

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
      ...props
    } = this.props;

    const { modalStyles, bodyStyles } = this.state;
    const inClass = { in: show && !animation };
    const Dialog: React.ElementType = dialogComponentClass;

    const parentProps = _.pick(props, BaseModal.handledProps);
    let items = null;

    if (children) {
      items = ReactChildren.mapCloneElement(children, child => {
        let displayName = child.type.displayName;
        if (displayName && displayName.indexOf('ModalBody') !== -1) {
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
        {..._.pick(props, Object.keys(ModalDialog.propTypes || {}))}
        style={{ ...modalStyles, ...style }}
        classPrefix={classPrefix}
        className={classes}
        dialogClassName={dialogClassName}
        dialogStyle={dialogStyle}
        onClick={props.backdrop === true ? this.handleDialogClick : null}
        ref={ref => {
          this.dialog = ref;
        }}
      >
        {items}
      </Dialog>
    );

    return (
      <BaseModal
        ref={ref => {
          this.modal = ref;
        }}
        show={show}
        onEntering={this.handleShow}
        onExited={this.handleHide}
        backdropClassName={classNames(this.addPrefix('backdrop'), backdropClassName, inClass)}
        containerClassName={this.addPrefix('open')}
        transition={animation ? Fade : undefined}
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
