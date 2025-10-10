'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "disabled", "className", "placement", "selectOnEnter", "classPrefix", "defaultValue", "menuAutoWidth", "data", "value", "open", "style", "size", "menuClassName", "id", "readOnly", "plaintext", "renderMenu", "renderMenuItem", "onSelect", "filterBy", "onKeyDown", "onChange", "onClose", "onOpen", "onFocus", "onBlur", "onMenuFocus"];
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import { useClassNames, useControlled, useIsMounted, useEventCallback } from "../internals/hooks/index.js";
import { mergeRefs, partitionHTMLProps } from "../internals/utils/index.js";
import { animationPropTypes } from "../Animation/utils.js";
import { PickerToggleTrigger, onMenuKeyDown, Listbox, ListItem, PickerPopup, useFocusItemValue, usePickerRef, pickTriggerPropKeys } from "../internals/Picker/index.js";
import { PLACEMENT } from "../internals/constants/index.js";
import Plaintext from "../internals/Plaintext/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { transformData, shouldDisplay } from "./utils.js";
import { useCustom } from "../CustomProvider/index.js";
import Combobox from "./Combobox.js";
/**
 * Autocomplete function of input field.
 * @see https://rsuitejs.com/components/auto-complete
 *
 * TODO: Remove unnecessary .rs-auto-complete element
 * TODO: role=combobox and aria-autocomplete on input element
 */
