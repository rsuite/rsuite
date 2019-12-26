"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _set_seconds = _interopRequireDefault(require("date-fns/set_seconds"));

var _set_minutes = _interopRequireDefault(require("date-fns/set_minutes"));

var _set_hours = _interopRequireDefault(require("date-fns/set_hours"));

var _get_seconds = _interopRequireDefault(require("date-fns/get_seconds"));

var _is_same_day = _interopRequireDefault(require("date-fns/is_same_day"));

var _get_hours = _interopRequireDefault(require("date-fns/get_hours"));

var _get_minutes = _interopRequireDefault(require("date-fns/get_minutes"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _IntlProvider = _interopRequireDefault(require("../IntlProvider"));

var _Calendar = _interopRequireDefault(require("../Calendar/Calendar"));

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

var _disabledTime = _interopRequireWildcard(require("../utils/disabledTime"));

var _formatUtils = require("../utils/formatUtils");

var _composeFunctions = _interopRequireDefault(require("../utils/composeFunctions"));

var _utils = require("../utils");

var _Picker = require("../Picker");

var _constants = require("../constants");

var DatePicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(DatePicker, _React$Component);

  function DatePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuContainerRef = void 0;
    _this.triggerRef = void 0;

    _this.onMoveForword = function (nextPageDate) {
      var _this$props$onNextMon, _this$props, _this$props$onChangeC, _this$props2;

      _this.setState({
        pageDate: nextPageDate
      });

      (_this$props$onNextMon = (_this$props = _this.props).onNextMonth) === null || _this$props$onNextMon === void 0 ? void 0 : _this$props$onNextMon.call(_this$props, nextPageDate);
      (_this$props$onChangeC = (_this$props2 = _this.props).onChangeCalendarDate) === null || _this$props$onChangeC === void 0 ? void 0 : _this$props$onChangeC.call(_this$props2, nextPageDate);
    };

    _this.onMoveBackward = function (nextPageDate) {
      var _this$props$onPrevMon, _this$props3, _this$props$onChangeC2, _this$props4;

      _this.setState({
        pageDate: nextPageDate
      });

      (_this$props$onPrevMon = (_this$props3 = _this.props).onPrevMonth) === null || _this$props$onPrevMon === void 0 ? void 0 : _this$props$onPrevMon.call(_this$props3, nextPageDate);
      (_this$props$onChangeC2 = (_this$props4 = _this.props).onChangeCalendarDate) === null || _this$props$onChangeC2 === void 0 ? void 0 : _this$props$onChangeC2.call(_this$props4, nextPageDate);
    };

    _this.getValue = function () {
      return _this.props.value || _this.state.value;
    };

    _this.calendar = null;

    _this.handleChangePageDate = function (nextPageDate) {
      _this.setState({
        pageDate: nextPageDate,
        calendarState: undefined
      });

      _this.handleAllSelect(nextPageDate);
    };

    _this.handleChangePageTime = function (nextPageTime) {
      _this.setState({
        pageDate: nextPageTime
      });

      _this.handleAllSelect(nextPageTime);
    };

    _this.handleShortcutPageDate = function (value, closeOverlay, event) {
      _this.updateValue(event, value, closeOverlay);

      _this.handleAllSelect(value, event);
    };

    _this.handleOK = function (event) {
      var _this$props$onOk, _this$props5;

      _this.updateValue(event);

      (_this$props$onOk = (_this$props5 = _this.props).onOk) === null || _this$props$onOk === void 0 ? void 0 : _this$props$onOk.call(_this$props5, _this.state.pageDate, event);
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

    _this.toggleMonthDropdown = function () {
      var _this$props$onToggleM, _this$props6;

      var calendarState = _this.state.calendarState;
      var toggle;

      if (calendarState === 'DROP_MONTH') {
        _this.hideDropdown();

        toggle = false;
      } else {
        _this.showMonthDropdown();

        toggle = true;
      }

      (_this$props$onToggleM = (_this$props6 = _this.props).onToggleMonthDropdown) === null || _this$props$onToggleM === void 0 ? void 0 : _this$props$onToggleM.call(_this$props6, toggle);
    };

    _this.toggleTimeDropdown = function () {
      var _this$props$onToggleT, _this$props7;

      var calendarState = _this.state.calendarState;
      var toggle;

      if (calendarState === 'DROP_TIME') {
        _this.hideDropdown();

        toggle = false;
      } else {
        _this.showTimeDropdown();

        toggle = true;
      }

      (_this$props$onToggleT = (_this$props7 = _this.props).onToggleTimeDropdown) === null || _this$props$onToggleT === void 0 ? void 0 : _this$props$onToggleT.call(_this$props7, toggle);
    };

    _this.handleClean = function (event) {
      _this.setState({
        pageDate: new Date()
      });

      _this.updateValue(event, null);
    };

    _this.handleAllSelect = function (nextValue, event) {
      var _this$props$onSelect, _this$props8, _this$props$onChangeC3, _this$props9;

      (_this$props$onSelect = (_this$props8 = _this.props).onSelect) === null || _this$props$onSelect === void 0 ? void 0 : _this$props$onSelect.call(_this$props8, nextValue, event);
      (_this$props$onChangeC3 = (_this$props9 = _this.props).onChangeCalendarDate) === null || _this$props$onChangeC3 === void 0 ? void 0 : _this$props$onChangeC3.call(_this$props9, nextValue, event);
    };

    _this.handleSelect = function (nextValue, event) {
      var oneTap = _this.props.oneTap;
      var pageDate = _this.state.pageDate;

      _this.setState({
        pageDate: (0, _composeFunctions.default)(function (d) {
          return (0, _set_hours.default)(d, (0, _get_hours.default)(pageDate));
        }, function (d) {
          return (0, _set_minutes.default)(d, (0, _get_minutes.default)(pageDate));
        }, function (d) {
          return (0, _set_seconds.default)(d, (0, _get_seconds.default)(pageDate));
        })(nextValue)
      });

      _this.handleAllSelect(nextValue);

      if (oneTap) {
        _this.updateValue(event, nextValue);
      }
    };

    _this.handleEntered = function () {
      var _this$props$onOpen, _this$props10;

      (_this$props$onOpen = (_this$props10 = _this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props10);

      _this.setState({
        active: true
      });
    };

    _this.handleExit = function () {
      var _this$props$onClose, _this$props11;

      (_this$props$onClose = (_this$props11 = _this.props).onClose) === null || _this$props$onClose === void 0 ? void 0 : _this$props$onClose.call(_this$props11);

      _this.setState({
        calendarState: undefined,
        active: false
      });
    };

    _this.disabledToolbarHandle = function (date) {
      var disabledDate = _this.props.disabledDate;
      var allowDate = disabledDate ? disabledDate(date) : false;
      var allowTime = (0, _disabledTime.default)(_this.props, date);
      return allowDate || allowTime;
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    var defaultValue = props.defaultValue,
        _value = props.value,
        calendarDefaultDate = props.calendarDefaultDate;
    var activeValue = _value || defaultValue;
    _this.state = {
      value: activeValue,
      pageDate: activeValue || calendarDefaultDate || new Date() // display calendar date

    };
    _this.triggerRef = React.createRef(); // for test

    _this.menuContainerRef = React.createRef();
    return _this;
  }

  DatePicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (typeof nextProps.value !== 'undefined') {
      var value = nextProps.value;

      if (value && !(0, _is_same_day.default)(value, prevState.value)) {
        return {
          value: value,
          pageDate: value
        };
      }

      return {
        value: value
      };
    }

    return null;
  };

  var _proto = DatePicker.prototype;

  _proto.getDateString = function getDateString() {
    var _this$props12 = this.props,
        placeholder = _this$props12.placeholder,
        formatType = _this$props12.format,
        renderValue = _this$props12.renderValue;
    var value = this.getValue();

    if (value) {
      return renderValue ? renderValue(value, formatType) : (0, _format.default)(value, formatType);
    }

    return placeholder || formatType;
  };

  _proto.updateValue = function updateValue(event, nextPageDate, closeOverlay) {
    if (closeOverlay === void 0) {
      closeOverlay = true;
    }

    var pageDate = this.state.pageDate;
    var value = this.getValue();
    var nextValue = !(0, _isUndefined2.default)(nextPageDate) ? nextPageDate : pageDate;
    this.setState({
      pageDate: nextValue || new Date(),
      value: nextValue
    });

    if (nextValue !== value || !(0, _is_same_day.default)(nextValue, value)) {
      var _this$props$onChange, _this$props13;

      (_this$props$onChange = (_this$props13 = this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props13, nextValue, event);
    } // `closeOverlay` default value is `true`


    if (closeOverlay !== false) {
      this.handleCloseDropdown();
    }
  };

  _proto.resetPageDate = function resetPageDate() {
    var calendarDefaultDate = this.props.calendarDefaultDate;
    var value = this.getValue();
    this.setState({
      pageDate: value || calendarDefaultDate || new Date()
    });
  };

  _proto.showMonthDropdown = function showMonthDropdown() {
    this.setState({
      calendarState: 'DROP_MONTH'
    });
  };

  _proto.hideDropdown = function hideDropdown() {
    this.setState({
      calendarState: undefined
    });
  };

  _proto.showTimeDropdown = function showTimeDropdown() {
    this.setState({
      calendarState: 'DROP_TIME'
    });
  };

  _proto.renderCalendar = function renderCalendar() {
    var _this$props14 = this.props,
        format = _this$props14.format,
        isoWeek = _this$props14.isoWeek,
        limitEndYear = _this$props14.limitEndYear,
        disabledDate = _this$props14.disabledDate,
        showWeekNumbers = _this$props14.showWeekNumbers;
    var _this$state = this.state,
        calendarState = _this$state.calendarState,
        pageDate = _this$state.pageDate;
    var calendarProps = (0, _pick2.default)(this.props, _disabledTime.calendarOnlyProps);
    return React.createElement(_Calendar.default, (0, _extends2.default)({}, calendarProps, {
      showWeekNumbers: showWeekNumbers,
      disabledDate: disabledDate,
      limitEndYear: limitEndYear,
      format: format,
      isoWeek: isoWeek,
      calendarState: calendarState,
      pageDate: pageDate,
      onMoveForword: this.onMoveForword,
      onMoveBackward: this.onMoveBackward,
      onSelect: this.handleSelect,
      onToggleMonthDropdown: this.toggleMonthDropdown,
      onToggleTimeDropdown: this.toggleTimeDropdown,
      onChangePageDate: this.handleChangePageDate,
      onChangePageTime: this.handleChangePageTime
    }));
  };

  _proto.renderDropdownMenu = function renderDropdownMenu(calendar) {
    var _this$props15 = this.props,
        ranges = _this$props15.ranges,
        menuClassName = _this$props15.menuClassName,
        oneTap = _this$props15.oneTap;
    var pageDate = this.state.pageDate;
    var classes = (0, _classnames.default)(this.addPrefix('date-menu'), menuClassName);
    return React.createElement(_Picker.MenuWrapper, {
      className: classes
    }, React.createElement("div", {
      ref: this.menuContainerRef
    }, calendar, React.createElement(_Toolbar.default, {
      ranges: ranges,
      pageDate: pageDate,
      disabledHandle: this.disabledToolbarHandle,
      onShortcut: this.handleShortcutPageDate,
      onOk: this.handleOK,
      hideOkButton: oneTap
    })));
  };

  _proto.render = function render() {
    var _getToggleWrapperClas;

    var _this$props16 = this.props,
        inline = _this$props16.inline,
        className = _this$props16.className,
        disabled = _this$props16.disabled,
        cleanable = _this$props16.cleanable,
        classPrefix = _this$props16.classPrefix,
        format = _this$props16.format,
        locale = _this$props16.locale,
        toggleComponentClass = _this$props16.toggleComponentClass,
        style = _this$props16.style,
        onEntered = _this$props16.onEntered,
        onExited = _this$props16.onExited,
        onClean = _this$props16.onClean,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props16, ["inline", "className", "disabled", "cleanable", "classPrefix", "format", "locale", "toggleComponentClass", "style", "onEntered", "onExited", "onClean"]);
    var value = this.getValue();
    var unhandled = (0, _utils.getUnhandledProps)(DatePicker, rest);
    var hasValue = !!value;
    var calendar = this.renderCalendar();

    if (inline) {
      return React.createElement(_IntlProvider.default, {
        locale: locale
      }, React.createElement("div", {
        className: (0, _classnames.default)(classPrefix, this.addPrefix('date-inline'), className)
      }, calendar));
    }

    var classes = (0, _Picker.getToggleWrapperClassName)('date', this.addPrefix, this.props, hasValue, (_getToggleWrapperClas = {}, _getToggleWrapperClas[this.addPrefix('date-only-time')] = (0, _formatUtils.shouldOnlyTime)(format), _getToggleWrapperClas));
    return React.createElement(_IntlProvider.default, {
      locale: locale
    }, React.createElement("div", {
      className: classes,
      style: style
    }, React.createElement(_Picker.PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      onEntered: (0, _utils.createChainedFunction)(this.handleEntered, onEntered),
      onExit: (0, _utils.createChainedFunction)(this.handleExit, onExited),
      speaker: this.renderDropdownMenu(calendar)
    }, React.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, unhandled, {
      componentClass: toggleComponentClass,
      onClean: (0, _utils.createChainedFunction)(this.handleClean, onClean),
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: this.state.active
    }), this.getDateString()))));
  };

  return DatePicker;
}(React.Component);

