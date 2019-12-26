"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var React = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _classnames = _interopRequireDefault(require("classnames"));

var _domLib = require("dom-lib");

var _utils = require("../utils");

var _elementResizeEvent = _interopRequireWildcard(require("element-resize-event"));

/* eslint-disable react/no-find-dom-node */
var omitProps = ['placement', 'shouldUpdatePosition', 'arrowOffsetLeft', 'arrowOffsetTop', 'positionLeft', 'positionTop', 'getPositionInstance', 'getToggleInstance', 'autoWidth'];
var resizePlacement = ['topStart', 'topEnd', 'leftEnd', 'rightEnd', 'auto', 'autoVerticalStart', 'autoVerticalEnd', 'autoHorizontalEnd'];

var MenuWrapper =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(MenuWrapper, _React$Component);

  function MenuWrapper(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuElementRef = void 0;

    _this.handleResize = function () {
      var getPositionInstance = _this.props.getPositionInstance;
      var instance = getPositionInstance ? getPositionInstance() : null;

      if (instance) {
        instance.updatePosition(true);
      }
    };

    _this.menuElementRef = React.createRef();
    return _this;
  }

  var _proto = MenuWrapper.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var autoWidth = this.props.autoWidth;

    if (resizePlacement.includes(this.props.placement)) {
      (0, _elementResizeEvent.default)(this.menuElementRef.current, this.handleResize);
    }

    if (autoWidth) {
      this.updateMenuStyle();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.menuElementRef.current) {
      (0, _elementResizeEvent.unbind)(this.menuElementRef.current);
    }
  };

  _proto.updateMenuStyle = function updateMenuStyle() {
    var getToggleInstance = this.props.getToggleInstance;

    if (this.menuElementRef.current && getToggleInstance) {
      var _instance$toggleRef;

      var instance = getToggleInstance();

      if (instance === null || instance === void 0 ? void 0 : (_instance$toggleRef = instance.toggleRef) === null || _instance$toggleRef === void 0 ? void 0 : _instance$toggleRef.current) {
        var width = (0, _domLib.getWidth)((0, _reactDom.findDOMNode)(instance.toggleRef.current));
        (0, _domLib.addStyle)(this.menuElementRef.current, 'min-width', width + "px");
      }
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "classPrefix"]);
    return React.createElement("div", (0, _extends2.default)({}, (0, _omit2.default)(rest, omitProps), {
      ref: this.menuElementRef,
      className: (0, _classnames.default)(classPrefix, className)
    }));
  };

  return MenuWrapper;
}(React.Component);

var enhance = (0, _utils.defaultProps)({
  classPrefix: 'picker-menu'
});

var _default = enhance(MenuWrapper);

exports.default = _default;
module.exports = exports.default;