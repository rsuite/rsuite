"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MonthDropdown = _interopRequireDefault(require("./MonthDropdown"));

var _TimeDropdown = _interopRequireDefault(require("./TimeDropdown"));

var _View = _interopRequireDefault(require("./View"));

var _Header = _interopRequireDefault(require("./Header"));

var _utils = require("../utils");

var _disabledTime = _interopRequireWildcard(require("../utils/disabledTime"));

var _formatUtils = require("../utils/formatUtils");

var _add_months = _interopRequireDefault(require("date-fns/add_months"));

var _utils2 = require("../@types/utils");

var CalendarState = (0, _utils2.tuple)('DROP_TIME', 'DROP_MONTH');

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

    _this.disabledDate = function (date) {
      var _this$props$disabledD, _this$props;

      if ((_this$props$disabledD = (_this$props = _this.props).disabledDate) === null || _this$props$disabledD === void 0 ? void 0 : _this$props$disabledD.call(_this$props, date)) {
        return true;
      }

      return false;
    };

    _this.disabledTime = function (date) {
      return (0, _disabledTime.default)(_this.props, date);
    };

    _this.handleMoveForword = function () {
      var _this$props2 = _this.props,
          onMoveForword = _this$props2.onMoveForword,
          pageDate = _this$props2.pageDate;
      onMoveForword === null || onMoveForword === void 0 ? void 0 : onMoveForword((0, _add_months.default)(pageDate, 1));
    };

    _this.handleMoveBackward = function () {
      var _this$props3 = _this.props,
          onMoveBackward = _this$props3.onMoveBackward,
          pageDate = _this$props3.pageDate;
      onMoveBackward === null || onMoveBackward === void 0 ? void 0 : onMoveBackward((0, _add_months.default)(pageDate, -1));
    };

    return _this;
  }

  var _proto = Calendar.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props4 = this.props,
        calendarState = _this$props4.calendarState,
        pageDate = _this$props4.pageDate,
        onSelect = _this$props4.onSelect,
        onToggleMonthDropdown = _this$props4.onToggleMonthDropdown,
        onToggleTimeDropdown = _this$props4.onToggleTimeDropdown,
        onChangePageDate = _this$props4.onChangePageDate,
        onChangePageTime = _this$props4.onChangePageTime,
        format = _this$props4.format,
        calendarRef = _this$props4.calendarRef,
        className = _this$props4.className,
        isoWeek = _this$props4.isoWeek,
        limitEndYear = _this$props4.limitEndYear,
        classPrefix = _this$props4.classPrefix,
        renderTitle = _this$props4.renderTitle,
        renderToolbar = _this$props4.renderToolbar,
        renderCell = _this$props4.renderCell,
        showWeekNumbers = _this$props4.showWeekNumbers,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props4, ["calendarState", "pageDate", "onSelect", "onToggleMonthDropdown", "onToggleTimeDropdown", "onChangePageDate", "onChangePageTime", "format", "calendarRef", "className", "isoWeek", "limitEndYear", "classPrefix", "renderTitle", "renderToolbar", "renderCell", "showWeekNumbers"]);
    var showDate = (0, _formatUtils.shouldDate)(format);
    var showTime = (0, _formatUtils.shouldTime)(format);
    var showMonth = (0, _formatUtils.shouldMonth)(format);
    var onlyShowTime = showTime && !showDate && !showMonth;
    var onlyShowMonth = showMonth && !showDate && !showTime;
    var dropTime = calendarState === 'DROP_TIME' || onlyShowTime;
    var dropMonth = calendarState === 'DROP_MONTH' || onlyShowMonth;
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var calendarClasses = (0, _classnames.default)(className, classPrefix, (_classNames = {}, _classNames[addPrefix('show-time-dropdown')] = dropTime, _classNames[addPrefix('show-month-dropdown')] = dropMonth, _classNames));
    var unhandled = (0, _utils.getUnhandledProps)(Calendar, rest);
    var timeDropdownProps = (0, _pick2.default)(rest, _disabledTime.calendarOnlyProps);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: calendarClasses,
      ref: calendarRef
    }), React.createElement(_Header.default, {
      date: pageDate,
      format: format,
      showMonth: showMonth,
      showDate: showDate,
      showTime: showTime,
      disabledDate: this.disabledDate,
      disabledTime: this.disabledTime,
      onMoveForword: this.handleMoveForword,
      onMoveBackward: this.handleMoveBackward,
      onToggleMonthDropdown: onToggleMonthDropdown,
      onToggleTimeDropdown: onToggleTimeDropdown,
      renderTitle: renderTitle,
      renderToolbar: renderToolbar
    }), showDate && React.createElement(_View.default, {
      key: "MonthView",
      activeDate: pageDate,
      onSelect: onSelect,
      isoWeek: isoWeek,
      disabledDate: this.disabledDate,
      renderCell: renderCell,
      showWeekNumbers: showWeekNumbers
    }), showMonth && React.createElement(_MonthDropdown.default, {
      date: pageDate,
      onSelect: onChangePageDate,
      show: dropMonth,
      limitEndYear: limitEndYear,
      disabledMonth: this.disabledDate
    }), showTime && React.createElement(_TimeDropdown.default, (0, _extends2.default)({}, timeDropdownProps, {
      date: pageDate,
      format: format,
      show: dropTime,
      onSelect: onChangePageTime
    })));
  };

  return Calendar;
}(React.Component);

Calendar.propTypes = {
  pageDate: _propTypes.default.instanceOf(Date),
  calendarState: _propTypes.default.oneOf(CalendarState),
  calendarRef: _propTypes.default.func,
  format: _propTypes.default.string,
  isoWeek: _propTypes.default.bool,
  limitEndYear: _propTypes.default.number,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  disabledDate: _propTypes.default.func,
  disabledHours: _propTypes.default.func,
  disabledMinutes: _propTypes.default.func,
  disabledSeconds: _propTypes.default.func,
  hideHours: _propTypes.default.func,
  hideMinutes: _propTypes.default.func,
  hideSeconds: _propTypes.default.func,
  onMoveForword: _propTypes.default.func,
  onMoveBackward: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onToggleMonthDropdown: _propTypes.default.func,
  onToggleTimeDropdown: _propTypes.default.func,
  onChangePageDate: _propTypes.default.func,
  onChangePageTime: _propTypes.default.func,
  renderTitle: _propTypes.default.func,
  renderToolbar: _propTypes.default.func,
  renderCell: _propTypes.default.func
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'calendar'
})(Calendar);

exports.default = _default;
module.exports = exports.default;