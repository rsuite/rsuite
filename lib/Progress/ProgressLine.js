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

var ProgressLine =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ProgressLine, _React$Component);

  function ProgressLine() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ProgressLine.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        percent = _this$props.percent,
        strokeColor = _this$props.strokeColor,
        strokeWidth = _this$props.strokeWidth,
        trailColor = _this$props.trailColor,
        trailWidth = _this$props.trailWidth,
        status = _this$props.status,
        showInfo = _this$props.showInfo,
        classPrefix = _this$props.classPrefix,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "percent", "strokeColor", "strokeWidth", "trailColor", "trailWidth", "status", "showInfo", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var unhandled = (0, _utils.getUnhandledProps)(ProgressLine, rest);
    var lineInnerStyle = {
      backgroundColor: trailColor,
      height: trailWidth || strokeWidth
    };
    var percentStyle = {
      width: percent + "%",
      backgroundColor: strokeColor,
      height: strokeWidth
    };
    var classes = (0, _classnames.default)(classPrefix, addPrefix('line'), className, (_classNames = {}, _classNames[addPrefix("line-" + (status || ''))] = !!status, _classNames));
    var showIcon = status && status !== 'active';
    var info = showIcon ? React.createElement("span", {
      className: addPrefix("icon-" + (status || ''))
    }) : React.createElement("span", {
      className: addPrefix('info-status')
    }, percent, "%");
    return React.createElement("div", (0, _extends2.default)({
      className: classes
    }, unhandled), React.createElement("div", {
      className: addPrefix('line-outer')
    }, React.createElement("div", {
      className: addPrefix('line-inner'),
      style: lineInnerStyle
    }, React.createElement("div", {
      className: addPrefix('line-bg'),
      style: percentStyle
    }))), showInfo ? React.createElement("div", {
      className: addPrefix('info')
    }, info) : null);
  };

  return ProgressLine;
}(React.Component);

ProgressLine.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  percent: _propTypes.default.number,
  strokeColor: _propTypes.default.string,
  strokeWidth: _propTypes.default.number,
  trailColor: _propTypes.default.string,
  trailWidth: _propTypes.default.number,
  showInfo: _propTypes.default.bool,
  status: _propTypes.default.oneOf(['success', 'fail', 'active'])
};
ProgressLine.defaultProps = {
  showInfo: true,
  percent: 0
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'progress'
})(ProgressLine);

exports.default = _default;
module.exports = exports.default;