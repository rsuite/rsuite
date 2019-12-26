"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _compare_asc = _interopRequireDefault(require("date-fns/compare_asc"));

var _end_of_month = _interopRequireDefault(require("date-fns/end_of_month"));

var _start_of_month = _interopRequireDefault(require("date-fns/start_of_month"));

var _end_of_week = _interopRequireDefault(require("date-fns/end_of_week"));

var _start_of_week = _interopRequireDefault(require("date-fns/start_of_week"));

var _end_of_iso_week = _interopRequireDefault(require("date-fns/end_of_iso_week"));

var _start_of_iso_week = _interopRequireDefault(require("date-fns/start_of_iso_week"));

var _add_months = _interopRequireDefault(require("date-fns/add_months"));

var _is_same_month = _interopRequireDefault(require("date-fns/is_same_month"));

var _is_same_day = _interopRequireDefault(require("date-fns/is_same_day"));

var _is_after = _interopRequireDefault(require("date-fns/is_after"));

var _is_before = _interopRequireDefault(require("date-fns/is_before"));

var _add_days = _interopRequireDefault(require("date-fns/add_days"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _IntlProvider = _interopRequireDefault(require("../IntlProvider"));

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

var _DatePicker = _interopRequireDefault(require("./DatePicker"));

var _utils = require("./utils");

var _utils2 = require("../utils");

var _Picker = require("../Picker");

var _constants = require("../constants");

var DateRangePicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DateRangePicker, _React$Component);

  DateRangePicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value;

    if (typeof value === 'undefined') {
      return null;
    }

    if (value[0] && !(0, _is_same_day.default)(value[0], prevState.value[0]) || value[1] && !(0, _is_same_day.default)(value[1], prevState.value[1])) {
      return {
        value: value,
        selectValue: value,
        calendarDate: (0, _utils.getCalendarDate)(value)
      };
    }

    return null;
  };

  function DateRangePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuContainerRef = void 0;
    _this.triggerRef = void 0;

    _this.getValue = function () {
      var value = _this.props.value;

      if (typeof value !== 'undefined') {
        return value;
      }

      return _this.state.value || [];
    };

    _this.getWeekHoverRange = function (date) {
      var isoWeek = _this.props.isoWeek;

      if (isoWeek) {
        // set to the first day of this week according to ISO 8601, 12:00 am
        return [(0, _start_of_iso_week.default)(date), (0, _end_of_iso_week.default)(date)];
      }

      return [(0, _start_of_week.default)(date), (0, _end_of_week.default)(date)];
    };

    _this.getMonthHoverRange = function (date) {
      return [(0, _start_of_month.default)(date), (0, _end_of_month.default)(date)];
    };

    _this.handleChangeCalendarDate = function (index, date) {
      var calendarDate = _this.state.calendarDate;
      calendarDate[index] = date;

      _this.setState({
        calendarDate: calendarDate
      });
    };

    _this.handleCloseDropdown = function () {
      if (_this.triggerRef.current) {
        _this.triggerRef.current.hide();
      }
    };

    _this.handleOpenDropdown = function () {
      if (_this.triggerRef.current) {
        _this.triggerRef.current.show();
      }
    };

    _this.handleShortcutPageDate = function (value, closeOverlay, event) {
      _this.updateValue(event, value, closeOverlay);
    };

    _this.handleOK = function (event) {
      var _this$props$onOk, _this$props;

      _this.updateValue(event);

      (_this$props$onOk = (_this$props = _this.props).onOk) === null || _this$props$onOk === void 0 ? void 0 : _this$props$onOk.call(_this$props, _this.state.selectValue, event);
    };

    _this.handleChangeSelectValue = function (date, event) {
      var _this$state = _this.state,
          selectValue = _this$state.selectValue,
          doneSelected = _this$state.doneSelected;
      var _this$props2 = _this.props,
          onSelect = _this$props2.onSelect,
          oneTap = _this$props2.oneTap;
      var nextValue = [];

      var nextHoverValue = _this.getHoverRange(date);

      if (doneSelected) {
        if (nextHoverValue.length) {
          nextValue = [nextHoverValue[0], nextHoverValue[1], date];
          nextHoverValue = [nextHoverValue[0], nextHoverValue[1], date];
        } else {
          nextValue = [date, undefined, date];
        }
      } else {
        if (nextHoverValue.length) {
          nextValue = [selectValue[0], selectValue[1]];
        } else {
          nextValue = [selectValue[0], date];
        }

        if ((0, _is_after.default)(nextValue[0], nextValue[1])) {
          nextValue.reverse();
        }

        nextValue[0] = (0, _utils.setTimingMargin)(nextValue[0]);
        nextValue[1] = (0, _utils.setTimingMargin)(nextValue[1]);

        _this.setState({
          calendarDate: (0, _utils.getCalendarDate)(nextValue)
        });
      }

      var nextState = {
        doneSelected: !doneSelected,
        selectValue: nextValue,
        hoverValue: nextHoverValue
      };
      event.persist();

      _this.setState(nextState, function () {
        // 如果是单击模式，并且是第一次点选，再触发一次点击
        if (oneTap && !_this.state.doneSelected) {
          _this.handleChangeSelectValue(date, event);
        } // 如果是单击模式，并且是第二次点选，更新值，并关闭面板


        if (oneTap && _this.state.doneSelected) {
          _this.updateValue(event);
        }

        onSelect && onSelect(date, event);
      });
    };

    _this.handleMouseMoveSelectValue = function (date) {
      var _this$state2 = _this.state,
          doneSelected = _this$state2.doneSelected,
          selectValue = _this$state2.selectValue,
          hoverValue = _this$state2.hoverValue,
          currentHoverDate = _this$state2.currentHoverDate;
      var hoverRange = _this.props.hoverRange;

      if (currentHoverDate && (0, _is_same_day.default)(date, currentHoverDate)) {
        return;
      }

      var nextHoverValue = _this.getHoverRange(date);

      if (doneSelected && !(0, _isUndefined2.default)(hoverRange)) {
        _this.setState({
          currentHoverDate: date,
          hoverValue: nextHoverValue
        });

        return;
      } else if (doneSelected) {
        return;
      }

      var nextValue = selectValue;

      if (!nextHoverValue.length) {
        nextValue[1] = date;
      } else if (hoverValue) {
        nextValue = [(0, _is_before.default)(nextHoverValue[0], hoverValue[0]) ? nextHoverValue[0] : hoverValue[0], (0, _is_after.default)(nextHoverValue[1], hoverValue[1]) ? nextHoverValue[1] : hoverValue[1], nextValue[2]];
      } // If `nextValue[0]` is greater than `nextValue[1]` then reverse order


      if ((0, _is_after.default)(nextValue[0], nextValue[1])) {
        nextValue.reverse();
      }

      _this.setState({
        currentHoverDate: date,
        selectValue: nextValue
      });
    };

    _this.handleClean = function (event) {
      _this.setState({
        calendarDate: (0, _utils.getCalendarDate)()
      });

      _this.updateValue(event, []);
    };

    _this.handleEnter = function () {
      var value = _this.getValue();

      var calendarDate;

      if (value && value.length) {
        var startDate = value[0],
            endData = value[1];
        calendarDate = [startDate, (0, _is_same_month.default)(startDate, endData) ? (0, _add_months.default)(endData, 1) : endData];
      } else {
        calendarDate = (0, _utils.getCalendarDate)(_this.props.defaultCalendarValue);
      }

      _this.setState({
        selectValue: value,
        calendarDate: calendarDate,
        active: true
      });
    };

    _this.handleEntered = function () {
      var _this$props$onOpen, _this$props3;

      (_this$props$onOpen = (_this$props3 = _this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props3);
    };

    _this.handleExit = function () {
      var _this$props$onClose, _this$props4;

      _this.setState({
        active: false,
        doneSelected: true
      });

      (_this$props$onClose = (_this$props4 = _this.props).onClose) === null || _this$props$onClose === void 0 ? void 0 : _this$props$onClose.call(_this$props4);
    };

    _this.disabledOkButton = function () {
      var _this$state3 = _this.state,
          selectValue = _this$state3.selectValue,
          doneSelected = _this$state3.doneSelected;

      if (!selectValue[0] || !selectValue[1] || !doneSelected) {
        return true;
      }

      return _this.disabledByBetween(selectValue[0], selectValue[1], _utils.TYPE.TOOLBAR_BUTTON_OK);
    };

    _this.disabledShortcutButton = function (value) {
      if (value === void 0) {
        value = [];
      }

      if (!value[0] || !value[1]) {
        return true;
      }

      return _this.disabledByBetween(value[0], value[1], _utils.TYPE.TOOLBAR_SHORTCUT);
    };

    _this.handleDisabledDate = function (date, values, type) {
      var disabledDate = _this.props.disabledDate;
      var doneSelected = _this.state.doneSelected;

      if (disabledDate) {
        return disabledDate(date, values, doneSelected, type);
      }

      return false;
    };

    _this.addPrefix = function (name) {
      return (0, _utils2.prefix)(_this.props.classPrefix)(name);
    };

    var defaultValue = props.defaultValue,
        _value = props.value,
        defaultCalendarValue = props.defaultCalendarValue;
    var activeValue = _value || defaultValue || [];

    var _calendarDate = (0, _utils.getCalendarDate)(_value || defaultCalendarValue);

    _this.state = {
      value: activeValue,
      selectValue: activeValue,
      doneSelected: true,
      calendarDate: _calendarDate,
      hoverValue: [],
      currentHoverDate: null
    }; // for test

    _this.menuContainerRef = React.createRef();
    _this.triggerRef = React.createRef();
    return _this;
  }

  var _proto = DateRangePicker.prototype;

  _proto.getDateString = function getDateString(value) {
    var _this$props5 = this.props,
        placeholder = _this$props5.placeholder,
        formatType = _this$props5.format,
        renderValue = _this$props5.renderValue;
    var nextValue = value || this.getValue();
    var startDate = nextValue === null || nextValue === void 0 ? void 0 : nextValue[0];
    var endDate = nextValue === null || nextValue === void 0 ? void 0 : nextValue[1];

    if (startDate && endDate) {
      var displayValue = [startDate, endDate].sort(_compare_asc.default);
      return renderValue ? renderValue(displayValue, formatType) : (0, _format.default)(displayValue[0], formatType) + " ~ " + (0, _format.default)(displayValue[1], formatType);
    }

    return placeholder || formatType + " ~ " + formatType;
  } // hover range presets
  ;

  _proto.getHoverRange = function getHoverRange(date) {
    var hoverRange = this.props.hoverRange;

    if (!hoverRange) {
      return [];
    }

    var hoverRangeFunc = hoverRange;

    if (hoverRange === 'week') {
      hoverRangeFunc = this.getWeekHoverRange;
    }

    if (hoverRangeFunc === 'month') {
      hoverRangeFunc = this.getMonthHoverRange;
    }

    if (typeof hoverRangeFunc !== 'function') {
      return [];
    }

    var hoverValues = hoverRangeFunc(date);
    var isHoverRangeValid = hoverValues instanceof Array && hoverValues.length === 2;

    if (!isHoverRangeValid) {
      return [];
    }

    if ((0, _is_after.default)(hoverValues[0], hoverValues[1])) {
      hoverValues.reverse();
    }

    return hoverValues;
  };

  _proto.resetPageDate = function resetPageDate() {
    var selectValue = this.getValue();
    var calendarDate = (0, _utils.getCalendarDate)(selectValue);
    this.setState({
      selectValue: selectValue,
      calendarDate: calendarDate
    });
  }
  /**
   * Toolbar operation callback function
   */
  ;

  _proto.updateValue = function updateValue(event, nextSelectValue, closeOverlay) {
    if (closeOverlay === void 0) {
      closeOverlay = true;
    }

    var _this$state4 = this.state,
        value = _this$state4.value,
        selectValue = _this$state4.selectValue;
    var onChange = this.props.onChange;
    var nextValue = !(0, _isUndefined2.default)(nextSelectValue) ? nextSelectValue : selectValue;
    this.setState({
      selectValue: nextValue || [],
      value: nextValue
    });

    if (onChange && (!(0, _is_same_day.default)(nextValue[0], value[0]) || !(0, _is_same_day.default)(nextValue[1], value[1]))) {
      onChange(nextValue, event);
    } // `closeOverlay` default value is `true`


    if (closeOverlay !== false) {
      this.handleCloseDropdown();
    }
  };

  _proto.disabledByBetween = function disabledByBetween(start, end, type) {
    var disabledDate = this.props.disabledDate;
    var _this$state5 = this.state,
        selectValue = _this$state5.selectValue,
        doneSelected = _this$state5.doneSelected;
    var selectStartDate = selectValue[0];
    var selectEndDate = selectValue[1];
    var nextSelectValue = [selectStartDate, selectEndDate]; // If the date is between the start and the end
    // the button is disabled

    while ((0, _is_before.default)(start, end) || (0, _is_same_day.default)(start, end)) {
      if (disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(start, nextSelectValue, doneSelected, type)) {
        return true;
      }

      start = (0, _add_days.default)(start, 1);
    }

    return false;
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this$props6 = this.props,
        menuClassName = _this$props6.menuClassName,
        ranges = _this$props6.ranges,
        isoWeek = _this$props6.isoWeek,
        limitEndYear = _this$props6.limitEndYear,
        oneTap = _this$props6.oneTap,
        showWeekNumbers = _this$props6.showWeekNumbers;
    var _this$state6 = this.state,
        calendarDate = _this$state6.calendarDate,
        selectValue = _this$state6.selectValue,
        hoverValue = _this$state6.hoverValue,
        doneSelected = _this$state6.doneSelected;
    var classes = (0, _classnames.default)(this.addPrefix('daterange-menu'), menuClassName);
    var pickerProps = {
      isoWeek: isoWeek,
      doneSelected: doneSelected,
      hoverValue: hoverValue,
      calendarDate: calendarDate,
      limitEndYear: limitEndYear,
      showWeekNumbers: showWeekNumbers,
      value: selectValue,
      disabledDate: this.handleDisabledDate,
      onSelect: this.handleChangeSelectValue,
      onMouseMove: this.handleMouseMoveSelectValue,
      onChangeCalendarDate: this.handleChangeCalendarDate
    };
    return React.createElement(_Picker.MenuWrapper, {
      className: classes,
      ref: this.menuContainerRef
    }, React.createElement("div", {
      className: this.addPrefix('daterange-panel')
    }, React.createElement("div", {
      className: this.addPrefix('daterange-content')
    }, React.createElement("div", {
      className: this.addPrefix('daterange-header')
    }, this.getDateString(selectValue)), React.createElement("div", {
      className: this.addPrefix('daterange-calendar-group')
    }, React.createElement(_DatePicker.default, (0, _extends2.default)({
      index: 0
    }, pickerProps)), React.createElement(_DatePicker.default, (0, _extends2.default)({
      index: 1
    }, pickerProps)))), React.createElement(_Toolbar.default, {
      ranges: ranges,
      selectValue: selectValue,
      disabledOkButton: this.disabledOkButton,
      disabledShortcutButton: this.disabledShortcutButton,
      onShortcut: this.handleShortcutPageDate,
      onOk: this.handleOK,
      hideOkButton: oneTap
    })));
  };

  _proto.render = function render() {
    var _this$props7 = this.props,
        disabled = _this$props7.disabled,
        cleanable = _this$props7.cleanable,
        locale = _this$props7.locale,
        toggleComponentClass = _this$props7.toggleComponentClass,
        style = _this$props7.style,
        onEntered = _this$props7.onEntered,
        onEnter = _this$props7.onEnter,
        onExited = _this$props7.onExited,
        onClean = _this$props7.onClean,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props7, ["disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEntered", "onEnter", "onExited", "onClean"]);
    var value = this.getValue();
    var unhandled = (0, _utils2.getUnhandledProps)(DateRangePicker, rest);
    var hasValue = value && value.length > 1;
    var classes = (0, _Picker.getToggleWrapperClassName)('daterange', this.addPrefix, this.props, hasValue);
    return React.createElement(_IntlProvider.default, {
      locale: locale
    }, React.createElement("div", {
      className: classes,
      style: style
    }, React.createElement(_Picker.PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      onEnter: (0, _utils2.createChainedFunction)(this.handleEnter, onEnter),
      onEntered: (0, _utils2.createChainedFunction)(this.handleEntered, onEntered),
      onExit: (0, _utils2.createChainedFunction)(this.handleExit, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, unhandled, {
      componentClass: toggleComponentClass,
      onClean: (0, _utils2.createChainedFunction)(this.handleClean, onClean),
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: this.state.active
    }), this.getDateString()))));
  };

  return DateRangePicker;
}(React.Component);

