"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _utils = require("../utils");

var _IntlContext = _interopRequireDefault(require("../IntlProvider/IntlContext"));

var Header =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(Header, _React$PureComponent);

  function Header() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = Header.prototype;

  _proto.getTimeFormat = function getTimeFormat() {
    var format = this.props.format;
    var timeFormat = [];

    if (!format) {
      return '';
    }

    if (/(H|h)/.test(format)) {
      timeFormat.push('HH');
    }

    if (/m/.test(format)) {
      timeFormat.push('mm');
    }

    if (/s/.test(format)) {
      timeFormat.push('ss');
    }

    return timeFormat.join(':');
  };

  _proto.getDateFormat = function getDateFormat() {
    var _this$props = this.props,
        showDate = _this$props.showDate,
        showMonth = _this$props.showMonth;

    var _ref = this.context || {},
        formattedDayPattern = _ref.formattedDayPattern,
        formattedMonthPattern = _ref.formattedMonthPattern;

    if (showDate) {
      return formattedDayPattern || 'YYYY-MM-DD';
    } else if (showMonth) {
      return formattedMonthPattern || 'YYYY-MM';
    }

    return 'YYYY';
  };

  _proto.renderTitle = function renderTitle() {
    var _this$props2 = this.props,
        date = _this$props2.date,
        renderTitle = _this$props2.renderTitle;

    if (renderTitle) {
      return renderTitle(date);
    }

    return date && (0, _format.default)(date, this.getDateFormat());
  };

  _proto.render = function render() {
    var _classNames, _classNames2, _classNames3, _classNames4, _classNames5;

    var _this$props3 = this.props,
        date = _this$props3.date,
        onMoveForword = _this$props3.onMoveForword,
        onMoveBackward = _this$props3.onMoveBackward,
        onToggleMonthDropdown = _this$props3.onToggleMonthDropdown,
        onToggleTimeDropdown = _this$props3.onToggleTimeDropdown,
        showTime = _this$props3.showTime,
        showDate = _this$props3.showDate,
        showMonth = _this$props3.showMonth,
        classPrefix = _this$props3.classPrefix,
        className = _this$props3.className,
        disabledDate = _this$props3.disabledDate,
        disabledTime = _this$props3.disabledTime,
        disabledBackward = _this$props3.disabledBackward,
        disabledForword = _this$props3.disabledForword,
        renderToolbar = _this$props3.renderToolbar,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["date", "onMoveForword", "onMoveBackward", "onToggleMonthDropdown", "onToggleTimeDropdown", "showTime", "showDate", "showMonth", "classPrefix", "className", "disabledDate", "disabledTime", "disabledBackward", "disabledForword", "renderToolbar"]);
    var dateTitleClasses = (0, _classnames.default)(this.addPrefix('title'), this.addPrefix('title-date'), (_classNames = {}, _classNames[this.addPrefix('error')] = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date), _classNames));
    var timeTitleClasses = (0, _classnames.default)(this.addPrefix('title'), this.addPrefix('title-time'), (_classNames2 = {}, _classNames2[this.addPrefix('error')] = disabledTime === null || disabledTime === void 0 ? void 0 : disabledTime(date), _classNames2));
    var backwardClass = (0, _classnames.default)(this.addPrefix('backward'), (_classNames3 = {}, _classNames3[this.addPrefix('btn-disabled')] = disabledBackward, _classNames3));
    var forwardClass = (0, _classnames.default)(this.addPrefix('forward'), (_classNames4 = {}, _classNames4[this.addPrefix('btn-disabled')] = disabledForword, _classNames4));
    var monthToolbar = React.createElement("div", {
      className: this.addPrefix('month-toolbar')
    }, React.createElement("i", {
      className: backwardClass,
      role: "button",
      tabIndex: -1,
      onClick: disabledBackward ? undefined : onMoveBackward
    }), React.createElement("span", {
      role: "button",
      tabIndex: -1,
      className: dateTitleClasses,
      onClick: onToggleMonthDropdown
    }, this.renderTitle()), React.createElement("i", {
      className: forwardClass,
      role: "button",
      tabIndex: -1,
      onClick: disabledForword ? undefined : onMoveForword
    }));
    var hasMonth = showDate || showMonth;
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames5 = {}, _classNames5[this.addPrefix('has-month')] = hasMonth, _classNames5[this.addPrefix('has-time')] = showTime, _classNames5));
    var unhandled = (0, _utils.getUnhandledProps)(Header, rest);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes
    }), hasMonth && monthToolbar, showTime && React.createElement("div", {
      className: this.addPrefix('time-toolbar')
    }, React.createElement("span", {
      role: "button",
      tabIndex: -1,
      className: timeTitleClasses,
      onClick: onToggleTimeDropdown
    }, date && (0, _format.default)(date, this.getTimeFormat()))), renderToolbar === null || renderToolbar === void 0 ? void 0 : renderToolbar(date));
  };

  return Header;
}(React.PureComponent);

Header.contextType = _IntlContext.default;
Header.propTypes = {
  date: _propTypes.default.instanceOf(Date),
  onMoveForword: _propTypes.default.func,
  onMoveBackward: _propTypes.default.func,
  onToggleMonthDropdown: _propTypes.default.func,
  onToggleTimeDropdown: _propTypes.default.func,
  showMonth: _propTypes.default.bool,
  showDate: _propTypes.default.bool,
  showTime: _propTypes.default.bool,
  format: _propTypes.default.string,
  disabledDate: _propTypes.default.func,
  disabledTime: _propTypes.default.func,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  disabledBackward: _propTypes.default.bool,
  disabledForword: _propTypes.default.bool,
  renderTitle: _propTypes.default.func,
  renderToolbar: _propTypes.default.func
};
Header.defaultProps = {
  date: new Date()
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'calendar-header'
});

var _default = enhance(Header);

exports.default = _default;
module.exports = exports.default;