DatePicker.propTypes = {
  appearance: _propTypes.default.oneOf(['default', 'subtle']),
  ranges: _propTypes.default.array,
  defaultValue: _propTypes.default.instanceOf(Date),
  value: _propTypes.default.instanceOf(Date),
  calendarDefaultDate: _propTypes.default.instanceOf(Date),
  placeholder: _propTypes.default.string,
  format: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  locale: _propTypes.default.object,
  inline: _propTypes.default.bool,
  cleanable: _propTypes.default.bool,
  isoWeek: _propTypes.default.bool,
  limitEndYear: _propTypes.default.number,
  className: _propTypes.default.string,
  menuClassName: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  container: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  containerPadding: _propTypes.default.number,
  block: _propTypes.default.bool,
  toggleComponentClass: _propTypes.default.elementType,
  open: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,
  placement: _propTypes.default.oneOf(_constants.PLACEMENT),
  style: _propTypes.default.object,
  oneTap: _propTypes.default.bool,
  preventOverflow: _propTypes.default.bool,
  showWeekNumbers: _propTypes.default.bool,
  disabledDate: _propTypes.default.func,
  disabledHours: _propTypes.default.func,
  disabledMinutes: _propTypes.default.func,
  disabledSeconds: _propTypes.default.func,
  hideHours: _propTypes.default.func,
  hideMinutes: _propTypes.default.func,
  hideSeconds: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onChangeCalendarDate: _propTypes.default.func,
  onToggleMonthDropdown: _propTypes.default.func,
  onToggleTimeDropdown: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onPrevMonth: _propTypes.default.func,
  onNextMonth: _propTypes.default.func,
  onOk: _propTypes.default.func,
  onClean: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onHide: _propTypes.default.func,
  renderValue: _propTypes.default.func
};
DatePicker.defaultProps = {
  appearance: 'default',
  placement: 'bottomStart',
  limitEndYear: 1000,
  format: 'YYYY-MM-DD',
  placeholder: '',
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
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds'
  },
  cleanable: true
};
(0, _reactLifecyclesCompat.polyfill)(DatePicker);
var enhance = (0, _compose.default)((0, _utils.defaultProps)({
  classPrefix: 'picker'
}), (0, _utils.withPickerMethods)());

var _default = enhance(DatePicker);

exports.default = _default;
module.exports = exports.default;