"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.createConcatChildrenFunction = createConcatChildrenFunction;
exports.getToggleWrapperClassName = getToggleWrapperClassName;
exports.onMenuKeyDown = onMenuKeyDown;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _kebabCase2 = _interopRequireDefault(require("lodash/kebabCase"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("rsuite-utils/lib/utils");

var _placementPolyfill = _interopRequireDefault(require("../utils/placementPolyfill"));

var defaultNodeKeys = {
  valueKey: 'value',
  childrenKey: 'children'
};

function createConcatChildrenFunction(node, nodeValue, nodeKeys) {
  if (nodeKeys === void 0) {
    nodeKeys = defaultNodeKeys;
  }

  var _nodeKeys = nodeKeys,
      valueKey = _nodeKeys.valueKey,
      childrenKey = _nodeKeys.childrenKey;
  return function (data, children) {
    if (nodeValue) {
      node = (0, _utils.findNodeOfTree)(data, function (item) {
        return nodeValue === item[valueKey];
      });
    }

    node[childrenKey] = children;
    return data.concat([]);
  };
}

function getToggleWrapperClassName(name, prefix, props, hasValue, classes) {
  var _extends2;

  var className = props.className,
      placement = props.placement,
      appearance = props.appearance,
      cleanable = props.cleanable,
      block = props.block,
      disabled = props.disabled,
      countable = props.countable;
  return (0, _classnames.default)(className, prefix(name), prefix(appearance), prefix('toggle-wrapper'), (0, _extends3.default)((_extends2 = {}, _extends2[prefix("placement-" + (0, _kebabCase2.default)((0, _placementPolyfill.default)(placement)))] = placement, _extends2[prefix('block')] = block, _extends2[prefix('has-value')] = hasValue, _extends2[prefix('disabled')] = disabled, _extends2[prefix('cleanable')] = hasValue && cleanable, _extends2[prefix('countable')] = countable, _extends2), classes));
}

function onMenuKeyDown(event, events) {
  var down = events.down,
      up = events.up,
      enter = events.enter,
      del = events.del,
      esc = events.esc;

  switch (event.keyCode) {
    // down
    case 40:
      down === null || down === void 0 ? void 0 : down(event);
      event.preventDefault();
      break;
    // up

    case 38:
      up === null || up === void 0 ? void 0 : up(event);
      event.preventDefault();
      break;
    // enter

    case 13:
      enter === null || enter === void 0 ? void 0 : enter(event);
      event.preventDefault();
      break;
    // delete

    case 8:
      del === null || del === void 0 ? void 0 : del(event);
      break;
    // esc | tab

    case 27:
    case 9:
      esc === null || esc === void 0 ? void 0 : esc(event);
      event.preventDefault();
      break;

    default:
  }
}