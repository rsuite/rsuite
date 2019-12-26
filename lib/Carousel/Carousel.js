"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var _Animation = _interopRequireDefault(require("../Animation"));

var _IntlContext = _interopRequireDefault(require("../IntlProvider/IntlContext"));

var Carousel =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Carousel, _React$Component);

  function Carousel(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this._key = (Math.random() * 1e18).toString(36).slice(0, 6);
    _this._timeListener = null;

    _this.handleChange = function (event) {
      var active = +event.target.value;

      _this.setState({
        active: active
      });
    };

    _this.state = {
      active: 0,
      last: false
    };
    return _this;
  }

  var _proto = Carousel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _this$props = this.props,
        autoplay = _this$props.autoplay,
        autoplayInterval = _this$props.autoplayInterval,
        children = _this$props.children;
    var count = React.Children.count(children);

    if (autoplay && count) {
      this._timeListener = setInterval(function () {
        var active = _this2.state.active;
        var nextActive = active === count - 1 ? 0 : active + 1;

        _this2.setState({
          last: nextActive === count - 1,
          active: nextActive
        });
      }, autoplayInterval);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this._timeListener) {
      clearInterval(this._timeListener);
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props2 = this.props,
        Component = _this$props2.componentClass,
        children = _this$props2.children,
        classPrefix = _this$props2.classPrefix,
        className = _this$props2.className,
        placement = _this$props2.placement,
        shape = _this$props2.shape,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["componentClass", "children", "classPrefix", "className", "placement", "shape"]);
    var _this$state = this.state,
        active = _this$state.active,
        last = _this$state.last;
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var count = React.Children.count(children);
    var labels = [];
    var items = [];
    var vertical = placement === 'left' || placement === 'right';
    var lengthKey = vertical ? 'height' : 'width';
    React.Children.forEach(children, function (child, index) {
      var _extends2;

      var id = _this3._key + "-" + index;
      labels.push(React.createElement("li", {
        key: "label" + index,
        className: addPrefix('label-wrapper')
      }, React.createElement("input", {
        name: _this3._key,
        id: id,
        type: "radio",
        onChange: _this3.handleChange,
        value: index,
        checked: active === index
      }), React.createElement("label", {
        htmlFor: id,
        className: addPrefix('label')
      })));
      items.push(React.cloneElement(child, {
        key: "slider-item" + index,
        style: (0, _extends3.default)({}, child.props.style, (_extends2 = {}, _extends2[lengthKey] = 100 / count + "%", _extends2)),
        className: (0, _classnames.default)(addPrefix('slider-item'), child.props.className)
      }));
    });
    var classes = (0, _classnames.default)(className, classPrefix, addPrefix("placement-" + placement), addPrefix("shape-" + shape));
    var unhandled = (0, _utils.getUnhandledProps)(Carousel, rest);
    return React.createElement(_Animation.default.Transition, {
      enteredClassName: addPrefix('last'),
      exitingClassName: addPrefix('reset'),
      in: last
    }, React.createElement(Component, (0, _extends3.default)({
      className: classes
    }, unhandled), React.createElement("div", {
      className: addPrefix('content')
    }, React.createElement(_IntlContext.default.Consumer, null, function (context) {
      var _sliderStyles;

      var activeRatio = "" + (!vertical && (context === null || context === void 0 ? void 0 : context.rtl) ? '' : '-') + 100 / count * active + "%";
      var sliderStyles = (_sliderStyles = {}, _sliderStyles[lengthKey] = count * 100 + "%", _sliderStyles.transform = vertical ? "translate3d(0, " + activeRatio + " ,0)" : "translate3d(" + activeRatio + ", 0 ,0)", _sliderStyles);
      return React.createElement("div", {
        className: addPrefix('slider'),
        style: sliderStyles
      }, items);
    }), count ? React.createElement("div", {
      className: addPrefix('slider-after')
    }, [items[items.length - 1], items[0]]) : null), React.createElement("div", {
      className: addPrefix('toolbar')
    }, React.createElement("ul", null, labels))));
  };

  return Carousel;
}(React.Component);

Carousel.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  componentClass: _propTypes.default.elementType,
  autoplay: _propTypes.default.bool,
  autoplayInterval: _propTypes.default.number,
  placement: _propTypes.default.oneOf(['top', 'bottom', 'left', 'right']),
  shape: _propTypes.default.oneOf(['dot', 'bar'])
};
Carousel.defaultProps = {
  autoplayInterval: 4000,
  placement: 'bottom',
  shape: 'dot'
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'carousel',
  componentClass: 'div'
})(Carousel);

exports.default = _default;
module.exports = exports.default;