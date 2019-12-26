"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../utils");

var Message =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Message, _React$Component);

  function Message() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.closeTimer = null;

    _this.close = function () {
      var _this$props$onClose, _this$props;

      _this.clearCloseTimer();

      (_this$props$onClose = (_this$props = _this.props).onClose) === null || _this$props$onClose === void 0 ? void 0 : _this$props$onClose.call(_this$props);
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = Message.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var duration = this.props.duration;

    if (duration) {
      this.closeTimer = setTimeout(function () {
        _this2.close();
      }, duration);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.clearCloseTimer();
  };

  _proto.clearCloseTimer = function clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        classPrefix = _this$props2.classPrefix,
        closable = _this$props2.closable,
        className = _this$props2.className,
        content = _this$props2.content,
        style = _this$props2.style,
        _this$props2$type = _this$props2.type,
        type = _this$props2$type === void 0 ? '' : _this$props2$type;
    var ns = this.addPrefix('item');
    var classes = (0, _classnames.default)(ns, (_classNames = {}, _classNames[this.addPrefix('item-closable')] = closable, _classNames[classPrefix + "-" + type] = !!type, _classNames));
    return React.createElement("div", {
      style: style,
      className: (0, _classnames.default)(className, ns + "-wrapper")
    }, React.createElement("div", {
      className: classes
    }, React.createElement("div", {
      className: ns + "-content"
    }, content), closable && React.createElement("div", {
      role: "button",
      tabIndex: -1,
      onClick: this.close,
      className: ns + "-close"
    }, React.createElement("span", {
      className: ns + "-close-x"
    }))));
  };

  return Message;
}(React.Component);

Message.propTypes = {
  duration: _propTypes.default.number,
  content: _propTypes.default.any,
  closable: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  type: _propTypes.default.string,
  onClose: _propTypes.default.func,
  style: _propTypes.default.object
};
var _default = Message;
exports.default = _default;
module.exports = exports.default;