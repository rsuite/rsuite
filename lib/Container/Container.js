"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.ContainerContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var ContainerContext = (0, _utils.createContext)({});
exports.ContainerContext = ContainerContext;

var Container =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Container, _React$Component);

  function Container(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.setContextState = function (nextState) {
      _this.setState(nextState);
    };

    _this.state = {
      hasSidebar: false
    };
    return _this;
  }

  var _proto = Container.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        _this$props$children = _this$props.children,
        children = _this$props$children === void 0 ? [] : _this$props$children,
        classPrefix = _this$props.classPrefix,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["className", "children", "classPrefix"]);
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix('has-sidebar')] = this.state.hasSidebar, _classNames));
    return React.createElement(ContainerContext.Provider, {
      value: {
        setContextState: this.setContextState
      }
    }, React.createElement("div", (0, _extends2.default)({}, props, {
      className: classes
    }), children));
  };

  return Container;
}(React.Component);

Container.propTypes = {
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'container'
})(Container);

exports.default = _default;