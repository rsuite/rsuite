'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
var _remove = _interopRequireDefault(require("lodash/remove"));
var _clone = _interopRequireDefault(require("lodash/clone"));
var _isArray = _interopRequireDefault(require("lodash/isArray"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _utils = require("../internals/utils");
var _utils2 = require("../internals/Tree/utils");
var _Plaintext = _interopRequireDefault(require("../internals/Plaintext"));
var _hooks = require("../internals/hooks");
var _constants = require("../internals/constants");
var _propTypes2 = require("../internals/propTypes");
var _Picker = require("../internals/Picker");
var _Tag = _interopRequireDefault(require("../Tag"));
var _TextBox = _interopRequireDefault(require("./TextBox"));
var _Stack = _interopRequireDefault(require("../Stack"));
var _useInput2 = _interopRequireDefault(require("./hooks/useInput"));
var _useData2 = _interopRequireDefault(require("./hooks/useData"));
var _InputPickerContext = require("./InputPickerContext");
var _utils3 = require("./utils");
var _CustomProvider = require("../CustomProvider");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var _excluded = ["as", "appearance", "cleanable", "cacheData", "classPrefix", "data", "disabled", "readOnly", "plaintext", "defaultValue", "defaultOpen", "disabledItemValues", "locale", "toggleAs", "style", "size", "searchable", "open", "placeholder", "placement", "groupBy", "menuClassName", "menuStyle", "menuAutoWidth", "menuMaxHeight", "creatable", "shouldDisplayCreateOption", "value", "valueKey", "virtualized", "labelKey", "listProps", "id", "tabIndex", "sort", "renderMenu", "renderExtraFooter", "renderValue", "renderMenuItem", "renderMenuGroup", "onEnter", "onEntered", "onExit", "onExited", "onChange", "onClean", "onCreate", "onSearch", "onSelect", "onBlur", "onFocus", "searchBy"],
  _excluded2 = ["closable", "onClose"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Single item selector with text box input.
 *
 * @see https://rsuitejs.com/components/input-picker
 */
var InputPicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _merge;
  var _useCustom = (0, _CustomProvider.useCustom)('InputPicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$cl = propsWithDefaults.cleanable,
    cleanable = _propsWithDefaults$cl === void 0 ? true : _propsWithDefaults$cl,
    _propsWithDefaults$ca = propsWithDefaults.cacheData,
    cacheData = _propsWithDefaults$ca === void 0 ? [] : _propsWithDefaults$ca,
    _propsWithDefaults$cl2 = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl2 === void 0 ? 'picker' : _propsWithDefaults$cl2,
    _propsWithDefaults$da = propsWithDefaults.data,
    controlledData = _propsWithDefaults$da === void 0 ? [] : _propsWithDefaults$da,
    disabled = propsWithDefaults.disabled,
    readOnly = propsWithDefaults.readOnly,
    plaintext = propsWithDefaults.plaintext,
    defaultValue = propsWithDefaults.defaultValue,
    _propsWithDefaults$de = propsWithDefaults.defaultOpen,
    defaultOpen = _propsWithDefaults$de === void 0 ? false : _propsWithDefaults$de,
    _propsWithDefaults$di = propsWithDefaults.disabledItemValues,
    disabledItemValues = _propsWithDefaults$di === void 0 ? [] : _propsWithDefaults$di,
    locale = propsWithDefaults.locale,
    toggleAs = propsWithDefaults.toggleAs,
    style = propsWithDefaults.style,
    size = propsWithDefaults.size,
    _propsWithDefaults$se = propsWithDefaults.searchable,
    searchable = _propsWithDefaults$se === void 0 ? true : _propsWithDefaults$se,
    controlledOpen = propsWithDefaults.open,
    placeholder = propsWithDefaults.placeholder,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottomStart' : _propsWithDefaults$pl,
    groupBy = propsWithDefaults.groupBy,
    menuClassName = propsWithDefaults.menuClassName,
    menuStyle = propsWithDefaults.menuStyle,
    _propsWithDefaults$me = propsWithDefaults.menuAutoWidth,
    menuAutoWidth = _propsWithDefaults$me === void 0 ? true : _propsWithDefaults$me,
    _propsWithDefaults$me2 = propsWithDefaults.menuMaxHeight,
    menuMaxHeight = _propsWithDefaults$me2 === void 0 ? 320 : _propsWithDefaults$me2,
    creatable = propsWithDefaults.creatable,
    shouldDisplayCreateOption = propsWithDefaults.shouldDisplayCreateOption,
    valueProp = propsWithDefaults.value,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    virtualized = propsWithDefaults.virtualized,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    listProps = propsWithDefaults.listProps,
    id = propsWithDefaults.id,
    tabIndex = propsWithDefaults.tabIndex,
    sort = propsWithDefaults.sort,
    renderMenu = propsWithDefaults.renderMenu,
    renderExtraFooter = propsWithDefaults.renderExtraFooter,
    renderValue = propsWithDefaults.renderValue,
    renderMenuItem = propsWithDefaults.renderMenuItem,
    renderMenuGroup = propsWithDefaults.renderMenuGroup,
    onEnter = propsWithDefaults.onEnter,
    onEntered = propsWithDefaults.onEntered,
    onExit = propsWithDefaults.onExit,
    onExited = propsWithDefaults.onExited,
    onChange = propsWithDefaults.onChange,
    onClean = propsWithDefaults.onClean,
    onCreate = propsWithDefaults.onCreate,
    onSearch = propsWithDefaults.onSearch,
    onSelect = propsWithDefaults.onSelect,
    onBlur = propsWithDefaults.onBlur,
    onFocus = propsWithDefaults.onFocus,
    searchBy = propsWithDefaults.searchBy,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useTagContext = (0, _InputPickerContext.useTagContext)(),
    multi = _useTagContext.multi,
    tagProps = _useTagContext.tagProps,
    trigger = _useTagContext.trigger,
    disabledOptions = _useTagContext.disabledOptions,
    onTagRemove = _useTagContext.onTagRemove,
    renderCheckbox = _useTagContext.renderCheckbox;
  if (groupBy === valueKey || groupBy === labelKey) {
    throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
  }
  var _usePickerRef = (0, _Picker.usePickerRef)(ref),
    triggerRef = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    list = _usePickerRef.list;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var _useControlled = (0, _hooks.useControlled)(controlledOpen, defaultOpen),
    open = _useControlled[0],
    setOpen = _useControlled[1];
  var _useInput = (0, _useInput2.default)({
      multi: multi,
      triggerRef: triggerRef
    }),
    inputRef = _useInput.inputRef,
    inputProps = _useInput.inputProps,
    focus = _useInput.focus,
    blur = _useInput.blur;
  var handleDataChange = function handleDataChange(data) {
    var _data$;
    setFocusItemValue(data === null || data === void 0 || (_data$ = data[0]) === null || _data$ === void 0 ? void 0 : _data$[valueKey]);
  };
  var _useData = (0, _useData2.default)({
      controlledData: controlledData,
      cacheData: cacheData,
      onChange: handleDataChange
    }),
    data = _useData.data,
    dataWithCache = _useData.dataWithCache,
    newData = _useData.newData,
    setNewData = _useData.setNewData;
  var _useControlled2 = (0, _hooks.useControlled)(valueProp, multi ? defaultValue || [] : defaultValue),
    value = _useControlled2[0],
    setValue = _useControlled2[1],
    isControlled = _useControlled2[2];
  var cloneValue = function cloneValue() {
    return multi ? (0, _clone.default)(value) || [] : value;
  };
  var handleClose = (0, _hooks.useEventCallback)(function () {
    var _triggerRef$current, _target$current, _target$current$focus;
    triggerRef === null || triggerRef === void 0 || (_triggerRef$current = triggerRef.current) === null || _triggerRef$current === void 0 || _triggerRef$current.close();

    // The focus is on the trigger button after closing
    (_target$current = target.current) === null || _target$current === void 0 || (_target$current$focus = _target$current.focus) === null || _target$current$focus === void 0 || _target$current$focus.call(_target$current);
  });
  var focusItemValueOptions = {
    data: dataWithCache,
    valueKey: valueKey,
    target: function target() {
      return overlay.current;
    }
  };

  // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = (0, _Picker.useFocusItemValue)(multi ? value === null || value === void 0 ? void 0 : value[0] : value, focusItemValueOptions),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setFocusItemValue = _useFocusItemValue.setFocusItemValue,
    onKeyDown = _useFocusItemValue.onKeyDown;
  var onSearchCallback = (0, _hooks.useEventCallback)(function (searchKeyword, filteredData, event) {
    if (!disabledOptions) {
      var _filteredData$;
      // The first option after filtering is the focus.
      var firstItemValue = filteredData === null || filteredData === void 0 || (_filteredData$ = filteredData[0]) === null || _filteredData$ === void 0 ? void 0 : _filteredData$[valueKey];

      // If there is no value in the option and new options are supported, the search keyword is the first option
      if (!firstItemValue && creatable) {
        firstItemValue = searchKeyword;
      }
      setFocusItemValue(firstItemValue);
    }
    onSearch === null || onSearch === void 0 || onSearch(searchKeyword, event);
  });
  var searchOptions = {
    labelKey: labelKey,
    searchBy: searchBy,
    callback: onSearchCallback
  };

  // Use search keywords to filter options.
  var _useSearch = (0, _Picker.useSearch)(data, searchOptions),
    searchKeyword = _useSearch.searchKeyword,
    resetSearch = _useSearch.resetSearch,
    checkShouldDisplay = _useSearch.checkShouldDisplay,
    handleSearch = _useSearch.handleSearch;

  // Update the position of the menu when the search keyword and value change
  (0, _react.useEffect)(function () {
    var _triggerRef$current2, _triggerRef$current2$;
    (_triggerRef$current2 = triggerRef.current) === null || _triggerRef$current2 === void 0 || (_triggerRef$current2$ = _triggerRef$current2.updatePosition) === null || _triggerRef$current2$ === void 0 || _triggerRef$current2$.call(_triggerRef$current2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword, value]);
  var getDataItem = function getDataItem(value) {
    // Find active `MenuItem` by `value`
    var activeItem = dataWithCache.find(function (item) {
      return (0, _utils.shallowEqual)(item[valueKey], value);
    });
    var itemNode = placeholder;
    if (activeItem !== null && activeItem !== void 0 && activeItem[labelKey]) {
      itemNode = activeItem === null || activeItem === void 0 ? void 0 : activeItem[labelKey];
    }
    return {
      isValid: !!activeItem,
      activeItem: activeItem,
      itemNode: itemNode
    };
  };

  /**
   * Convert the string of the newly created option into an object.
   */
  var createOption = function createOption(value) {
    var _option;
    var option = (_option = {
      create: true
    }, _option[valueKey] = value, _option[labelKey] = value, _option);
    if (groupBy) {
      var _extends2;
      return (0, _extends3.default)((_extends2 = {}, _extends2[groupBy] = locale === null || locale === void 0 ? void 0 : locale.newItem, _extends2), option);
    }
    return option;
  };
  var handleChange = (0, _hooks.useEventCallback)(function (value, event) {
    onChange === null || onChange === void 0 || onChange(value, event);
  });
  var handleRemoveItemByTag = (0, _hooks.useEventCallback)(function (tag, event) {
    event.stopPropagation();
    var val = cloneValue();
    (0, _remove.default)(val, function (itemVal) {
      return (0, _utils.shallowEqual)(itemVal, tag);
    });
    setValue(val);
    handleChange(val, event);
    onTagRemove === null || onTagRemove === void 0 || onTagRemove(tag, event);
  });
  var handleSelect = (0, _hooks.useEventCallback)(function (value, item, event) {
    onSelect === null || onSelect === void 0 || onSelect(value, item, event);
    if (creatable && item.create) {
      delete item.create;
      onCreate === null || onCreate === void 0 || onCreate(value, item, event);
      setNewData(newData.concat(item));
    }
  });

  /**
   * Callback triggered by single selection
   * @param value
   * @param item
   * @param event
   */
  var handleSelectItem = (0, _hooks.useEventCallback)(function (value, item, event) {
    setValue(value);
    setFocusItemValue(value);
    resetSearch();
    handleSelect(value, item, event);
    handleChange(value, event);
    handleClose();
  });

  /**
   * Callback triggered by multiple selection
   * @param nextItemValue
   * @param item
   * @param event
   * @param checked
   */
  var handleCheckTag = (0, _hooks.useEventCallback)(function (nextItemValue, item, event, checked) {
    var val = cloneValue();
    if (checked) {
      val.push(nextItemValue);
    } else {
      (0, _remove.default)(val, function (itemVal) {
        return (0, _utils.shallowEqual)(itemVal, nextItemValue);
      });
    }
    setValue(val);
    resetSearch();
    setFocusItemValue(nextItemValue);
    handleSelect(val, item, event);
    handleChange(val, event);
    focus();
  });
  var handleTagKeyPress = (0, _hooks.useEventCallback)(function (event) {
    // When composing, ignore the keypress event.
    if (event.nativeEvent.isComposing) {
      return;
    }
    var val = cloneValue();
    var newItemValue = focusItemValue || '';

    // In TagInput
    if (multi && disabledOptions) {
      newItemValue = searchKeyword;
    }
    if (!newItemValue || !data) {
      return;
    }

    // If the value is disabled in this option, it is returned.
    if (disabledItemValues !== null && disabledItemValues !== void 0 && disabledItemValues.some(function (item) {
      return item === newItemValue;
    })) {
      return;
    }
    if (!val.some(function (v) {
      return (0, _utils.shallowEqual)(v, newItemValue);
    })) {
      val.push(newItemValue);
    } else if (!disabledOptions) {
      (0, _remove.default)(val, function (itemVal) {
        return (0, _utils.shallowEqual)(itemVal, newItemValue);
      });
    }
    var focusItem = data.find(function (item) {
      return (0, _utils.shallowEqual)(item === null || item === void 0 ? void 0 : item[valueKey], newItemValue);
    });
    if (!focusItem) {
      focusItem = createOption(newItemValue);
    }
    setValue(val);
    resetSearch();
    handleSelect(val, focusItem, event);
    handleChange(val, event);
  });
  var handleMenuItemKeyPress = (0, _hooks.useEventCallback)(function (event) {
    if (!focusItemValue || !controlledData) {
      return;
    }

    // If the value is disabled in this option, it is returned.
    if (disabledItemValues !== null && disabledItemValues !== void 0 && disabledItemValues.some(function (item) {
      return item === focusItemValue;
    })) {
      return;
    }

    // Find active `MenuItem` by `value`
    var focusItem = data.find(function (item) {
      return (0, _utils.shallowEqual)(item[valueKey], focusItemValue);
    });

    // FIXME Bad state flow
    if (!focusItem && focusItemValue === searchKeyword) {
      focusItem = createOption(searchKeyword);
    }
    setValue(focusItemValue);
    resetSearch();
    if (focusItem) {
      handleSelect(focusItemValue, focusItem, event);
    }
    handleChange(focusItemValue, event);
    handleClose();
  });

  /**
   * Remove the last item, after pressing the back key on the keyboard.
   * @param event
   */
  var removeLastItem = (0, _hooks.useEventCallback)(function (event) {
    var target = event === null || event === void 0 ? void 0 : event.target;
    if ((target === null || target === void 0 ? void 0 : target.tagName) !== 'INPUT') {
      focus();
      return;
    }
    if ((target === null || target === void 0 ? void 0 : target.tagName) === 'INPUT' && target !== null && target !== void 0 && target.value) {
      return;
    }
    var val = cloneValue();
    val.pop();
    setValue(val);
    handleChange(val, event);
  });
  var handleClean = (0, _hooks.useEventCallback)(function (event) {
    if (disabled) {
      return;
    }

    // When there is a value in the search box and the user presses the delete key on the keyboard,
    // do not trigger clearing
    if (inputRef.current === event.target && searchKeyword !== '') {
      return;
    }
    setValue(null);
    setFocusItemValue(null);
    resetSearch();
    if (multi) {
      handleChange([], event);
    } else {
      handleChange(null, event);
    }
    onClean === null || onClean === void 0 || onClean(event);
  });
  var events = {
    onMenuPressBackspace: multi ? removeLastItem : handleClean,
    onMenuKeyDown: onKeyDown,
    onMenuPressEnter: undefined,
    onKeyDown: undefined
  };
  var handleKeyPress = (0, _hooks.useEventCallback)(function (event) {
    // When typing a space, create a tag.
    if ((0, _utils.isOneOf)('Space', trigger) && event.key === _constants.KEY_VALUES.SPACE) {
      handleTagKeyPress(event);
      event.preventDefault();
    }

    // When typing a comma, create a tag.
    if ((0, _utils.isOneOf)('Comma', trigger) && event.key === _constants.KEY_VALUES.COMMA) {
      handleTagKeyPress(event);
      event.preventDefault();
    }
  });
  if (multi) {
    if ((0, _utils.isOneOf)('Enter', trigger)) {
      events.onMenuPressEnter = handleTagKeyPress;
    }
    if (creatable) {
      events.onKeyDown = handleKeyPress;
    }
  } else {
    events.onMenuPressEnter = handleMenuItemKeyPress;
  }
  var onPickerKeyDown = (0, _Picker.useToggleKeyDownEvent)((0, _extends3.default)({
    trigger: triggerRef,
    target: target,
    overlay: overlay
  }, events, rest));
  var handleExited = (0, _hooks.useEventCallback)(function () {
    setFocusItemValue(multi ? value === null || value === void 0 ? void 0 : value[0] : value);
    resetSearch();
  });
  var handleFocus = (0, _hooks.useEventCallback)(function (event) {
    if (!readOnly) {
      var _triggerRef$current3;
      setOpen(true);
      (_triggerRef$current3 = triggerRef.current) === null || _triggerRef$current3 === void 0 || _triggerRef$current3.open();
    }
    onFocus === null || onFocus === void 0 || onFocus(event);
  });
  var handleEnter = (0, _hooks.useEventCallback)(function () {
    focus();
    setOpen(true);
  });
  var handleExit = (0, _hooks.useEventCallback)(function () {
    blur();
    setOpen(false);
  });
  var renderListItem = function renderListItem(label, item) {
    // 'Create option "{0}"' =>  Create option "xxxxx"
    var newLabel = item.create ? /*#__PURE__*/_react.default.createElement("span", null, (0, _utils.tplTransform)((locale === null || locale === void 0 ? void 0 : locale.createOption) || '', label)) : label;
    return renderMenuItem ? renderMenuItem(newLabel, item) : newLabel;
  };
  var checkValue = function checkValue() {
    if (multi) {
      return {
        isValid: false,
        itemNode: null
      };
    }
    var dataItem = getDataItem(value);
    var itemNode = dataItem.itemNode;
    if (!(0, _isNil.default)(value) && (0, _isFunction.default)(renderValue)) {
      itemNode = renderValue(value, dataItem.activeItem, itemNode);
    }
    return {
      isValid: dataItem.isValid,
      itemNode: itemNode
    };
  };
  var renderMultiValue = function renderMultiValue() {
    if (!multi) {
      return null;
    }
    var _tagProps$closable = tagProps.closable,
      closable = _tagProps$closable === void 0 ? true : _tagProps$closable,
      onClose = tagProps.onClose,
      tagRest = (0, _objectWithoutPropertiesLoose2.default)(tagProps, _excluded2);
    var tags = value || [];
    var items = [];
    var tagElements = tags.map(function (tag) {
      var _getDataItem = getDataItem(tag),
        isValid = _getDataItem.isValid,
        itemNode = _getDataItem.itemNode,
        activeItem = _getDataItem.activeItem;
      items.push(activeItem);
      if (!isValid) {
        return null;
      }
      return /*#__PURE__*/_react.default.createElement(_Tag.default, (0, _extends3.default)({
        role: "option"
      }, tagRest, {
        key: tag,
        size: (0, _utils3.convertSize)(size),
        closable: !disabled && closable && !readOnly && !plaintext,
        title: typeof itemNode === 'string' ? itemNode : undefined,
        onClose: (0, _utils.createChainedFunction)(handleRemoveItemByTag.bind(null, tag), onClose)
      }), itemNode);
    }).filter(function (item) {
      return item !== null;
    });
    if ((tags.length > 0 || isControlled) && (0, _isFunction.default)(renderValue)) {
      return renderValue(value, items, tagElements);
    }
    return tagElements;
  };
  var renderPopup = function renderPopup(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var menuClassPrefix = multi ? 'picker-check-menu' : 'picker-select-menu';
    var classes = merge(className, menuClassName, prefix(multi ? 'check-menu' : 'select-menu'));
    var styles = (0, _extends3.default)({}, menuStyle, {
      left: left,
      top: top
    });
    var items = (0, _utils2.filterNodesOfTree)(data, checkShouldDisplay);
    if (creatable && (typeof shouldDisplayCreateOption === 'function' ? shouldDisplayCreateOption(searchKeyword, items) : searchKeyword && !items.find(function (item) {
      return item[valueKey] === searchKeyword;
    }))) {
      items = [].concat(items, [createOption(searchKeyword)]);
    }

    // Create a tree structure data when set `groupBy`
    if (groupBy) {
      items = (0, _utils.getDataGroupBy)(items, groupBy, sort);
    } else if (typeof sort === 'function') {
      items = items.sort(sort(false));
    }
    if (disabledOptions) {
      return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
        ref: (0, _utils.mergeRefs)(overlay, speakerRef)
      });
    }
    var menu = items.length ? /*#__PURE__*/_react.default.createElement(_Picker.Listbox, {
      listProps: listProps,
      listRef: list,
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      labelKey: labelKey,
      classPrefix: menuClassPrefix,
      listItemClassPrefix: multi ? undefined : menuClassPrefix + "-item",
      listItemAs: multi ? _Picker.ListCheckItem : _Picker.ListItem,
      listItemProps: {
        renderCheckbox: renderCheckbox
      },
      activeItemValues: multi ? value : [value],
      focusItemValue: focusItemValue,
      maxHeight: menuMaxHeight,
      data: items,
      query: searchKeyword,
      groupBy: groupBy,
      onSelect: multi ? handleCheckTag : handleSelectItem,
      renderMenuGroup: renderMenuGroup,
      renderMenuItem: renderListItem,
      virtualized: virtualized
    }) : /*#__PURE__*/_react.default.createElement("div", {
      className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["none"])))
    }, locale === null || locale === void 0 ? void 0 : locale.noResultsText);
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
      ref: (0, _utils.mergeRefs)(overlay, speakerRef),
      autoWidth: menuAutoWidth,
      className: classes,
      style: styles,
      target: triggerRef,
      onKeyDown: onPickerKeyDown
    }, renderMenu ? renderMenu(menu) : menu, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };
  var _checkValue = checkValue(),
    isValid = _checkValue.isValid,
    itemNode = _checkValue.itemNode;
  var tagElements = renderMultiValue();

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   * 3.If renderValue returns null or undefined, hasValue is false.
   */
  var hasSingleValue = !(0, _isNil.default)(value) && (0, _isFunction.default)(renderValue) && !(0, _isNil.default)(itemNode);
  var hasMultiValue = (0, _isArray.default)(value) && value.length > 0 && (0, _isFunction.default)(renderValue) && !(0, _isNil.default)(tagElements);
  var hasValue = multi ? !!(tagElements !== null && tagElements !== void 0 && tagElements.length) || hasMultiValue : isValid || hasSingleValue;
  var _usePickerClassName = (0, _Picker.usePickerClassName)((0, _extends3.default)({}, props, {
      classPrefix: classPrefix,
      appearance: appearance,
      hasValue: hasValue,
      name: 'input',
      cleanable: cleanable
    })),
    pickerClasses = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  var classes = merge(pickerClasses, (_merge = {}, _merge[prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["tag"])))] = multi, _merge[prefix((multi ? 'tag' : 'input') + "-" + size)] = size, _merge[prefix(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteralLoose2.default)(["focused"])))] = open, _merge[prefix(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteralLoose2.default)(["disabled-options"])))] = disabledOptions, _merge));
  var searching = !!searchKeyword && open;
  var editable = searchable && !disabled && !rest.loading;
  if (plaintext) {
    var plaintextProps = {};

    // When multiple selection, the tag is displayed in a stack layout.
    if (multi && hasValue) {
      plaintextProps.as = _Stack.default;
      plaintextProps.spacing = 6;
      plaintextProps.wrap = true;
      plaintextProps.childrenRenderMode = 'clone';
    }
    return /*#__PURE__*/_react.default.createElement(_Plaintext.default, (0, _extends3.default)({
      localeKey: "notSelected",
      ref: target
    }, plaintextProps), itemNode || (tagElements !== null && tagElements !== void 0 && tagElements.length ? tagElements : null) || placeholder);
  }
  var placeholderNode = placeholder || (disabledOptions ? null : locale === null || locale === void 0 ? void 0 : locale.placeholder);
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, {
    id: id,
    multiple: multi,
    pickerProps: (0, _pick.default)(props, _Picker.pickTriggerPropKeys),
    ref: triggerRef,
    trigger: "active",
    onEnter: (0, _utils.createChainedFunction)(handleEnter, onEnter),
    onEntered: onEntered,
    onExit: (0, _utils.createChainedFunction)(handleExit, onExit),
    onExited: (0, _utils.createChainedFunction)(handleExited, onExited),
    speaker: renderPopup,
    placement: placement
  }, /*#__PURE__*/_react.default.createElement(Component, {
    className: classes,
    style: style,
    onClick: focus,
    onKeyDown: onPickerKeyDown,
    ref: root
  }, /*#__PURE__*/_react.default.createElement(_Picker.PickerToggle, (0, _extends3.default)({}, (0, _omit.default)(rest, [].concat(_Picker.omitTriggerPropKeys, usedClassNamePropKeys)), {
    appearance: appearance,
    readOnly: readOnly,
    plaintext: plaintext,
    ref: target,
    as: toggleAs,
    tabIndex: tabIndex,
    onClean: handleClean,
    cleanable: cleanable && !disabled,
    hasValue: hasValue,
    active: open,
    disabled: disabled,
    placement: placement,
    inputValue: value,
    focusItemValue: focusItemValue,
    caret: !disabledOptions,
    size: size
  }), searching || multi && hasValue ? null : itemNode || placeholderNode), /*#__PURE__*/_react.default.createElement(_TextBox.default, {
    showTagList: hasValue && multi,
    inputRef: inputRef,
    inputValue: open ? searchKeyword : '',
    inputProps: inputProps,
    tags: tagElements,
    editable: editable,
    readOnly: readOnly,
    disabled: disabled,
    multiple: multi,
    onBlur: onBlur,
    onFocus: handleFocus,
    onChange: handleSearch
  })));
});
InputPicker.displayName = 'InputPicker';
InputPicker.propTypes = (0, _extends3.default)({}, _Picker.listPickerPropTypes, {
  locale: _propTypes.default.any,
  appearance: (0, _propTypes2.oneOf)(['default', 'subtle']),
  cacheData: _propTypes.default.array,
  menuAutoWidth: _propTypes.default.bool,
  menuMaxHeight: _propTypes.default.number,
  searchable: _propTypes.default.bool,
  creatable: _propTypes.default.bool,
  groupBy: _propTypes.default.any,
  sort: _propTypes.default.func,
  renderMenu: _propTypes.default.func,
  renderMenuItem: _propTypes.default.func,
  renderMenuGroup: _propTypes.default.func,
  onCreate: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onGroupTitleClick: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  virtualized: _propTypes.default.bool,
  searchBy: _propTypes.default.func
});
var _default = exports.default = InputPicker;