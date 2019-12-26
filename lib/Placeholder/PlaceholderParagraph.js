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

var PlaceholderParagraph =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(PlaceholderParagraph, _React$Component);

  function PlaceholderParagraph() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PlaceholderParagraph.prototype;

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props = this.props,
        className = _this$props.className,
        rows = _this$props.rows,
        rowHeight = _this$props.rowHeight,
        rowMargin = _this$props.rowMargin,
        graph = _this$props.graph,
        active = _this$props.active,
        classPrefix = _this$props.classPrefix,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "rows", "rowHeight", "rowMargin", "graph", "active", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var unhandled = (0, _utils.getUnhandledProps)(PlaceholderParagraph, rest);
    var classes = (0, _classnames.default)(classPrefix, addPrefix('paragraph'), className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames));
    var graphShape = graph === true ? 'square' : graph;
    var rowArr = [];

    for (var i = 0; i < rows; i++) {
      rowArr.push(React.createElement("p", {
        key: i,
        style: {
          width: Math.random() * 75 + 25 + "%",
          height: rowHeight,
          marginTop: i > 0 ? rowMargin : Number(rowMargin) / 2
        }
      }));
    }

    return React.createElement("div", (0, _extends2.default)({
      className: classes
    }, unhandled), graphShape && React.createElement("div", {
      className: (0, _classnames.default)(addPrefix('paragraph-graph'), (_classNames2 = {}, _classNames2[addPrefix('paragraph-graph-circle')] = graph === 'circle', _classNames2))
    }), React.createElement("div", {
      className: addPrefix('paragraph-rows')
    }, rowArr));
  };

  return PlaceholderParagraph;
}(React.Component);

PlaceholderParagraph.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  rows: _propTypes.default.number,
  rowHeight: _propTypes.default.number,
  rowMargin: _propTypes.default.number,
  graph: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['circle', 'square'])]),
  active: _propTypes.default.bool
};
PlaceholderParagraph.defaultProps = {
  rows: 2,
  rowHeight: 10,
  rowMargin: 20
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'placeholder'
})(PlaceholderParagraph);

exports.default = _default;
module.exports = exports.default;