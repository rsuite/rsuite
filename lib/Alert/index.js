"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Alert = _interopRequireDefault(require("./Alert"));

var _constants = require("../constants");

var alert = new _Alert.default();

function appendIcon(type, content) {
  return React.createElement("div", null, React.createElement(_Icon.default, {
    icon: _constants.STATUS_ICON_NAMES[type]
  }), content);
}

var closeActions = {
  close: function close(key) {
    alert.close(key);
  },
  closeAll: function closeAll() {
    alert.closeAll();
  }
};

function proxy(type) {
  return function (content, duration, onClose) {
    alert.open(type, appendIcon(type, content), duration, onClose);
    return closeActions;
  };
}

var _default = (0, _extends2.default)({
  info: proxy('info'),
  success: proxy('success'),
  warning: proxy('warning'),
  error: proxy('error'),
  config: function config(nextProps) {
    alert.setProps(nextProps);
  }
}, closeActions);

exports.default = _default;
module.exports = exports.default;