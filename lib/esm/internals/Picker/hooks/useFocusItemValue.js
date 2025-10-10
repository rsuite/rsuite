'use client';
import { useState } from 'react';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import find from 'lodash/find';
import { getHeight } from 'dom-lib';
import { useEventCallback } from "../../hooks/index.js";
import { shallowEqual } from "../../utils/index.js";
import { findNodeOfTree } from "../../Tree/utils/index.js";
import { onMenuKeyDown } from "../utils.js";
/**
 * A hook that manages the focus state of the option.
 * @param defaultFocusItemValue
 * @param props
 */
var useFocusItemValue = function useFocusItemValue(defaultFocusItemValue, props) {
  var _props$valueKey = props.valueKey,
    valueKey = _props$valueKey === void 0 ? 'value' : _props$valueKey,
    _props$focusableQuery = props.focusableQueryKey,
    focusableQueryKey = _props$focusableQuery === void 0 ? '[data-key][aria-disabled="false"]' : _props$focusableQuery,
    _props$defaultLayer = props.defaultLayer,
    defaultLayer = _props$defaultLayer === void 0 ? 0 : _props$defaultLayer,
    _props$focusToOption = props.focusToOption,
    focusToOption = _props$focusToOption === void 0 ? true : _props$focusToOption,
    data = props.data,
    target = props.target,
    rtl = props.rtl,
    callback = props.callback,
    _props$getParent = props.getParent,
    getParent = _props$getParent === void 0 ? function (item) {
      return item === null || item === void 0 ? void 0 : item.parent;
    } : _props$getParent;
  var _useState = useState(defaultFocusItemValue),
    focusItemValue = _useState[0],
    setFocusItemValue = _useState[1];
  var _useState2 = useState(defaultLayer),
    layer = _useState2[0],
    setLayer = _useState2[1];
  var _useState3 = useState([]),
    keys = _useState3[0],
    setKeys = _useState3[1];
  var focusCallback = useEventCallback(function (value, event) {
    if (focusToOption) {
      var menu = isFunction(target) ? target() : target;
      var focusElement = menu === null || menu === void 0 ? void 0 : menu.querySelector("[data-key=\"" + value + "\"]");
      focusElement === null || focusElement === void 0 || focusElement.focus();
    }
    callback === null || callback === void 0 || callback(value, event);
  });
  var getScrollContainer = useEventCallback(function () {
    var menu = isFunction(target) ? target() : target;

    // For Cascader and MutiCascader
    var subMenu = menu === null || menu === void 0 ? void 0 : menu.querySelector("[data-layer=\"" + layer + "\"]");
    if (subMenu) {
      return subMenu;
    }

    // For SelectPicker、CheckPicker、Autocomplete、InputPicker、TagPicker
    return menu === null || menu === void 0 ? void 0 : menu.querySelector('[role="listbox"]');
  });

  /**
   * Get the elements visible in all options.
   */
  var getFocusableMenuItems = function getFocusableMenuItems() {
    if (!target) {
      return [];
    }
    var currentKeys = keys;
    if (layer < 1) {
      var popup = isFunction(target) ? target() : target;
      var rootMenu = popup === null || popup === void 0 ? void 0 : popup.querySelector('[data-layer="0"]');
      if (rootMenu) {
        var _rootMenu$querySelect;
        currentKeys = Array.from((_rootMenu$querySelect = rootMenu.querySelectorAll(focusableQueryKey)) !== null && _rootMenu$querySelect !== void 0 ? _rootMenu$querySelect : []).map(function (item) {
          var _item$dataset;
          return (_item$dataset = item.dataset) === null || _item$dataset === void 0 ? void 0 : _item$dataset.key;
        });
      } else {
        var _popup$querySelectorA;
        currentKeys = Array.from((_popup$querySelectorA = popup === null || popup === void 0 ? void 0 : popup.querySelectorAll(focusableQueryKey)) !== null && _popup$querySelectorA !== void 0 ? _popup$querySelectorA : []).map(function (item) {
          var _item$dataset2;
          return (_item$dataset2 = item.dataset) === null || _item$dataset2 === void 0 ? void 0 : _item$dataset2.key;
        });
      }
    }

    // 1. It is necessary to traverse the `keys` instead of `data` here to preserve the order of the array.
    // 2. The values ​​in `keys` are all string, so the corresponding value of `data` should also be converted to string
    return currentKeys.map(function (key) {
      return find(data, function (i) {
        return "" + i[valueKey] === key;
      });
    });
  };

  /**
   * Get the index of the focus item.
   */
  var findFocusItemIndex = useEventCallback(function (callback) {
    var items = getFocusableMenuItems();
    for (var i = 0; i < items.length; i += 1) {
      var _items$i;
      if (shallowEqual(focusItemValue, (_items$i = items[i]) === null || _items$i === void 0 ? void 0 : _items$i[valueKey])) {
        callback(items, i);
        return;
      }
    }
    callback(items, -1);
  });
  var scrollListItem = useEventCallback(function (direction, itemValue, willOverflow) {
    var container = getScrollContainer();
    var item = container === null || container === void 0 ? void 0 : container.querySelector("[data-key=\"" + itemValue + "\"]");
    if (willOverflow && container) {
      var scrollHeight = container.scrollHeight,
        clientHeight = container.clientHeight;
      container.scrollTop = direction === 'top' ? scrollHeight - clientHeight : 0;
      return;
    }
    if (item && container) {
      if (!isVisible(item, container, direction)) {
        var height = getHeight(item);
        scrollTo(container, direction, height);
      }
    }
  });
  var focusNextMenuItem = useEventCallback(function (event) {
    findFocusItemIndex(function (items, index) {
      var willOverflow = index + 2 > items.length;
      var nextIndex = willOverflow ? 0 : index + 1;
      var focusItem = items[nextIndex];
      if (!isUndefined(focusItem)) {
        setFocusItemValue(focusItem[valueKey]);
        focusCallback(focusItem[valueKey], event);
        scrollListItem('bottom', focusItem[valueKey], willOverflow);
      }
    });
  });
  var focusPrevMenuItem = useEventCallback(function (event) {
    findFocusItemIndex(function (items, index) {
      var willOverflow = index === 0;
      var nextIndex = willOverflow ? items.length - 1 : index - 1;
      var focusItem = items[nextIndex];
      if (!isUndefined(focusItem)) {
        setFocusItemValue(focusItem[valueKey]);
        focusCallback(focusItem[valueKey], event);
        scrollListItem('top', focusItem[valueKey], willOverflow);
      }
    });
  });
  var getSubMenuKeys = function getSubMenuKeys(nextLayer) {
    var menu = isFunction(target) ? target() : target;
    var subMenu = menu === null || menu === void 0 ? void 0 : menu.querySelector("[data-layer=\"" + nextLayer + "\"]");
    if (subMenu) {
      var _Array$from;
      return (_Array$from = Array.from(subMenu.querySelectorAll(focusableQueryKey))) === null || _Array$from === void 0 ? void 0 : _Array$from.map(function (item) {
        var _item$dataset3;
        return (_item$dataset3 = item.dataset) === null || _item$dataset3 === void 0 ? void 0 : _item$dataset3.key;
      });
    }
    return null;
  };
  var focusNextLevelMenu = useEventCallback(function (event) {
    var nextLayer = layer + 1;
    var nextKeys = getSubMenuKeys(nextLayer);
    if (nextKeys) {
      setKeys(nextKeys);
      setLayer(nextLayer);
      setFocusItemValue(nextKeys[0]);
      focusCallback(nextKeys[0], event);
    }
  });
  var focusPrevLevelMenu = useEventCallback(function (event) {
    var nextLayer = layer - 1;
    var nextKeys = getSubMenuKeys(nextLayer);
    if (nextKeys) {
      var _getParent;
      setKeys(nextKeys);
      setLayer(nextLayer);
      var focusItem = findNodeOfTree(data, function (item) {
        return item[valueKey] === focusItemValue;
      });
      var parentItemValue = (_getParent = getParent(focusItem)) === null || _getParent === void 0 ? void 0 : _getParent[valueKey];
      if (parentItemValue) {
        setFocusItemValue(parentItemValue);
        focusCallback(parentItemValue, event);
      }
    }
  });
  var handleKeyDown = useEventCallback(function (event) {
    var _onMenuKeyDown;
    onMenuKeyDown(event, (_onMenuKeyDown = {
      down: focusNextMenuItem,
      up: focusPrevMenuItem
    }, _onMenuKeyDown[rtl ? 'left' : 'right'] = focusNextLevelMenu, _onMenuKeyDown[rtl ? 'right' : 'left'] = focusPrevLevelMenu, _onMenuKeyDown));
  });
  return {
    focusItemValue: focusItemValue,
    setFocusItemValue: setFocusItemValue,
    layer: layer,
    setLayer: setLayer,
    keys: keys,
    setKeys: setKeys,
    onKeyDown: handleKeyDown
  };
};
function scrollTo(container, direction, step) {
  var scrollTop = container.scrollTop;
  container.scrollTop = direction === 'top' ? scrollTop - step : scrollTop + step;
}

/**
 * Checks if the element has a vertical scrollbar.
 */
function hasVerticalScroll(element) {
  var scrollHeight = element.scrollHeight,
    clientHeight = element.clientHeight;
  return scrollHeight > clientHeight;
}

/**
 * Checks if the element is within the visible area of the container
 */
function isVisible(element, container, direction) {
  if (!hasVerticalScroll(container)) {
    return true;
  }
  var _element$getBoundingC = element.getBoundingClientRect(),
    top = _element$getBoundingC.top,
    bottom = _element$getBoundingC.bottom,
    height = _element$getBoundingC.height;
  var _container$getBoundin = container.getBoundingClientRect(),
    containerTop = _container$getBoundin.top,
    containerBottom = _container$getBoundin.bottom;
  if (direction === 'top') {
    return top + height > containerTop;
  }
  return bottom - height < containerBottom;
}
export default useFocusItemValue;