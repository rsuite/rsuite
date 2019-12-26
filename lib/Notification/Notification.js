"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _kebabCase2 = _interopRequireDefault(require("lodash/kebabCase"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var _prefix = require("../utils/prefix");

var _NoticeManager = _interopRequireDefault(require("./NoticeManager"));

var Notification =
/*#__PURE__*/
function () {
  function Notification() {
    var _this = this;

    this.props = {
      top: 24,
      bottom: 24,
      duration: 4500,
      placement: 'topEnd',
      classPrefix: (0, _prefix.defaultClassPrefix)('notification'),
      getContainer: null
    };
    this._instances = {};
    this._cacheInstances = [];

    this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };
  }

  var _proto = Notification.prototype;

  _proto.setProps = function setProps(nextProps) {
    this.props = (0, _extends2.default)({}, this.props, {}, nextProps);

    if (nextProps.top || nextProps.bottom) {
      this._instances = {};
    }
  };

  _proto.getPlacement = function getPlacement(placement) {
    return (0, _utils.placementPolyfill)(placement || this.props.placement);
  };

  _proto.getPlacementStyle = function getPlacementStyle(config) {
    var top = config.top,
        bottom = config.bottom;
    var placement = this.getPlacement(config.placement);
    var style = {};

    var _kebabCase$split = (0, _kebabCase2.default)(placement).split('-'),
        vertical = _kebabCase$split[0];

    if (vertical === 'top') {
      style.top = (0, _isUndefined2.default)(top) ? this.props.top : top;
    } else {
      style.bottom = (0, _isUndefined2.default)(top) ? this.props.bottom : bottom;
    }

    return style;
  };

  _proto.getInstance = function getInstance(config, callback) {
    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        getContainer = _this$props.getContainer;
    var style = this.getPlacementStyle(config);
    var placement = this.getPlacement(config.placement);
    var nextProps = {
      style: style,
      className: (0, _classnames.default)(this.addPrefix((0, _kebabCase2.default)(placement))),
      classPrefix: classPrefix,
      getContainer: getContainer
    };

    _NoticeManager.default.getInstance(nextProps, callback);
  };

  _proto.open = function open(nextProps) {
    var _this2 = this;

    var description = nextProps.description,
        onClose = nextProps.onClose,
        priorPlacement = nextProps.placement,
        _nextProps$duration = nextProps.duration,
        duration = _nextProps$duration === void 0 ? this.props.duration : _nextProps$duration,
        rest = (0, _objectWithoutPropertiesLoose2.default)(nextProps, ["description", "onClose", "placement", "duration"]);
    var placement = this.getPlacement(priorPlacement);
    var content = React.createElement("div", {
      className: this.addPrefix('content')
    }, React.createElement("div", {
      className: this.addPrefix('title')
    }, nextProps.title), React.createElement("div", {
      className: this.addPrefix('description')
    }, typeof description === 'function' ? description() : description));
    var config = {
      placement: placement,
      top: nextProps.top,
      bottom: nextProps.bottom
    };
    var itemProps = (0, _extends2.default)({
      closable: true,
      content: content,
      duration: duration,
      onClose: onClose
    }, rest);
    var instance = this._instances[placement];

    if (!instance) {
      this.getInstance(config, function (nextInstance) {
        nextInstance.push(itemProps);
        _this2._instances[placement] = nextInstance;
      });
    } else {
      instance.push(itemProps);
    }

    this._cacheInstances.push([placement, itemProps]);
  };

  _proto.close = function close(key) {
    if (!this._cacheInstances.length) {
      return;
    }

    if (typeof key !== 'undefined') {
      var find = function find(item) {
        return item[1].key === key;
      };

      var _this$_cacheInstances = this._cacheInstances.find(find),
          _placement = _this$_cacheInstances[0];

      this._instances[_placement].remove(key);

      this._cacheInstances = this._cacheInstances.filter(find);
      return;
    }

    var _this$_cacheInstances2 = this._cacheInstances.pop(),
        placement = _this$_cacheInstances2[0];

    this._instances[placement].remove();
  };

  _proto.closeAll = function closeAll() {
    for (var key in this._instances) {
      if (typeof this._instances[key].removeAll === 'function') {
        this._instances[key].removeAll();
      }
    }

    this._cacheInstances = [];
  };

  return Notification;
}();

var _default = Notification;
exports.default = _default;
module.exports = exports.default;