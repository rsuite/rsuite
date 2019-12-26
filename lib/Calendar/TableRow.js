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

var _get_date = _interopRequireDefault(require("date-fns/get_date"));

var _add_days = _interopRequireDefault(require("date-fns/add_days"));

var _is_same_day = _interopRequireDefault(require("date-fns/is_same_day"));

var _utils = require("../utils");

var _IntlContext = _interopRequireDefault(require("../IntlProvider/IntlContext"));

var TableRow =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(TableRow, _React$PureComponent);

  function TableRow() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.handleSelect = function (date, disabled, event) {
      var _this$props$onSelect, _this$props;

      if (disabled) {
        return;
      }

      (_this$props$onSelect = (_this$props = _this.props).onSelect) === null || _this$props$onSelect === void 0 ? void 0 : _this$props$onSelect.call(_this$props, date, event);
    };

    return _this;
  }

  var _proto = TableRow.prototype;

  _proto.renderDays = function renderDays(context) {
    var _this$props2 = this.props,
        weekendDate = _this$props2.weekendDate,
        disabledDate = _this$props2.disabledDate,
        inSameMonth = _this$props2.inSameMonth,
        selected = _this$props2.selected,
        renderCell = _this$props2.renderCell;
    var days = [];

    for (var i = 0; i < 7; i += 1) {
      var _classNames;

      var thisDate = (0, _add_days.default)(weekendDate, i);
      var disabled = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(thisDate);
      var isToday = (0, _is_same_day.default)(thisDate, new Date());
      var classes = (0, _classnames.default)(this.addPrefix('cell'), (_classNames = {}, _classNames[this.addPrefix('cell-un-same-month')] = !(inSameMonth && inSameMonth(thisDate)), _classNames[this.addPrefix('cell-is-today')] = isToday, _classNames[this.addPrefix('cell-selected')] = (0, _is_same_day.default)(thisDate, selected), _classNames[this.addPrefix('cell-disabled')] = disabled, _classNames));
      var title = (0, _format.default)(thisDate, (context === null || context === void 0 ? void 0 : context.formattedDayPattern) || 'YYYY-MM-DD');
      days.push(React.createElement("div", {
        key: title,
        className: classes,
        role: "menu",
        tabIndex: -1,
        title: isToday ? title + " (" + (context === null || context === void 0 ? void 0 : context.today) + ")" : title,
        onClick: this.handleSelect.bind(this, thisDate, disabled)
      }, React.createElement("div", {
        className: this.addPrefix('cell-content')
      }, React.createElement("span", {
        className: this.addPrefix('cell-day')
      }, (0, _get_date.default)(thisDate)), renderCell && renderCell(thisDate))));
    }

    return days;
  };

  _proto.renderWeekNumber = function renderWeekNumber() {
    return React.createElement("div", {
      className: this.addPrefix('cell-week-number')
    }, (0, _format.default)(this.props.weekendDate, 'W'));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        className = _this$props3.className,
        showWeekNumbers = _this$props3.showWeekNumbers,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["className", "showWeekNumbers"]);
    var classes = (0, _classnames.default)(this.addPrefix('row'), className);
    var unhandled = (0, _utils.getUnhandledProps)(TableRow, rest);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes
    }), showWeekNumbers && this.renderWeekNumber(), React.createElement(_IntlContext.default.Consumer, null, function (context) {
      return _this2.renderDays(context);
    }));
  };

  return TableRow;
}(React.PureComponent);

TableRow.propTypes = {
  weekendDate: _propTypes.default.instanceOf(Date),
  selected: _propTypes.default.instanceOf(Date),
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  onSelect: _propTypes.default.func,
  disabledDate: _propTypes.default.func,
  inSameMonth: _propTypes.default.func,
  renderCell: _propTypes.default.func
};
TableRow.defaultProps = {
  selected: new Date(),
  weekendDate: new Date()
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'calendar-table'
});

var _default = enhance(TableRow);

exports.default = _default;
module.exports = exports.default;