"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _domLib = require("dom-lib");

var _utils = require("../utils");

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var precisionMath = function precisionMath(value) {
  return parseFloat(value.toFixed(10));
};

var Slider =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Slider, _React$Component);

  function Slider(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.handleRef = void 0;
    _this.barRef = void 0;
    _this.mouseMoveTracker = null;

    _this.handleClick = function (event) {
      if (_this.props.disabled) {
        return;
      }

      _this.updatePosition(event);
    };

    _this.handleMouseDown = function (event) {
      if (_this.props.disabled) {
        return;
      }

      _this.mouseMoveTracker = _this.getMouseMoveTracker();

      _this.mouseMoveTracker.captureMouseMoves(event);

      _this.setState({
        handleDown: true
      });
    };

    _this.handleMouseEnter = function () {
      _this.setTooltipPosition();
    };

    _this.handleDragEnd = function () {
      _this.releaseMouseMoves();

      _this.setState({
        handleDown: false
      });
    };

    _this.handleDragMove = function (_deltaX, _deltaY, event) {
      if (!_this.mouseMoveTracker || !_this.mouseMoveTracker.isDragging()) {
        return;
      }

      _this.updatePosition(event);

      _this.setTooltipPosition();
    };

    _this.releaseMouseMoves = function () {
      if (_this.mouseMoveTracker) {
        _this.mouseMoveTracker.releaseMouseMoves();

        _this.mouseMoveTracker = null;
      }
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.state = {
      value: _this.checkValue(props.defaultValue, props)
    };
    _this.handleRef = React.createRef();
    _this.barRef = React.createRef();
    return _this;
  }

  var _proto = Slider.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.releaseMouseMoves();
  };

  _proto.getMouseMoveTracker = function getMouseMoveTracker() {
    return this.mouseMoveTracker || new _domLib.DOMMouseMoveTracker(this.handleDragMove, this.handleDragEnd, document.body);
  };

  _proto.getSplitCount = function getSplitCount() {
    var _this$props = this.props,
        min = _this$props.min,
        step = _this$props.step;
    var max = this.getMax();
    return precisionMath((max - min) / step);
  };

  _proto.getMax = function getMax(props) {
    var _ref = props || this.props,
        max = _ref.max,
        min = _ref.min,
        step = _ref.step;

    return precisionMath(Math.floor((max - min) / step) * step + min);
  };

  _proto.getValue = function getValue() {
    var value = this.props.value;
    return typeof value === 'undefined' ? this.state.value : this.checkValue(value);
  };

  _proto.setValue = function setValue(value) {
    var _this$props2 = this.props,
        onChange = _this$props2.onChange,
        min = _this$props2.min;
    var max = this.getMax();

    if (value < min) {
      value = min;
    }

    if (value > max) {
      value = max;
    }

    this.setState({
      value: value
    });
    onChange === null || onChange === void 0 ? void 0 : onChange(value);
  };

  _proto.setTooltipPosition = function setTooltipPosition() {
    var tooltip = this.props.tooltip;

    if (tooltip) {
      var handle = this.handleRef.current;
      var tip = handle.querySelector("." + this.addPrefix('tooltip'));
      var width = (0, _domLib.getWidth)(tip);
      (0, _domLib.addStyle)(tip, 'left', "-" + width / 2 + "px");
    }
  };

  _proto.checkValue = function checkValue(value, props) {
    var _ref2 = props || this.props,
        min = _ref2.min;

    var max = this.getMax(props);

    if (value < min) {
      return min;
    }

    if (value > max) {
      return max;
    }

    return value;
  };

  _proto.getHeight = function getHeight() {
    if (this.barRef.current) {
      return (0, _domLib.getHeight)(this.barRef.current);
    }

    return 0;
  };

  _proto.getWidth = function getWidth() {
    if (this.barRef.current) {
      return (0, _domLib.getWidth)(this.barRef.current);
    }

    return 0;
  }
  /**
   * 通过偏移量计算值
   * @param {number} offset 偏移量
   */
  ;

  _proto.calculateValue = function calculateValue(offset) {
    var _this$props3 = this.props,
        step = _this$props3.step,
        vertical = _this$props3.vertical;
    var count = this.getSplitCount();
    var value = 0;

    if (isNaN(offset)) {
      return value;
    }

    if (vertical) {
      var barHeight = this.getHeight();
      value = Math.round(offset / (barHeight / count)) * step;
    } else {
      var barWidth = this.getWidth();
      value = Math.round(offset / (barWidth / count)) * step;
    }

    return precisionMath(value);
  };

  _proto.updatePosition = function updatePosition(event) {
    var _this$props4 = this.props,
        vertical = _this$props4.vertical,
        min = _this$props4.min,
        locale = _this$props4.locale;
    var barOffset = (0, _domLib.getOffset)(this.barRef.current);
    var offset = vertical ? event.pageY - barOffset.top : event.pageX - barOffset.left;
    var value = locale.rtl && !vertical ? barOffset.width - offset : offset;
    this.setValue(this.calculateValue(value) + min);
  };

  _proto.renderMark = function renderMark(mark, last) {
    var _classNames;

    var renderMark = this.props.renderMark;
    var classes = (0, _classnames.default)(this.addPrefix('mark'), (_classNames = {}, _classNames[this.addPrefix('last-mark')] = last, _classNames));

    if (renderMark) {
      return React.createElement("span", {
        className: classes
      }, React.createElement("span", {
        className: this.addPrefix('mark-content')
      }, renderMark(mark)));
    }

    return null;
  };

  _proto.renderGraduated = function renderGraduated() {
    var _this$props5 = this.props,
        step = _this$props5.step,
        min = _this$props5.min;
    var max = this.getMax();
    var count = this.getSplitCount();
    var value = this.getValue();
    var graduatedItems = [];
    var pass = precisionMath(value / step - min / step);
    var active = precisionMath(Math.ceil((value - min) / (max - min) * count));

    for (var i = 0; i < count; i += 1) {
      var _classNames2;

      var classes = (0, _classnames.default)((_classNames2 = {}, _classNames2[this.addPrefix('pass')] = i <= pass, _classNames2[this.addPrefix('active')] = i === active, _classNames2));
      var mark = precisionMath(i * step + min);
      var last = i === count - 1;
      graduatedItems.push(React.createElement("li", {
        className: classes,
        key: i
      }, this.renderMark(mark), last && this.renderMark(max, true)));
    }

    return React.createElement("div", {
      className: this.addPrefix('graduator')
    }, React.createElement("ul", null, graduatedItems));
  };

  _proto.renderHanlde = function renderHanlde() {
    var _extends2, _classNames3;

    var _this$props6 = this.props,
        handleClassName = _this$props6.handleClassName,
        handleTitle = _this$props6.handleTitle,
        min = _this$props6.min,
        vertical = _this$props6.vertical,
        tooltip = _this$props6.tooltip,
        handleStyle = _this$props6.handleStyle,
        renderTooltip = _this$props6.renderTooltip,
        locale = _this$props6.locale;
    var max = this.getMax();
    var handleDown = this.state.handleDown;
    var value = this.getValue();
    var horizontalKey = locale.rtl ? 'right' : 'left';
    var direction = vertical ? 'top' : horizontalKey;
    var style = (0, _extends3.default)({}, handleStyle, (_extends2 = {}, _extends2[direction] = (value - min) / (max - min) * 100 + "%", _extends2));
    var handleClasses = (0, _classnames.default)(this.addPrefix('handle'), handleClassName, (_classNames3 = {}, _classNames3[this.addPrefix('showtip')] = handleDown, _classNames3));
    return React.createElement("div", {
      className: handleClasses,
      role: "presentation",
      onMouseDown: this.handleMouseDown,
      onMouseEnter: this.handleMouseEnter,
      style: style,
      ref: this.handleRef
    }, tooltip && React.createElement(_Tooltip.default, {
      className: (0, _classnames.default)(this.addPrefix('tooltip'), 'placement-top')
    }, renderTooltip ? renderTooltip(value) : value), handleTitle);
  };

  _proto.renderProgress = function renderProgress() {
    var _style;

    var _this$props7 = this.props,
        vertical = _this$props7.vertical,
        min = _this$props7.min;
    var max = this.getMax();
    var value = this.getValue();
    var key = vertical ? 'height' : 'width';
    var style = (_style = {}, _style[key] = (value - min) / (max - min) * 100 + "%", _style);
    return React.createElement("div", {
      style: style,
      className: this.addPrefix('progress-bar')
    });
  };

  _proto.render = function render() {
    var _classNames4;

    var _this$props8 = this.props,
        graduated = _this$props8.graduated,
        className = _this$props8.className,
        barClassName = _this$props8.barClassName,
        progress = _this$props8.progress,
        vertical = _this$props8.vertical,
        disabled = _this$props8.disabled,
        classPrefix = _this$props8.classPrefix,
        renderMark = _this$props8.renderMark,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props8, ["graduated", "className", "barClassName", "progress", "vertical", "disabled", "classPrefix", "renderMark"]);
    var handleDown = this.state.handleDown;
    var classes = (0, _classnames.default)(classPrefix, className, (_classNames4 = {}, _classNames4[this.addPrefix('vertical')] = vertical, _classNames4[this.addPrefix('disabled')] = disabled, _classNames4[this.addPrefix('graduated')] = graduated, _classNames4[this.addPrefix('dragging')] = handleDown, _classNames4[this.addPrefix('with-mark')] = (0, _isFunction2.default)(renderMark), _classNames4));
    var unhandled = (0, _utils.getUnhandledProps)(Slider, rest);
    return React.createElement("div", (0, _extends3.default)({}, unhandled, {
      className: classes,
      onClick: this.handleClick,
      role: "presentation"
    }), React.createElement("div", {
      className: (0, _classnames.default)(this.addPrefix('bar'), barClassName),
      ref: this.barRef
    }, progress && this.renderProgress(), graduated && this.renderGraduated()), this.renderHanlde());
  };

  return Slider;
}(React.Component);

Slider.propTypes = {
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  step: _propTypes.default.number,
  value: _propTypes.default.number,
  defaultValue: _propTypes.default.number,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  handleClassName: _propTypes.default.string,
  handleTitle: _propTypes.default.node,
  barClassName: _propTypes.default.string,
  handleStyle: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  graduated: _propTypes.default.bool,
  tooltip: _propTypes.default.bool,
  progress: _propTypes.default.bool,
  vertical: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  renderMark: _propTypes.default.func,
  renderTooltip: _propTypes.default.func,
  locale: _propTypes.default.object
};
Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 0,
  tooltip: true,
  locale: {}
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'slider'
})(Slider);

exports.default = _default;
module.exports = exports.default;