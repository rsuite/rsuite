"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _IntlContext = _interopRequireDefault(require("./IntlContext"));

var FormattedMessage = function FormattedMessage(_ref) {
  var id = _ref.id,
      componentClass = _ref.componentClass;
  var Component = componentClass || 'span';
  return React.createElement(Component, null, React.createElement(_IntlContext.default.Consumer, null, function (context) {
    if (context && typeof id === 'string' && typeof context[id] !== 'undefined') {
      return context[id];
    }

    return id;
  }));
};

var _default = FormattedMessage;
exports.default = _default;
module.exports = exports.default;