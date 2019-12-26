"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _prefix = require("./prefix");

function defaultProps(props) {
  var classPrefix = props.classPrefix,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["classPrefix"]);
  return function (WrappedComponent) {
    var DefaultPropsComponent =
    /*#__PURE__*/
    function (_WrappedComponent) {
      (0, _inheritsLoose2.default)(DefaultPropsComponent, _WrappedComponent);

      function DefaultPropsComponent() {
        return _WrappedComponent.apply(this, arguments) || this;
      }

      var _proto = DefaultPropsComponent.prototype;

      // for IE9 & IE10 support
      _proto.render = function render() {
        return _WrappedComponent.prototype.render.call(this);
      };

      return DefaultPropsComponent;
    }(WrappedComponent); // for IE9 & IE10 support


    DefaultPropsComponent.contextTypes = WrappedComponent.contextTypes;
    DefaultPropsComponent.childContextTypes = WrappedComponent.childContextTypes;
    DefaultPropsComponent.getDerivedStateFromProps = WrappedComponent.getDerivedStateFromProps;
    DefaultPropsComponent.defaultProps = (0, _extends2.default)({}, WrappedComponent.defaultProps, {
      classPrefix: classPrefix ? "" + (0, _prefix.getClassNamePrefix)() + classPrefix : undefined
    }, rest);

    if (WrappedComponent.contextType) {
      DefaultPropsComponent.contextType = WrappedComponent.contextType;
    }

    return DefaultPropsComponent;
  };
}

var _default = defaultProps;
exports.default = _default;
module.exports = exports.default;