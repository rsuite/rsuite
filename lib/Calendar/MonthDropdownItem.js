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

var _utils = require("../utils");

var _set_year = _interopRequireDefault(require("date-fns/set_year"));

var _set_month = _interopRequireDefault(require("date-fns/set_month"));

var _composeFunctions = _interopRequireDefault(require("../utils/composeFunctions"));

var MonthDropdownItem =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(MonthDropdownItem, _React$PureComponent);

  function MonthDropdownItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          month = _this$props.month,
          year = _this$props.year,
          date = _this$props.date,
          disabled = _this$props.disabled;

      if (disabled) {
        return;
      }

      if (year && month && date) {
        var nextMonth = (0, _composeFunctions.default)(function (d) {
          return (0, _set_year.default)(d, year);
        }, function (d) {
          return (0, _set_month.default)(d, month - 1);
        })(date);
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(nextMonth, event);
      }
    };

    return _this;
  }

  var _proto = MonthDropdownItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        month = _this$props2.month,
        active = _this$props2.active,
        disabled = _this$props2.disabled,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["className", "classPrefix", "month", "active", "disabled"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var unhandled = (0, _utils.getUnhandledProps)(MonthDropdownItem, rest);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames.disabled = disabled, _classNames));
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes,
      onClick: this.handleClick,
      key: month,
      role: "button",
      tabIndex: "-1"
    }), React.createElement("span", {
      className: addPrefix('content')
    }, month));
  };

  return MonthDropdownItem;
}(React.PureComponent);

MonthDropdownItem.propTypes = {
  date: _propTypes.default.instanceOf(Date),
  month: _propTypes.default.number,
  year: _propTypes.default.number,
  onSelect: _propTypes.default.func,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  active: _propTypes.default.bool,
  disabled: _propTypes.default.bool
};
MonthDropdownItem.defaultProps = {
  month: 0
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'calendar-month-dropdown-cell'
});

var _default = enhance(MonthDropdownItem);

exports.default = _default;
module.exports = exports.default;