"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _setDisplayName = _interopRequireDefault(require("recompose/setDisplayName"));

var _setStatic = _interopRequireDefault(require("recompose/setStatic"));

var _elementResizeEvent = _interopRequireWildcard(require("element-resize-event"));

var _Modal = _interopRequireDefault(require("rsuite-utils/lib/Overlay/Modal"));

var _Bounce = _interopRequireDefault(require("rsuite-utils/lib/Animation/Bounce"));

var _domLib = require("dom-lib");

var _utils = require("../utils");

var _ModalDialog = _interopRequireDefault(require("./ModalDialog"));

var _ModalBody = _interopRequireDefault(require("./ModalBody"));

var _ModalHeader = _interopRequireDefault(require("./ModalHeader"));

var _ModalTitle = _interopRequireDefault(require("./ModalTitle"));

var _ModalFooter = _interopRequireDefault(require("./ModalFooter"));

var _constants = require("../constants");

var _ModalContext = _interopRequireDefault(require("./ModalContext"));

var BACKDROP_TRANSITION_DURATION = 150;

var Modal =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Modal, _React$Component);

  function Modal(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.dialogRef = void 0;
    _this.modalRef = void 0;
    _this.windowResizeListener = null;
    _this.contentElement = null;

    _this.getBodyStyles = function () {
      return _this.state.bodyStyles;
    };

    _this.handleShow = function () {
      var dialogElement = _this.dialogRef.current;

      _this.updateModalStyles(dialogElement);

      _this.contentElement = dialogElement.querySelector("." + _this.addPrefix('content'));
      _this.windowResizeListener = (0, _domLib.on)(window, 'resize', _this.handleResize);
      (0, _elementResizeEvent.default)(_this.contentElement, _this.handleResize);
    };

    _this.handleHide = function () {
      _this.destroyEvent();
    };

    _this.handleDialogClick = function (event) {
      if (event.target !== event.currentTarget) {
        return;
      }

      var onHide = _this.props.onHide;
      onHide && onHide(event);
    };

    _this.handleResize = function () {
      _this.updateModalStyles(_this.dialogRef.current);
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.state = {
      modalStyles: {},
      bodyStyles: {}
    };
    _this.dialogRef = React.createRef();
    _this.modalRef = React.createRef();
    return _this;
  }

  var _proto = Modal.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.destroyEvent();
  };

  _proto.getStyles = function getStyles(dialogElement) {
    var _modalStyles;

    var _this$props = this.props,
        container = _this$props.container,
        overflow = _this$props.overflow,
        drawer = _this$props.drawer;
    var node = dialogElement || this.dialogRef.current;
    var doc = (0, _domLib.ownerDocument)(node);
    var scrollHeight = node ? node.scrollHeight : 0;
    var bodyIsOverflowing = (0, _domLib.isOverflowing)(container || doc.body);
    var modalIsOverflowing = scrollHeight > doc.documentElement.clientHeight;
    var styles = {
      modalStyles: (_modalStyles = {}, _modalStyles[(0, _utils.isRTL)() ? 'paddingLeft' : 'paddingRight'] = bodyIsOverflowing && !modalIsOverflowing ? (0, _domLib.getScrollbarSize)() : 0, _modalStyles[(0, _utils.isRTL)() ? 'paddingRight' : 'paddingLeft'] = !bodyIsOverflowing && modalIsOverflowing ? (0, _domLib.getScrollbarSize)() : 0, _modalStyles),
      bodyStyles: {}
    };

    if (!overflow) {
      return styles;
    }

    var bodyStyles = {
      overflow: 'auto'
    };

    if (node) {
      // default margin
      var headerHeight = 46;
      var footerHeight = 46;
      var contentHeight = 30;
      var headerDOM = node.querySelector("." + this.addPrefix('header'));
      var footerDOM = node.querySelector("." + this.addPrefix('footer'));
      var contentDOM = node.querySelector("." + this.addPrefix('content'));
      headerHeight = headerDOM ? (0, _domLib.getHeight)(headerDOM) + headerHeight : headerHeight;
      footerHeight = footerDOM ? (0, _domLib.getHeight)(footerDOM) + headerHeight : headerHeight;
      contentHeight = contentDOM ? (0, _domLib.getHeight)(contentDOM) + contentHeight : contentHeight;

      if (drawer) {
        bodyStyles.height = contentHeight - (headerHeight + footerHeight);
      } else {
        /**
         * Header height + Footer height + Dialog margin
         */
        var excludeHeight = headerHeight + footerHeight + 60;
        var bodyHeight = (0, _domLib.getHeight)(window) - excludeHeight;
        var maxHeight = scrollHeight >= bodyHeight ? bodyHeight : scrollHeight;
        bodyStyles.maxHeight = maxHeight;
      }
    }

    styles.bodyStyles = bodyStyles;
    return styles;
  };

  _proto.destroyEvent = function destroyEvent() {
    if (this.windowResizeListener) {
      this.windowResizeListener.off();
    }

    if (this.contentElement) {
      (0, _elementResizeEvent.unbind)(this.contentElement);
    }
  };

  _proto.updateModalStyles = function updateModalStyles(dialogElement) {
    this.setState(this.getStyles(dialogElement));
  };

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props2 = this.props,
        className = _this$props2.className,
        children = _this$props2.children,
        dialogClassName = _this$props2.dialogClassName,
        backdropClassName = _this$props2.backdropClassName,
        dialogStyle = _this$props2.dialogStyle,
        animation = _this$props2.animation,
        classPrefix = _this$props2.classPrefix,
        style = _this$props2.style,
        show = _this$props2.show,
        size = _this$props2.size,
        full = _this$props2.full,
        dialogComponentClass = _this$props2.dialogComponentClass,
        animationProps = _this$props2.animationProps,
        animationTimeout = _this$props2.animationTimeout,
        onHide = _this$props2.onHide,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["className", "children", "dialogClassName", "backdropClassName", "dialogStyle", "animation", "classPrefix", "style", "show", "size", "full", "dialogComponentClass", "animationProps", "animationTimeout", "onHide"]);
    var modalStyles = this.state.modalStyles;
    var inClass = {
      in: show && !animation
    };
    var Dialog = dialogComponentClass;
    var parentProps = (0, _pick2.default)(rest, (0, _get2.default)(_Modal.default, 'handledProps'));
    var classes = (0, _classnames.default)(this.addPrefix(size), className, (_classNames = {}, _classNames[this.addPrefix('full')] = full, _classNames));
    var modal = React.createElement(Dialog, (0, _extends2.default)({}, (0, _pick2.default)(rest, Object.keys(_ModalDialog.default.propTypes || {})), {
      style: (0, _extends2.default)({}, modalStyles, {}, style),
      classPrefix: classPrefix,
      className: classes,
      dialogClassName: dialogClassName,
      dialogStyle: dialogStyle,
      onClick: rest.backdrop === true ? this.handleDialogClick : null,
      dialogRef: this.dialogRef
    }), children);
    return React.createElement(_ModalContext.default.Provider, {
      value: {
        onModalHide: onHide,
        getBodyStyles: this.getBodyStyles
      }
    }, React.createElement(_Modal.default, (0, _extends2.default)({
      ref: this.modalRef,
      show: show,
      onHide: onHide,
      className: this.addPrefix('wrapper'),
      onEntering: (0, _utils.createChainedFunction)(this.handleShow, this.props.onEntering),
      onExited: (0, _utils.createChainedFunction)(this.handleHide, this.props.onExited),
      backdropClassName: (0, _classnames.default)(this.addPrefix('backdrop'), backdropClassName, inClass),
      containerClassName: (0, _classnames.default)(this.addPrefix('open'), (_classNames2 = {}, _classNames2[this.addPrefix('has-backdrop')] = rest.backdrop, _classNames2)),
      transition: animation ? animation : undefined,
      animationProps: animationProps,
      dialogTransitionTimeout: animationTimeout,
      backdropTransitionTimeout: BACKDROP_TRANSITION_DURATION
    }, parentProps), modal));
  };

  return Modal;
}(React.Component);

