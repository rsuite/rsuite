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

var _set_date = _interopRequireDefault(require("date-fns/set_date"));

var _is_after = _interopRequireDefault(require("date-fns/is_after"));

var _add_months = _interopRequireDefault(require("date-fns/add_months"));

var _utils = require("../../utils");

var _MonthDropdown = _interopRequireDefault(require("../../Calendar/MonthDropdown"));

var _Header = _interopRequireDefault(require("../../Calendar/Header"));

var _View = _interopRequireDefault(require("./View"));

var Calendar =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Calendar, _React$Component);

  function Calendar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleMoveForword = function () {
      var _this$props$onMoveFor, _this$props;

      (_this$props$onMoveFor = (_this$props = _this.props).onMoveForword) === null || _this$props$onMoveFor === void 0 ? void 0 : _this$props$onMoveFor.call(_this$props, (0, _add_months.default)(_this.getPageDate(), 1));
    };

    _this.handleMoveBackward = function () {
      var _this$props$onMoveBac, _this$props2;

      (_this$props$onMoveBac = (_this$props2 = _this.props).onMoveBackward) === null || _this$props$onMoveBac === void 0 ? void 0 : _this$props$onMoveBac.call(_this$props2, (0, _add_months.default)(_this.getPageDate(), -1));
    };

    _this.disabledBackward = function () {
      var _this$props3 = _this.props,
          calendarDate = _this$props3.calendarDate,
          index = _this$props3.index;
      var after = (0, _is_after.default)((0, _set_date.default)(calendarDate[1], 1), (0, _set_date.default)((0, _add_months.default)(calendarDate[0], 1), 1));

      if (index === 0) {
        return false;
      }

      if (!after) {
        return true;
      }

      return false;
    };

    _this.disabledForword = function () {
      var _this$props4 = _this.props,
          calendarDate = _this$props4.calendarDate,
          index = _this$props4.index;
      var after = (0, _is_after.default)((0, _set_date.default)(calendarDate[1], 1), (0, _set_date.default)((0, _add_months.default)(calendarDate[0], 1), 1));

      if (index === 1) {
        return false;
      }

      if (!after) {
        return true;
      }

      return false;
    };

    _this.disabledMonth = function (date) {
      var _this$props5 = _this.props,
          calendarDate = _this$props5.calendarDate,
          value = _this$props5.value,
          index = _this$props5.index,
          disabledDate = _this$props5.disabledDate;
      var after = true;

      if (disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date, value, 'MONTH')) {
        return true;
      }

      if (index === 1) {
        after = (0, _is_after.default)(date, calendarDate[0]);
        return !after;
      }

      after = (0, _is_after.default)(calendarDate[1], date);
      return !after;
    };

    return _this;
  }

  var _proto = Calendar.prototype;

  _proto.getPageDate = function getPageDate() {
    var _this$props6 = this.props,
        calendarDate = _this$props6.calendarDate,
        index = _this$props6.index;
    return calendarDate[index];
  };

  _proto.shouldMountDate = function shouldMountDate(props) {
    var _ref = props || this.props,
        format = _ref.format;

    return /Y/.test(format) && /M/.test(format) && /D/.test(format);
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props7 = this.props,
        calendarState = _this$props7.calendarState,
        onSelect = _this$props7.onSelect,
        onMouseMove = _this$props7.onMouseMove,
        onToggleMonthDropdown = _this$props7.onToggleMonthDropdown,
        onChangePageDate = _this$props7.onChangePageDate,
        disabledDate = _this$props7.disabledDate,
        className = _this$props7.className,
        value = _this$props7.value,
        hoverValue = _this$props7.hoverValue,
        isoWeek = _this$props7.isoWeek,
        limitEndYear = _this$props7.limitEndYear,
        classPrefix = _this$props7.classPrefix,
        showWeekNumbers = _this$props7.showWeekNumbers,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props7, ["calendarState", "onSelect", "onMouseMove", "onToggleMonthDropdown", "onChangePageDate", "disabledDate", "className", "value", "hoverValue", "isoWeek", "limitEndYear", "classPrefix", "showWeekNumbers"]);
    var pageDate = this.getPageDate();
    var dropMonth = calendarState === 'DROP_MONTH';
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var calendarClasses = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('show-month-dropdown')] = dropMonth, _classNames));
    var unhandled = (0, _utils.getUnhandledProps)(Calendar, rest);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: calendarClasses
    }), React.createElement(_Header.default, {
      showMonth: true,
      date: pageDate,
      disabledBackward: this.disabledBackward(),
      disabledForword: this.disabledForword(),
      onMoveForword: this.handleMoveForword,
      onMoveBackward: this.handleMoveBackward,
      onToggleMonthDropdown: onToggleMonthDropdown
    }), React.createElement(_View.default, {
      activeDate: pageDate,
      value: value,
      hoverValue: hoverValue,
      onSelect: onSelect,
      onMouseMove: onMouseMove,
      disabledDate: disabledDate,
      isoWeek: isoWeek,
      showWeekNumbers: showWeekNumbers
    }), React.createElement(_MonthDropdown.default, {
      date: pageDate,
      show: dropMonth,
      disabledMonth: this.disabledMonth,
      onSelect: onChangePageDate,
      limitEndYear: limitEndYear
    }));
  };

  return Calendar;
}(React.Component);

Calendar.propTypes = {
  calendarState: _propTypes.default.oneOf(['DROP_MONTH', 'DROP_TIME']),
  index: _propTypes.default.number,
  calendarDate: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  value: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  hoverValue: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  format: _propTypes.default.string,
  isoWeek: _propTypes.default.bool,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  limitEndYear: _propTypes.default.number,
  disabledDate: _propTypes.default.func,
  onMoveForword: _propTypes.default.func,
  onMoveBackward: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onMouseMove: _propTypes.default.func,
  onToggleMonthDropdown: _propTypes.default.func,
  onChangePageDate: _propTypes.default.func
};
Calendar.defaultProps = {
  calendarDate: [new Date(), (0, _add_months.default)(new Date(), 1)],
  index: 0
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'calendar'
});

var _default = enhance(Calendar);

exports.default = _default;
module.exports = exports.default;