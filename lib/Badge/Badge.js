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

var _utils = require("../utils");

var _classnames = _interopRequireDefault(require("classnames"));

var Badge =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Badge, _React$Component);

  function Badge() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Badge.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        children = _this$props.children,
        contentText = _this$props.content,
        maxCount = _this$props.maxCount,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "classPrefix", "children", "content", "maxCount"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var dot = contentText === undefined || contentText === null;
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('independent')] = !children, _classNames[addPrefix('wrapper')] = children, _classNames[addPrefix('dot')] = dot, _classNames));
    var content = // $FlowFixMe I'm sure contenxtText is number type and maxCount is number type.
    typeof contentText === 'number' && contentText > maxCount ? maxCount + "+" : contentText;

    if (!children) {
      return React.createElement("div", (0, _extends2.default)({}, rest, {
        className: classes
      }), content);
    }

    return React.createElement("div", (0, _extends2.default)({}, rest, {
      className: classes
    }), children, React.createElement("div", {
      className: addPrefix('content')
    }, content));
  };

  return Badge;
}(React.Component);

Badge.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  content: _propTypes.default.node,
  maxCount: _propTypes.default.number
};
Badge.defaultProps = {
  maxCount: 99
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'badge'
})(Badge);

exports.default = _default;
module.exports = exports.default;