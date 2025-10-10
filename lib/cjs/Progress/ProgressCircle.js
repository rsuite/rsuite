'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _statusIcons = require("../internals/constants/statusIcons");
var _hooks = require("../internals/hooks");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "strokeWidth", "trailWidth", "width", "percent", "strokeLinecap", "className", "showInfo", "status", "classPrefix", "style", "gapDegree", "gapPosition", "trailColor", "strokeColor"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `Progress.Circle` component is used to display the progress of current operation.
 * @see https://rsuitejs.com/components/progress/#circle
 */
var ProgressCircle = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _withClassPrefix;
  var _useCustom = (0, _CustomProvider.useCustom)('ProgressCircle', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$st = propsWithDefaults.strokeWidth,
    strokeWidth = _propsWithDefaults$st === void 0 ? 6 : _propsWithDefaults$st,
    _propsWithDefaults$tr = propsWithDefaults.trailWidth,
    trailWidth = _propsWithDefaults$tr === void 0 ? 6 : _propsWithDefaults$tr,
    width = propsWithDefaults.width,
    _propsWithDefaults$pe = propsWithDefaults.percent,
    percent = _propsWithDefaults$pe === void 0 ? 0 : _propsWithDefaults$pe,
    _propsWithDefaults$st2 = propsWithDefaults.strokeLinecap,
    strokeLinecap = _propsWithDefaults$st2 === void 0 ? 'round' : _propsWithDefaults$st2,
    className = propsWithDefaults.className,
    _propsWithDefaults$sh = propsWithDefaults.showInfo,
    showInfo = _propsWithDefaults$sh === void 0 ? true : _propsWithDefaults$sh,
    status = propsWithDefaults.status,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'progress' : _propsWithDefaults$cl,
    style = propsWithDefaults.style,
    _propsWithDefaults$ga = propsWithDefaults.gapDegree,
    gapDegree = _propsWithDefaults$ga === void 0 ? 0 : _propsWithDefaults$ga,
    _propsWithDefaults$ga2 = propsWithDefaults.gapPosition,
    gapPosition = _propsWithDefaults$ga2 === void 0 ? 'top' : _propsWithDefaults$ga2,
    trailColor = propsWithDefaults.trailColor,
    strokeColor = propsWithDefaults.strokeColor,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var getPathStyles = (0, _react.useCallback)(function () {
    var radius = 50 - strokeWidth / 2;
    var x1 = 0;
    var y1 = -radius;
    var x2 = 0;
    var y2 = -2 * radius;
    switch (gapPosition) {
      case 'left':
        x1 = -radius;
        y1 = 0;
        x2 = 2 * radius;
        y2 = 0;
        break;
      case 'right':
        x1 = radius;
        y1 = 0;
        x2 = -2 * radius;
        y2 = 0;
        break;
      case 'bottom':
        y1 = radius;
        y2 = 2 * radius;
        break;
      default:
    }
    var pathString = "M 50,50 m " + x1 + "," + y1 + " a " + radius + "," + radius + " 0 1 1 " + x2 + "," + -y2 + " a " + radius + "," + radius + " 0 1 1 " + -x2 + "," + y2;
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
  }, [gapDegree, gapPosition, percent, strokeColor, strokeWidth, trailColor]);
  var _getPathStyles = getPathStyles(),
    pathString = _getPathStyles.pathString,
    trailPathStyle = _getPathStyles.trailPathStyle,
    strokePathStyle = _getPathStyles.strokePathStyle;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix('circle', (_withClassPrefix = {}, _withClassPrefix["circle-" + (status || '')] = !!status, _withClassPrefix)));
  var showIcon = status && status !== 'active';
  var info = showIcon ? /*#__PURE__*/_react.default.createElement("span", {
    className: prefix("icon-" + (status || ''))
  }, _statusIcons.PROGRESS_STATUS_ICON[status]) : /*#__PURE__*/_react.default.createElement("span", {
    key: 1
  }, percent, "%");
  return /*#__PURE__*/_react.default.createElement(Component, {
    role: "progressbar",
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    "aria-valuenow": percent,
    ref: ref,
    className: classes,
    style: style
  }, showInfo ? /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('circle-info')
  }, info) : null, /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
    className: prefix('svg'),
    viewBox: "0 0 100 100",
    width: width
  }, rest), /*#__PURE__*/_react.default.createElement("path", {
    className: prefix('trail'),
    d: pathString,
    strokeWidth: trailWidth || strokeWidth,
    fillOpacity: "0",
    style: trailPathStyle
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: pathString,
    strokeLinecap: strokeLinecap,
    className: prefix('stroke'),
    strokeWidth: percent === 0 ? 0 : strokeWidth,
    fillOpacity: "0",
    style: strokePathStyle
  })));
});
ProgressCircle.displayName = 'ProgressCircle';
ProgressCircle.propTypes = {
  className: _propTypes.default.string,
  strokeColor: _propTypes.default.string,
  strokeLinecap: (0, _propTypes2.oneOf)(['butt', 'round', 'square']),
  trailColor: _propTypes.default.string,
  percent: _propTypes.default.number,
  strokeWidth: _propTypes.default.number,
  trailWidth: _propTypes.default.number,
  width: _propTypes.default.number,
  gapDegree: _propTypes.default.number,
  gapPosition: (0, _propTypes2.oneOf)(['top', 'bottom', 'left', 'right']),
  showInfo: _propTypes.default.bool,
  status: (0, _propTypes2.oneOf)(['success', 'fail', 'active']),
  classPrefix: _propTypes.default.string
};
var _default = exports.default = ProgressCircle;