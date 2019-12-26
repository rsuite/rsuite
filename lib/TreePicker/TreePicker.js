"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _get3 = _interopRequireDefault(require("lodash/get"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _List = _interopRequireDefault(require("react-virtualized/dist/commonjs/List"));

var _AutoSizer = _interopRequireDefault(require("react-virtualized/dist/commonjs/AutoSizer"));

var _CellMeasurer = require("react-virtualized/dist/commonjs/CellMeasurer");

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _utils = require("rsuite-utils/lib/utils");

var _TreeNode = _interopRequireDefault(require("./TreeNode"));

var _utils2 = require("../utils");

var _treeUtils = require("../utils/treeUtils");

var _Picker = require("../Picker");

var _constants = require("../constants");

// default value for virtualized
var defaultHeight = 360;
var defaultWidth = 200;

var TreePicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TreePicker, _React$Component);

  function TreePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuRef = void 0;
    _this.treeViewRef = void 0;
    _this.positionRef = void 0;
    _this.listRef = void 0;
    _this.triggerRef = void 0;
    _this.toggleRef = void 0;

    _this.getFocusableMenuItems = function () {
      var filterData = _this.state.filterData;
      var _this$props = _this.props,
          childrenKey = _this$props.childrenKey,
          _this$props$disabledI = _this$props.disabledItemValues,
          disabledItemValues = _this$props$disabledI === void 0 ? [] : _this$props$disabledI,
          valueKey = _this$props.valueKey;
      var items = [];

      var loop = function loop(nodes) {
        nodes.forEach(function (node) {
          var nodeData = (0, _extends2.default)({}, node, {}, _this.nodes[node.refKey]);
          var disabled = disabledItemValues.some(function (disabledItem) {
            return (0, _utils.shallowEqual)(disabledItem, node[valueKey]);
          });

          if (!disabled) {
            items.push(node);
          }

          if (node[childrenKey] && (0, _treeUtils.getExpandState)(nodeData, _this.props)) {
            loop(node[childrenKey]);
          }
        });
      };

      loop(filterData);
      return items;
    };

    _this.getElementByDataKey = function (dataKey) {
      var ele = _this.nodeRefs[dataKey];

      if (ele instanceof Element) {
        return ele.querySelector("." + _this.addTreePrefix('node-label'));
      }

      return null;
    };

    _this.nodes = {};
    _this.node = null;
    _this.tempNode = [];
    _this.cache = new _CellMeasurer.CellMeasurerCache({
      fixedWidth: true,
      minHeight: 20
    });
    _this.nodeRefs = {};

    _this.bindNodeRefs = function (refKey, ref) {
      _this.nodeRefs[refKey] = ref;
    };

    _this.getPositionInstance = function () {
      return _this.positionRef.current;
    };

    _this.getToggleInstance = function () {
      return _this.toggleRef.current;
    };

    _this.addPrefix = function (name) {
      return (0, _utils2.prefix)(_this.props.classPrefix)(name);
    };

    _this.addTreePrefix = function (name) {
      return (0, _utils2.prefix)((0, _utils2.defaultClassPrefix)('tree'))(name);
    };

    _this.selectActiveItem = function (event) {
      var _this$getActiveItem = _this.getActiveItem(),
          nodeData = _this$getActiveItem.nodeData,
          layer = _this$getActiveItem.layer;

      _this.handleSelect(nodeData, +layer, event);
    };

    _this.focusNextItem = function () {
      var _node$focus;

      var _this$getItemsAndActi = _this.getItemsAndActiveIndex(),
          items = _this$getItemsAndActi.items,
          activeIndex = _this$getItemsAndActi.activeIndex;

      if (items.length === 0) {
        return;
      }

      var nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;

      var node = _this.getElementByDataKey(items[nextIndex].refKey);

      node === null || node === void 0 ? void 0 : (_node$focus = node.focus) === null || _node$focus === void 0 ? void 0 : _node$focus.call(node);
    };

    _this.focusPreviousItem = function () {
      var _node$focus2;

      var _this$getItemsAndActi2 = _this.getItemsAndActiveIndex(),
          items = _this$getItemsAndActi2.items,
          activeIndex = _this$getItemsAndActi2.activeIndex;

      if (items.length === 0) {
        return;
      }

      var prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      prevIndex = prevIndex >= 0 ? prevIndex : 0;

      var node = _this.getElementByDataKey(items[prevIndex].refKey);

      node === null || node === void 0 ? void 0 : (_node$focus2 = node.focus) === null || _node$focus2 === void 0 ? void 0 : _node$focus2.call(node);
    };

    _this.handleCloseDropdown = function () {
      if (_this.triggerRef.current) {
        _this.triggerRef.current.hide();
      }
    };

    _this.handleOpenDropdown = function () {
      if (_this.triggerRef.current) {
        _this.triggerRef.current.show();
      }
    };

    _this.handleToggleDropdown = function () {
      var active = _this.state.active;

      if (active) {
        _this.handleCloseDropdown();

        return;
      }

      _this.handleOpenDropdown();
    };

    _this.handleToggle = function (nodeData) {
      var _this$props2 = _this.props,
          valueKey = _this$props2.valueKey,
          childrenKey = _this$props2.childrenKey,
          onExpand = _this$props2.onExpand,
          expandItemValues = _this$props2.expandItemValues;

      var nextExpandItemValues = _this.toggleExpand(nodeData, !nodeData.expand);

      if ((0, _isUndefined2.default)(expandItemValues)) {
        _this.unserializeLists('expand', nextExpandItemValues);

        _this.setState({
          expandItemValues: nextExpandItemValues
        });
      }

      onExpand === null || onExpand === void 0 ? void 0 : onExpand(nextExpandItemValues, nodeData, (0, _Picker.createConcatChildrenFunction)(nodeData, nodeData[valueKey], {
        valueKey: valueKey,
        childrenKey: childrenKey
      }));
    };

    _this.handleSelect = function (nodeData, layer, event) {
      var _this$toggleRef$curre;

      var _this$props3 = _this.props,
          valueKey = _this$props3.valueKey,
          onChange = _this$props3.onChange,
          onSelect = _this$props3.onSelect,
          value = _this$props3.value;
      _this.node = nodeData;

      if ((0, _isUndefined2.default)(value)) {
        _this.setState({
          activeNode: nodeData,
          selectedValue: nodeData[valueKey]
        });
      }

      onChange === null || onChange === void 0 ? void 0 : onChange(nodeData[valueKey], event);
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(nodeData, layer, event);

      _this.handleCloseDropdown();

      (_this$toggleRef$curre = _this.toggleRef.current) === null || _this$toggleRef$curre === void 0 ? void 0 : _this$toggleRef$curre.onFocus();
    };

    _this.handleKeyDown = function (event) {
      (0, _Picker.onMenuKeyDown)(event, {
        down: _this.focusNextItem,
        up: _this.focusPreviousItem,
        enter: _this.selectActiveItem,
        del: _this.handleClean
      });
    };

    _this.handleToggleKeyDown = function (event) {
      var _this$state = _this.state,
          activeNode = _this$state.activeNode,
          active = _this$state.active; // enter

      if ((!activeNode || !active) && event.keyCode === 13) {
        _this.handleToggleDropdown();
      } // delete


      if (event.keyCode === 8) {
        _this.handleClean(event);
      }

      if (!_this.treeViewRef.current) {
        return;
      }

      if (event.target instanceof HTMLElement) {
        var className = event.target.className;

        if (className.includes(_this.addPrefix('toggle')) || className.includes(_this.addPrefix('toggle-custom')) || className.includes(_this.addPrefix('search-bar-input'))) {
          (0, _Picker.onMenuKeyDown)(event, {
            down: _this.focusNextItem
          });
        }
      }
    };

    _this.handleSearch = function (value, event) {
      var filterData = _this.state.filterData;
      var _this$props4 = _this.props,
          onSearch = _this$props4.onSearch,
          searchKeyword = _this$props4.searchKeyword;

      if ((0, _isUndefined2.default)(searchKeyword)) {
        _this.setState({
          searchKeyword: value,
          filterData: _this.getFilterData(filterData, value)
        });
      }

      onSearch === null || onSearch === void 0 ? void 0 : onSearch(value, event);
    };

    _this.handleClean = function (event) {
      var _this$props$onChange, _this$props5;

      _this.setState({
        activeNode: null,
        selectedValue: null
      });

      _this.node = null;
      (_this$props$onChange = (_this$props5 = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props5, null, event);
    };

    _this.handleOnOpen = function () {
      var _this$props$onOpen, _this$props6;

      var activeNode = _this.state.activeNode;

      if (activeNode) {
        var _node$focus3;

        var node = _this.getElementByDataKey(activeNode.refKey);

        node === null || node === void 0 ? void 0 : (_node$focus3 = node.focus) === null || _node$focus3 === void 0 ? void 0 : _node$focus3.call(node);
      }

      (_this$props$onOpen = (_this$props6 = _this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props6);

      _this.setState({
        active: true
      });
    };

    _this.handleOnClose = function () {
      var filterData = _this.state.filterData;
      var _this$props7 = _this.props,
          searchKeyword = _this$props7.searchKeyword,
          onClose = _this$props7.onClose;

      if ((0, _isUndefined2.default)(searchKeyword)) {
        _this.setState({
          searchKeyword: '',
          filterData: _this.getFilterData(filterData, '')
        });
      }

      onClose === null || onClose === void 0 ? void 0 : onClose();

      _this.setState({
        active: false
      });
    };

    _this.measureRowRenderer = function (nodes) {
      return function (_ref) {
        var key = _ref.key,
            index = _ref.index,
            style = _ref.style,
            parent = _ref.parent;
        var node = nodes[index];
        return React.createElement(_CellMeasurer.CellMeasurer, {
          cache: _this.cache,
          columnIndex: 0,
          key: key,
          rowIndex: index,
          parent: parent
        }, function () {
          return _this.renderVirtualNode(node, {
            key: key,
            style: style
          });
        });
      };
    };

    var _value = props.value,
        data = props.data,
        _valueKey = props.valueKey,
        _props$searchKeyword = props.searchKeyword,
        _searchKeyword = _props$searchKeyword === void 0 ? '' : _props$searchKeyword;

    var nextData = [].concat(data);

    var _nextExpandItemValues = (0, _treeUtils.getExpandItemValues)(props);

    _this.flattenNodes(nextData);

    _this.unserializeLists('expand', _nextExpandItemValues, props);

    _this.state = {
      data: data,
      value: _value,
      selectedValue: _this.getValue(props),
      expandAll: (0, _treeUtils.getExpandAll)(props),
      filterData: _this.getFilterData(nextData, _searchKeyword, props),
      activeNode: _this.getActiveNode(_this.getValue(props), _valueKey),
      searchKeyword: _searchKeyword,
      expandItemValues: _this.serializeList('expand')
    };
    _this.treeViewRef = React.createRef();
    _this.positionRef = React.createRef();
    _this.listRef = React.createRef();
    _this.triggerRef = React.createRef();
    _this.toggleRef = React.createRef(); // for test

    _this.menuRef = React.createRef();
    (0, _treeUtils.treeDeprecatedWarning)(props, ['expandAll']);
    return _this;
  }

  var _proto = TreePicker.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var activeNode = this.state.activeNode;
    this.focusNode(activeNode);
  };

  TreePicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        data = nextProps.data,
        expandAll = nextProps.expandAll,
        searchKeyword = nextProps.searchKeyword,
        expandItemValues = nextProps.expandItemValues;
    var nextState = {};

    if ((0, _isArray2.default)(data) && (0, _isArray2.default)(prevState.data) && prevState.data !== data) {
      nextState.data = data;
    }

    if (!(0, _utils.shallowEqual)(value, prevState.value)) {
      nextState.value = value;
      nextState.selectedValue = value;
    }

    if ((0, _treeUtils.compareArray)(expandItemValues, prevState.expandItemValues)) {
      nextState.expandItemValues = expandItemValues;
    }

    if (!(0, _isUndefined2.default)(searchKeyword) && searchKeyword !== prevState.searchKeyword) {
      nextState.searchKeyword = searchKeyword;
    }

    if (expandAll !== prevState.expandAll) {
      nextState.expandAll = expandAll;
    }

    return Object.keys(nextState).length ? nextState : null;
  };

  _proto.componentDidUpdate = function componentDidUpdate(_prevProps, prevState) {
    this.updateDataChange(prevState);
    this.updateValueChange(prevState);
    this.updateExpandItemValuesChange(prevState);
    this.updateSearchKeywordChange(prevState);

    if (this.listRef.current) {
      this.listRef.current.forceUpdateGrid();
    }
  };

  _proto.updateDataChange = function updateDataChange(prevState) {
    var _this$state2 = this.state,
        searchKeyword = _this$state2.searchKeyword,
        expandItemValues = _this$state2.expandItemValues;
    var data = this.props.data;

    if (prevState.data !== data) {
      var nextData = [].concat(data);
      this.flattenNodes(nextData);
      var filterData = this.getFilterData(nextData, searchKeyword);
      var activeNode = this.getActiveNode(this.getValue());
      this.focusNode(activeNode);
      this.unserializeLists('expand', expandItemValues);
      this.setState({
        data: nextData,
        filterData: filterData,
        activeNode: activeNode
      });
    }
  };

  _proto.updateValueChange = function updateValueChange(prevState) {
    var _this$props8 = this.props,
        value = _this$props8.value,
        valueKey = _this$props8.valueKey;

    if (!(0, _utils.shallowEqual)(prevState.value, value)) {
      var activeNode = null;

      if (this.node === null) {
        activeNode = this.getActiveNode(value);
      }

      if (value !== null && this.node !== null) {
        activeNode = (0, _utils.shallowEqual)(this.node[valueKey], value) ? this.node : this.getActiveNode(value);
      }

      var nextState = {
        value: value,
        activeNode: activeNode
      };

      if (value === null) {
        nextState.activeNode = null;
        this.node = null;
      }

      if (activeNode !== null) {
        this.focusNode(activeNode);
      }

      this.setState(nextState);
    }
  };

  _proto.updateExpandItemValuesChange = function updateExpandItemValuesChange(prevState) {
    var expandItemValues = this.props.expandItemValues;

    if ((0, _treeUtils.compareArray)(expandItemValues, prevState.expandItemValues)) {
      this.unserializeLists('expand', expandItemValues);
      this.setState({
        expandItemValues: expandItemValues
      });
    }
  };

  _proto.updateSearchKeywordChange = function updateSearchKeywordChange(prevState) {
    var filterData = this.state.filterData;

    if (!(0, _isUndefined2.default)(this.props.searchKeyword) && prevState.searchKeyword !== this.props.searchKeyword) {
      this.setState({
        filterData: this.getFilterData(filterData, this.props.searchKeyword)
      });
    }
  };

  _proto.getValue = function getValue(props) {
    if (props === void 0) {
      props = this.props;
    }

    var _props = props,
        value = _props.value,
        defaultValue = _props.defaultValue;
    return !(0, _isUndefined2.default)(value) ? value : defaultValue;
  };

  _proto.getActiveNode = function getActiveNode(value, valueKey) {
    var _this2 = this;

    if (valueKey === void 0) {
      valueKey = this.props.valueKey;
    }

    var activeNode = null;

    if (!(0, _isUndefined2.default)(value)) {
      Object.keys(this.nodes).forEach(function (refKey) {
        if ((0, _utils.shallowEqual)(_this2.nodes[refKey][valueKey], value)) {
          activeNode = _this2.nodes[refKey];
        }
      });
    }

    return activeNode;
  };

  _proto.getActiveElementOption = function getActiveElementOption(options, value) {
    var childrenKey = this.props.childrenKey;

    for (var i = 0; i < options.length; i += 1) {
      var _options$i$childrenKe;

      if (options[i].value === value) {
        return options[i];
      } else if ((_options$i$childrenKe = options[i][childrenKey]) === null || _options$i$childrenKe === void 0 ? void 0 : _options$i$childrenKe.length) {
        var active = this.getActiveElementOption(options[i][childrenKey], value);

        if (!(0, _isEmpty2.default)(active)) {
          return active;
        }
      }
    }

    return {};
  };

  _proto.getItemsAndActiveIndex = function getItemsAndActiveIndex() {
    var items = this.getFocusableMenuItems();
    var activeIndex = -1;
    items.forEach(function (item, index) {
      if (document.activeElement !== null) {
        if (item.refKey === document.activeElement.getAttribute('data-key')) {
          activeIndex = index;
        }
      }
    });
    return {
      items: items,
      activeIndex: activeIndex
    };
  };

  _proto.getActiveItem = function getActiveItem() {
    var nodeData = {};
    var activeItem = document.activeElement;

    if (activeItem !== null) {
      var _get2 = (0, _get3.default)(activeItem, 'dataset'),
          key = _get2.key,
          layer = _get2.layer;

      var activeNode = this.nodes[key];

      if (activeNode) {
        nodeData = activeNode;
      }

      return {
        nodeData: nodeData,
        layer: layer
      };
    }

    return {};
  };

  _proto.getFilterData = function getFilterData(data, word, props) {
    if (word === void 0) {
      word = '';
    }

    var _ref2 = props || this.props,
        labelKey = _ref2.labelKey,
        childrenKey = _ref2.childrenKey;

    var setVisible = function setVisible(nodes) {
      if (nodes === void 0) {
        nodes = [];
      }

      return nodes.forEach(function (item) {
        item.visible = (0, _treeUtils.shouldDisplay)(item[labelKey], word);

        if ((0, _isArray2.default)(item[childrenKey])) {
          setVisible(item[childrenKey]);
          item[childrenKey].forEach(function (child) {
            if (child.visible) {
              item.visible = child.visible;
            }
          });
        }
      });
    };

    if (!(0, _isUndefined2.default)(word)) {
      setVisible(data);
    }

    return data;
  };

  _proto.getFlattenTreeData = function getFlattenTreeData(nodes) {
    var _this3 = this;

    var expandItemValues = this.state.expandItemValues;
    var _this$props9 = this.props,
        childrenKey = _this$props9.childrenKey,
        valueKey = _this$props9.valueKey;
    return (0, _treeUtils.flattenTree)(nodes, childrenKey, function (node) {
      var formatted = {};
      var curNode = _this3.nodes[node.refKey];
      var parentKeys = (0, _treeUtils.getNodeParents)(curNode, 'parentNode', valueKey);

      if (curNode) {
        formatted = (0, _extends2.default)({}, node, {
          expand: curNode.expand,
          layer: curNode.layer,
          parentNode: curNode.parentNode,
          showNode: (0, _treeUtils.shouldShowNodeByExpanded)(expandItemValues, parentKeys)
        });
      }

      return formatted;
    });
  };

  _proto.focusNode = function focusNode(activeNode) {
    var inline = this.props.inline;

    if (activeNode && inline) {
      var _node$focus4;

      var node = this.getElementByDataKey(activeNode.refKey);
      node === null || node === void 0 ? void 0 : (_node$focus4 = node.focus) === null || _node$focus4 === void 0 ? void 0 : _node$focus4.call(node);
    }
  };

  _proto.flattenNodes = function flattenNodes(nodes, props, ref, parentNode, layer) {
    var _this4 = this;

    if (ref === void 0) {
      ref = '0';
    }

    if (layer === void 0) {
      layer = 0;
    }

    var _ref3 = props || this.props,
        labelKey = _ref3.labelKey,
        valueKey = _ref3.valueKey,
        childrenKey = _ref3.childrenKey;

    if (!Array.isArray(nodes) || nodes.length === 0) {
      return [];
    }

    nodes.map(function (node, index) {
      var _this4$nodes$refKey;

      var refKey = ref + "-" + index;
      node.refKey = refKey;
      _this4.nodes[refKey] = (_this4$nodes$refKey = {
        layer: layer
      }, _this4$nodes$refKey[labelKey] = node[labelKey], _this4$nodes$refKey[valueKey] = node[valueKey], _this4$nodes$refKey.expand = (0, _treeUtils.getExpandState)(node, props || _this4.props), _this4$nodes$refKey.refKey = refKey, _this4$nodes$refKey);

      if (parentNode) {
        _this4.nodes[refKey].parentNode = parentNode;
      }

      _this4.flattenNodes(node[childrenKey], props, refKey, _this4.nodes[refKey], layer + 1);
    });
  };

  _proto.serializeList = function serializeList(key, nodes) {
    if (nodes === void 0) {
      nodes = this.nodes;
    }

    var valueKey = this.props.valueKey;
    var list = [];
    Object.keys(nodes).forEach(function (refKey) {
      if (nodes[refKey][key]) {
        list.push(nodes[refKey][valueKey]);
      }
    });
    return list;
  };

  _proto.unserializeLists = function unserializeLists(key, value, props) {
    var _this5 = this;

    if (value === void 0) {
      value = [];
    }

    if (props === void 0) {
      props = this.props;
    }

    var _props2 = props,
        valueKey = _props2.valueKey;
    var expandAll = (0, _treeUtils.getExpandAll)(props);
    Object.keys(this.nodes).forEach(function (refKey) {
      _this5.nodes[refKey][key] = false;

      if (value.length) {
        value.forEach(function (value) {
          if ((0, _utils.shallowEqual)(_this5.nodes[refKey][valueKey], value)) {
            _this5.nodes[refKey][key] = true;
          }
        });
      } else {
        _this5.nodes[refKey][key] = expandAll;
      }
    });
  };

  _proto.toggleExpand = function toggleExpand(node, isExpand) {
    var valueKey = this.props.valueKey;
    var expandItemValues = new Set(this.serializeList('expand'));

    if (isExpand) {
      expandItemValues.add(node[valueKey]);
    } else {
      expandItemValues.delete(node[valueKey]);
    }

    return Array.from(expandItemValues);
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this$props10 = this.props,
        _this$props10$height = _this$props10.height,
        height = _this$props10$height === void 0 ? defaultHeight : _this$props10$height,
        searchable = _this$props10.searchable,
        searchKeyword = _this$props10.searchKeyword,
        renderExtraFooter = _this$props10.renderExtraFooter,
        locale = _this$props10.locale,
        renderMenu = _this$props10.renderMenu,
        menuStyle = _this$props10.menuStyle,
        virtualized = _this$props10.virtualized,
        menuClassName = _this$props10.menuClassName,
        menuAutoWidth = _this$props10.menuAutoWidth;
    var keyword = !(0, _isUndefined2.default)(searchKeyword) ? searchKeyword : this.state.searchKeyword;
    var classes = (0, _classnames.default)(menuClassName, this.addPrefix('tree-menu'));
    var styles = virtualized ? (0, _extends2.default)({
      height: height
    }, menuStyle) : menuStyle;
    return React.createElement(_Picker.MenuWrapper, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: styles,
      ref: this.menuRef,
      getToggleInstance: this.getToggleInstance,
      getPositionInstance: this.getPositionInstance
    }, searchable ? React.createElement(_Picker.SearchBar, {
      placeholder: locale.searchPlaceholder,
      key: "searchBar",
      onChange: this.handleSearch,
      value: keyword
    }) : null, renderMenu ? renderMenu(this.renderTree()) : this.renderTree(), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  _proto.renderNode = function renderNode(node, index, layer) {
    var _this6 = this;

    var _this$state3 = this.state,
        selectedValue = _this$state3.selectedValue,
        searchKeyword = _this$state3.searchKeyword;

    if (!node.visible) {
      return null;
    }

    var _this$props11 = this.props,
        _this$props11$disable = _this$props11.disabledItemValues,
        disabledItemValues = _this$props11$disable === void 0 ? [] : _this$props11$disable,
        valueKey = _this$props11.valueKey,
        labelKey = _this$props11.labelKey,
        locale = _this$props11.locale,
        childrenKey = _this$props11.childrenKey,
        renderTreeNode = _this$props11.renderTreeNode,
        renderTreeIcon = _this$props11.renderTreeIcon;
    var refKey = node.refKey;
    var expand = this.nodes[node.refKey].expand;
    var key = (0, _isString2.default)(node[valueKey]) || (0, _isNumber2.default)(node[valueKey]) ? node[valueKey] : refKey;
    var children = node[childrenKey]; // 当用户进行搜索时，hasChildren的判断要变成判断是否存在 visible 为 true 的子节点

    var visibleChildren = (0, _isUndefined2.default)(searchKeyword) || searchKeyword.length === 0 ? !!children : (0, _treeUtils.hasVisibleChildren)(node, childrenKey);
    var props = {
      rtl: locale.rtl,
      value: node[valueKey],
      label: node[labelKey],
      index: index,
      layer: layer,
      expand: expand,
      active: (0, _utils.shallowEqual)(node[valueKey], selectedValue),
      visible: node.visible,
      children: children,
      nodeData: (0, _extends2.default)({}, node, {
        expand: expand
      }),
      disabled: disabledItemValues.filter(function (disabledItem) {
        return (0, _utils.shallowEqual)(disabledItem, node[valueKey]);
      }).length > 0,
      hasChildren: visibleChildren,
      onSelect: this.handleSelect,
      onTreeToggle: this.handleToggle,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };

    if (props.hasChildren) {
      var _classNames;

      layer += 1;
      var expandALlState = this.nodes[node.refKey].expand; // 是否展开树节点且子节点不为空

      var openClass = this.addTreePrefix('open');
      var childrenClass = (0, _classnames.default)(this.addTreePrefix('node-children'), (_classNames = {}, _classNames[openClass] = expandALlState && visibleChildren, _classNames));
      var nodes = children || [];
      return React.createElement("div", {
        className: childrenClass,
        key: key,
        ref: this.bindNodeRefs.bind(this, refKey)
      }, React.createElement(_TreeNode.default, props), React.createElement("div", {
        className: this.addTreePrefix('children')
      }, nodes.map(function (child, i) {
        return _this6.renderNode(child, i, layer);
      })));
    }

    return React.createElement(_TreeNode.default, (0, _extends2.default)({
      key: key,
      innerRef: this.bindNodeRefs.bind(this, refKey)
    }, props));
  };

  _proto.renderVirtualNode = function renderVirtualNode(node, options) {
    var selectedValue = this.state.selectedValue;
    var _this$props12 = this.props,
        locale = _this$props12.locale,
        _this$props12$disable = _this$props12.disabledItemValues,
        disabledItemValues = _this$props12$disable === void 0 ? [] : _this$props12$disable,
        valueKey = _this$props12.valueKey,
        labelKey = _this$props12.labelKey,
        childrenKey = _this$props12.childrenKey,
        renderTreeNode = _this$props12.renderTreeNode,
        renderTreeIcon = _this$props12.renderTreeIcon;
    var key = options.key,
        style = options.style;
    var layer = node.layer,
        refKey = node.refKey,
        expand = node.expand,
        showNode = node.showNode;

    if (!node.visible) {
      return null;
    }

    var children = node[childrenKey];
    var props = {
      rtl: locale.rtl,
      style: style,
      value: node[valueKey],
      label: node[labelKey],
      layer: layer,
      expand: expand,
      active: (0, _utils.shallowEqual)(node[valueKey], selectedValue),
      visible: node.visible,
      nodeData: node,
      disabled: disabledItemValues.filter(function (disabledItem) {
        return (0, _utils.shallowEqual)(disabledItem, node[valueKey]);
      }).length > 0,
      children: children,
      hasChildren: !!children,
      onSelect: this.handleSelect,
      onTreeToggle: this.handleToggle,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };
    return showNode && React.createElement(_TreeNode.default, (0, _extends2.default)({
      key: key,
      innerRef: this.bindNodeRefs.bind(this, refKey)
    }, props));
  };

  _proto.renderTree = function renderTree() {
    var _classNames2,
        _this7 = this;

    var filterData = this.state.filterData;
    var _this$props13 = this.props,
        height = _this$props13.height,
        _this$props13$classNa = _this$props13.className,
        className = _this$props13$classNa === void 0 ? '' : _this$props13$classNa,
        inline = _this$props13.inline,
        style = _this$props13.style,
        locale = _this$props13.locale,
        virtualized = _this$props13.virtualized;
    var layer = 0;
    var classes = (0, _classnames.default)((0, _utils2.defaultClassPrefix)('tree'), (_classNames2 = {}, _classNames2[className] = inline, _classNames2));
    var nodes = [];

    if (!virtualized) {
      nodes = filterData.map(function (dataItem, index) {
        return _this7.renderNode(dataItem, index, layer);
      });

      if (!nodes.some(function (v) {
        return v !== null;
      })) {
        return React.createElement("div", {
          className: this.addPrefix('none')
        }, locale.noResultsText);
      }
    } else {
      nodes = this.getFlattenTreeData(filterData).filter(function (n) {
        return n.showNode && n.visible;
      });

      if (!nodes.length) {
        return React.createElement("div", {
          className: this.addPrefix('none')
        }, locale.noResultsText);
      }
    } // 当未定义 height 且 设置了 virtualized 为 true，treeHeight 设置默认高度


    var treeHeight = (0, _isUndefined2.default)(height) && virtualized ? defaultHeight : height;
    var styles = inline ? (0, _extends2.default)({
      height: treeHeight
    }, style) : {};
    var ListHeight = (0, _treeUtils.getVirtualLisHeight)(inline, treeHeight);
    return React.createElement("div", {
      ref: this.treeViewRef,
      className: classes,
      style: styles,
      onKeyDown: this.handleKeyDown
    }, React.createElement("div", {
      className: this.addTreePrefix('nodes')
    }, virtualized ? React.createElement(_AutoSizer.default, {
      defaultHeight: ListHeight,
      defaultWidth: defaultWidth
    }, function (_ref4) {
      var height = _ref4.height,
          width = _ref4.width;
      return React.createElement(_List.default, {
        ref: _this7.listRef,
        width: width || defaultWidth,
        height: height || ListHeight,
        rowHeight: 36,
        rowCount: nodes.length,
        rowRenderer: _this7.measureRowRenderer(nodes)
      });
    }) : nodes));
  };

  _proto.render = function render() {
    var _this$props14 = this.props,
        inline = _this$props14.inline,
        locale = _this$props14.locale,
        disabled = _this$props14.disabled,
        toggleComponentClass = _this$props14.toggleComponentClass,
        placeholder = _this$props14.placeholder,
        cleanable = _this$props14.cleanable,
        renderValue = _this$props14.renderValue,
        valueKey = _this$props14.valueKey,
        labelKey = _this$props14.labelKey,
        onEntered = _this$props14.onEntered,
        onExited = _this$props14.onExited,
        onClean = _this$props14.onClean,
        style = _this$props14.style,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props14, ["inline", "locale", "disabled", "toggleComponentClass", "placeholder", "cleanable", "renderValue", "valueKey", "labelKey", "onEntered", "onExited", "onClean", "style"]);
    var activeNode = this.state.activeNode;
    var classes = (0, _Picker.getToggleWrapperClassName)('tree', this.addPrefix, this.props, !!activeNode);
    var selectedElement = placeholder;
    var hasValue = !!activeNode;

    if (hasValue) {
      selectedElement = activeNode === null || activeNode === void 0 ? void 0 : activeNode[labelKey];

      if (renderValue && activeNode) {
        selectedElement = renderValue(activeNode[valueKey], activeNode, selectedElement);
      }
    }

    var unhandled = (0, _utils2.getUnhandledProps)(TreePicker, rest);

    if (inline) {
      return this.renderTree();
    }

    return React.createElement(_Picker.PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: this.positionRef,
      onEntered: (0, _utils2.createChainedFunction)(this.handleOnOpen, onEntered),
      onExit: (0, _utils2.createChainedFunction)(this.handleOnClose, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement("div", {
      className: classes,
      style: style
    }, React.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, unhandled, {
      ref: this.toggleRef,
      onKeyDown: this.handleToggleKeyDown,
      onClean: (0, _utils2.createChainedFunction)(this.handleClean, onClean),
      cleanable: cleanable && !disabled,
      componentClass: toggleComponentClass,
      hasValue: hasValue,
      active: this.state.active
    }), selectedElement || locale.placeholder)));
  };

  return TreePicker;
}(React.Component);

