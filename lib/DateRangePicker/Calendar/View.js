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

var _is_same_month = _interopRequireDefault(require("date-fns/is_same_month"));

var _set_date = _interopRequireDefault(require("date-fns/set_date"));

var _Table = _interopRequireDefault(require("./Table"));

var _utils = require("../../utils");

var View =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(View, _React$Component);

  function View() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.inSameThisMonthDate = function (date) {
      var thisMonthDate = (0, _set_date.default)(_this.props.activeDate, 1);
      return (0, _is_same_month.default)(date, thisMonthDate);
    };

    return _this;
  }

  var _proto = View.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        activeDate = _this$props.activeDate,
        value = _this$props.value,
        hoverValue = _this$props.hoverValue,
        onSelect = _this$props.onSelect,
        onMouseMove = _this$props.onMouseMove,
        disabledDate = _this$props.disabledDate,
        className = _this$props.className,
        isoWeek = _this$props.isoWeek,
        classPrefix = _this$props.classPrefix,
        showWeekNumbers = _this$props.showWeekNumbers,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["activeDate", "value", "hoverValue", "onSelect", "onMouseMove", "disabledDate", "className", "isoWeek", "classPrefix", "showWeekNumbers"]);
    var thisMonthDate = (0, _set_date.default)(activeDate, 1);
    var classes = (0, _classnames.default)(classPrefix, className);
    return React.createElement("div", (0, _extends2.default)({}, rest, {
      className: classes
    }), React.createElement(_Table.default, {
      rows: (0, _utils.getMonthView)(thisMonthDate, isoWeek),
      isoWeek: isoWeek,
      selected: value,
      onSelect: onSelect,
      onMouseMove: onMouseMove,
      inSameMonth: this.inSameThisMonthDate,
      disabledDate: disabledDate,
      hoverValue: hoverValue,
      showWeekNumbers: showWeekNumbers
    }));
  };

  return View;
}(React.Component);

View.propTypes = {
  activeDate: _propTypes.default.instanceOf(Date),
  value: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  hoverValue: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  onSelect: _propTypes.default.func,
  onMouseMove: _propTypes.default.func,
  disabledDate: _propTypes.default.func,
  isoWeek: _propTypes.default.bool,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string
};
View.defaultProps = {
  activeDate: new Date()
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'calendar-view'
});

var _default = enhance(View);

exports.default = _default;
module.exports = exports.default;