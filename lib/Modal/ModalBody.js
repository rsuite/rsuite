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

var _setDisplayName = _interopRequireDefault(require("recompose/setDisplayName"));

var _utils = require("../utils");

var _ModalContext = _interopRequireDefault(require("./ModalContext"));

var ModalBody =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ModalBody, _React$Component);

  function ModalBody() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalBody.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        style = _this$props.style,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["classPrefix", "className", "style"]);
    var classes = (0, _classnames.default)(classPrefix, className);
    return React.createElement(_ModalContext.default.Consumer, null, function (context) {
      var bodyStyles = context ? context.getBodyStyles() : {};
      return React.createElement("div", (0, _extends2.default)({}, props, {
        style: (0, _extends2.default)({}, bodyStyles, {}, style),
        className: classes
      }));
    });
  };

  return ModalBody;
}(React.Component);

ModalBody.propTypes = {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string
};
var EnhancedModalBody = (0, _utils.defaultProps)({
  classPrefix: 'modal-body'
})(ModalBody);

var _default = (0, _setDisplayName.default)('ModalBody')(EnhancedModalBody);

exports.default = _default;
module.exports = exports.default;