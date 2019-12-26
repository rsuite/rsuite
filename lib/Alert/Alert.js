"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var _prefix = require("../utils/prefix");

var _NoticeManager = _interopRequireDefault(require("../Notification/NoticeManager"));

var Alert =
/*#__PURE__*/
function () {
  function Alert() {
    var _this = this;

    this.props = {
      duration: 2000,
      top: 5,
      classPrefix: (0, _prefix.defaultClassPrefix)('alert'),
      getContainer: null
    };
    this._instance = null;

    this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };
  }

  var _proto = Alert.prototype;

  _proto.setProps = function setProps(nextProps) {
    this.props = (0, _extends2.default)({}, this.props, {}, nextProps);

    if (nextProps.top !== undefined) {
      this._instance = null;
    }
  };

  _proto.getInstance = function getInstance(callback) {
    var _this$props = this.props,
        top = _this$props.top,
        style = _this$props.style,
        className = _this$props.className,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["top", "style", "className"]);
    var props = (0, _extends2.default)({
      style: (0, _extends2.default)({
        top: top
      }, style),
      className: (0, _classnames.default)(className, this.addPrefix('container'))
    }, rest);

    _NoticeManager.default.getInstance(props, callback);
  };

  _proto.open = function open(type, content, duration, onClose) {
    var _this2 = this;

    if (typeof content === 'function') {
      content = content();
    }

    var nextProps = {
      content: content,
      duration: typeof duration !== 'undefined' ? duration : this.props.duration,
      onClose: onClose,
      type: type,
      closable: true
    };

    if (!this._instance) {
      this.getInstance(function (nextInstance) {
        _this2._instance = nextInstance;

        _this2._instance.push(nextProps);
      });
    } else {
      this._instance.push(nextProps);
    }
  };

  _proto.close = function close(key) {
    if (this._instance) {
      this._instance.remove(key);
    }
  };

  _proto.closeAll = function closeAll() {
    if (this._instance) {
      this._instance.removeAll();
    }
  };

  return Alert;
}();

var _default = Alert;
exports.default = _default;
module.exports = exports.default;