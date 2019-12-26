"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _add_months = _interopRequireDefault(require("date-fns/add_months"));

var _Calendar = _interopRequireDefault(require("./Calendar"));

var DatePicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DatePicker, _React$Component);

  function DatePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.onMoveForword = function (nextPageDate) {
      var _this$props = _this.props,
          onChangeCalendarDate = _this$props.onChangeCalendarDate,
          index = _this$props.index;
      onChangeCalendarDate === null || onChangeCalendarDate === void 0 ? void 0 : onChangeCalendarDate(index, nextPageDate);
    };

    _this.onMoveBackward = function (nextPageDate) {
      var _this$props2 = _this.props,
          onChangeCalendarDate = _this$props2.onChangeCalendarDate,
          index = _this$props2.index;
      onChangeCalendarDate === null || onChangeCalendarDate === void 0 ? void 0 : onChangeCalendarDate(index, nextPageDate);
    };

    _this.handleChangePageDate = function (nextPageDate) {
      var _this$props3 = _this.props,
          onChangeCalendarDate = _this$props3.onChangeCalendarDate,
          index = _this$props3.index;
      onChangeCalendarDate === null || onChangeCalendarDate === void 0 ? void 0 : onChangeCalendarDate(index, nextPageDate);

      _this.setState({
        calendarState: undefined
      });
    };

    _this.toggleMonthDropdown = function () {
      var calendarState = _this.state.calendarState;

      if (calendarState === 'DROP_MONTH') {
        _this.setState({
          calendarState: undefined
        });
      } else {
        _this.setState({
          calendarState: 'DROP_MONTH'
        });
      }
    };

    _this.state = {
      calendarState: undefined
    };
    return _this;
  }

  var _proto = DatePicker.prototype;

  _proto.render = function render() {
    var _this$props4 = this.props,
        format = _this$props4.format,
        value = _this$props4.value,
        hoverValue = _this$props4.hoverValue,
        index = _this$props4.index,
        calendarDate = _this$props4.calendarDate,
        onSelect = _this$props4.onSelect,
        onMouseMove = _this$props4.onMouseMove,
        disabledDate = _this$props4.disabledDate,
        isoWeek = _this$props4.isoWeek,
        limitEndYear = _this$props4.limitEndYear,
        classPrefix = _this$props4.classPrefix,
        showWeekNumbers = _this$props4.showWeekNumbers;
    var calendarState = this.state.calendarState;
    return React.createElement(_Calendar.default, {
      classPrefix: classPrefix,
      disabledDate: disabledDate,
      format: format,
      value: value,
      isoWeek: isoWeek,
      hoverValue: hoverValue,
      calendarState: calendarState,
      calendarDate: calendarDate,
      index: index,
      onMoveForword: this.onMoveForword,
      onMoveBackward: this.onMoveBackward,
      onSelect: onSelect,
      onMouseMove: onMouseMove,
      onToggleMonthDropdown: this.toggleMonthDropdown,
      onChangePageDate: this.handleChangePageDate,
      limitEndYear: limitEndYear,
      showWeekNumbers: showWeekNumbers
    });
  };

  return DatePicker;
}(React.Component);

DatePicker.propTypes = {
  value: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  hoverValue: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  calendarDate: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  index: _propTypes.default.number,
  format: _propTypes.default.string,
  isoWeek: _propTypes.default.bool,
  limitEndYear: _propTypes.default.number,
  classPrefix: _propTypes.default.string,
  disabledDate: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onMouseMove: _propTypes.default.func,
  onChangeCalendarDate: _propTypes.default.func
};
DatePicker.defaultProps = {
  value: [],
  calendarDate: [new Date(), (0, _add_months.default)(new Date(), 1)],
  format: 'YYYY-MM-DD',
  index: 0
};
var _default = DatePicker;
exports.default = _default;
module.exports = exports.default;