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

var _FormGroup = require("../FormGroup/FormGroup");

var ControlLabel =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ControlLabel, _React$Component);

  function ControlLabel() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ControlLabel.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        srOnly = _this$props.srOnly,
        htmlFor = _this$props.htmlFor,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["srOnly", "htmlFor", "className", "classPrefix"]);
    var classes = (0, _classnames.default)(classPrefix, className, {
      'sr-only': srOnly
    });
    return React.createElement(_FormGroup.FormGroupContext.Consumer, null, function (controlId) {
      return React.createElement("label", (0, _extends2.default)({}, rest, {
        htmlFor: htmlFor || controlId,
        className: classes
      }));
    });
  };

  return ControlLabel;
}(React.Component);

ControlLabel.propTypes = {
  className: _propTypes.default.string,
  htmlFor: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  srOnly: _propTypes.default.bool
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'control-label'
})(ControlLabel);

exports.default = _default;
module.exports = exports.default;