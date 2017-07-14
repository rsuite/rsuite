import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import _ from 'lodash';

import BaseModal from 'rsuite-utils/lib/Overlay/Modal';
import Fade from 'rsuite-utils/lib/Animation/Fade';
import { elementType } from 'rsuite-utils/lib/propTypes';
import { on, getHeight, isOverflowing, getScrollbarSize, ownerDocument } from 'dom-lib';

import ReactChildren from './utils/ReactChildren';
import ModalDialog from './ModalDialog';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

const propTypes = {
  ...BaseModal.propTypes,
  ...ModalDialog.propTypes,
  backdrop: PropTypes.oneOf(['static', true, false]),
  animation: PropTypes.bool,
  dialogComponentClass: elementType,
  show: PropTypes.bool,
  keyboard: PropTypes.bool,
  enforceFocus: PropTypes.bool,
  autoResizeHeight: PropTypes.bool,
  dialogClassName: PropTypes.string,
  onHide: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func
};

const defaultProps = {
  ...BaseModal.defaultProps,
  prefixClass: 'modal',
  animation: true,
  dialogComponentClass: ModalDialog,
  autoResizeHeight: true
};

const childContextTypes = {
  onModalHide: PropTypes.func
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStyles: {},
      bodyStyles: {}
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

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

    const node = findDOMNode(this.dialog);
    const doc = ownerDocument(node);
    const scrollHeight = node ? node.scrollHeight : 0;

    const bodyIsOverflowing = isOverflowing(findDOMNode(container || doc.body));
    const modalIsOverflowing = scrollHeight > doc.documentElement.clientHeight;
    const styles = {
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
  handleShow(...args) {

    this.windowResizeListener = on(window, 'resize', this.handleWindowResize);
    this.setState(this.getStyles());
    const { onEntering } = this.props;
    onEntering && onEntering(...args);
  }
  handleHide(...args) {
    if (this.windowResizeListener) {
      this.windowResizeListener.off();
    }
    const { onExited } = this.props;
    onExited && onExited(...args);
  }
  handleDialogClick(event) {
    if (event.target !== event.currentTarget) {
      return;
    }
    const { onHide } = this.props;
    onHide && onHide(event);
  }
  handleWindowResize() {
    this.setState(this.getStyles());
  }

  render() {
    const {
      className,
      children,
      dialogClassName,
      autoResizeHeight,
      animation,
      prefixClass,
      style,
      show,
      ...props
    } = this.props;

    const { modalStyles, bodyStyles } = this.state;
    const inClass = { in: show && !animation };
    const Dialog = props.dialogComponentClass;

    const parentProps = _.pick(props, Object.keys(BaseModal.propTypes).concat(['onExit', 'onExiting', 'onEnter', 'onEntered']));
    const dialogProps = _.omit(props, ['enforceFocus', 'keyboard', 'backdrop', 'onHide', 'dialogComponentClass']);

    const items = (autoResizeHeight && children) ? ReactChildren.map(children, (child) => {
      if (child.type.displayName === 'ModalBody') {
        return React.cloneElement(child, {
          style: bodyStyles
        });
      }
      return child;
    }) : children;

    const modal = (
      <Dialog
        {...dialogProps}
        style={{ ...modalStyles, ...style }}
        className={classNames(className, inClass)}
        dialogClassName={dialogClassName}
        onClick={props.backdrop === true ? this.handleDialogClick : null}
        ref={(ref) => {
          this.dialog = ref;
        }}
      >
        {items}
      </Dialog>
    );

    return (
      <BaseModal
        ref={(ref) => {
          this.modal = ref;
        }}
        show={show}
        onEntering={this.handleShow}
        onExited={this.handleHide}
        backdropClassName={classNames(`${prefixClass}-backdrop`, inClass)}
        containerClassName={`${prefixClass}-open`}
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

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
Modal.childContextTypes = childContextTypes;

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Footer = ModalFooter;
Modal.Dialog = ModalDialog;

export default Modal;
