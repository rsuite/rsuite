"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _recompose = require("recompose");

var _prefix = _interopRequireDefault(require("./prefix"));

var _constants = require("../constants");

function withStyleProps(options) {
  if (options === void 0) {
    options = {};
  }

  return function (Component) {
    var _options = options,
        hasSize = _options.hasSize,
        hasStatus = _options.hasStatus,
        hasColor = _options.hasColor,
        defaultColor = _options.defaultColor;
    var WithStyleComponent = React.forwardRef(function (props, ref) {
      var _classNames;

      var classPrefix = props.classPrefix,
          size = props.size,
          color = props.color,
          status = props.status,
          className = props.className,
          rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["classPrefix", "size", "color", "status", "className"]);
      var addPrefix = (0, _prefix.default)(classPrefix);
      var classes = (0, _classnames.default)(className, (_classNames = {}, _classNames[addPrefix(size)] = hasSize && size, _classNames[addPrefix(color)] = hasColor && color, _classNames[addPrefix(defaultColor)] = !color, _classNames[addPrefix(status)] = hasStatus && status, _classNames));
      return React.createElement(Component, (0, _extends2.default)({}, rest, {
        classPrefix: classPrefix,
        className: classes,
        ref: ref
      }));
    });
    var propTypes = {
      innerRef: _propTypes.default.func
    };

    if (hasSize) {
      propTypes.size = _propTypes.default.oneOf(_constants.SIZE);
    }

    if (hasColor) {
      propTypes.color = _propTypes.default.oneOf(_constants.COLOR);
    }

    if (hasStatus) {
      propTypes.status = _propTypes.default.oneOf(_constants.STATUS);
    }

    WithStyleComponent.displayName = (0, _recompose.wrapDisplayName)(Component, 'withStyleProps');
    WithStyleComponent.defaultProps = Component.defaultProps;
    (0, _recompose.setPropTypes)(propTypes)(WithStyleComponent);
    return WithStyleComponent;
  };
}

var _default = withStyleProps;
exports.default = _default;
module.exports = exports.default;