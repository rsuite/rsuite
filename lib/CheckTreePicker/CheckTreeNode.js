"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("rsuite-utils/lib/utils");

var _utils2 = require("../utils");

var _constants = require("../constants");

var _DropdownMenuCheckItem = _interopRequireDefault(require("../Picker/DropdownMenuCheckItem"));

var TreeCheckNode =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TreeCheckNode, _React$Component);

  function TreeCheckNode() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleTreeToggle = function (event) {
      var _event$nativeEvent, _event$nativeEvent$st;

      var _this$props = _this.props,
          onTreeToggle = _this$props.onTreeToggle,
          layer = _this$props.layer,
          nodeData = _this$props.nodeData; // 异步加载数据自定义loading图标时，阻止原生冒泡，不触发 document.click

      event === null || event === void 0 ? void 0 : (_event$nativeEvent = event.nativeEvent) === null || _event$nativeEvent === void 0 ? void 0 : (_event$nativeEvent$st = _event$nativeEvent.stopImmediatePropagation) === null || _event$nativeEvent$st === void 0 ? void 0 : _event$nativeEvent$st.call(_event$nativeEvent);
      onTreeToggle === null || onTreeToggle === void 0 ? void 0 : onTreeToggle(nodeData, layer, event);
    };

    _this.handleSelect = function (_value, event) {
      var _this$props2 = _this.props,
          onSelect = _this$props2.onSelect,
          disabled = _this$props2.disabled,
          uncheckable = _this$props2.uncheckable,
          nodeData = _this$props2.nodeData,
          checkState = _this$props2.checkState;

      if (disabled || uncheckable) {
        return;
      }

      var isChecked = false;

      if (checkState === _constants.CHECK_STATE.UNCHECK || checkState === _constants.CHECK_STATE.INDETERMINATE) {
        isChecked = true;
      }

      if (checkState === _constants.CHECK_STATE.CHECK) {
        isChecked = false;
      }

      var nextNodeData = (0, _extends2.default)({}, nodeData, {
        check: isChecked
      });
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(nextNodeData, event);
    };

    _this.addPrefix = function (name) {
      return (0, _utils2.prefix)(_this.props.classPrefix)(name);
    };

    _this.renderIcon = function () {
      var _classNames;

      var _this$props3 = _this.props,
          expand = _this$props3.expand,
          onRenderTreeIcon = _this$props3.onRenderTreeIcon,
          hasChildren = _this$props3.hasChildren,
          nodeData = _this$props3.nodeData;
      var expandIconClasses = (0, _classnames.default)(_this.addPrefix('expand-icon'), 'icon', (_classNames = {}, _classNames[_this.addPrefix('expanded')] = expand, _classNames));
      var expandIcon = React.createElement("i", {
        className: expandIconClasses
      });

      if (typeof onRenderTreeIcon === 'function') {
        var customIcon = onRenderTreeIcon(nodeData);
        expandIcon = customIcon !== null ? React.createElement("div", {
          className: _this.addPrefix('custom-icon')
        }, customIcon) : expandIcon;
      }

      return hasChildren ? React.createElement("div", {
        role: "button",
        tabIndex: -1,
        "data-ref": nodeData.refKey,
        className: _this.addPrefix('expand-icon-wrapper'),
        onClick: _this.handleTreeToggle
      }, expandIcon) : null;
    };

    _this.renderLabel = function () {
      var _this$props4 = _this.props,
          nodeData = _this$props4.nodeData,
          focus = _this$props4.focus,
          onRenderTreeNode = _this$props4.onRenderTreeNode,
          label = _this$props4.label,
          layer = _this$props4.layer,
          disabled = _this$props4.disabled,
          uncheckable = _this$props4.uncheckable,
          checkState = _this$props4.checkState;
      return React.createElement(_DropdownMenuCheckItem.default, {
        componentClass: "div",
        active: checkState === _constants.CHECK_STATE.CHECK,
        indeterminate: checkState === _constants.CHECK_STATE.INDETERMINATE,
        focus: focus,
        checkable: !uncheckable,
        disabled: disabled,
        "data-layer": layer,
        "data-key": nodeData.refKey,
        className: _this.addPrefix('label'),
        title: _this.getTitle(),
        onSelect: _this.handleSelect
      }, typeof onRenderTreeNode === 'function' ? onRenderTreeNode(nodeData) : label);
    };

    return _this;
  }

  var _proto = TreeCheckNode.prototype;

  _proto.getTitle = function getTitle() {
    var label = this.props.label;

    if (typeof label === 'string') {
      return label;
    } else if (React.isValidElement(label)) {
      var nodes = (0, _utils.reactToString)(label);
      return nodes.join('');
    }
  };

  _proto.render = function render() {
    var _classNames2;

    var _this$props5 = this.props,
        style = _this$props5.style,
        className = _this$props5.className,
        classPrefix = _this$props5.classPrefix,
        visible = _this$props5.visible,
        layer = _this$props5.layer,
        disabled = _this$props5.disabled,
        allUncheckable = _this$props5.allUncheckable,
        innerRef = _this$props5.innerRef,
        rtl = _this$props5.rtl;
    var classes = (0, _classnames.default)(className, classPrefix, (_classNames2 = {
      'text-muted': disabled
    }, _classNames2[this.addPrefix('all-uncheckable')] = !!allUncheckable, _classNames2));
    var padding = layer * _constants.TREE_NODE_PADDING + _constants.TREE_NODE_ROOT_PADDING;
    var styles = rtl ? {
      paddingRight: padding
    } : {
      paddingLeft: padding
    };
    return visible ? React.createElement("div", {
      style: (0, _extends2.default)({}, style, {}, styles),
      className: classes,
      ref: innerRef
    }, this.renderIcon(), this.renderLabel()) : null;
  };

  return TreeCheckNode;
}(React.Component);

TreeCheckNode.propTypes = {
  classPrefix: _propTypes.default.string,
  visible: _propTypes.default.bool,
  style: _propTypes.default.object,
  label: _propTypes.default.any,
  layer: _propTypes.default.number,
  value: _propTypes.default.any,
  focus: _propTypes.default.bool,
  expand: _propTypes.default.bool,
  nodeData: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  checkState: _propTypes.default.oneOf([_constants.CHECK_STATE.UNCHECK, _constants.CHECK_STATE.CHECK, _constants.CHECK_STATE.INDETERMINATE]),
  hasChildren: _propTypes.default.bool,
  uncheckable: _propTypes.default.bool,
  allUncheckable: _propTypes.default.bool,
  innerRef: _propTypes.default.func,
  onTreeToggle: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onRenderTreeIcon: _propTypes.default.func,
  onRenderTreeNode: _propTypes.default.func
};
TreeCheckNode.defaultProps = {
  visible: true
};

var _default = (0, _utils2.defaultProps)({
  classPrefix: 'check-tree-node'
})(TreeCheckNode);

exports.default = _default;
module.exports = exports.default;