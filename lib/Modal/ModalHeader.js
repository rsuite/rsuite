"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var _ModalContext = _interopRequireDefault(require("./ModalContext"));

var ModalHeader =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ModalHeader, _React$Component);

  function ModalHeader() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        onHide = _this$props.onHide,
        className = _this$props.className,
        closeButton = _this$props.closeButton,
        children = _this$props.children,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["classPrefix", "onHide", "className", "closeButton", "children"]);
    var classes = (0, _classnames.default)(classPrefix, className);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var buttonElement = React.createElement(_ModalContext.default.Consumer, null, function (context) {
      return React.createElement("button", {
        type: "button",
        className: addPrefix('close'),
        "aria-label": "Close",
        onClick: (0, _utils.createChainedFunction)(onHide, context ? context.onModalHide : null)
      }, React.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7"));
    });
    return React.createElement("div", (0, _extends2.default)({}, props, {
      className: classes
    }), closeButton && buttonElement, children);
  };

  return ModalHeader;
}(React.Component);

ModalHeader.propTypes = {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  closeButton: _propTypes.default.bool,
  children: _propTypes.default.node,
  onHide: _propTypes.default.func
};
ModalHeader.defaultProps = {
  closeButton: true
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'modal-header'
})(ModalHeader);

exports.default = _default;
module.exports = exports.default;