DateRangePicker.propTypes = {
  appearance: _propTypes.default.oneOf(['default', 'subtle']),
  ranges: _propTypes.default.array,
  value: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  defaultValue: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  defaultCalendarValue: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  placeholder: _propTypes.default.node,
  format: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  locale: _propTypes.default.object,
  hoverRange: _propTypes.default.oneOfType([_propTypes.default.oneOf(['week', 'month']), _propTypes.default.func]),
  cleanable: _propTypes.default.bool,
  isoWeek: _propTypes.default.bool,
  oneTap: _propTypes.default.bool,
  limitEndYear: _propTypes.default.number,
  className: _propTypes.default.string,
  menuClassName: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  container: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  containerPadding: _propTypes.default.number,
  block: _propTypes.default.bool,
  toggleComponentClass: _propTypes.default.elementType,
  style: _propTypes.default.object,
  open: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,
  placement: _propTypes.default.oneOf(_constants.PLACEMENT),
  preventOverflow: _propTypes.default.bool,
  showWeekNumbers: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  onOk: _propTypes.default.func,
  disabledDate: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onHide: _propTypes.default.func,
  onClean: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func,
  renderValue: _propTypes.default.func
};
DateRangePicker.defaultProps = {
  appearance: 'default',
  placement: 'bottomStart',
  limitEndYear: 1000,
  format: 'YYYY-MM-DD',
  placeholder: '',
  cleanable: true,
  locale: {
    sunday: 'Su',
    monday: 'Mo',
    tuesday: 'Tu',
    wednesday: 'We',
    thursday: 'Th',
    friday: 'Fr',
    saturday: 'Sa',
    ok: 'OK',
    today: 'Today',
    yesterday: 'Yesterday',
    last7Days: 'Last 7 Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds'
  }
};
var enhance = (0, _compose.default)((0, _utils2.defaultProps)({
  classPrefix: 'picker'
}), (0, _utils2.withPickerMethods)());

var _default = enhance(DateRangePicker);

exports.default = _default;
module.exports = exports.default;