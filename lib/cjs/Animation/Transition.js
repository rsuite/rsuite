'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.transitionPropTypes = exports.default = exports.STATUS = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _getTransitionEnd = _interopRequireDefault(require("dom-lib/getTransitionEnd"));
var _on = _interopRequireDefault(require("dom-lib/on"));
var _classnames = _interopRequireDefault(require("classnames"));
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _utils = require("../internals/utils");
var _utils2 = require("./utils");
var _excluded = ["children", "className", "exitedClassName", "enteringClassName", "enteredClassName", "exitingClassName"];
var STATUS = exports.STATUS = /*#__PURE__*/function (STATUS) {
  STATUS[STATUS["UNMOUNTED"] = 0] = "UNMOUNTED";
  STATUS[STATUS["EXITED"] = 1] = "EXITED";
  STATUS[STATUS["ENTERING"] = 2] = "ENTERING";
  STATUS[STATUS["ENTERED"] = 3] = "ENTERED";
  STATUS[STATUS["EXITING"] = 4] = "EXITING";
  return STATUS;
}({});
var transitionPropTypes = exports.transitionPropTypes = (0, _extends2.default)({}, _utils2.animationPropTypes, {
  animation: _propTypes.default.bool,
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  className: _propTypes.default.string,
  in: _propTypes.default.bool,
  unmountOnExit: _propTypes.default.bool,
  transitionAppear: _propTypes.default.bool,
  timeout: _propTypes.default.number,
  exitedClassName: _propTypes.default.string,
  exitingClassName: _propTypes.default.string,
  enteredClassName: _propTypes.default.string,
  enteringClassName: _propTypes.default.string
});
/**
 * A Transition component for animation.
 * @see https://rsuitejs.com/components/animation/#transition
 */
