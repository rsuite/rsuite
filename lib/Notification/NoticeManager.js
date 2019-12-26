"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Animation = require("rsuite-utils/lib/Animation");

var _utils = require("../utils");

var _prefix = require("../utils/prefix");

var _Message = _interopRequireDefault(require("./Message"));

var id = 0;

var getUid = function getUid() {
  id += 1;
  return (0, _prefix.defaultClassPrefix)("notification-" + Date.now() + "-" + id);
};

var NoticeManager =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(NoticeManager, _React$Component);

  NoticeManager.getInstance = function getInstance(props, callback) {
    var getContainer = props.getContainer,
        rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["getContainer"]);
    var mountElement = document.createElement('div');
    var container = typeof getContainer === 'function' ? getContainer() : document.body;
    container.appendChild(mountElement);
    var called = false;

    function ref(ref) {
      if (called) {
        return;
      }

      var instance = {
        push: function push(item) {
          ref.add(item);
        },
        remove: function remove(key) {
          ref.actualRemove(key);
        },
        removeAll: function removeAll() {
          ref.removeAll();
        },
        component: ref,
        destroy: function destroy() {
          _reactDom.default.unmountComponentAtNode(mountElement);

          document.removeChild(mountElement);
        }
      };
      called = true;
      callback(instance);
    }

    _reactDom.default.render(React.createElement(NoticeManager, (0, _extends2.default)({}, rest, {
      ref: ref
    })), mountElement);
  };

  function NoticeManager(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.add = function (item) {
      var notices = _this.state.notices;
      item.key = typeof item.key === 'undefined' ? getUid() : item.key;
      item.show = true;

      if (!notices.find(function (n) {
        return n.key === item.key;
      })) {
        _this.setState({
          notices: [].concat(notices, [item])
        });
      }
    };

    _this.removeAll = function () {
      var notices = _this.state.notices;

      _this.setState({
        notices: notices.map(function (n) {
          return (0, _extends2.default)({}, n, {
            show: false
          });
        })
      }, function () {
        setTimeout(function () {
          _this.setState({
            notices: []
          });
        }, 1000);
      });
    };

    _this.remove = function (key) {
      var notices = _this.state.notices;
      key = _this.getKey(key);
      var nextNotices = notices.map(function (n) {
        if (n.key === key) {
          n.show = false;
        }

        return n;
      });

      var callback = function callback() {
        setTimeout(function () {
          _this.actualRemove(key);
        }, 1000);
      };

      _this.setState({
        notices: nextNotices
      }, callback);
    };

    _this.actualRemove = function (key) {
      key = _this.getKey(key);

      _this.setState(function (prevState) {
        return {
          notices: prevState.notices.filter(function (notice) {
            return notice.key !== key;
          })
        };
      });
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.state = {
      show: false,
      notices: []
    };
    return _this;
  }

  var _proto = NoticeManager.prototype;

  _proto.getKey = function getKey(key) {
    var notices = this.state.notices;

    if (typeof key === 'undefined' && notices.length) {
      key = notices[notices.length - 1].key;
    }

    return key;
  };

  _proto.render = function render() {
    var _this2 = this;

    var notices = this.state.notices;
    var _this$props = this.props,
        className = _this$props.className,
        style = _this$props.style,
        classPrefix = _this$props.classPrefix;
    var elements = notices.map(function (item) {
      var key = item.key,
          show = item.show,
          onClose = item.onClose,
          rest = (0, _objectWithoutPropertiesLoose2.default)(item, ["key", "show", "onClose"]);
      return React.createElement(_Animation.Transition, {
        key: key,
        in: show,
        exitedClassName: _this2.addPrefix('fade-exited'),
        exitingClassName: _this2.addPrefix('fade-leave-active'),
        enteringClassName: _this2.addPrefix('fade-entering'),
        enteredClassName: _this2.addPrefix('fade-entered'),
        timeout: 300
      }, React.createElement(_Message.default, (0, _extends2.default)({}, rest, {
        classPrefix: classPrefix,
        onClose: (0, _utils.createChainedFunction)(function () {
          return _this2.remove(key);
        }, onClose)
      })));
    });
    var classes = (0, _classnames.default)(classPrefix, className);
    return React.createElement("div", {
      className: classes,
      style: style
    }, elements);
  };

  return NoticeManager;
}(React.Component);

NoticeManager.defaultProps = {
  style: {
    top: 5
  }
};
var _default = NoticeManager;
exports.default = _default;
module.exports = exports.default;