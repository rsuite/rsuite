"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _curry2 = _interopRequireDefault(require("lodash/curry"));

var React = _interopRequireWildcard(require("react"));

var _Notification = _interopRequireDefault(require("./Notification"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _constants = require("../constants");

var _prefix = require("../utils/prefix");

var classPrefix = (0, _prefix.getClassNamePrefix)() + "notification";
var notification = new _Notification.default();

function appendIcon(type, content) {
  if (!_constants.STATUS_ICON_NAMES[type]) {
    return content;
  }

  return React.createElement("div", {
    className: classPrefix + "-title-with-icon"
  }, React.createElement(_Icon.default, {
    icon: _constants.STATUS_ICON_NAMES[type]
  }), content);
}

var closeActions = {
  close: function close(key) {
    notification.close(key);
  },
  closeAll: function closeAll() {
    notification.closeAll();
  }
};

function proxy(type, config) {
  notification.open((0, _extends2.default)({}, config, {
    type: type,
    title: appendIcon(type, config.title)
  }));
  return closeActions;
}

var sendMessage = (0, _curry2.default)(proxy);

var _default = (0, _extends2.default)({
  open: sendMessage('open'),
  info: sendMessage('info'),
  success: sendMessage('success'),
  warning: sendMessage('warning'),
  error: sendMessage('error')
}, closeActions);

exports.default = _default;
module.exports = exports.default;