Modal.propTypes = {
  classPrefix: _propTypes.default.string,
  size: _propTypes.default.oneOf(_constants.SIZE),
  container: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  onRendered: _propTypes.default.func,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  dialogClassName: _propTypes.default.string,
  backdropClassName: _propTypes.default.string,
  style: _propTypes.default.object,
  dialogStyle: _propTypes.default.object,
  backdropStyle: _propTypes.default.object,
  show: _propTypes.default.bool,
  full: _propTypes.default.bool,
  backdrop: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  keyboard: _propTypes.default.bool,
  transition: _propTypes.default.elementType,
  dialogTransitionTimeout: _propTypes.default.number,
  backdropTransitionTimeout: _propTypes.default.number,
  autoFocus: _propTypes.default.bool,
  enforceFocus: _propTypes.default.bool,
  overflow: _propTypes.default.bool,
  drawer: _propTypes.default.bool,
  dialogComponentClass: _propTypes.default.elementType,
  animation: _propTypes.default.any,
  animationProps: _propTypes.default.object,
  animationTimeout: _propTypes.default.number,
  onEscapeKeyUp: _propTypes.default.func,
  onBackdropClick: _propTypes.default.func,
  onShow: _propTypes.default.func,
  onHide: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func
};
Modal.defaultProps = {
  size: 'sm',
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  animation: _Bounce.default,
  animationTimeout: 300,
  dialogComponentClass: _ModalDialog.default,
  overflow: true
};
var EnhancedModal = (0, _utils.defaultProps)({
  classPrefix: 'modal'
})(Modal);
(0, _setStatic.default)('Body', _ModalBody.default)(EnhancedModal);
(0, _setStatic.default)('Header', _ModalHeader.default)(EnhancedModal);
(0, _setStatic.default)('Title', _ModalTitle.default)(EnhancedModal);
(0, _setStatic.default)('Footer', _ModalFooter.default)(EnhancedModal);
(0, _setStatic.default)('Dialog', _ModalDialog.default)(EnhancedModal);

var _default = (0, _setDisplayName.default)('Modal')(EnhancedModal);

exports.default = _default;
module.exports = exports.default;