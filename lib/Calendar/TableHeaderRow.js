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

var _FormattedMessage = _interopRequireDefault(require("../IntlProvider/FormattedMessage"));

var weekKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

var TableHeaderRow =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(TableHeaderRow, _React$PureComponent);

  function TableHeaderRow() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = TableHeaderRow.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        isoWeek = _this$props.isoWeek,
        showWeekNumbers = _this$props.showWeekNumbers,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "classPrefix", "isoWeek", "showWeekNumbers"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(addPrefix('row'), addPrefix('header-row'), className);
    var items = weekKeys;

    if (isoWeek) {
      items = weekKeys.filter(function (v) {
        return v !== 'sunday';
      });
      items.push('sunday');
    }

    return React.createElement("div", (0, _extends2.default)({}, props, {
      className: classes
    }), showWeekNumbers && React.createElement("div", {
      className: addPrefix('cell')
    }), items.map(function (key) {
      return React.createElement("div", {
        key: key,
        className: addPrefix('cell')
      }, React.createElement("span", {
        className: addPrefix('cell-content')
      }, React.createElement(_FormattedMessage.default, {
        id: key
      })));
    }));
  };

  return TableHeaderRow;
}(React.PureComponent);

TableHeaderRow.propTypes = {
  isoWeek: _propTypes.default.bool,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'calendar-table'
});

var _default = enhance(TableHeaderRow);

exports.default = _default;
module.exports = exports.default;