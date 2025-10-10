'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
var _excluded = ["as", "classPrefix", "appearance", "className", "children", "activeKey", "defaultActiveKey", "id", "reversed", "vertical", "onSelect"];
import React from 'react';
import PropTypes from 'prop-types';
import Nav from "../Nav/index.js";
import Tab from "./Tab.js";
import TabPanel from "./TabPanel.js";
import { useClassNames, useControlled, useEventCallback, useUniqueId } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { ReactChildren } from "../internals/utils/index.js";

/**
 * Props for the Tabs component.
 */

function getFocusableTabs(tablist) {
  var tabs = tablist === null || tablist === void 0 ? void 0 : tablist.querySelectorAll('[role=tab]');
  return Array.from(tabs).filter(function (tab) {
    return !(tab.getAttribute('aria-disabled') === 'true');
  });
}
function getFocusedTab(tablist) {
  var tabs = getFocusableTabs(tablist);
  return tabs.find(function (tab) {
    return tab.getAttribute('aria-selected');
  });
}
function nextItem(tablist) {
  if (!tablist) {
    return null;
  }
  var item = getFocusedTab(tablist);
  var items = getFocusableTabs(tablist);
  if (!item) {
    return items[0];
  }
  var nextItem = items[items.indexOf(item) + 1];
  if (!nextItem || nextItem.getAttribute('role') !== 'tab') {
    return items[0];
  }
  return nextItem;
}
function previousItem(tablist) {
  if (!tablist) {
    return null;
  }
  var item = getFocusedTab(tablist);
  var items = getFocusableTabs(tablist);
  if (!item) {
    return items[items.length - 1];
  }
  var previousItem = items[items.indexOf(item) - 1];
  if (!previousItem || previousItem.getAttribute('role') !== 'tab') {
    return items[items.length - 1];
  }
  return previousItem;
}
var renderPanels = function renderPanels(children, tabProps) {
  var id = tabProps.id,
    activeKey = tabProps.activeKey;
  return ReactChildren.map(children, function (child) {
    var _child$props = child.props,
      eventKey = _child$props.eventKey,
      children = _child$props.children;
    var selected = eventKey === activeKey;
    return /*#__PURE__*/React.createElement(TabPanel, {
      "aria-labelledby": id + "-" + eventKey,
      "aria-hidden": !selected,
      id: id + "-panel-" + eventKey,
      active: selected
    }, children);
  });
};
var renderTabs = function renderTabs(children, tabPanelProps) {
  var id = tabPanelProps.id,
    activeKey = tabPanelProps.activeKey;
  return ReactChildren.map(children, function (child) {
    var _child$props2 = child.props,
      eventKey = _child$props2.eventKey,
      title = _child$props2.title,
      disabled = _child$props2.disabled,
      icon = _child$props2.icon;
    var selected = eventKey === activeKey;
    return /*#__PURE__*/React.createElement(Nav.Item, {
      role: "tab",
      as: "button",
      type: "button",
      "aria-selected": selected,
      "aria-controls": id + "-panel-" + eventKey,
      "aria-disabled": disabled,
      "data-event-key": eventKey,
      disabled: disabled,
      icon: icon,
      id: id + "-" + eventKey,
      tabIndex: selected ? undefined : -1,
      eventKey: eventKey
    }, title);
  });
};

/**
 * Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time.
 *
 * @version 5.53.0
 * @see https://rsuitejs.com/components/tabs
 */
var Tabs = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Tabs', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    rtl = _useCustom.rtl;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'tabs' : _propsWithDefaults$cl,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'tabs' : _propsWithDefaults$ap,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    activeKeyProp = propsWithDefaults.activeKey,
    defaultActiveKey = propsWithDefaults.defaultActiveKey,
    idProp = propsWithDefaults.id,
    reversed = propsWithDefaults.reversed,
    vertical = propsWithDefaults.vertical,
    onSelect = propsWithDefaults.onSelect,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var id = useUniqueId('tab-', idProp);
  var _useControlled = useControlled(activeKeyProp, defaultActiveKey),
    activeKey = _useControlled[0],
    setActiveKey = _useControlled[1];
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var tablistRef = React.useRef(null);
  var handleSelect = useEventCallback(function (eventKey, event) {
    setActiveKey(eventKey);
    onSelect === null || onSelect === void 0 || onSelect(eventKey, event);
  });
  var handleKeyDown = useEventCallback(function (event) {
    var _getFocusableTabs;
    var target = event.target;
    if (target.getAttribute('role') !== 'tab') {
      return;
    }
    var previousItemKey = vertical ? 'ArrowUp' : 'ArrowLeft';
    var nextItemKey = vertical ? 'ArrowDown' : 'ArrowRight';
    if (!vertical && rtl) {
      previousItemKey = 'ArrowRight';
      nextItemKey = 'ArrowLeft';
    }
    var item = null;
    switch (event.key) {
      case previousItemKey:
        item = previousItem(tablistRef.current);
        event.preventDefault();
        break;
      case nextItemKey:
        item = nextItem(tablistRef.current);
        event.preventDefault();
        break;
      case 'Home':
        item = (_getFocusableTabs = getFocusableTabs(tablistRef.current)) === null || _getFocusableTabs === void 0 ? void 0 : _getFocusableTabs[0];
        event.preventDefault();
        break;
      case 'End':
        var tabs = getFocusableTabs(tablistRef.current);
        item = tabs[tabs.length - 1];
        event.preventDefault();
        break;
    }
    if (item) {
      var _item;
      var _item$dataset = (_item = item) === null || _item === void 0 ? void 0 : _item.dataset,
        eventKey = _item$dataset.eventKey;
      handleSelect(eventKey, event);
      item.focus();
    }
  });
  return /*#__PURE__*/React.createElement(Component, _extends({
    className: merge(className, withClassPrefix({
      reversed: reversed,
      vertical: vertical
    }))
  }, rest, {
    ref: ref
  }), /*#__PURE__*/React.createElement(Nav, {
    role: "tablist",
    "aria-orientation": vertical ? 'vertical' : 'horizontal',
    reversed: reversed,
    vertical: vertical,
    appearance: appearance,
    activeKey: activeKey,
    onSelect: handleSelect,
    onKeyDown: handleKeyDown,
    ref: tablistRef
  }, renderTabs(children, {
    id: id,
    activeKey: activeKey
  })), /*#__PURE__*/React.createElement("div", {
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["content"])))
  }, renderPanels(children, {
    id: id,
    activeKey: activeKey
  })));
});
Tabs.Tab = Tab;
Tabs.displayName = 'Tabs';
Tabs.propTypes = {
  appearance: PropTypes.oneOf(['tabs', 'subtle', 'pills']),
  activeKey: PropTypes.any,
  defaultActiveKey: PropTypes.any,
  reversed: PropTypes.bool,
  vertical: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  onSelect: PropTypes.func
};
export default Tabs;