var AutoComplete = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('AutoComplete', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    disabled = propsWithDefaults.disabled,
    className = propsWithDefaults.className,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottomStart' : _propsWithDefaults$pl,
    _propsWithDefaults$se = propsWithDefaults.selectOnEnter,
    selectOnEnter = _propsWithDefaults$se === void 0 ? true : _propsWithDefaults$se,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'auto-complete' : _propsWithDefaults$cl,
    _propsWithDefaults$de = propsWithDefaults.defaultValue,
    defaultValue = _propsWithDefaults$de === void 0 ? '' : _propsWithDefaults$de,
    _propsWithDefaults$me = propsWithDefaults.menuAutoWidth,
    menuAutoWidth = _propsWithDefaults$me === void 0 ? true : _propsWithDefaults$me,
    data = propsWithDefaults.data,
    valueProp = propsWithDefaults.value,
    open = propsWithDefaults.open,
    style = propsWithDefaults.style,
    size = propsWithDefaults.size,
    menuClassName = propsWithDefaults.menuClassName,
    id = propsWithDefaults.id,
    readOnly = propsWithDefaults.readOnly,
    plaintext = propsWithDefaults.plaintext,
    renderMenu = propsWithDefaults.renderMenu,
    renderMenuItem = propsWithDefaults.renderMenuItem,
    onSelect = propsWithDefaults.onSelect,
    filterBy = propsWithDefaults.filterBy,
    onKeyDown = propsWithDefaults.onKeyDown,
    onChange = propsWithDefaults.onChange,
    onClose = propsWithDefaults.onClose,
    onOpen = propsWithDefaults.onOpen,
    onFocus = propsWithDefaults.onFocus,
    onBlur = propsWithDefaults.onBlur,
    onMenuFocus = propsWithDefaults.onMenuFocus,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var datalist = transformData(data);
  var _useControlled = useControlled(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var _useState = useState(false),
    focus = _useState[0],
    setFocus = _useState[1];
  var items = (datalist === null || datalist === void 0 ? void 0 : datalist.filter(shouldDisplay(filterBy, value))) || [];
  var hasItems = items.length > 0;
  var _usePickerRef = usePickerRef(ref),
    trigger = _usePickerRef.trigger,
    overlay = _usePickerRef.overlay,
    root = _usePickerRef.root;
  var isMounted = useIsMounted();

  // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = useFocusItemValue(value, {
      data: datalist,
      focusToOption: false,
      callback: onMenuFocus,
      target: function target() {
        return overlay.current;
      }
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setFocusItemValue = _useFocusItemValue.setFocusItemValue,
    handleKeyDown = _useFocusItemValue.onKeyDown;
  var handleKeyDownEvent = function handleKeyDownEvent(event) {
    if (!overlay.current) {
      return;
    }
    onMenuKeyDown(event, {
      enter: selectOnEnter ? selectFocusMenuItem : undefined,
      esc: handleClose
    });
    handleKeyDown(event);
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(event);
  };
  var selectFocusMenuItem = function selectFocusMenuItem(event) {
    if (!focusItemValue) {
      return;
    }
    var focusItem = datalist.find(function (item) {
      return (item === null || item === void 0 ? void 0 : item.value) === focusItemValue;
    });
    setValue(focusItemValue);
    setFocusItemValue(focusItemValue);
    handleSelect(focusItem, event);
    if (value !== focusItemValue) {
      handleChangeValue(focusItemValue, event);
    }
    handleClose();
  };
  var handleSelect = useEventCallback(function (item, event) {
    onSelect === null || onSelect === void 0 || onSelect(item.value, item, event);
  });
  var handleChangeValue = useEventCallback(function (value, event) {
    onChange === null || onChange === void 0 || onChange(value, event);
  });
  var handleChange = function handleChange(value, event) {
    setFocusItemValue('');
    setValue(value);
    setFocus(true);
    handleChangeValue(value, event);
  };
  var handleClose = useEventCallback(function () {
    if (isMounted()) {
      setFocus(false);
      onClose === null || onClose === void 0 || onClose();
    }
  });
  var handleOpen = useEventCallback(function () {
    setFocus(true);
    onOpen === null || onOpen === void 0 || onOpen();
  });
  var handleItemSelect = useEventCallback(function (nextItemValue, item, event) {
    setValue(nextItemValue);
    setFocusItemValue(nextItemValue);
    handleSelect(item, event);
    if (value !== nextItemValue) {
      handleChangeValue(nextItemValue, event);
    }
    handleClose();
  });
  var handleInputFocus = useEventCallback(function (event) {
    onFocus === null || onFocus === void 0 || onFocus(event);
    handleOpen();
  });
  var handleInputBlur = useEventCallback(function (event) {
    setTimeout(handleClose, 300);
    onBlur === null || onBlur === void 0 || onBlur(event);
  });
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    disabled: disabled
  }));
  var _partitionHTMLProps = partitionHTMLProps(omit(rest, pickTriggerPropKeys)),
    htmlInputProps = _partitionHTMLProps[0],
    restProps = _partitionHTMLProps[1];
  var renderPopup = function renderPopup(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var styles = {
      left: left,
      top: top
    };
    var menu = /*#__PURE__*/React.createElement(Listbox, {
      classPrefix: "auto-complete-menu",
      listItemClassPrefix: "auto-complete-item",
      listItemAs: ListItem,
      focusItemValue: focusItemValue,
      onSelect: handleItemSelect,
      renderMenuItem: renderMenuItem,
      data: items,
      className: menuClassName,
      query: value
    });
    return /*#__PURE__*/React.createElement(PickerPopup, {
      ref: mergeRefs(overlay, speakerRef),
      style: styles,
      className: className,
      onKeyDown: handleKeyDownEvent,
      target: trigger,
      autoWidth: menuAutoWidth
    }, renderMenu ? renderMenu(menu) : menu);
  };
  if (plaintext) {
    return /*#__PURE__*/React.createElement(Plaintext, {
      ref: ref,
      localeKey: "unfilled"
    }, typeof value === 'undefined' ? defaultValue : value);
  }
  var expanded = open || focus && hasItems;
  return /*#__PURE__*/React.createElement(PickerToggleTrigger, {
    id: id,
    ref: trigger,
    placement: placement,
    pickerProps: pick(props, pickTriggerPropKeys),
    trigger: ['click', 'focus'],
    open: expanded,
    speaker: renderPopup
  }, /*#__PURE__*/React.createElement(Component, _extends({
    className: classes,
    style: style,
    ref: root
  }, restProps), /*#__PURE__*/React.createElement(Combobox, _extends({}, htmlInputProps, {
    disabled: disabled,
    value: value,
    size: size,
    readOnly: readOnly,
    expanded: expanded,
    focusItemValue: focusItemValue,
    onBlur: handleInputBlur,
    onFocus: handleInputFocus,
    onChange: handleChange,
    onKeyDown: handleKeyDownEvent
  }))));
});
AutoComplete.displayName = 'AutoComplete';
AutoComplete.propTypes = _extends({}, animationPropTypes, {
  data: PropTypes.array,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  classPrefix: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  menuClassName: PropTypes.string,
  menuAutoWidth: PropTypes.bool,
  placement: oneOf(PLACEMENT),
  onFocus: PropTypes.func,
  onMenuFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  readOnly: PropTypes.bool,
  renderMenu: PropTypes.func,
  renderMenuItem: PropTypes.func,
  style: PropTypes.object,
  size: oneOf(['lg', 'md', 'sm', 'xs']),
  open: PropTypes.bool,
  selectOnEnter: PropTypes.bool,
  filterBy: PropTypes.func
});
export default AutoComplete;