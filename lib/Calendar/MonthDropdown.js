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

var _List = _interopRequireDefault(require("react-virtualized/dist/commonjs/List"));

var _AutoSizer = _interopRequireDefault(require("react-virtualized/dist/commonjs/AutoSizer"));

var _utils = require("../utils");

var _MonthDropdownItem = _interopRequireDefault(require("./MonthDropdownItem"));

var _get_days_in_month = _interopRequireDefault(require("date-fns/get_days_in_month"));

var _get_month = _interopRequireDefault(require("date-fns/get_month"));

var _get_year = _interopRequireDefault(require("date-fns/get_year"));

var monthMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var defaultHeight = 221;
var defaultWidth = 256;

function getRowHeight(count) {
  return function (_ref) {
    var index = _ref.index;

    if (index === 0 || count - 1 === index) {
      return 75 + 1;
    }

    return 75;
  };
}

var MonthDropdown =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(MonthDropdown, _React$PureComponent);

  function MonthDropdown() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.getRowCount = function () {
      var limitEndYear = _this.props.limitEndYear;
      return (0, _get_year.default)(new Date()) + limitEndYear;
    };

    _this.list = null;

    _this.bindListRef = function (ref) {
      _this.list = ref;
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.rowRenderer = function (_ref2) {
      var _classNames;

      var index = _ref2.index,
          key = _ref2.key,
          style = _ref2.style;
      var _this$props = _this.props,
          date = _this$props.date,
          onSelect = _this$props.onSelect;
      var selectedMonth = (0, _get_month.default)(date);
      var selectedYear = (0, _get_year.default)(date);
      var year = index + 1;
      var isSelectedYear = year === selectedYear;

      var count = _this.getRowCount();

      var titleClassName = (0, _classnames.default)(_this.addPrefix('year'), (_classNames = {}, _classNames[_this.addPrefix('year-active')] = isSelectedYear, _classNames));
      var rowClassName = (0, _classnames.default)(_this.addPrefix('row'), {
        'first-row': index === 0,
        'last-row': index === count - 1
      });
      return React.createElement("div", {
        className: rowClassName,
        key: key,
        style: style
      }, React.createElement("div", {
        className: titleClassName
      }, year), React.createElement("div", {
        className: _this.addPrefix('list')
      }, monthMap.map(function (item, month) {
        return React.createElement(_MonthDropdownItem.default, {
          date: date,
          onSelect: onSelect,
          disabled: _this.disabledMonth(year, month),
          active: isSelectedYear && month === selectedMonth,
          key: month + "_" + item,
          month: month + 1,
          year: year
        });
      })));
    };

    return _this;
  }

  var _proto = MonthDropdown.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.list) {
      this.list.forceUpdateGrid();
    }
  };

  _proto.disabledMonth = function disabledMonth(year, month) {
    var disabledMonth = this.props.disabledMonth;

    if (disabledMonth) {
      var days = (0, _get_days_in_month.default)(new Date(year, month)); // If all dates in a month are disabled, disable the current month

      for (var i = 1; i <= days; i++) {
        if (!disabledMonth(new Date(year, month, i))) {
          return false;
        }
      }

      return true;
    }

    return false;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        classPrefix = _this$props2.classPrefix,
        className = _this$props2.className,
        date = _this$props2.date,
        show = _this$props2.show,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["classPrefix", "className", "date", "show"]);
    var unhandled = (0, _utils.getUnhandledProps)(MonthDropdown, rest);
    var count = this.getRowCount();
    var classes = (0, _classnames.default)(classPrefix, className, {
      show: show
    });
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes
    }), React.createElement("div", {
      className: this.addPrefix('content')
    }, React.createElement("div", {
      className: this.addPrefix('scroll')
    }, show && React.createElement(_AutoSizer.default, {
      defaultHeight: defaultHeight,
      defaultWidth: defaultWidth
    }, function (_ref3) {
      var height = _ref3.height,
          width = _ref3.width;
      return React.createElement(_List.default, {
        className: _this2.addPrefix('row-wrapper'),
        ref: _this2.bindListRef,
        width: width || defaultWidth,
        height: height || defaultHeight,
        rowHeight: getRowHeight(count),
        rowCount: count,
        scrollToIndex: (0, _get_year.default)(date),
        rowRenderer: _this2.rowRenderer
      });
    }))));
  };

  return MonthDropdown;
}(React.PureComponent);

MonthDropdown.propTypes = {
  date: _propTypes.default.instanceOf(Date),
  limitEndYear: _propTypes.default.number,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  show: _propTypes.default.bool,
  onSelect: _propTypes.default.func,
  disabledMonth: _propTypes.default.func
};
MonthDropdown.defaultProps = {
  show: false,
  limitEndYear: 5,
  date: new Date()
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'calendar-month-dropdown'
});

var _default = enhance(MonthDropdown);

exports.default = _default;
module.exports = exports.default;