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

var _is_same_month = _interopRequireDefault(require("date-fns/is_same_month"));

var _utils = require("../utils");

var _Table = _interopRequireDefault(require("./Table"));

var _composeFunctions = _interopRequireDefault(require("../utils/composeFunctions"));

var View =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(View, _React$PureComponent);

  function View() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.inSameThisMonthDate = function (date) {
      return (0, _composeFunctions.default)(function (d) {
        return (0, _set_date.default)(d, 1);
      }, function (d) {
        return (0, _is_same_month.default)(d, date);
      })(_this.props.activeDate);
    };

    return _this;
  }

  var _proto = View.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        activeDate = _this$props.activeDate,
        onSelect = _this$props.onSelect,
        disabledDate = _this$props.disabledDate,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        isoWeek = _this$props.isoWeek,
        renderCell = _this$props.renderCell,
        showWeekNumbers = _this$props.showWeekNumbers,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["activeDate", "onSelect", "disabledDate", "className", "classPrefix", "isoWeek", "renderCell", "showWeekNumbers"]);
    var thisMonthDate = (0, _set_date.default)(activeDate, 1);
    var classes = (0, _classnames.default)(classPrefix, className);
    return React.createElement("div", (0, _extends2.default)({}, rest, {
      className: classes
    }), React.createElement(_Table.default, {
      rows: (0, _utils.getMonthView)(thisMonthDate, isoWeek),
      isoWeek: isoWeek,
      selected: activeDate,
      onSelect: onSelect,
      inSameMonth: this.inSameThisMonthDate,
      disabledDate: disabledDate,
      renderCell: renderCell,
      showWeekNumbers: showWeekNumbers
    }));
  };

  return View;
}(React.PureComponent);

View.propTypes = {
  activeDate: _propTypes.default.instanceOf(Date),
  isoWeek: _propTypes.default.bool,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  onSelect: _propTypes.default.func,
  disabledDate: _propTypes.default.func,
  renderCell: _propTypes.default.func
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