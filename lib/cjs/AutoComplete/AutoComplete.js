'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _utils2 = require("../Animation/utils");
var _Picker = require("../internals/Picker");
var _constants = require("../internals/constants");
var _Plaintext = _interopRequireDefault(require("../internals/Plaintext"));
var _propTypes2 = require("../internals/propTypes");
var _utils3 = require("./utils");
var _CustomProvider = require("../CustomProvider");
var _Combobox = _interopRequireDefault(require("./Combobox"));
var _excluded = ["as", "disabled", "className", "placement", "selectOnEnter", "classPrefix", "defaultValue", "menuAutoWidth", "data", "value", "open", "style", "size", "menuClassName", "id", "readOnly", "plaintext", "renderMenu", "renderMenuItem", "onSelect", "filterBy", "onKeyDown", "onChange", "onClose", "onOpen", "onFocus", "onBlur", "onMenuFocus"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Autocomplete function of input field.
 * @see https://rsuitejs.com/components/auto-complete
 *
 * TODO: Remove unnecessary .rs-auto-complete element
 * TODO: role=combobox and aria-autocomplete on input element
 */
var AutoComplete = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('AutoComplete', props),
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var datalist = (0, _utils3.transformData)(data);
  var _useControlled = (0, _hooks.useControlled)(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var _useState = (0, _react.useState)(false),
    focus = _useState[0],
    setFocus = _useState[1];
  var items = (datalist === null || datalist === void 0 ? void 0 : datalist.filter((0, _utils3.shouldDisplay)(filterBy, value))) || [];
  var hasItems = items.length > 0;
  var _usePickerRef = (0, _Picker.usePickerRef)(ref),
    trigger = _usePickerRef.trigger,
    overlay = _usePickerRef.overlay,
    root = _usePickerRef.root;
  var isMounted = (0, _hooks.useIsMounted)();

  // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = (0, _Picker.useFocusItemValue)(value, {
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
    (0, _Picker.onMenuKeyDown)(event, {
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
  var handleSelect = (0, _hooks.useEventCallback)(function (item, event) {
    onSelect === null || onSelect === void 0 || onSelect(item.value, item, event);
  });
  var handleChangeValue = (0, _hooks.useEventCallback)(function (value, event) {
    onChange === null || onChange === void 0 || onChange(value, event);
  });
  var handleChange = function handleChange(value, event) {
    setFocusItemValue('');
    setValue(value);
    setFocus(true);
    handleChangeValue(value, event);
  };
  var handleClose = (0, _hooks.useEventCallback)(function () {
    if (isMounted()) {
      setFocus(false);
      onClose === null || onClose === void 0 || onClose();
    }
  });
  var handleOpen = (0, _hooks.useEventCallback)(function () {
    setFocus(true);
    onOpen === null || onOpen === void 0 || onOpen();
  });
  var handleItemSelect = (0, _hooks.useEventCallback)(function (nextItemValue, item, event) {
    setValue(nextItemValue);
    setFocusItemValue(nextItemValue);
    handleSelect(item, event);
    if (value !== nextItemValue) {
      handleChangeValue(nextItemValue, event);
    }
    handleClose();
  });
  var handleInputFocus = (0, _hooks.useEventCallback)(function (event) {
    onFocus === null || onFocus === void 0 || onFocus(event);
    handleOpen();
  });
  var handleInputBlur = (0, _hooks.useEventCallback)(function (event) {
    setTimeout(handleClose, 300);
    onBlur === null || onBlur === void 0 || onBlur(event);
  });
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    disabled: disabled
  }));
  var _partitionHTMLProps = (0, _utils.partitionHTMLProps)((0, _omit.default)(rest, _Picker.pickTriggerPropKeys)),
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
    var menu = /*#__PURE__*/_react.default.createElement(_Picker.Listbox, {
      classPrefix: "auto-complete-menu",
      listItemClassPrefix: "auto-complete-item",
      listItemAs: _Picker.ListItem,
      focusItemValue: focusItemValue,
      onSelect: handleItemSelect,
      renderMenuItem: renderMenuItem,
      data: items,
      className: menuClassName,
      query: value
    });
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
      ref: (0, _utils.mergeRefs)(overlay, speakerRef),
      style: styles,
      className: className,
      onKeyDown: handleKeyDownEvent,
      target: trigger,
      autoWidth: menuAutoWidth
    }, renderMenu ? renderMenu(menu) : menu);
  };
  if (plaintext) {
    return /*#__PURE__*/_react.default.createElement(_Plaintext.default, {
      ref: ref,
      localeKey: "unfilled"
    }, typeof value === 'undefined' ? defaultValue : value);
  }
  var expanded = open || focus && hasItems;
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, {
    id: id,
    ref: trigger,
    placement: placement,
    pickerProps: (0, _pick.default)(props, _Picker.pickTriggerPropKeys),
    trigger: ['click', 'focus'],
    open: expanded,
    speaker: renderPopup
  }, /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    className: classes,
    style: style,
    ref: root
  }, restProps), /*#__PURE__*/_react.default.createElement(_Combobox.default, (0, _extends2.default)({}, htmlInputProps, {
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
AutoComplete.propTypes = (0, _extends2.default)({}, _utils2.animationPropTypes, {
  data: _propTypes.default.array,
  disabled: _propTypes.default.bool,
  onSelect: _propTypes.default.func,
  onChange: _propTypes.default.func,
  classPrefix: _propTypes.default.string,
  value: _propTypes.default.string,
  defaultValue: _propTypes.default.string,
  className: _propTypes.default.string,
  menuClassName: _propTypes.default.string,
  menuAutoWidth: _propTypes.default.bool,
  placement: (0, _propTypes2.oneOf)(_constants.PLACEMENT),
  onFocus: _propTypes.default.func,
  onMenuFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func,
  readOnly: _propTypes.default.bool,
  renderMenu: _propTypes.default.func,
  renderMenuItem: _propTypes.default.func,
  style: _propTypes.default.object,
  size: (0, _propTypes2.oneOf)(['lg', 'md', 'sm', 'xs']),
  open: _propTypes.default.bool,
  selectOnEnter: _propTypes.default.bool,
  filterBy: _propTypes.default.func
});
var _default = exports.default = AutoComplete;