TreePicker.propTypes = {
  appearance: _propTypes.default.oneOf(['default', 'subtle']),
  data: _propTypes.default.array,
  open: _propTypes.default.bool,
  style: _propTypes.default.object,
  block: _propTypes.default.bool,
  value: _propTypes.default.any,
  height: _propTypes.default.number,
  inline: _propTypes.default.bool,
  locale: _propTypes.default.object,
  labelKey: _propTypes.default.string,
  valueKey: _propTypes.default.string,
  container: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  placement: _propTypes.default.oneOf(_constants.PLACEMENT),
  disabled: _propTypes.default.bool,
  className: _propTypes.default.string,
  expandAll: _propTypes.default.bool,
  cleanable: _propTypes.default.bool,
  virtualized: _propTypes.default.bool,
  searchable: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  childrenKey: _propTypes.default.string,
  placeholder: _propTypes.default.node,
  defaultOpen: _propTypes.default.bool,
  defaultValue: _propTypes.default.any,
  menuStyle: _propTypes.default.object,
  menuClassName: _propTypes.default.string,
  menuAutoWidth: _propTypes.default.bool,
  searchKeyword: _propTypes.default.string,
  defaultExpandAll: _propTypes.default.bool,
  containerPadding: _propTypes.default.number,
  disabledItemValues: _propTypes.default.array,
  expandItemValues: _propTypes.default.array,
  defaultExpandItemValues: _propTypes.default.array,
  toggleComponentClass: _propTypes.default.elementType,
  onOpen: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onHide: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  onClean: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onExpand: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onExited: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  renderMenu: _propTypes.default.func,
  renderValue: _propTypes.default.func,
  renderTreeNode: _propTypes.default.func,
  renderTreeIcon: _propTypes.default.func,
  renderExtraFooter: _propTypes.default.func
};
TreePicker.defaultProps = {
  locale: {
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found'
  },
  inline: false,
  valueKey: 'value',
  labelKey: 'label',
  cleanable: true,
  placement: 'bottomStart',
  searchable: true,
  appearance: 'default',
  childrenKey: 'children',
  virtualized: false,
  menuAutoWidth: true
};
(0, _reactLifecyclesCompat.polyfill)(TreePicker);

var _default = (0, _compose.default)((0, _utils2.defaultProps)({
  classPrefix: 'picker'
}), (0, _utils2.withPickerMethods)())(TreePicker);

exports.default = _default;
module.exports = exports.default;