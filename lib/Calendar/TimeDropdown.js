"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _camelCase2 = _interopRequireDefault(require("lodash/camelCase"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _domLib = require("dom-lib");

var _FormattedMessage = _interopRequireDefault(require("../IntlProvider/FormattedMessage"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var _scrollTopAnimation = _interopRequireDefault(require("../utils/scrollTopAnimation"));

var _set_hours = _interopRequireDefault(require("date-fns/set_hours"));

var _set_minutes = _interopRequireDefault(require("date-fns/set_minutes"));

var _set_seconds = _interopRequireDefault(require("date-fns/set_seconds"));

var _get_seconds = _interopRequireDefault(require("date-fns/get_seconds"));

var _get_minutes = _interopRequireDefault(require("date-fns/get_minutes"));

var _get_hours = _interopRequireDefault(require("date-fns/get_hours"));

var ranges = {
  hours: {
    start: 0,
    end: 23
  },
  minutes: {
    start: 0,
    end: 59
  },
  seconds: {
    start: 0,
    end: 59
  }
};

var TimeDropdown =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(TimeDropdown, _React$PureComponent);

  function TimeDropdown() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.container = {};
    _this.content = {};

    _this.scrollTo = function (time) {
      Object.entries(time).forEach(function (item) {
        var container = _this.container[item[0]];
        var node = container.querySelector("[data-key=\"" + item[0] + "-" + item[1] + "\"]");

        if (node && container) {
          var _getPosition = (0, _domLib.getPosition)(node, container),
              top = _getPosition.top;

          (0, _scrollTopAnimation.default)(_this.container[item[0]], top, (0, _domLib.scrollTop)(_this.container[item[0]]) !== 0);
        }
      });
    };

    _this.handleClick = function (type, d, event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          date = _this$props.date; // $FlowFixMe

      var nextDate = date || new Date();

      switch (type) {
        case 'hours':
          nextDate = (0, _set_hours.default)(date, d);
          break;

        case 'minutes':
          nextDate = (0, _set_minutes.default)(date, d);
          break;

        case 'seconds':
          nextDate = (0, _set_seconds.default)(date, d);
          break;
      }

      onSelect === null || onSelect === void 0 ? void 0 : onSelect(nextDate, event);
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = TimeDropdown.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updatePosition();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.updatePosition();
  };

  _proto.getTime = function getTime(props) {
    var _ref = props || this.props,
        format = _ref.format,
        date = _ref.date;

    var time = date || new Date();
    var nextTime = {};

    if (!format) {
      return nextTime;
    }

    if (/(H|h)/.test(format)) {
      nextTime.hours = (0, _get_hours.default)(time);
    }

    if (/m/.test(format)) {
      nextTime.minutes = (0, _get_minutes.default)(time);
    }

    if (/s/.test(format)) {
      nextTime.seconds = (0, _get_seconds.default)(time);
    }

    return nextTime;
  };

  _proto.updatePosition = function updatePosition(props) {
    var _ref2 = props || this.props,
        show = _ref2.show;

    var time = this.getTime(props);
    show && this.scrollTo(time);
  };

  _proto.renderColumn = function renderColumn(type, active) {
    var _this2 = this;

    if (!(0, _isNumber2.default)(active)) {
      return null;
    }

    var date = this.props.date;
    var _ranges$type = ranges[type],
        start = _ranges$type.start,
        end = _ranges$type.end;
    var items = [];
    var hideFunc = this.props[(0, _camelCase2.default)("hide_" + type)];
    var disabledFunc = this.props[(0, _camelCase2.default)("disabled_" + type)];

    var _loop = function _loop(i) {
      if (!(hideFunc === null || hideFunc === void 0 ? void 0 : hideFunc(i, date))) {
        var _classNames;

        var disabled = disabledFunc === null || disabledFunc === void 0 ? void 0 : disabledFunc(i, date);
        var itemClasses = (0, _classnames.default)(_this2.addPrefix('cell'), (_classNames = {}, _classNames[_this2.addPrefix('cell-active')] = active === i, _classNames[_this2.addPrefix('cell-disabled')] = disabled, _classNames));
        items.push(React.createElement("li", {
          key: i
        }, React.createElement("a", {
          role: "menu",
          className: itemClasses,
          tabIndex: -1,
          "data-key": type + "-" + i,
          onClick: function onClick(event) {
            !disabled && _this2.handleClick(type, i, event);
          }
        }, i)));
      }
    };

    for (var i = start; i <= end; i += 1) {
      _loop(i);
    }

    return React.createElement("div", {
      className: this.addPrefix('column')
    }, React.createElement("div", {
      className: this.addPrefix('column-title')
    }, React.createElement(_FormattedMessage.default, {
      id: type
    })), React.createElement("ul", {
      ref: function ref(_ref3) {
        _this2.container[type] = _ref3;
      }
    }, items));
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props2 = this.props,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["className", "classPrefix"]);
    var time = this.getTime();
    var classes = (0, _classnames.default)(classPrefix, className);
    var unhandled = (0, _utils.getUnhandledProps)(TimeDropdown, rest);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes
    }), React.createElement("div", {
      className: this.addPrefix('content'),
      ref: function ref(_ref4) {
        _this3.content = _ref4;
      }
    }, React.createElement("div", {
      className: this.addPrefix('row')
    }, this.renderColumn('hours', time.hours), this.renderColumn('minutes', time.minutes), this.renderColumn('seconds', time.seconds))));
  };

  return TimeDropdown;
}(React.PureComponent);

TimeDropdown.propTypes = {
  date: _propTypes.default.instanceOf(Date),
  show: _propTypes.default.bool,
  format: _propTypes.default.string,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  disabledDate: _propTypes.default.func,
  disabledHours: _propTypes.default.func,
  disabledMinutes: _propTypes.default.func,
  disabledSeconds: _propTypes.default.func,
  hideHours: _propTypes.default.func,
  hideMinutes: _propTypes.default.func,
  hideSeconds: _propTypes.default.func,
  onSelect: _propTypes.default.func
};
TimeDropdown.defaultProps = {
  show: false
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'calendar-time-dropdown'
});

var _default = enhance(TimeDropdown);

exports.default = _default;
module.exports = exports.default;