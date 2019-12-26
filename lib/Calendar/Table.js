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

var _TableRow = _interopRequireDefault(require("./TableRow"));

var _TableHeaderRow = _interopRequireDefault(require("./TableHeaderRow"));

var _utils = require("../utils");

var Table =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(Table, _React$PureComponent);

  function Table() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Table.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        rows = _this$props.rows,
        selected = _this$props.selected,
        onSelect = _this$props.onSelect,
        disabledDate = _this$props.disabledDate,
        inSameMonth = _this$props.inSameMonth,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        isoWeek = _this$props.isoWeek,
        renderCell = _this$props.renderCell,
        showWeekNumbers = _this$props.showWeekNumbers,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["rows", "selected", "onSelect", "disabledDate", "inSameMonth", "className", "classPrefix", "isoWeek", "renderCell", "showWeekNumbers"]);
    var classes = (0, _classnames.default)(classPrefix, className);
    return React.createElement("div", (0, _extends2.default)({}, rest, {
      className: classes
    }), React.createElement(_TableHeaderRow.default, {
      isoWeek: isoWeek,
      showWeekNumbers: showWeekNumbers
    }), rows.map(function (week, index) {
      return React.createElement(_TableRow.default
      /* eslint-disable */
      , {
        key: index,
        weekendDate: week,
        selected: selected,
        onSelect: onSelect,
        inSameMonth: inSameMonth,
        disabledDate: disabledDate,
        renderCell: renderCell,
        showWeekNumbers: showWeekNumbers
      });
    }));
  };

  return Table;
}(React.PureComponent);

Table.propTypes = {
  rows: _propTypes.default.array,
  isoWeek: _propTypes.default.bool,
  selected: _propTypes.default.instanceOf(Date),
  onSelect: _propTypes.default.func,
  disabledDate: _propTypes.default.func,
  inSameMonth: _propTypes.default.func,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  renderCell: _propTypes.default.func
};
Table.defaultProps = {
  rows: []
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'calendar-table'
});

var _default = enhance(Table);

exports.default = _default;
module.exports = exports.default;