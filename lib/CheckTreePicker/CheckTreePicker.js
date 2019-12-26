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

var _CheckTreeNode = _interopRequireDefault(require("./CheckTreeNode"));

var _constants = require("../constants");

var _utils2 = require("../utils");

var _Picker = require("../Picker");

var _utils3 = require("./utils");

var _treeUtils = require("../utils/treeUtils");

// default value for virtualized
var defaultHeight = 360;
var defaultWidth = 200;

var CheckTreePicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(CheckTreePicker, _React$Component);

  function CheckTreePicker(_props) {
    var _this;

    _this = _React$Component.call(this, _props) || this;
    _this.menuRef = void 0;
    _this.treeViewRef = void 0;
    _this.positionRef = void 0;
    _this.listRef = void 0;
    _this.triggerRef = void 0;
    _this.toggleRef = void 0;

    _this.getValue = function (props) {
      if (props === void 0) {
        props = _this.props;
      }

      var _props2 = props,
          value = _props2.value,
          defaultValue = _props2.defaultValue,
          _props2$uncheckableIt = _props2.uncheckableItemValues,
          uncheckableItemValues = _props2$uncheckableIt === void 0 ? [] : _props2$uncheckableIt;

      if (value && value.length) {
        return value.filter(function (v) {
          return !uncheckableItemValues.includes(v);
        });
      }

      if (defaultValue && defaultValue.length > 0) {
        return defaultValue.filter(function (v) {
          return !uncheckableItemValues.includes(v);
        });
      }

      return [];
    };

    _this.getElementByDataKey = function (dataKey) {
      var ele = _this.nodeRefs[dataKey];

      if (ele instanceof Element) {
        return ele.querySelector("." + _this.addTreePrefix('node-label'));
      }

      return null;
    };

    _this.getFocusableMenuItems = function () {
      var filterData = _this.state.filterData;
      var childrenKey = _this.props.childrenKey;
      var items = [];

      var loop = function loop(treeNodes) {
        treeNodes.forEach(function (node) {
          var nodeData = (0, _extends2.default)({}, node, {}, _this.nodes[node.refKey]);

          if (!(0, _utils3.getDisabledState)(_this.nodes, node, _this.props) && node.visible) {
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

    _this.nodes = {};
    _this.activeNode = null;
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

    _this.selectActiveItem = function (event) {
      var _this$getActiveItem = _this.getActiveItem(),
          nodeData = _this$getActiveItem.nodeData;

      _this.handleSelect(nodeData, event);
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

    _this.everyChildChecked = function (nodes, node) {
      var list = [];
      Object.keys(nodes).forEach(function (refKey) {
        var _curNode$parentNode;

        var curNode = nodes[refKey];

        if (((_curNode$parentNode = curNode.parentNode) === null || _curNode$parentNode === void 0 ? void 0 : _curNode$parentNode.refKey) === node.refKey && !curNode.uncheckable) {
          list.push(curNode);
        }
      });
      return list.every(function (l) {
        return l.check;
      });
    };

    _this.addPrefix = function (name) {
      return (0, _utils2.prefix)(_this.props.classPrefix)(name);
    };

    _this.addTreePrefix = function (name) {
      return (0, _utils2.prefix)((0, _utils2.defaultClassPrefix)('check-tree'))(name);
    };

    _this.handleSelect = function (activeNode, event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          onSelect = _this$props.onSelect,
          value = _this$props.value;

      var selectedValues = _this.toggleChecked(activeNode, !_this.nodes[activeNode.refKey].check);

      if (!(0, _isUndefined2.default)(value)) {
        _this.activeNode = activeNode;
      } else {
        _this.unserializeLists({
          check: selectedValues
        });

        _this.setState({
          activeNode: activeNode,
          selectedValues: selectedValues,
          hasValue: !!selectedValues.length
        });
      }

      onChange === null || onChange === void 0 ? void 0 : onChange(selectedValues, event);
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(activeNode, selectedValues, event);
    };

    _this.handleToggle = function (node) {
      var _this$props2 = _this.props,
          valueKey = _this$props2.valueKey,
          childrenKey = _this$props2.childrenKey,
          onExpand = _this$props2.onExpand,
          expandItemValues = _this$props2.expandItemValues;

      var nextExpandItemValues = _this.toggleExpand(node, !node.expand);

      if ((0, _isUndefined2.default)(expandItemValues)) {
        _this.unserializeLists({
          expand: nextExpandItemValues
        });

        _this.setState({
          expandItemValues: nextExpandItemValues
        });
      }

      onExpand === null || onExpand === void 0 ? void 0 : onExpand(nextExpandItemValues, node, (0, _Picker.createConcatChildrenFunction)(node, node[valueKey], {
        valueKey: valueKey,
        childrenKey: childrenKey
      }));
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
      var _this$props3 = _this.props,
          onSearch = _this$props3.onSearch,
          searchKeyword = _this$props3.searchKeyword;

      if ((0, _isUndefined2.default)(searchKeyword)) {
        _this.setState({
          filterData: _this.getFilterData(value, filterData),
          searchKeyword: value
        });
      }

      onSearch === null || onSearch === void 0 ? void 0 : onSearch(value, event);
    };

    _this.handleClean = function (evnet) {
      var _this$props$onChange, _this$props4;

      _this.setState({
        selectedValues: [],
        hasValue: false,
        activeNode: {}
      });

      _this.unserializeLists({
        check: []
      });

      (_this$props$onChange = (_this$props4 = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props4, [], evnet);
    };

    _this.handleOnOpen = function () {
      var _this$props$onOpen, _this$props5;

      var activeNode = _this.state.activeNode;

      if (activeNode) {
        var _node$focus3;

        var node = _this.getElementByDataKey(activeNode.refKey);

        node === null || node === void 0 ? void 0 : (_node$focus3 = node.focus) === null || _node$focus3 === void 0 ? void 0 : _node$focus3.call(node);
      }

      (_this$props$onOpen = (_this$props5 = _this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props5);

      _this.setState({
        active: true
      });
    };

    _this.handleOnClose = function () {
      var filterData = _this.state.filterData;
      var _this$props6 = _this.props,
          onClose = _this$props6.onClose,
          searchKeyword = _this$props6.searchKeyword;

      if ((0, _isUndefined2.default)(searchKeyword)) {
        _this.setState({
          filterData: _this.getFilterData('', filterData),
          searchKeyword: ''
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

    var _value = _props.value,
        data = _props.data,
        cascade = _props.cascade,
        _childrenKey = _props.childrenKey,
        _searchKeyword = _props.searchKeyword;
    _this.nodes = {};

    var nextValue = _this.getValue(_props);

    var _nextExpandItemValues = (0, _treeUtils.getExpandItemValues)(_props);

    var nextData = [].concat(data);

    _this.flattenNodes(nextData, _props);

    _this.unserializeLists({
      check: nextValue,
      expand: _nextExpandItemValues
    }, _props);

    _this.state = {
      data: data,
      value: _value,
      cascade: cascade,
      hasValue: _this.hasValue(nextValue),
      expandAll: (0, _treeUtils.getExpandAll)(_props),
      filterData: _this.getFilterData(_searchKeyword, nextData, _props),
      searchKeyword: _searchKeyword || '',
      selectedValues: nextValue,
      expandItemValues: _this.serializeList('expand'),
      uncheckableItemValues: _props.uncheckableItemValues,
      isSomeNodeHasChildren: (0, _utils3.isSomeNodeHasChildren)(data, _childrenKey)
    };
    _this.treeViewRef = React.createRef();
    _this.positionRef = React.createRef();
    _this.listRef = React.createRef();
    _this.triggerRef = React.createRef();
    _this.toggleRef = React.createRef(); // for test

    _this.menuRef = React.createRef();
    (0, _treeUtils.treeDeprecatedWarning)(_props, ['expandAll']);
    return _this;
  }

  CheckTreePicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        data = nextProps.data,
        cascade = nextProps.cascade,
        expandAll = nextProps.expandAll,
        searchKeyword = nextProps.searchKeyword,
        uncheckableItemValues = nextProps.uncheckableItemValues,
        expandItemValues = nextProps.expandItemValues;
    var nextState = {};

    if ((0, _isArray2.default)(data) && (0, _isArray2.default)(prevState.data) && prevState.data !== data) {
      nextState.data = data;
    }

    if ((0, _treeUtils.compareArray)(value, prevState.value)) {
      nextState.value = value;
    }

    if ((0, _treeUtils.compareArray)(expandItemValues, prevState.expandItemValues)) {
      nextState.expandItemValues = expandItemValues;
    }

    if ((0, _treeUtils.compareArray)(uncheckableItemValues, prevState.uncheckableItemValues)) {
      nextState.uncheckableItemValues = uncheckableItemValues;
    }

    if (!(0, _isUndefined2.default)(searchKeyword) && searchKeyword !== prevState.searchKeyword) {
      nextState.searchKeyword = searchKeyword;
    }

    if (cascade !== prevState.cascade) {
      nextState.cascade = cascade;
    }

    if (expandAll !== prevState.expandAll) {
      nextState.expandAll = expandAll;
    }

    return Object.keys(nextState).length ? nextState : null;
  };

  var _proto = CheckTreePicker.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(_prevProps, prevState) {
    this.updateDataChange(prevState);
    this.updateValueChange(prevState);
    this.updateExpandItemValuesChange(prevState);
    this.updateUncheckableItemValuesChange(prevState);
    this.updateCascadeChange(prevState);
    this.updateSearchKeywordChange(prevState);

    if (this.listRef.current) {
      this.listRef.current.forceUpdateGrid();
    }
  };

  _proto.updateDataChange = function updateDataChange(prevState) {
    var _this$state2 = this.state,
        searchKeyword = _this$state2.searchKeyword,
        expandItemValues = _this$state2.expandItemValues;
    var _this$props7 = this.props,
        _this$props7$data = _this$props7.data,
        data = _this$props7$data === void 0 ? [] : _this$props7$data,
        childrenKey = _this$props7.childrenKey;

    if (prevState.data !== data) {
      var nextData = [].concat(data);
      this.nodes = {};
      this.flattenNodes(nextData);
      this.unserializeLists({
        check: this.getValue(),
        expand: expandItemValues
      });
      this.setState({
        data: nextData,
        filterData: this.getFilterData(searchKeyword, nextData),
        isSomeNodeHasChildren: (0, _utils3.isSomeNodeHasChildren)(nextData, childrenKey),
        hasValue: this.hasValue()
      });
    }
  };

  _proto.updateValueChange = function updateValueChange(prevState) {
    var expandItemValues = this.state.expandItemValues;
    var value = this.props.value;

    if ((0, _treeUtils.compareArray)(value, prevState.value)) {
      this.unserializeLists({
        check: value,
        expand: expandItemValues
      });
      this.setState({
        selectedValues: value,
        hasValue: this.hasValue(value),
        activeNode: value.length ? this.activeNode : null
      });
    }
  };

  _proto.updateExpandItemValuesChange = function updateExpandItemValuesChange(prevState) {
    var expandItemValues = this.props.expandItemValues;

    if ((0, _treeUtils.compareArray)(expandItemValues, prevState.expandItemValues)) {
      this.unserializeLists({
        expand: expandItemValues
      });
      this.setState({
        expandItemValues: expandItemValues
      });
    }
  };

  _proto.updateUncheckableItemValuesChange = function updateUncheckableItemValuesChange(prevState) {
    var _this$state3 = this.state,
        filterData = _this$state3.filterData,
        selectedValues = _this$state3.selectedValues,
        expandItemValues = _this$state3.expandItemValues;
    var uncheckableItemValues = this.props.uncheckableItemValues;

    if ((0, _treeUtils.compareArray)(uncheckableItemValues, prevState.uncheckableItemValues)) {
      this.flattenNodes(filterData);
      this.unserializeLists({
        check: selectedValues,
        expand: expandItemValues
      });
      this.setState({
        hasValue: this.hasValue()
      });
    }
  };

  _proto.updateCascadeChange = function updateCascadeChange(prevState) {
    var _this$state4 = this.state,
        filterData = _this$state4.filterData,
        selectedValues = _this$state4.selectedValues,
        expandItemValues = _this$state4.expandItemValues;
    var cascade = this.props.cascade; // cascade 改变时，重新初始化

    if (cascade !== prevState.cascade && cascade) {
      this.flattenNodes(filterData);
      this.unserializeLists({
        check: selectedValues,
        expand: expandItemValues
      });
      this.setState({
        cascade: cascade
      });
    }
  };

  _proto.updateSearchKeywordChange = function updateSearchKeywordChange(prevState) {
    var filterData = this.state.filterData;
    var searchKeyword = this.props.searchKeyword;

    if (!(0, _isUndefined2.default)(searchKeyword) && prevState.searchKeyword !== searchKeyword) {
      this.setState({
        filterData: this.getFilterData(searchKeyword, filterData)
      });
    }
  };

  _proto.getNodeCheckState = function getNodeCheckState(node, cascade) {
    var childrenKey = this.props.childrenKey;

    if (!node[childrenKey] || !node[childrenKey].length || !cascade) {
      this.nodes[node.refKey].checkAll = false;
      return node.check ? _constants.CHECK_STATE.CHECK : _constants.CHECK_STATE.UNCHECK;
    }

    if ((0, _utils3.isEveryChildChecked)(node, this.nodes, this.props)) {
      this.nodes[node.refKey].checkAll = true;
      return _constants.CHECK_STATE.CHECK;
    }

    if ((0, _utils3.isSomeChildChecked)(node, this.nodes, this.props)) {
      this.nodes[node.refKey].checkAll = false;
      return _constants.CHECK_STATE.INDETERMINATE;
    }

    return _constants.CHECK_STATE.UNCHECK;
  };

  _proto.getFilterData = function getFilterData(searchKeyword, data, props) {
    if (searchKeyword === void 0) {
      searchKeyword = '';
    }

    if (props === void 0) {
      props = this.props;
    }

    var _props3 = props,
        labelKey = _props3.labelKey,
        childrenKey = _props3.childrenKey;

    var setVisible = function setVisible(nodes) {
      if (nodes === void 0) {
        nodes = [];
      }

      return nodes.forEach(function (item) {
        item.visible = (0, _treeUtils.shouldDisplay)(item[labelKey], searchKeyword);

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

    setVisible(data);
    return data;
  };

  _proto.getActiveElementOption = function getActiveElementOption(options, refKey) {
    var childrenKey = this.props.childrenKey;

    for (var i = 0; i < options.length; i += 1) {
      var _options$i$childrenKe;

      if (options[i].refKey === refKey) {
        return options[i];
      } else if ((_options$i$childrenKe = options[i][childrenKey]) === null || _options$i$childrenKe === void 0 ? void 0 : _options$i$childrenKe.length) {
        var active = this.getActiveElementOption(options[i][childrenKey], refKey);

        if (!(0, _isEmpty2.default)(active)) {
          return active;
        }
      }
    }

    return {};
  };

  _proto.getFlattenTreeData = function getFlattenTreeData(nodes) {
    var _this2 = this;

    var expandItemValues = this.state.expandItemValues;
    var _this$props8 = this.props,
        childrenKey = _this$props8.childrenKey,
        valueKey = _this$props8.valueKey;
    return (0, _treeUtils.flattenTree)(nodes, childrenKey, function (node) {
      var formatted = {};
      var curNode = _this2.nodes[node.refKey];
      var parentKeys = (0, _treeUtils.getNodeParents)(curNode, 'parentNode', valueKey);

      if (curNode) {
        formatted = (0, _extends2.default)({}, node, {
          check: curNode.check,
          expand: curNode.expand,
          uncheckable: curNode.uncheckable,
          layer: curNode.layer,
          parentNode: curNode.parentNode,
          showNode: (0, _treeUtils.shouldShowNodeByExpanded)(expandItemValues, parentKeys)
        });
      }

      return formatted;
    });
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
    var filterData = this.state.filterData;
    var activeItem = document.activeElement;

    if (activeItem !== null) {
      var _activeItem$dataset, _activeItem$dataset2;

      var key = activeItem === null || activeItem === void 0 ? void 0 : (_activeItem$dataset = activeItem.dataset) === null || _activeItem$dataset === void 0 ? void 0 : _activeItem$dataset.key;
      var layer = activeItem === null || activeItem === void 0 ? void 0 : (_activeItem$dataset2 = activeItem.dataset) === null || _activeItem$dataset2 === void 0 ? void 0 : _activeItem$dataset2.layer;
      var nodeData = this.getActiveElementOption(filterData, key);
      nodeData.check = !this.nodes[nodeData.refKey].check;
      nodeData.parentNode = this.nodes[nodeData.refKey].parentNode;
      return {
        nodeData: nodeData,
        layer: layer
      };
    }

    return {};
  }
  /**
   * 获取已选择的items，用于显示在placeholder
   */
  ;

  _proto.getSelectedItems = function getSelectedItems(selectedValues) {
    var _this3 = this;

    var valueKey = this.props.valueKey;
    var checkItems = [];
    Object.keys(this.nodes).map(function (refKey) {
      var node = _this3.nodes[refKey];

      if (selectedValues.some(function (value) {
        return (0, _utils.shallowEqual)(node[valueKey], value);
      })) {
        checkItems.push(node);
      }
    });
    return checkItems;
  }
  /**
   * 判断传入的 value 是否存在于data 中
   * @param {*} values
   */
  ;

  _proto.hasValue = function hasValue(values) {
    var _this4 = this;

    if (values === void 0) {
      values = this.state.selectedValues;
    }

    var valueKey = this.props.valueKey;
    var selectedValues = Object.keys(this.nodes).map(function (refKey) {
      return _this4.nodes[refKey][valueKey];
    }).filter(function (item) {
      return values.some(function (v) {
        return (0, _utils.shallowEqual)(v, item);
      });
    });
    return !!selectedValues.length;
  }
  /**
   * 拍平数组，将tree 转换为一维对象
   * @param {*} nodes tree data
   * @param {*} ref 当前层级
   */
  ;

  _proto.flattenNodes = function flattenNodes(nodes, props, ref, parentNode, layer) {
    var _this5 = this;

    if (ref === void 0) {
      ref = '0';
    }

    if (layer === void 0) {
      layer = 0;
    }

    var _ref2 = props || this.props,
        labelKey = _ref2.labelKey,
        valueKey = _ref2.valueKey,
        childrenKey = _ref2.childrenKey;

    if (!Array.isArray(nodes) || nodes.length === 0) {
      return;
    }

    nodes.forEach(function (node, index) {
      var _this5$nodes$refKey;

      var refKey = ref + "-" + index;
      node.refKey = refKey;
      _this5.nodes[refKey] = (_this5$nodes$refKey = {
        layer: layer
      }, _this5$nodes$refKey[labelKey] = node[labelKey], _this5$nodes$refKey[valueKey] = node[valueKey], _this5$nodes$refKey.expand = (0, _treeUtils.getExpandState)(node, props || _this5.props), _this5$nodes$refKey.uncheckable = (0, _utils3.getUncheckableState)(node, props || _this5.props), _this5$nodes$refKey.refKey = refKey, _this5$nodes$refKey);

      if (parentNode) {
        _this5.nodes[refKey].parentNode = parentNode;
      }

      _this5.flattenNodes(node[childrenKey], props, refKey, _this5.nodes[refKey], layer + 1);
    });
  }
  /**
   * 过滤选中的values中不包含 uncheckableItemValues 的那些值
   * @param {*} values
   */
  ;

  _proto.filterSelectedValues = function filterSelectedValues(values) {
    var _this$props$uncheckab = this.props.uncheckableItemValues,
        uncheckableItemValues = _this$props$uncheckab === void 0 ? [] : _this$props$uncheckab;
    return values.filter(function (value) {
      return !uncheckableItemValues.includes(value);
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

  _proto.serializeListOnlyParent = function serializeListOnlyParent(key, nodes) {
    if (nodes === void 0) {
      nodes = this.nodes;
    }

    var valueKey = this.props.valueKey;
    var list = [];
    Object.keys(nodes).forEach(function (refKey) {
      var currentNode = nodes[refKey];

      if (currentNode.parentNode) {
        var parentNode = nodes[currentNode.parentNode.refKey];

        if (currentNode[key]) {
          if (!parentNode.checkAll) {
            list.push(nodes[refKey][valueKey]);
          } else if (parentNode.uncheckable) {
            list.push(nodes[refKey][valueKey]);
          }
        }
      } else {
        if (currentNode[key]) {
          list.push(nodes[refKey][valueKey]);
        }
      }
    });
    return list;
  };

  _proto.unserializeLists = function unserializeLists(lists, nextProps) {
    var _this6 = this;

    if (nextProps === void 0) {
      nextProps = this.props;
    }

    var _nextProps = nextProps,
        valueKey = _nextProps.valueKey,
        cascade = _nextProps.cascade,
        _nextProps$uncheckabl = _nextProps.uncheckableItemValues,
        uncheckableItemValues = _nextProps$uncheckabl === void 0 ? [] : _nextProps$uncheckabl;
    var expandAll = (0, _treeUtils.getExpandAll)(nextProps); // Reset values to false

    Object.keys(this.nodes).forEach(function (refKey) {
      Object.keys(lists).forEach(function (listKey) {
        if (listKey === 'check') {
          var node = _this6.nodes[refKey];

          if (cascade && 'parentNode' in node) {
            node[listKey] = node.parentNode[listKey];
          } else {
            node[listKey] = false;
          }

          lists[listKey].forEach(function (value) {
            if ((0, _utils.shallowEqual)(_this6.nodes[refKey][valueKey], value) && !uncheckableItemValues.some(function (uncheckableValue) {
              return (0, _utils.shallowEqual)(value, uncheckableValue);
            })) {
              _this6.nodes[refKey][listKey] = true;
            }
          });
        }

        if (listKey === 'expand') {
          _this6.nodes[refKey][listKey] = false;

          if (lists[listKey].length) {
            lists[listKey].forEach(function (value) {
              if ((0, _utils.shallowEqual)(_this6.nodes[refKey][valueKey], value)) {
                _this6.nodes[refKey][listKey] = true;
              }
            });
          } else {
            _this6.nodes[refKey][listKey] = expandAll;
          }
        }
      });
    });
  };

  _proto.toggleChecked = function toggleChecked(node, isChecked) {
    var nodes = (0, _utils2.clone)(this.nodes);
    this.toggleDownChecked(nodes, node, isChecked);
    node.parentNode && this.toggleUpChecked(nodes, node.parentNode, isChecked);
    var values = this.serializeListOnlyParent('check', nodes);
    return this.filterSelectedValues(values);
  };

  _proto.toggleUpChecked = function toggleUpChecked(nodes, node, checked) {
    var cascade = this.props.cascade;
    var currentNode = nodes[node.refKey];

    if (cascade) {
      if (!checked) {
        currentNode.check = checked;
        currentNode.checkAll = checked;
      } else {
        if (this.everyChildChecked(nodes, node)) {
          currentNode.check = true;
          currentNode.checkAll = true;
        } else {
          currentNode.check = false;
          currentNode.checkAll = false;
        }
      }

      if (node.parentNode) {
        this.toggleUpChecked(nodes, node.parentNode, checked);
      }
    }
  };

  _proto.toggleDownChecked = function toggleDownChecked(nodes, node, isChecked) {
    var _this7 = this;

    var _this$props9 = this.props,
        childrenKey = _this$props9.childrenKey,
        cascade = _this$props9.cascade;
    nodes[node.refKey].check = isChecked;

    if (!node[childrenKey] || !node[childrenKey].length || !cascade) {
      nodes[node.refKey].checkAll = false;
    } else {
      nodes[node.refKey].checkAll = isChecked;
      node[childrenKey].forEach(function (child) {
        _this7.toggleDownChecked(nodes, child, isChecked);
      });
    }
  };

  _proto.toggleNode = function toggleNode(key, node, toggleValue) {
    // 如果该节点处于 disabledChecbox，则忽略该值
    if (!node.uncheckable) {
      this.nodes[node.refKey][key] = toggleValue;
    }
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
        locale = _this$props10.locale,
        menuStyle = _this$props10.menuStyle,
        searchable = _this$props10.searchable,
        renderMenu = _this$props10.renderMenu,
        virtualized = _this$props10.virtualized,
        searchKeyword = _this$props10.searchKeyword,
        renderExtraFooter = _this$props10.renderExtraFooter,
        menuClassName = _this$props10.menuClassName,
        menuAutoWidth = _this$props10.menuAutoWidth;
    var keyword = !(0, _isUndefined2.default)(searchKeyword) ? searchKeyword : this.state.searchKeyword;
    var classes = (0, _classnames.default)(menuClassName, this.addPrefix('check-tree-menu'));
    var menu = this.renderCheckTree();
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
    }) : null, renderMenu ? renderMenu(menu) : menu, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  _proto.renderNode = function renderNode(node, layer) {
    var _this8 = this;

    var _this$state5 = this.state,
        activeNode = _this$state5.activeNode,
        searchKeyword = _this$state5.searchKeyword;
    var _this$props11 = this.props,
        valueKey = _this$props11.valueKey,
        labelKey = _this$props11.labelKey,
        childrenKey = _this$props11.childrenKey,
        renderTreeNode = _this$props11.renderTreeNode,
        renderTreeIcon = _this$props11.renderTreeIcon,
        cascade = _this$props11.cascade,
        locale = _this$props11.locale;
    var expand = node.expand,
        visible = node.visible,
        refKey = node.refKey;

    if (!visible) {
      return null;
    }

    var key = (0, _isString2.default)(node[valueKey]) || (0, _isNumber2.default)(node[valueKey]) ? node[valueKey] : refKey;
    var children = node[childrenKey]; // 当用户进行搜索时，hasChildren的判断要变成判断是否存在 visible 为 true 的子节点

    var visibleChildren = (0, _isUndefined2.default)(searchKeyword) || searchKeyword.length === 0 ? !!children : (0, _treeUtils.hasVisibleChildren)(node, childrenKey);
    var props = {
      value: node[valueKey],
      label: node[labelKey],
      layer: layer,
      expand: expand,
      rtl: locale.rtl,
      focus: activeNode ? (0, _utils.shallowEqual)(activeNode[valueKey], node[valueKey]) : false,
      visible: node.visible,
      disabled: (0, _utils3.getDisabledState)(this.nodes, node, this.props),
      nodeData: node,
      checkState: this.getNodeCheckState(node, cascade),
      hasChildren: visibleChildren,
      uncheckable: node.uncheckable,
      allUncheckable: (0, _utils3.getSiblingNodeUncheckable)(node, this.nodes),
      onSelect: this.handleSelect,
      onTreeToggle: this.handleToggle,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };

    if (props.hasChildren) {
      var _classNames;

      layer += 1; // 是否展开树节点且子节点不为空

      var openClass = this.addTreePrefix('open');
      var expandALlState = node.expand;
      var childrenClass = (0, _classnames.default)(this.addTreePrefix('node-children'), (_classNames = {}, _classNames[openClass] = expandALlState && visibleChildren, _classNames));
      var nodes = children || [];
      return React.createElement("div", {
        className: childrenClass,
        key: key,
        ref: this.bindNodeRefs.bind(this, refKey)
      }, React.createElement(_CheckTreeNode.default, props), React.createElement("div", {
        className: this.addTreePrefix('children')
      }, nodes.map(function (child) {
        return _this8.renderNode(child, layer);
      })));
    }

    return React.createElement(_CheckTreeNode.default, (0, _extends2.default)({
      key: key,
      innerRef: this.bindNodeRefs.bind(this, refKey)
    }, props));
  };

  _proto.renderVirtualNode = function renderVirtualNode(node, options) {
    var _this$state6 = this.state,
        activeNode = _this$state6.activeNode,
        expandAll = _this$state6.expandAll;
    var _this$props12 = this.props,
        valueKey = _this$props12.valueKey,
        labelKey = _this$props12.labelKey,
        childrenKey = _this$props12.childrenKey,
        renderTreeNode = _this$props12.renderTreeNode,
        renderTreeIcon = _this$props12.renderTreeIcon,
        cascade = _this$props12.cascade,
        locale = _this$props12.locale;
    var key = options.key,
        style = options.style;
    var layer = node.layer,
        refKey = node.refKey,
        expand = node.expand,
        showNode = node.showNode;
    var children = node[childrenKey];
    var props = {
      value: node[valueKey],
      label: node[labelKey],
      layer: layer,
      expand: expand,
      rtl: locale.rtl,
      focus: activeNode ? (0, _utils.shallowEqual)(activeNode[valueKey], node[valueKey]) : false,
      visible: node.visible,
      disabled: (0, _utils3.getDisabledState)(this.nodes, node, this.props),
      nodeData: node,
      children: children,
      expandAll: expandAll,
      checkState: this.getNodeCheckState(node, cascade),
      parentNode: node.parentNode,
      hasChildren: !!children,
      uncheckable: node.uncheckable,
      allUncheckable: (0, _utils3.getSiblingNodeUncheckable)(node, this.nodes),
      onSelect: this.handleSelect,
      onTreeToggle: this.handleToggle,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };
    return showNode && React.createElement(_CheckTreeNode.default, (0, _extends2.default)({
      style: style,
      key: key,
      innerRef: this.bindNodeRefs.bind(this, refKey)
    }, props));
  };

  _proto.renderCheckTree = function renderCheckTree() {
    var _classNames2,
        _this9 = this,
        _classNames3;

    var _this$state7 = this.state,
        filterData = _this$state7.filterData,
        isSomeNodeHasChildren = _this$state7.isSomeNodeHasChildren;
    var _this$props13 = this.props,
        inline = _this$props13.inline,
        style = _this$props13.style,
        height = _this$props13.height,
        _this$props13$classNa = _this$props13.className,
        className = _this$props13$classNa === void 0 ? '' : _this$props13$classNa,
        onScroll = _this$props13.onScroll,
        locale = _this$props13.locale,
        virtualized = _this$props13.virtualized; // 树节点的层级

    var layer = 0;
    var classes = (0, _classnames.default)((0, _utils2.defaultClassPrefix)('check-tree'), (_classNames2 = {}, _classNames2[className] = inline, _classNames2['without-children'] = !isSomeNodeHasChildren, _classNames2));
    var formattedNodes = [];

    if (!virtualized) {
      formattedNodes = (0, _utils3.getFormattedTree)(filterData, this.nodes, this.props).map(function (node) {
        return _this9.renderNode(node, layer);
      });

      if (!formattedNodes.some(function (v) {
        return v !== null;
      })) {
        return React.createElement("div", {
          className: this.addPrefix('none')
        }, locale.noResultsText);
      }
    } else {
      formattedNodes = this.getFlattenTreeData(filterData).filter(function (n) {
        return n.showNode && n.visible;
      });

      if (!formattedNodes.length) {
        return React.createElement("div", {
          className: this.addPrefix('none')
        }, locale.noResultsText);
      }
    } // 当未定义 height 且 设置了 virtualized 为 true，treeHeight 设置默认高度


    var treeHeight = (0, _isUndefined2.default)(height) && virtualized ? defaultHeight : height;
    var styles = inline ? (0, _extends2.default)({
      height: treeHeight
    }, style) : {};
    var treeNodesClass = (0, _classnames.default)(this.addTreePrefix('nodes'), (_classNames3 = {}, _classNames3[this.addTreePrefix('all-uncheckable')] = (0, _utils3.getEveryFisrtLevelNodeUncheckable)(this.nodes), _classNames3));
    var ListHeight = (0, _treeUtils.getVirtualLisHeight)(inline, treeHeight);
    return React.createElement("div", {
      ref: this.treeViewRef,
      className: classes,
      style: styles,
      onScroll: onScroll,
      onKeyDown: this.handleKeyDown
    }, React.createElement("div", {
      className: treeNodesClass
    }, virtualized ? React.createElement(_AutoSizer.default, {
      defaultHeight: ListHeight,
      defaultWidth: defaultWidth
    }, function (_ref3) {
      var height = _ref3.height,
          width = _ref3.width;
      return React.createElement(_List.default, {
        ref: _this9.listRef,
        width: width || defaultWidth,
        height: height || ListHeight,
        rowHeight: 36,
        rowCount: formattedNodes.length,
        rowRenderer: _this9.measureRowRenderer(formattedNodes)
      });
    }) : formattedNodes));
  };

  _proto.render = function render() {
    var _this$props14 = this.props,
        cascade = _this$props14.cascade,
        style = _this$props14.style,
        locale = _this$props14.locale,
        inline = _this$props14.inline,
        disabled = _this$props14.disabled,
        valueKey = _this$props14.valueKey,
        labelKey = _this$props14.labelKey,
        cleanable = _this$props14.cleanable,
        countable = _this$props14.countable,
        placeholder = _this$props14.placeholder,
        toggleComponentClass = _this$props14.toggleComponentClass,
        onExited = _this$props14.onExited,
        onEntered = _this$props14.onEntered,
        onClean = _this$props14.onClean,
        renderValue = _this$props14.renderValue,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props14, ["cascade", "style", "locale", "inline", "disabled", "valueKey", "labelKey", "cleanable", "countable", "placeholder", "toggleComponentClass", "onExited", "onEntered", "onClean", "renderValue"]);
    var _this$state8 = this.state,
        hasValue = _this$state8.hasValue,
        selectedValues = _this$state8.selectedValues;
    var classes = (0, _Picker.getToggleWrapperClassName)('check-tree', this.addPrefix, this.props, hasValue);
    var selectedItems = this.getSelectedItems(selectedValues);
    var selectedElement = placeholder;

    if (hasValue && selectedValues.length) {
      selectedElement = React.createElement(_Picker.SelectedElement, {
        selectedItems: selectedItems,
        countable: countable,
        valueKey: valueKey,
        labelKey: labelKey,
        prefix: this.addPrefix,
        cascade: cascade,
        locale: locale
      });

      if (renderValue) {
        selectedElement = renderValue(selectedValues, selectedItems, selectedElement);
      }
    }

    var unhandled = (0, _utils2.getUnhandledProps)(CheckTreePicker, rest);

    if (inline) {
      return this.renderCheckTree();
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
      componentClass: toggleComponentClass,
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: this.state.active
    }), selectedElement || locale.placeholder)));
  };

  return CheckTreePicker;
}(React.Component);

CheckTreePicker.propTypes = {
  data: _propTypes.default.array,
  open: _propTypes.default.bool,
  block: _propTypes.default.bool,
  style: _propTypes.default.object,
  value: _propTypes.default.array,
  height: _propTypes.default.number,
  inline: _propTypes.default.bool,
  locale: _propTypes.default.object,
  cascade: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  valueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string,
  container: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  className: _propTypes.default.string,
  cleanable: _propTypes.default.bool,
  countable: _propTypes.default.bool,
  expandAll: _propTypes.default.bool,
  placement: _propTypes.default.oneOf(_constants.PLACEMENT),
  searchable: _propTypes.default.bool,
  appearance: _propTypes.default.oneOf(['default', 'subtle']),
  virtualized: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  defaultOpen: _propTypes.default.bool,
  childrenKey: _propTypes.default.string,
  placeholder: _propTypes.default.node,
  preventOverflow: _propTypes.default.bool,
  defaultValue: _propTypes.default.array,
  searchKeyword: _propTypes.default.string,
  menuStyle: _propTypes.default.object,
  menuClassName: _propTypes.default.string,
  menuAutoWidth: _propTypes.default.bool,
  defaultExpandAll: _propTypes.default.bool,
  containerPadding: _propTypes.default.number,
  disabledItemValues: _propTypes.default.array,
  expandItemValues: _propTypes.default.array,
  defaultExpandItemValues: _propTypes.default.array,
  uncheckableItemValues: _propTypes.default.array,
  toggleComponentClass: _propTypes.default.elementType,
  onOpen: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onHide: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onExpand: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onScroll: _propTypes.default.func,
  onClean: _propTypes.default.func,
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
CheckTreePicker.defaultProps = {
  locale: {
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found',
    checkAll: 'All'
  },
  inline: false,
  cascade: true,
  valueKey: 'value',
  labelKey: 'label',
  cleanable: true,
  countable: true,
  placement: 'bottomStart',
  appearance: 'default',
  searchable: true,
  virtualized: false,
  menuAutoWidth: true,
  defaultValue: [],
  childrenKey: 'children',
  defaultExpandAll: false,
  uncheckableItemValues: []
};
(0, _reactLifecyclesCompat.polyfill)(CheckTreePicker);
var enhance = (0, _compose.default)((0, _utils2.defaultProps)({
  classPrefix: 'picker'
}), (0, _utils2.withPickerMethods)());

var _default = enhance(CheckTreePicker);

exports.default = _default;
module.exports = exports.default;