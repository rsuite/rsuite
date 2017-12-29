// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import pick from 'lodash/pick';

import BaseModal from 'rsuite-utils/lib/Overlay/Modal';
import Fade from 'rsuite-utils/lib/Animation/Fade';
import { on, getHeight, isOverflowing, getScrollbarSize, ownerDocument } from 'dom-lib';

import { mapCloneElement } from './utils/ReactChildren';
import prefix, { globalKey } from './utils/prefix';

import ModalDialog from './ModalDialog';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

type Props = {
  container?: React.ElementType | Function,
  onRendered?: Function,
  className?: string,
  classPrefix?: string,
  children?: React.Node,
  dialogClassName?: string,
  backdropClassName?: string,
  containerClassName?: string,
  style?: Object,
  dialogStyle?: Object,
  backdropStyle?: Object,
  show?: boolean,
  backdrop?: boolean | 'static',
  keyboard?: boolean,
  transition?: React.ElementType,
  dialogTransitionTimeout?: number,
  backdropTransitionTimeout?: number,
  autoFocus?: boolean,
  enforceFocus?: boolean,
  autoResizeHeight?: boolean,
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
  onExited?: Function,
}

type States = {
  modalStyles?: Object,
  bodyStyles?: Object
}

const childContextTypes = {
  onModalHide: PropTypes.func
};

class Modal extends React.Component<Props, States> {

  static defaultProps = {
    backdrop: true,
    keyboard: true,
    autoFocus: true,
    enforceFocus: true,
    classPrefix: `${globalKey}modal`,
    animation: true,
    dialogComponentClass: ModalDialog,
    autoResizeHeight: true
  }

  static childContextTypes = childContextTypes;

  static Body = ModalBody;
  static Header = ModalHeader;
  static Title = ModalTitle;
  static Footer = ModalFooter;
  static Dialog = ModalDialog;

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

    const { container, autoResizeHeight } = this.props;

    /* eslint-disable react/no-find-dom-node */
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

    if (autoResizeHeight) {
      /**
       * Header height + Footer height + Dialog margin
       */
      const excludeHeight = 200;
      const contentHeight = getHeight(window) - excludeHeight;
      const maxHeight = (scrollHeight >= contentHeight) ? contentHeight : scrollHeight;

      styles.bodyStyles = {
        maxHeight,
        overflow: 'auto'
      };
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
  }
  handleHide = (...args: Array<any>) => {
    if (this.windowResizeListener) {
      this.windowResizeListener.off();
    }
    const { onExited } = this.props;
    onExited && onExited(...args);
  }
  handleDialogClick = (event: SyntheticEvent<*>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    const { onHide } = this.props;
    onHide && onHide(event);
  }
  handleWindowResize = () => {
    this.setState(this.getStyles());
  }

  render() {
    const {
      className,
      children,
      dialogClassName,
      dialogStyle,
      autoResizeHeight,
      animation,
      classPrefix,
      style,
      show,
      dialogComponentClass,
      ...props
    } = this.props;

    const { modalStyles, bodyStyles } = this.state;
    const inClass = { in: show && !animation };
    const Dialog: React.ElementType = dialogComponentClass;

    const parentProps = pick(props, Object.keys(BaseModal.propTypes));
    const items = (autoResizeHeight && children) ?
      mapCloneElement(children, (child) => {
        if (child.type.displayName === 'ModalBody') {
          return {
            style: bodyStyles
          };
        }
        return null;
      }) : children;

    const modal = (
      <Dialog
        {...pick(props, Object.keys(ModalDialog.propTypes || {})) }
        style={{ ...modalStyles, ...style }}
        classPrefix={classPrefix}
        className={classNames(className, inClass)}
        dialogClassName={dialogClassName}
        dialogStyle={dialogStyle}
        onClick={props.backdrop === true ? this.handleDialogClick : null}
        ref={(ref) => {
          this.dialog = ref;
        }}
      >
        {items}
      </Dialog>
    );

    const addPrefix = prefix(classPrefix);

    return (
      <BaseModal
        ref={(ref) => {
          this.modal = ref;
        }}
        show={show}
        onEntering={this.handleShow}
        onExited={this.handleHide}
        backdropClassName={classNames(addPrefix('backdrop'), inClass)}
        containerClassName={addPrefix('open')}
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

export default Modal;
