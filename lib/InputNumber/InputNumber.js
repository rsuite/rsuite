"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _domLib = require("dom-lib");

var _InputGroup = _interopRequireDefault(require("../InputGroup/InputGroup"));

var _InputGroupAddon = _interopRequireDefault(require("../InputGroup/InputGroupAddon"));

var _Input = _interopRequireDefault(require("../Input"));

var _Button = _interopRequireDefault(require("../Button"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _utils = require("../utils");

var isFloat = function isFloat(value) {
  return /(^-?|^\+?|^\d?)\d*\.\d+$/.test(value + '');
};

function getDecimalLength(value) {
  if (isFloat(value)) {
    return value.toString().split('.')[1].length;
  }

  return 0;
}

function decimals() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  var lengths = values.map(getDecimalLength);
  return Math.max.apply(Math, lengths);
}

function getButtonStatus(value, min, max) {
  var status = {
    disabledUpButton: false,
    disabledDownButton: false
  };

  if (typeof value !== 'undefined' && value !== null) {
    status.disabledUpButton = +value >= max;
    status.disabledDownButton = +value <= min;
  }

  return status;
}

var InputNumber =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(InputNumber, _React$Component);

  function InputNumber(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.input = null;
    _this.inputWheelListener = null;

    _this.bindInputRef = function (ref) {
      _this.input = ref;
    };

    _this.handleOnChange = function (value, event) {
      if (!/^-?(?:\d+)?(\.)?(\d+)*$/.test(value) && value !== '') {
        return;
      }

      var isUnControl = (0, _isUndefined2.default)(_this.props.value);

      _this.handleValue(value, event, isUnControl);
    };

    _this.handleBlur = function (event) {
      var targetValue = Number.parseFloat((0, _get2.default)(event, 'target.value'));

      _this.handleValue(_this.getSafeValue(targetValue), event);
    };

    _this.handleWheel = function (event) {
      var _this$props = _this.props,
          onWheel = _this$props.onWheel,
          disabled = _this$props.disabled;

      if (!disabled && event.target === document.activeElement) {
        event.preventDefault();
        var delta = (0, _get2.default)(event, 'wheelDelta') || -event.deltaY || -(0, _get2.default)(event, 'detail');

        if (delta > 0) {
          _this.handleMinus(event);
        }

        if (delta < 0) {
          _this.handlePlus(event);
        }
      }

      onWheel && onWheel(event);
    };

    _this.handlePlus = function (event) {
      var step = _this.props.step;
      var value = +(_this.getValue() || 0);
      var bit = decimals(value, step);
      var nextValue = (value + step).toFixed(bit);

      _this.handleValue(_this.getSafeValue(nextValue), event);
    };

    _this.handleMinus = function (event) {
      var step = _this.props.step;
      var value = +(_this.getValue() || 0);
      var bit = decimals(value, step);
      var nextValue = (value - step).toFixed(bit);

      _this.handleValue(_this.getSafeValue(nextValue), event);
    };

    var _value = props.value,
        defaultValue = props.defaultValue,
        max = props.max,
        min = props.min;

    var _getButtonStatus = getButtonStatus((0, _isUndefined2.default)(_value) ? defaultValue : _value, min, max),
        disabledUpButton = _getButtonStatus.disabledUpButton,
        disabledDownButton = _getButtonStatus.disabledDownButton;

    _this.state = {
      value: defaultValue,
      disabledUpButton: disabledUpButton,
      disabledDownButton: disabledDownButton
    };
    return _this;
  }

  InputNumber.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    if (typeof nextProps.value !== 'undefined') {
      var value = nextProps.value,
          min = nextProps.min,
          max = nextProps.max;
      return getButtonStatus(value, min, max);
    }

    return null;
  };

  var _proto = InputNumber.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.input) {
      this.inputWheelListener = (0, _domLib.on)(this.input, 'wheel', this.handleWheel, {
        passive: false
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.inputWheelListener) {
      this.inputWheelListener.off();
    }
  };

  _proto.getValue = function getValue() {
    var value = this.props.value;
    return (0, _isUndefined2.default)(value) ? this.state.value : value;
  };

  _proto.getSafeValue = function getSafeValue(value) {
    var _this$props2 = this.props,
        max = _this$props2.max,
        min = _this$props2.min;

    if (!Number.isNaN(value)) {
      if (+value > max) {
        value = max;
      }

      if (+value < min) {
        value = min;
      }
    } else {
      value = '';
    }

    return value;
  };

  _proto.handleValue = function handleValue(currentValue, event, input) {
    var value = this.state.value;
    var _this$props3 = this.props,
        onChange = _this$props3.onChange,
        min = _this$props3.min,
        max = _this$props3.max;

    if (currentValue !== value) {
      this.setState((0, _extends2.default)({}, getButtonStatus(currentValue, min, max), {
        value: currentValue
      }));

      if (!input) {
        onChange === null || onChange === void 0 ? void 0 : onChange(currentValue, event);
      }
    }
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        disabled = _this$props4.disabled,
        size = _this$props4.size,
        prefixElement = _this$props4.prefix,
        postfix = _this$props4.postfix,
        className = _this$props4.className,
        classPrefix = _this$props4.classPrefix,
        step = _this$props4.step,
        buttonAppearance = _this$props4.buttonAppearance,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props4, ["disabled", "size", "prefix", "postfix", "className", "classPrefix", "step", "buttonAppearance"]);
    var _this$state = this.state,
        disabledUpButton = _this$state.disabledUpButton,
        disabledDownButton = _this$state.disabledDownButton;
    var value = this.getValue();
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var classes = (0, _classnames.default)(classPrefix, className);
    var unhandled = (0, _utils.getUnhandledProps)(InputNumber, props);

    var _partitionHTMLProps = (0, _utils.partitionHTMLProps)(unhandled),
        htmlInputProps = _partitionHTMLProps[0],
        rest = _partitionHTMLProps[1];

    return React.createElement(_InputGroup.default, (0, _extends2.default)({}, rest, {
      className: classes,
      disabled: disabled,
      size: size
    }), prefixElement && React.createElement(_InputGroupAddon.default, null, prefixElement), React.createElement(_Input.default, (0, _extends2.default)({}, htmlInputProps, {
      type: "text",
      autoComplete: "off",
      step: step,
      inputRef: this.bindInputRef,
      onChange: this.handleOnChange,
      onBlur: (0, _utils.createChainedFunction)(this.handleBlur, (0, _get2.default)(htmlInputProps, 'onBlur')),
      value: (0, _isNil2.default)(value) ? '' : "" + value,
      disabled: disabled
    })), React.createElement("span", {
      className: addPrefix('btn-group-vertical')
    }, React.createElement(_Button.default, {
      appearance: buttonAppearance,
      className: addPrefix('touchspin-up'),
      onClick: this.handlePlus,
      disabled: disabledUpButton || disabled
    }, React.createElement(_Icon.default, {
      icon: "arrow-up-line"
    })), React.createElement(_Button.default, {
      appearance: buttonAppearance,
      className: addPrefix('touchspin-down'),
      onClick: this.handleMinus,
      disabled: disabledDownButton || disabled
    }, React.createElement(_Icon.default, {
      icon: "arrow-down-line"
    }))), postfix && React.createElement(_InputGroupAddon.default, null, postfix));
  };

  return InputNumber;
}(React.Component);

InputNumber.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  step: _propTypes.default.number,
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  prefix: _propTypes.default.node,
  postfix: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  size: _propTypes.default.oneOf(['lg', 'md', 'sm', 'xs']),
  buttonAppearance: _propTypes.default.oneOf(['default', 'primary', 'link', 'subtle', 'ghost']),
  onWheel: _propTypes.default.func,
  onChange: _propTypes.default.func
};
InputNumber.defaultProps = {
  min: -Infinity,
  max: Infinity,
  step: 1,
  buttonAppearance: 'subtle'
};
(0, _reactLifecyclesCompat.polyfill)(InputNumber);

var _default = (0, _utils.defaultProps)({
  classPrefix: 'input-number'
})(InputNumber);

exports.default = _default;
module.exports = exports.default;