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

var ProgressCircle =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ProgressCircle, _React$Component);

  function ProgressCircle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ProgressCircle.prototype;

  _proto.getPathStyles = function getPathStyles() {
    var _this$props = this.props,
        percent = _this$props.percent,
        strokeWidth = _this$props.strokeWidth,
        gapDegree = _this$props.gapDegree,
        gapPosition = _this$props.gapPosition,
        trailColor = _this$props.trailColor,
        strokeColor = _this$props.strokeColor;
    var radius = 50 - strokeWidth / 2;
    var beginPositionX = 0;
    var beginPositionY = -radius;
    var endPositionX = 0;
    var endPositionY = -2 * radius;

    switch (gapPosition) {
      case 'left':
        beginPositionX = -radius;
        beginPositionY = 0;
        endPositionX = 2 * radius;
        endPositionY = 0;
        break;

      case 'right':
        beginPositionX = radius;
        beginPositionY = 0;
        endPositionX = -2 * radius;
        endPositionY = 0;
        break;

      case 'bottom':
        beginPositionY = radius;
        endPositionY = 2 * radius;
        break;

      default:
    }

    var pathString = "M 50,50 m " + beginPositionX + "," + beginPositionY + "\n     a " + radius + "," + radius + " 0 1 1 " + endPositionX + "," + -endPositionY + "\n     a " + radius + "," + radius + " 0 1 1 " + -endPositionX + "," + endPositionY;
    var len = Math.PI * 2 * radius;
    var trailPathStyle = {
      stroke: trailColor,
      strokeDasharray: len - gapDegree + "px " + len + "px",
      strokeDashoffset: "-" + gapDegree / 2 + "px"
    };
    var strokePathStyle = {
      stroke: strokeColor,
      strokeDasharray: percent / 100 * (len - gapDegree) + "px " + len + "px",
      strokeDashoffset: "-" + gapDegree / 2 + "px"
    };
    return {
      pathString: pathString,
      trailPathStyle: trailPathStyle,
      strokePathStyle: strokePathStyle
    };
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        strokeWidth = _this$props2.strokeWidth,
        trailWidth = _this$props2.trailWidth,
        percent = _this$props2.percent,
        strokeLinecap = _this$props2.strokeLinecap,
        className = _this$props2.className,
        showInfo = _this$props2.showInfo,
        status = _this$props2.status,
        classPrefix = _this$props2.classPrefix,
        style = _this$props2.style,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["strokeWidth", "trailWidth", "percent", "strokeLinecap", "className", "showInfo", "status", "classPrefix", "style"]);

    var _this$getPathStyles = this.getPathStyles(),
        pathString = _this$getPathStyles.pathString,
        trailPathStyle = _this$getPathStyles.trailPathStyle,
        strokePathStyle = _this$getPathStyles.strokePathStyle;

    var addPrefix = (0, _utils.prefix)(classPrefix);
    var unhandled = (0, _utils.getUnhandledProps)(ProgressCircle, rest);
    var classes = (0, _classnames.default)(classPrefix, addPrefix('circle'), className, (_classNames = {}, _classNames[addPrefix("circle-" + (status || ''))] = !!status, _classNames));
    var showIcon = status && status !== 'active';
    var info = showIcon ? React.createElement("span", {
      className: addPrefix("icon-" + (status || ''))
    }) : React.createElement("span", {
      key: 1
    }, percent, "%");
    return React.createElement("div", {
      className: classes,
      style: style
    }, showInfo ? React.createElement("span", {
      className: addPrefix('circle-info')
    }, info) : null, React.createElement("svg", (0, _extends2.default)({
      className: addPrefix('svg'),
      viewBox: "0 0 100 100"
    }, unhandled), React.createElement("path", {
      className: addPrefix('trail'),
      d: pathString,
      strokeWidth: trailWidth || strokeWidth,
      fillOpacity: "0",
      style: trailPathStyle
    }), React.createElement("path", {
      d: pathString,
      strokeLinecap: strokeLinecap,
      className: addPrefix('stroke'),
      strokeWidth: this.props.percent === 0 ? 0 : strokeWidth,
      fillOpacity: "0",
      style: strokePathStyle
    })));
  };

  return ProgressCircle;
}(React.Component);

ProgressCircle.propTypes = {
  className: _propTypes.default.string,
  strokeColor: _propTypes.default.string,
  strokeLinecap: _propTypes.default.oneOf(['butt', 'round', 'square']),
  trailColor: _propTypes.default.string,
  percent: _propTypes.default.number,
  strokeWidth: _propTypes.default.number,
  trailWidth: _propTypes.default.number,
  gapDegree: _propTypes.default.number,
  gapPosition: _propTypes.default.oneOf(['top', 'bottom', 'left', 'right']),
  showInfo: _propTypes.default.bool,
  status: _propTypes.default.oneOf(['success', 'fail', 'active']),
  classPrefix: _propTypes.default.string
};
ProgressCircle.defaultProps = {
  percent: 0,
  strokeWidth: 6,
  trailWidth: 6,
  gapDegree: 0,
  showInfo: true,
  strokeLinecap: 'round',
  gapPosition: 'top'
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'progress'
})(ProgressCircle);

exports.default = _default;
module.exports = exports.default;