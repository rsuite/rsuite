"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var React = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _default2 = _interopRequireDefault(require("./locales/default"));

var _IntlContext = _interopRequireDefault(require("./IntlContext"));

var mergeObject = function mergeObject(list) {
  return list.reduce(function (a, b) {
    a = (0, _extends2.default)({}, a, {}, b);
    return a;
  }, {});
};

function withLocale(combineKeys) {
  if (combineKeys === void 0) {
    combineKeys = [];
  }

  return function (BaseComponent) {
    var factory = React.createFactory(BaseComponent);
    var WithLocale = React.forwardRef(function (props, ref) {
      return React.createElement(_IntlContext.default.Consumer, null, function (value) {
        var locale = mergeObject(combineKeys.map(function (key) {
          return (0, _get2.default)(value || _default2.default, "" + key);
        }));

        if (value && typeof value.rtl !== undefined) {
          locale.rtl = value.rtl;
        } else if (typeof window !== 'undefined' && (document.body.getAttribute('dir') || document.dir) === 'rtl') {
          locale.rtl = true;
        }

        return factory((0, _extends2.default)({
          ref: ref,
          locale: locale
        }, props));
      });
    });
    WithLocale.displayName = BaseComponent.displayName;

    if (process.env.NODE_ENV !== 'production') {
      return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, 'withLocale'))(WithLocale);
    }

    return WithLocale;
  };
}

var _default = withLocale;
exports.default = _default;
module.exports = exports.default;