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

var PlaceholderGrid =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PlaceholderGrid, _React$Component);

  function PlaceholderGrid() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PlaceholderGrid.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        rows = _this$props.rows,
        columns = _this$props.columns,
        rowHeight = _this$props.rowHeight,
        rowMargin = _this$props.rowMargin,
        active = _this$props.active,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "classPrefix", "rows", "columns", "rowHeight", "rowMargin", "active"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var unhandled = (0, _utils.getUnhandledProps)(PlaceholderGrid, rest);
    var classes = (0, _classnames.default)(classPrefix, addPrefix('grid'), className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames));
    var colItems = [];
    var firstRowItemWidth = Math.random() * 30 + 30;
    var itemWidth = firstRowItemWidth / 2;

    for (var i = 0; i < columns; i++) {
      var rowItems = [];

      for (var j = 0; j < rows; j++) {
        var widthPercent = Math.random() * 50 + 10; // when first column

        if (i > 0) {
          // when other columns
          widthPercent = j > 0 ? itemWidth : firstRowItemWidth;
        }

        rowItems.push(React.createElement("p", {
          key: j,
          style: {
            width: widthPercent + "%",
            height: rowHeight,
            marginTop: j > 0 ? rowMargin : null
          }
        }));
      }

      colItems.push(React.createElement("div", {
        key: i,
        className: (0, _classnames.default)(addPrefix('grid-col'))
      }, rowItems));
    }

    return React.createElement("div", (0, _extends2.default)({
      className: classes
    }, unhandled), colItems);
  };

  return PlaceholderGrid;
}(React.Component);

PlaceholderGrid.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  rows: _propTypes.default.number,
  columns: _propTypes.default.number,
  rowHeight: _propTypes.default.number,
  rowMargin: _propTypes.default.number,
  active: _propTypes.default.bool
};
PlaceholderGrid.defaultProps = {
  rows: 5,
  columns: 5,
  rowHeight: 10,
  rowMargin: 20
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'placeholder'
})(PlaceholderGrid);

exports.default = _default;
module.exports = exports.default;