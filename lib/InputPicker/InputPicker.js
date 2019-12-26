"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _remove2 = _interopRequireDefault(require("lodash/remove"));

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _clone2 = _interopRequireDefault(require("lodash/clone"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _domLib = require("dom-lib");

var _utils = require("rsuite-utils/lib/utils");

var _utils2 = require("../utils");

var _Picker = require("../Picker");

var _InputAutosize = _interopRequireDefault(require("./InputAutosize"));

var _InputSearch = _interopRequireDefault(require("./InputSearch"));

var _Tag = _interopRequireDefault(require("../Tag"));

var _constants = require("../constants");

var InputPicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(InputPicker, _React$Component);

  InputPicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data && !(0, _utils.shallowEqual)(nextProps.data, prevState.data)) {
      return {
        data: nextProps.data,
        focusItemValue: (0, _get2.default)(nextProps, "data.0." + nextProps.valueKey)
      };
    }

    return null;
  };

  function InputPicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuContainerRef = void 0;
    _this.positionRef = void 0;
    _this.toggleWrapperRef = void 0;
    _this.toggleRef = void 0;
    _this.triggerRef = void 0;
    _this.inputRef = void 0;

    _this.getFocusableMenuItems = function () {
      var labelKey = _this.props.labelKey;
      var menuItems = _this.menuContainerRef.current.menuItems;

      if (!menuItems) {
        return [];
      }

      var items = Object.values(menuItems).map(function (item) {
        return item.props.getItemData();
      });
      return (0, _utils.filterNodesOfTree)(items, function (item) {
        return _this.shouldDisplay(item[labelKey]);
      });
    };

    _this.getToggleInstance = function () {
      return _this.toggleRef.current;
    };

    _this.focusNextMenuItem = function () {
      var valueKey = _this.props.valueKey;

      _this.findNode(function (items, index) {
        var focusItem = items[index + 1];

        if (!(0, _isUndefined2.default)(focusItem)) {
          _this.setState({
            focusItemValue: focusItem[valueKey]
          });
        }
      });
    };

    _this.focusPrevMenuItem = function () {
      var valueKey = _this.props.valueKey;

      _this.findNode(function (items, index) {
        var focusItem = items[index - 1];

        if (!(0, _isUndefined2.default)(focusItem)) {
          _this.setState({
            focusItemValue: focusItem[valueKey]
          });
        }
      });
    };

    _this.handleKeyDown = function (event) {
      if (!_this.menuContainerRef.current) {
        return;
      }

      var multi = _this.props.multi;
      (0, _Picker.onMenuKeyDown)(event, {
        down: _this.focusNextMenuItem,
        up: _this.focusPrevMenuItem,
        enter: multi ? _this.selectFocusMenuCheckItem : _this.selectFocusMenuItem,
        esc: _this.handleCloseDropdown,
        del: multi ? _this.removeLastItem : _this.handleClean
      });
    };

    _this.handleClick = function () {
      _this.focusInput();
    };

    _this.selectFocusMenuItem = function (event) {
      var _this$state = _this.state,
          focusItemValue = _this$state.focusItemValue,
          searchKeyword = _this$state.searchKeyword;
      var _this$props = _this.props,
          valueKey = _this$props.valueKey,
          data = _this$props.data,
          disabledItemValues = _this$props.disabledItemValues;

      if (!focusItemValue || !data) {
        return;
      } // If the value is disabled in this option, it is returned.


      if (disabledItemValues === null || disabledItemValues === void 0 ? void 0 : disabledItemValues.some(function (item) {
        return item === focusItemValue;
      })) {
        return;
      } // Find active `MenuItem` by `value`


      var focusItem = (0, _utils.findNodeOfTree)(_this.getAllData(), function (item) {
        return (0, _utils.shallowEqual)(item[valueKey], focusItemValue);
      });

      if (!focusItem && focusItemValue === searchKeyword) {
        focusItem = _this.createOption(searchKeyword);
      }

      _this.setState({
        value: focusItemValue,
        searchKeyword: ''
      });

      _this.handleSelect(focusItemValue, focusItem, event);

      _this.handleChange(focusItemValue, event);

      _this.handleCloseDropdown();
    };

    _this.selectFocusMenuCheckItem = function (event) {
      var _this$props2 = _this.props,
          valueKey = _this$props2.valueKey,
          disabledItemValues = _this$props2.disabledItemValues;
      var focusItemValue = _this.state.focusItemValue;

      var value = _this.getValue();

      var data = _this.getAllData();

      if (!focusItemValue || !data) {
        return;
      } // If the value is disabled in this option, it is returned.


      if (disabledItemValues === null || disabledItemValues === void 0 ? void 0 : disabledItemValues.some(function (item) {
        return item === focusItemValue;
      })) {
        return;
      }

      if (!value.some(function (v) {
        return (0, _utils.shallowEqual)(v, focusItemValue);
      })) {
        value.push(focusItemValue);
      } else {
        (0, _remove2.default)(value, function (itemVal) {
          return (0, _utils.shallowEqual)(itemVal, focusItemValue);
        });
      }

      var focusItem = data.find(function (item) {
        return (0, _utils.shallowEqual)((0, _get2.default)(item, valueKey), focusItemValue);
      });

      if (!focusItem) {
        focusItem = _this.createOption(focusItemValue);
      }

      _this.setState({
        value: value,
        searchKeyword: ''
      }, _this.updatePosition);

      _this.handleSelect(value, focusItem, event);

      _this.handleChange(value, event);
    };

    _this.handleItemSelect = function (value, item, event) {
      var nextState = {
        value: value,
        focusItemValue: value,
        searchKeyword: ''
      };

      _this.setState(nextState);

      _this.handleSelect(value, item, event);

      _this.handleChange(value, event);

      _this.handleCloseDropdown();
    };

    _this.handleCheckItemSelect = function (nextItemValue, item, event, checked) {
      var value = _this.getValue();

      if (checked) {
        value.push(nextItemValue);
      } else {
        (0, _remove2.default)(value, function (itemVal) {
          return (0, _utils.shallowEqual)(itemVal, nextItemValue);
        });
      }

      var nextState = {
        value: value,
        searchKeyword: '',
        focusItemValue: nextItemValue
      };

      _this.setState(nextState, _this.updatePosition);

      _this.handleSelect(value, item, event);

      _this.handleChange(value, event);

      _this.focusInput();
    };

    _this.handleSelect = function (value, item, event) {
      var _this$props3 = _this.props,
          onSelect = _this$props3.onSelect,
          creatable = _this$props3.creatable;
      var newData = _this.state.newData;
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(value, item, event);

      if (creatable && item.create) {
        delete item.create;

        _this.setState({
          newData: newData.concat(item)
        });
      }
    };

    _this.handleSearch = function (searchKeyword, event) {
      var _this$props4 = _this.props,
          onSearch = _this$props4.onSearch,
          labelKey = _this$props4.labelKey,
          valueKey = _this$props4.valueKey,
          filter = _this$props4.filter;

      if (filter) {
        var filteredData = (0, _utils.filterNodesOfTree)(_this.getAllData(), function (item) {
          return _this.shouldDisplay(item[labelKey], searchKeyword);
        });
        var nextState = {
          searchKeyword: searchKeyword,
          focusItemValue: filteredData.length ? filteredData[0][valueKey] : searchKeyword
        };

        _this.setState(nextState, _this.updatePosition);
      } else {
        var _nextState = {
          searchKeyword: searchKeyword,
          focusItemValue: searchKeyword
        };

        _this.setState(_nextState, _this.updatePosition);
      }

      onSearch === null || onSearch === void 0 ? void 0 : onSearch(searchKeyword, event);
    };

    _this.handleOpenDropdown = function () {
      if (_this.triggerRef.current) {
        _this.triggerRef.current.show();
      }
    };

    _this.handleCloseDropdown = function () {
      if (_this.triggerRef.current) {
        _this.triggerRef.current.hide();
      }
    };

    _this.handleChange = function (value, event) {
      var _this$props$onChange, _this$props5;

      (_this$props$onChange = (_this$props5 = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props5, value, event);
    };

    _this.handleClean = function (event) {
      var _this$props6 = _this.props,
          disabled = _this$props6.disabled,
          onClean = _this$props6.onClean;
      var searchKeyword = _this.state.searchKeyword;

      if (disabled || searchKeyword !== '') {
        return;
      }

      var nextState = {
        value: null,
        focusItemValue: null,
        searchKeyword: ''
      };

      _this.setState(nextState);

      _this.handleChange(null, event);

      _this.updatePosition();

      onClean === null || onClean === void 0 ? void 0 : onClean(event);
    };

    _this.handleEntered = function () {
      var _this$props$onOpen, _this$props7;

      (_this$props$onOpen = (_this$props7 = _this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props7);
    };

    _this.handleExited = function () {
      var _this$props8 = _this.props,
          onClose = _this$props8.onClose,
          multi = _this$props8.multi;

      var value = _this.getValue();

      var nextState = {
        focusItemValue: multi ? (0, _get2.default)(value, 0) : value
      };

      if (multi) {
        /**
         在多选的情况下, 当 searchKeyword 过长，在 focus 的时候会导致内容换行。
         把 searchKeyword 清空是为了，Menu 在展开时候位置正确。
         */
        nextState.searchKeyword = '';
      }

      onClose === null || onClose === void 0 ? void 0 : onClose();

      _this.setState(nextState);
    };

    _this.handleEnter = function () {
      _this.focusInput();

      _this.setState({
        open: true
      });
    };

    _this.handleExit = function () {
      _this.blurInput();

      _this.setState({
        open: false
      });
    };

    _this.handleRemoveItemByTag = function (tag, event) {
      event.stopPropagation();

      var value = _this.getValue();

      (0, _remove2.default)(value, function (itemVal) {
        return (0, _utils.shallowEqual)(itemVal, tag);
      });

      _this.setState({
        value: value
      }, _this.updatePosition);

      _this.handleChange(value, event);
    };

    _this.removeLastItem = function (event) {
      var tagName = (0, _get2.default)(event, 'target.tagName');

      if (tagName !== 'INPUT') {
        _this.focusInput();

        return;
      }

      if (tagName === 'INPUT' && (0, _get2.default)(event, 'target.value')) {
        return;
      }

      var value = _this.getValue();

      value.pop();

      _this.setState({
        value: value
      }, _this.updatePosition);

      _this.handleChange(value, event);
    };

    _this.addPrefix = function (name) {
      return (0, _utils2.prefix)(_this.props.classPrefix)(name);
    };

    _this.renderMenuItem = function (label, item) {
      var _this$props9 = _this.props,
          locale = _this$props9.locale,
          renderMenuItem = _this$props9.renderMenuItem;
      var newLabel = item.create ? React.createElement("span", null, (0, _utils2.tplTransform)(locale.createOption, label)) : label;
      return renderMenuItem ? renderMenuItem(newLabel, item) : newLabel;
    };

    var defaultValue = props.defaultValue,
        groupBy = props.groupBy,
        _valueKey = props.valueKey,
        _labelKey = props.labelKey,
        defaultOpen = props.defaultOpen,
        _multi = props.multi,
        _data = props.data;

    var _value = _multi ? defaultValue || [] : defaultValue;

    var _focusItemValue = _multi ? (0, _get2.default)(_value, 0) : defaultValue;

    _this.state = {
      data: _data,
      value: _value,
      focusItemValue: _focusItemValue,
      searchKeyword: '',
      newData: [],
      open: defaultOpen,
      maxWidth: 100
    };

    if (groupBy === _valueKey || groupBy === _labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
    }

    _this.menuContainerRef = React.createRef();
    _this.positionRef = React.createRef();
    _this.toggleWrapperRef = React.createRef();
    _this.toggleRef = React.createRef();
    _this.triggerRef = React.createRef();
    _this.inputRef = React.createRef();
    return _this;
  }

  var _proto = InputPicker.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.toggleWrapperRef.current) {
      var maxWidth = (0, _domLib.getWidth)(this.toggleWrapperRef.current);
      this.setState({
        maxWidth: maxWidth
      });
    }
  };

  _proto.getValue = function getValue() {
    var _this$props10 = this.props,
        value = _this$props10.value,
        multi = _this$props10.multi;
    var nextValue = (0, _isUndefined2.default)(value) ? this.state.value : value;

    if (multi) {
      return (0, _clone2.default)(nextValue) || [];
    }

    return nextValue;
  };

  _proto.getAllData = function getAllData() {
    var data = this.props.data;
    var newData = this.state.newData;
    return [].concat(data, newData);
  };

  _proto.getAllDataAndCache = function getAllDataAndCache() {
    var cacheData = this.props.cacheData;
    var data = this.getAllData();
    return [].concat(data, cacheData);
  };

  _proto.getLabelByValue = function getLabelByValue(value) {
    var _this$props11 = this.props,
        renderValue = _this$props11.renderValue,
        placeholder = _this$props11.placeholder,
        valueKey = _this$props11.valueKey,
        labelKey = _this$props11.labelKey; // Find active `MenuItem` by `value`

    var activeItem = (0, _utils.findNodeOfTree)(this.getAllDataAndCache(), function (item) {
      return (0, _utils.shallowEqual)(item[valueKey], value);
    });
    var displayElement = placeholder;

    if ((0, _get2.default)(activeItem, labelKey)) {
      displayElement = (0, _get2.default)(activeItem, labelKey);

      if (renderValue) {
        displayElement = renderValue(value, activeItem, displayElement);
      }
    }

    return {
      isValid: !!activeItem,
      displayElement: displayElement
    };
  };

  _proto.createOption = function createOption(value) {
    var _ref2;

    var _this$props12 = this.props,
        valueKey = _this$props12.valueKey,
        labelKey = _this$props12.labelKey,
        groupBy = _this$props12.groupBy,
        locale = _this$props12.locale;

    if (groupBy) {
      var _ref;

      return _ref = {
        create: true
      }, _ref[groupBy] = locale.newItem, _ref[valueKey] = value, _ref[labelKey] = value, _ref;
    }

    return _ref2 = {
      create: true
    }, _ref2[valueKey] = value, _ref2[labelKey] = value, _ref2;
  };

  _proto.focusInput = function focusInput() {
    var input = this.getInput();
    if (!input) return;
    input.focus();
  };

  _proto.blurInput = function blurInput() {
    var input = this.getInput();
    if (!input) return;
    input.blur();
  };

  _proto.getInput = function getInput() {
    var multi = this.props.multi;

    if (multi) {
      return this.inputRef.current.getInputInstance();
    }

    return this.inputRef.current;
  };

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  _proto.shouldDisplay = function shouldDisplay(label, searchKeyword) {
    var word = typeof searchKeyword === 'undefined' ? this.state.searchKeyword : searchKeyword;

    if (!(0, _trim2.default)(word)) {
      return true;
    }

    var keyword = word.toLocaleLowerCase();

    if (typeof label === 'string' || typeof label === 'number') {
      return ("" + label).toLocaleLowerCase().indexOf(keyword) >= 0;
    } else if (React.isValidElement(label)) {
      var nodes = (0, _utils.reactToString)(label);
      return nodes.join('').toLocaleLowerCase().indexOf(keyword) >= 0;
    }

    return false;
  };

  _proto.findNode = function findNode(focus) {
    var items = this.getFocusableMenuItems();
    var valueKey = this.props.valueKey;
    var focusItemValue = this.state.focusItemValue;

    for (var i = 0; i < items.length; i += 1) {
      if ((0, _utils.shallowEqual)(focusItemValue, items[i][valueKey])) {
        focus(items, i);
        return;
      }
    }

    focus(items, -1);
  };

  _proto.updatePosition = function updatePosition() {
    if (this.positionRef.current) {
      this.positionRef.current.updatePosition(true);
    }
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this2 = this;

    var _this$props13 = this.props,
        labelKey = _this$props13.labelKey,
        groupBy = _this$props13.groupBy,
        locale = _this$props13.locale,
        renderMenu = _this$props13.renderMenu,
        renderExtraFooter = _this$props13.renderExtraFooter,
        menuClassName = _this$props13.menuClassName,
        menuStyle = _this$props13.menuStyle,
        menuAutoWidth = _this$props13.menuAutoWidth,
        creatable = _this$props13.creatable,
        valueKey = _this$props13.valueKey,
        multi = _this$props13.multi,
        sort = _this$props13.sort,
        filter = _this$props13.filter;
    var _this$state2 = this.state,
        focusItemValue = _this$state2.focusItemValue,
        searchKeyword = _this$state2.searchKeyword;
    var menuClassPrefix = this.addPrefix(multi ? 'check-menu' : 'select-menu');
    var classes = (0, _classnames.default)(menuClassPrefix, menuClassName);
    var allData = this.getAllData();
    var filteredData = allData;

    if (filter) {
      filteredData = (0, _utils.filterNodesOfTree)(allData, function (item) {
        return _this2.shouldDisplay(item[labelKey]);
      });
    }

    if (creatable && searchKeyword && !(0, _utils.findNodeOfTree)(allData, function (item) {
      return item[valueKey] === searchKeyword;
    })) {
      filteredData = [].concat(filteredData, [this.createOption(searchKeyword)]);
    } // Create a tree structure data when set `groupBy`


    if (groupBy) {
      filteredData = (0, _utils2.getDataGroupBy)(filteredData, groupBy, sort);
    } else if (typeof sort === 'function') {
      filteredData = filteredData.sort(sort(false));
    }

    var menuProps = (0, _pick2.default)(this.props, Object.keys((0, _omit2.default)(_Picker.DropdownMenu.propTypes, ['className', 'style', 'classPrefix'])));
    var value = this.getValue();
    var menu = filteredData.length ? React.createElement(_Picker.DropdownMenu, (0, _extends2.default)({}, menuProps, {
      classPrefix: menuClassPrefix,
      dropdownMenuItemClassPrefix: multi ? undefined : menuClassPrefix + "-item",
      dropdownMenuItemComponentClass: multi ? _Picker.DropdownMenuCheckItem : _Picker.DropdownMenuItem,
      ref: this.menuContainerRef,
      activeItemValues: multi ? value : [value],
      focusItemValue: focusItemValue,
      data: filteredData,
      group: !(0, _isUndefined2.default)(groupBy),
      onSelect: multi ? this.handleCheckItemSelect : this.handleItemSelect,
      renderMenuItem: this.renderMenuItem
    })) : React.createElement("div", {
      className: this.addPrefix('none')
    }, locale.noResultsText);
    return React.createElement(_Picker.MenuWrapper, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: menuStyle,
      getToggleInstance: this.getToggleInstance,
      onKeyDown: this.handleKeyDown
    }, renderMenu ? renderMenu(menu) : menu, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  _proto.renderSingleValue = function renderSingleValue() {
    var value = this.getValue();
    return this.getLabelByValue(value);
  };

  _proto.renderMultiValue = function renderMultiValue() {
    var _this3 = this;

    var _this$props14 = this.props,
        multi = _this$props14.multi,
        disabled = _this$props14.disabled;

    if (!multi) {
      return null;
    }

    var tags = this.getValue() || [];
    return tags.map(function (tag) {
      var _this3$getLabelByValu = _this3.getLabelByValue(tag),
          isValid = _this3$getLabelByValu.isValid,
          displayElement = _this3$getLabelByValu.displayElement;

      if (!isValid) {
        return null;
      }

      return React.createElement(_Tag.default, {
        key: tag,
        closable: !disabled,
        title: typeof displayElement === 'string' ? displayElement : undefined,
        onClose: _this3.handleRemoveItemByTag.bind(_this3, tag)
      }, displayElement);
    }).filter(function (item) {
      return item !== null;
    });
  };

  _proto.renderInputSearch = function renderInputSearch() {
    var _this$props15 = this.props,
        multi = _this$props15.multi,
        onBlur = _this$props15.onBlur,
        onFocus = _this$props15.onFocus;
    var props = {
      onBlur: onBlur,
      onFocus: onFocus,
      componentClass: 'input',
      inputRef: this.inputRef
    };

    if (multi) {
      props.componentClass = _InputAutosize.default; // 52 = 55 (right padding)  - 2 (border) - 6 (left padding)

      props.inputStyle = {
        maxWidth: this.state.maxWidth - 63
      };
    }

    return React.createElement(_InputSearch.default, (0, _extends2.default)({}, props, {
      onChange: this.handleSearch,
      value: this.state.open ? this.state.searchKeyword : ''
    }));
  };

  _proto.render = function render() {
    var _getToggleWrapperClas;

    var _this$props16 = this.props,
        disabled = _this$props16.disabled,
        cleanable = _this$props16.cleanable,
        locale = _this$props16.locale,
        toggleComponentClass = _this$props16.toggleComponentClass,
        style = _this$props16.style,
        onEnter = _this$props16.onEnter,
        onEntered = _this$props16.onEntered,
        onExit = _this$props16.onExit,
        onExited = _this$props16.onExited,
        searchable = _this$props16.searchable,
        multi = _this$props16.multi,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props16, ["disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEnter", "onEntered", "onExit", "onExited", "searchable", "multi"]);
    var unhandled = (0, _utils2.getUnhandledProps)(InputPicker, rest);

    var _this$renderSingleVal = this.renderSingleValue(),
        isValid = _this$renderSingleVal.isValid,
        displayElement = _this$renderSingleVal.displayElement;

    var tagElements = this.renderMultiValue();
    var hasValue = multi ? !!(0, _get2.default)(tagElements, 'length') : isValid;
    var classes = (0, _Picker.getToggleWrapperClassName)('input', this.addPrefix, this.props, hasValue, (_getToggleWrapperClas = {}, _getToggleWrapperClas[this.addPrefix('tag')] = multi, _getToggleWrapperClas[this.addPrefix('focused')] = this.state.open, _getToggleWrapperClas));
    var searching = !!this.state.searchKeyword && this.state.open;
    var displaySearchInput = searchable && !disabled;
    return React.createElement(_Picker.PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: this.positionRef,
      trigger: "active",
      onEnter: (0, _utils2.createChainedFunction)(this.handleEnter, onEnter),
      onEntered: (0, _utils2.createChainedFunction)(this.handleEntered, onEntered),
      onExit: (0, _utils2.createChainedFunction)(this.handleExit, onExit),
      onExited: (0, _utils2.createChainedFunction)(this.handleExited, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement("div", {
      className: classes,
      style: style,
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClick,
      ref: this.toggleWrapperRef
    }, React.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, unhandled, {
      tabIndex: null,
      ref: this.toggleRef,
      componentClass: toggleComponentClass,
      onClean: this.handleClean,
      cleanable: cleanable && !disabled,
      hasValue: hasValue
    }), searching || multi && hasValue ? null : displayElement || locale.placeholder), React.createElement("div", {
      className: this.addPrefix('tag-wrapper')
    }, tagElements, displaySearchInput && this.renderInputSearch())));
  };

  return InputPicker;
}(React.Component);