var Transition = /*#__PURE__*/function (_React$Component) {
  function Transition(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.animationEventListener = null;
    _this.instanceElement = null;
    _this.nextCallback = null;
    _this.needsUpdate = null;
    _this.childRef = void 0;
    var initialStatus;
    if (props.in) {
      initialStatus = props.transitionAppear ? STATUS.EXITED : STATUS.ENTERED;
    } else {
      initialStatus = props.unmountOnExit ? STATUS.UNMOUNTED : STATUS.EXITED;
    }
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    _this.childRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }
  (0, _inheritsLoose2.default)(Transition, _React$Component);
  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.in && nextProps.unmountOnExit) {
      if (prevState.status === STATUS.UNMOUNTED) {
        // Start enter transition in componentDidUpdate.
        return {
          status: STATUS.EXITED
        };
      }
    }
    return null;
  };
  var _proto = Transition.prototype;
  _proto.getSnapshotBeforeUpdate = function getSnapshotBeforeUpdate() {
    if (!this.props.in || !this.props.unmountOnExit) {
      this.needsUpdate = true;
    }
    return null;
  };
  _proto.componentDidMount = function componentDidMount() {
    if (this.props.transitionAppear && this.props.in) {
      this.performEnter(this.props);
    }
  };
  _proto.componentDidUpdate = function componentDidUpdate() {
    var status = this.state.status;
    var unmountOnExit = this.props.unmountOnExit;
    if (unmountOnExit && status === STATUS.EXITED) {
      if (this.props.in) {
        this.performEnter(this.props);
      } else {
        if (this.instanceElement) {
          this.setState({
            status: STATUS.UNMOUNTED
          });
        }
      }
      return;
    }
    if (this.needsUpdate) {
      this.needsUpdate = false;
      if (this.props.in) {
        if (status === STATUS.EXITING || status === STATUS.EXITED) {
          this.performEnter(this.props);
        }
      } else if (status === STATUS.ENTERING || status === STATUS.ENTERED) {
        this.performExit(this.props);
      }
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
    this.instanceElement = null;
  };
  _proto.onTransitionEnd = function onTransitionEnd(node, handler) {
    var _this$animationEventL;
    this.setNextCallback(handler);
    (_this$animationEventL = this.animationEventListener) === null || _this$animationEventL === void 0 || _this$animationEventL.off();
    if (!this.nextCallback) {
      return;
    }
    if (node) {
      var _this$props = this.props,
        timeout = _this$props.timeout,
        animation = _this$props.animation;
      this.animationEventListener = (0, _on.default)(node, animation ? (0, _utils2.getAnimationEnd)() : (0, _getTransitionEnd.default)(), this.nextCallback);
      if (timeout !== null) {
        setTimeout(this.nextCallback, timeout);
      }
    } else {
      setTimeout(this.nextCallback, 0);
    }
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this2 = this;
    var active = true;
    this.nextCallback = function (event) {
      if (!active) {
        return;
      }
      if (event) {
        if (_this2.instanceElement === event.target) {
          callback(event);
          active = false;
          _this2.nextCallback = null;
        }
        return;
      }
      callback(event);
      active = false;
      _this2.nextCallback = null;
    };
    if (this.nextCallback) {
      this.nextCallback.cancel = function () {
        active = false;
      };
    }
    return this.nextCallback;
  };
  _proto.getChildElement = function getChildElement() {
    if (this.childRef.current) {
      return (0, _utils.getDOMNode)(this.childRef.current);
    }
    return (0, _utils.getDOMNode)(this);
  };
  _proto.performEnter = function performEnter(props) {
    var _this3 = this;
    var _ref = props || this.props,
      onEnter = _ref.onEnter,
      onEntering = _ref.onEntering,
      onEntered = _ref.onEntered;
    this.cancelNextCallback();
    var node = this.getChildElement();
    this.instanceElement = node;
    onEnter === null || onEnter === void 0 || onEnter(node);
    this.safeSetState({
      status: STATUS.ENTERING
    }, function () {
      onEntering === null || onEntering === void 0 || onEntering(node);
      _this3.onTransitionEnd(node, function () {
        _this3.safeSetState({
          status: STATUS.ENTERED
        }, function () {
          onEntered === null || onEntered === void 0 || onEntered(node);
        });
      });
    });
  };
  _proto.performExit = function performExit(props) {
    var _this4 = this;
    var _ref2 = props || this.props,
      onExit = _ref2.onExit,
      onExiting = _ref2.onExiting,
      onExited = _ref2.onExited;
    this.cancelNextCallback();
    var node = this.getChildElement();
    this.instanceElement = node;
    onExit === null || onExit === void 0 || onExit(node);
    this.safeSetState({
      status: STATUS.EXITING
    }, function () {
      onExiting === null || onExiting === void 0 || onExiting(node);
      _this4.onTransitionEnd(node, function () {
        _this4.safeSetState({
          status: STATUS.EXITED
        }, function () {
          onExited === null || onExited === void 0 || onExited(node);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    if (this.instanceElement) {
      var nextCallback = this.setNextCallback(callback);
      this.setState(nextState, function () {
        return nextCallback === null || nextCallback === void 0 ? void 0 : nextCallback();
      });
    }
  };
  _proto.render = function render() {
    var _child$props;
    var status = this.state.status;
    if (status === STATUS.UNMOUNTED) {
      return null;
    }
    var _this$props2 = this.props,
      children = _this$props2.children,
      className = _this$props2.className,
      exitedClassName = _this$props2.exitedClassName,
      enteringClassName = _this$props2.enteringClassName,
      enteredClassName = _this$props2.enteredClassName,
      exitingClassName = _this$props2.exitingClassName,
      rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, _excluded);
    var childProps = (0, _omit.default)(rest, Object.keys(transitionPropTypes));
    var transitionClassName;
    if (status === STATUS.EXITED) {
      transitionClassName = exitedClassName;
    } else if (status === STATUS.ENTERING) {
      transitionClassName = enteringClassName;
    } else if (status === STATUS.ENTERED) {
      transitionClassName = enteredClassName;
    } else if (status === STATUS.EXITING) {
      transitionClassName = exitingClassName;
    }
    if ((0, _isFunction.default)(children)) {
      childProps.className = (0, _classnames.default)(className, transitionClassName);
      return children(childProps, this.childRef);
    }
    var child = _react.default.Children.only(children);
    return /*#__PURE__*/_react.default.cloneElement(child, (0, _extends2.default)({}, childProps, {
      ref: this.childRef,
      className: (0, _classnames.default)(className, (_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props.className, transitionClassName)
    }));
  };
  return Transition;
}(_react.default.Component);
Transition.propTypes = transitionPropTypes;
Transition.displayName = 'Transition';
Transition.defaultProps = {
  timeout: 1000
};
var _default = exports.default = Transition;