"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _kebabCase2 = _interopRequireDefault(require("lodash/kebabCase"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var _constants = require("../constants");

var ErrorMessage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ErrorMessage, _React$Component);

  function ErrorMessage() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ErrorMessage.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        show = _this$props.show,
        classPrefix = _this$props.classPrefix,
        children = _this$props.children,
        placement = _this$props.placement,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "show", "classPrefix", "children", "placement"]);

    if (!show) {
      return null;
    }

    var addPrefix = (0, _utils.prefix)(classPrefix);
    var wrapClasses = (0, _classnames.default)(addPrefix('wrapper'), className, (_classNames = {}, _classNames[addPrefix("placement-" + (0, _kebabCase2.default)((0, _utils.placementPolyfill)(placement)))] = placement, _classNames));
    var classes = (0, _classnames.default)(classPrefix, addPrefix('show'));
    return React.createElement("div", (0, _extends2.default)({}, props, {
      className: wrapClasses
    }), React.createElement("span", {
      className: classes
    }, React.createElement("span", {
      className: addPrefix('arrow')
    }), React.createElement("span", {
      className: addPrefix('inner')
    }, children)));
  };

  return ErrorMessage;
}(React.Component);

ErrorMessage.propTypes = {
  show: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  placement: _propTypes.default.oneOf(_constants.PLACEMENT_8)
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'error-message'
})(ErrorMessage);

exports.default = _default;
module.exports = exports.default;