InputPicker.propTypes = {
  data: _propTypes.default.array,
  cacheData: _propTypes.default.array,
  locale: _propTypes.default.object,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  container: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  containerPadding: _propTypes.default.number,
  block: _propTypes.default.bool,
  toggleComponentClass: _propTypes.default.elementType,
  menuClassName: _propTypes.default.string,
  menuStyle: _propTypes.default.object,
  menuAutoWidth: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  disabledItemValues: _propTypes.default.array,
  maxHeight: _propTypes.default.number,
  valueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string,
  value: _propTypes.default.any,
  defaultValue: _propTypes.default.any,
  placeholder: _propTypes.default.node,
  searchable: _propTypes.default.bool,
  cleanable: _propTypes.default.bool,
  open: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,
  placement: _propTypes.default.oneOf(_constants.PLACEMENT),
  style: _propTypes.default.object,
  creatable: _propTypes.default.bool,
  multi: _propTypes.default.bool,
  filter: _propTypes.default.bool,
  preventOverflow: _propTypes.default.bool,
  groupBy: _propTypes.default.any,
  sort: _propTypes.default.func,
  renderMenu: _propTypes.default.func,
  renderMenuItem: _propTypes.default.func,
  renderMenuGroup: _propTypes.default.func,
  renderValue: _propTypes.default.func,
  renderExtraFooter: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onGroupTitleClick: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  onClean: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onHide: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func
};
InputPicker.defaultProps = {
  data: [],
  cacheData: [],
  disabledItemValues: [],
  maxHeight: 320,
  valueKey: 'value',
  labelKey: 'label',
  locale: {
    placeholder: 'Select',
    noResultsText: 'No results found',
    newItem: 'New item',
    createOption: 'Create option "{0}"'
  },
  searchable: true,
  cleanable: true,
  menuAutoWidth: true,
  placement: 'bottomStart'
};
var enhance = (0, _compose.default)((0, _utils2.defaultProps)({
  classPrefix: 'picker'
}), (0, _utils2.withPickerMethods)());

var _default = enhance(InputPicker);

exports.default = _default;
module.exports = exports.default;