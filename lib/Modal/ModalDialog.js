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

var _compose = _interopRequireDefault(require("recompose/compose"));

var _utils = require("../utils");

var ModalDialog =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ModalDialog, _React$Component);

  function ModalDialog() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalDialog.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        children = _this$props.children,
        dialogClassName = _this$props.dialogClassName,
        dialogStyle = _this$props.dialogStyle,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        dialogRef = _this$props.dialogRef,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["style", "children", "dialogClassName", "dialogStyle", "classPrefix", "className", "dialogRef"]);
    var modalStyle = (0, _extends2.default)({
      display: 'block'
    }, style);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var dialogClasses = (0, _classnames.default)(addPrefix('dialog'), dialogClassName);
    return React.createElement("div", (0, _extends2.default)({}, props, {
      title: null,
      role: "dialog",
      ref: dialogRef,
      className: (0, _classnames.default)(classPrefix, className),
      style: modalStyle
    }), React.createElement("div", {
      className: dialogClasses,
      style: dialogStyle
    }, React.createElement("div", {
      className: addPrefix('content'),
      role: "document"
    }, children)));
  };

  return ModalDialog;
}(React.Component);

ModalDialog.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  dialogClassName: _propTypes.default.string,
  style: _propTypes.default.object,
  dialogStyle: _propTypes.default.object,
  children: _propTypes.default.node,
  dialogRef: _propTypes.default.object
};

var _default = (0, _compose.default)((0, _utils.withStyleProps)({
  hasSize: true
}), (0, _utils.defaultProps)({
  classPrefix: 'modal'
}))(ModalDialog);

exports.default = _default;
module.exports = exports.default;