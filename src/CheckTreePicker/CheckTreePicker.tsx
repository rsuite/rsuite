import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/commonjs/CellMeasurer';
import { polyfill } from 'react-lifecycles-compat';
import shallowEqual from '../utils/shallowEqual';

import CheckTreeNode, { TreeCheckNodeProps } from './CheckTreeNode';
import { CHECK_STATE, CheckStateType } from '../constants';
import {
  clone,
  defaultProps,
  prefix,
  defaultClassPrefix,
  getUnhandledProps,
  createChainedFunction,
  mergeRefs
} from '../utils';

import {
  PickerToggle,
  getToggleWrapperClassName,
  onMenuKeyDown,
  MenuWrapper,
  SearchBar,
  SelectedElement,
  PickerToggleTrigger,
  createConcatChildrenFunction,
  shouldDisplay
} from '../Picker';

import {
  isEveryChildChecked,
  isSomeChildChecked,
  isSomeNodeHasChildren,
  getSiblingNodeUncheckable,
  Node,
  Nodes,
  getEveryFisrtLevelNodeUncheckable,
  getUncheckableState,
  getFormattedTree,
  getDisabledState
} from './utils';

import {
  compareArray,
  shouldShowNodeByExpanded,
  flattenTree,
  getNodeParents,
  getVirtualLisHeight,
  hasVisibleChildren,
  treeDeprecatedWarning,
  getExpandItemValues,
  getExpandAll,
  getExpandState,
  getExpandWhenSearching
} from '../utils/treeUtils';

import { CheckTreePickerProps } from './CheckTreePicker.d';
import { listPickerPropTypes, listPickerDefaultProps } from '../Picker/propTypes';

// default value for virtualized
const defaultHeight = 360;
const defaultWidth = 200;

interface CheckTreePickerState {
  data?: any[];
  value?: any[];
  cascade?: boolean;
  hasValue?: boolean;
  expandAll?: boolean;
  filterData?: any[];
  activeNode?: Node;
  searchKeyword?: string;
  selectedValues?: any[];
  expandItemValues?: any[];
  uncheckableItemValues?: any[];
  isSomeNodeHasChildren?: boolean;
  active?: boolean;
}

class CheckTreePicker extends React.Component<CheckTreePickerProps, CheckTreePickerState> {
  static propTypes = {
    ...listPickerPropTypes,
    height: PropTypes.number,
    inline: PropTypes.bool,
    cascade: PropTypes.bool,
    countable: PropTypes.bool,
    expandAll: PropTypes.bool,
    searchable: PropTypes.bool,
    virtualized: PropTypes.bool,
    searchKeyword: PropTypes.string,
    menuAutoWidth: PropTypes.bool,
    defaultExpandAll: PropTypes.bool,
    containerPadding: PropTypes.number,
    disabledItemValues: PropTypes.array,
    expandItemValues: PropTypes.array,
    defaultExpandItemValues: PropTypes.array,
    uncheckableItemValues: PropTypes.array,
    onSearch: PropTypes.func,
    onExpand: PropTypes.func,
    onSelect: PropTypes.func,
    onScroll: PropTypes.func,
    renderMenu: PropTypes.func,
    renderTreeNode: PropTypes.func,
    renderTreeIcon: PropTypes.func,
    searchBy: PropTypes.func
  };
  static defaultProps = {
    ...listPickerDefaultProps,
    cascade: true,
    countable: true,
    searchable: true,
    menuAutoWidth: true,
    defaultValue: [],
    uncheckableItemValues: [],
    locale: {
      placeholder: 'Select',
      searchPlaceholder: 'Search',
      noResultsText: 'No results found',
      checkAll: 'All'
    }
  };
  menuRef: React.RefObject<any>;
  treeViewRef: React.RefObject<any>;
  positionRef: React.RefObject<any>;
  listRef: React.RefObject<any>;
  triggerRef: React.RefObject<any>;
  toggleRef: React.RefObject<any>;

  constructor(props: CheckTreePickerProps) {
    super(props);
    const { value, data, cascade, childrenKey, searchKeyword } = props;
    this.nodes = {};
    const nextValue = this.getValue(props);
    const nextExpandItemValues = getExpandItemValues(props);
    const nextData = [...data];
    this.flattenNodes(nextData, props);
    this.unserializeLists(
      {
        check: nextValue,
        expand: nextExpandItemValues
      },
      props
    );

    this.state = {
      data,
      value,
      cascade,
      hasValue: this.hasValue(nextValue),
      expandAll: getExpandAll(props),
      filterData: this.getFilterData(searchKeyword, nextData, props),
      searchKeyword: searchKeyword || '',
      selectedValues: nextValue,
      expandItemValues: this.serializeList('expand'),
      uncheckableItemValues: props.uncheckableItemValues,
      isSomeNodeHasChildren: isSomeNodeHasChildren(data, childrenKey)
    };

    this.treeViewRef = React.createRef();
    this.positionRef = React.createRef();
    this.listRef = React.createRef();
    this.triggerRef = React.createRef();
    this.toggleRef = React.createRef();

    // for test
    this.menuRef = React.createRef();

    treeDeprecatedWarning(props, ['expandAll']);
  }

  static getDerivedStateFromProps(
    nextProps: CheckTreePickerProps,
    prevState: CheckTreePickerState
  ) {
    const {
      value,
      data,
      cascade,
      expandAll,
      searchKeyword,
      uncheckableItemValues,
      expandItemValues
    } = nextProps;
    const nextState: CheckTreePickerState = {};
    if (_.isArray(data) && _.isArray(prevState.data) && prevState.data !== data) {
      nextState.data = data;
    }

    if (compareArray(value, prevState.value)) {
      nextState.value = value;
    }

    if (compareArray(expandItemValues, prevState.expandItemValues) && _.isArray(expandItemValues)) {
      nextState.expandItemValues = expandItemValues;
    }

    if (
      compareArray(uncheckableItemValues, prevState.uncheckableItemValues) &&
      _.isArray(uncheckableItemValues)
    ) {
      nextState.uncheckableItemValues = uncheckableItemValues;
    }

    if (!_.isUndefined(searchKeyword) && searchKeyword !== prevState.searchKeyword) {
      nextState.searchKeyword = searchKeyword;
    }

    if (cascade !== prevState.cascade) {
      nextState.cascade = cascade;
    }
    if (expandAll !== prevState.expandAll) {
      nextState.expandAll = expandAll;
    }

    return Object.keys(nextState).length ? nextState : null;
  }

  componentDidUpdate(_prevProps: CheckTreePickerProps, prevState: CheckTreePickerState) {
    this.updateDataChange(prevState);
    this.updateValueChange(prevState);
    this.updateExpandItemValuesChange(prevState);
    this.updateUncheckableItemValuesChange(prevState);
    this.updateCascadeChange(prevState);
    this.updateSearchKeywordChange(prevState);

    if (this.listRef.current) {
      this.listRef.current.forceUpdateGrid();
    }
  }

  updateDataChange(prevState: CheckTreePickerState) {
    const { searchKeyword, expandItemValues } = this.state;
    const { data = [], childrenKey } = this.props;

    if (prevState.data !== data) {
      const nextData = [...data];
      this.nodes = {};
      this.flattenNodes(nextData);
      this.unserializeLists({
        check: this.getValue(),
        expand: expandItemValues
      });

      this.setState({
        data: nextData,
        filterData: this.getFilterData(searchKeyword, nextData),
        isSomeNodeHasChildren: isSomeNodeHasChildren(nextData, childrenKey),
        hasValue: this.hasValue(),
        expandItemValues: this.serializeList('expand')
      });
    }
  }

  updateValueChange(prevState: CheckTreePickerState) {
    const { expandItemValues } = this.state;
    const { value } = this.props;
    if (compareArray(value, prevState.value)) {
      this.unserializeLists({
        check: value ?? [],
        expand: expandItemValues
      });
      this.setState({
        selectedValues: value,
        hasValue: this.hasValue(value),
        activeNode: value.length ? this.activeNode : null
      });
    }
  }

  updateExpandItemValuesChange(prevState: CheckTreePickerState) {
    const { expandItemValues } = this.props;
    if (compareArray(expandItemValues, prevState.expandItemValues) && _.isArray(expandItemValues)) {
      this.unserializeLists({
        expand: expandItemValues
      });
      this.setState({
        expandItemValues
      });
    }
  }

  updateUncheckableItemValuesChange(prevState: CheckTreePickerState) {
    const { data, selectedValues, expandItemValues } = this.state;
    const { uncheckableItemValues } = this.props;
    if (
      compareArray(uncheckableItemValues, prevState.uncheckableItemValues) &&
      _.isArray(uncheckableItemValues)
    ) {
      this.flattenNodes(data);
      this.unserializeLists({
        check: selectedValues,
        expand: expandItemValues
      });

      this.setState({
        hasValue: this.hasValue()
      });
    }
  }

  updateCascadeChange(prevState: CheckTreePickerState) {
    const { data, selectedValues, expandItemValues } = this.state;
    const { cascade } = this.props;
    // cascade 改变时，重新初始化
    if (cascade !== prevState.cascade && cascade) {
      this.flattenNodes(data);
      this.unserializeLists({
        check: selectedValues,
        expand: expandItemValues
      });
      this.setState({
        cascade
      });
    }
  }

  updateSearchKeywordChange(prevState: CheckTreePickerState) {
    const { filterData } = this.state;
    const { searchKeyword } = this.props;
    if (!_.isUndefined(searchKeyword) && prevState.searchKeyword !== searchKeyword) {
      this.setState({
        filterData: this.getFilterData(searchKeyword, filterData)
      });
    }
  }

  getValue = (props: CheckTreePickerProps = this.props) => {
    const { value, defaultValue, uncheckableItemValues = [] } = props;
    if (value && value.length) {
      return value.filter(v => !uncheckableItemValues.includes(v));
    }
    if (defaultValue && defaultValue.length > 0) {
      return defaultValue.filter(v => !uncheckableItemValues.includes(v));
    }
    return [];
  };

  getNodeCheckState(node: any, cascade: boolean): CheckStateType {
    const { childrenKey } = this.props;
    if (!node[childrenKey] || !node[childrenKey].length || !cascade) {
      this.nodes[node.refKey].checkAll = false;
      return node.check ? CHECK_STATE.CHECK : CHECK_STATE.UNCHECK;
    }

    if (isEveryChildChecked(node, this.nodes, this.props)) {
      this.nodes[node.refKey].checkAll = true;
      this.nodes[node.refKey].check = true;
      return CHECK_STATE.CHECK;
    }

    if (isSomeChildChecked(node, this.nodes, this.props)) {
      this.nodes[node.refKey].checkAll = false;
      return CHECK_STATE.INDETERMINATE;
    }

    return CHECK_STATE.UNCHECK;
  }

  getFilterData(searchKeyword = '', data: any[], props: CheckTreePickerProps = this.props) {
    const { labelKey, childrenKey, searchBy } = props;
    const setVisible = (nodes = []) =>
      nodes.forEach(item => {
        item.visible = searchBy
          ? searchBy(searchKeyword, item[labelKey], item)
          : shouldDisplay(item[labelKey], searchKeyword);
        if (_.isArray(item[childrenKey])) {
          setVisible(item[childrenKey]);
          item[childrenKey].forEach(child => {
            if (child.visible) {
              item.visible = child.visible;
            }
          });
        }
      });

    setVisible(data);
    return data;
  }

  getActiveElementOption(options: any[], refKey: string) {
    const { childrenKey } = this.props;
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].refKey === refKey) {
        return options[i];
      } else if (options[i][childrenKey]?.length) {
        const active = this.getActiveElementOption(options[i][childrenKey], refKey);
        if (!_.isEmpty(active)) {
          return active;
        }
      }
    }
    return {};
  }

  getElementByDataKey = (dataKey: string) => {
    const ele = this.nodeRefs[dataKey];
    if (ele instanceof Element) {
      return ele.querySelector(`.${this.addTreePrefix('node-label')}`);
    }
    return null;
  };

  getFlattenTreeData(nodes: any[]) {
    const { expandItemValues } = this.state;
    const { childrenKey, valueKey } = this.props;

    return flattenTree(nodes, childrenKey, (node: any) => {
      let formatted: any = {};
      const curNode = this.nodes[node.refKey];
      const parentKeys = getNodeParents(curNode, 'parentNode', valueKey);
      if (curNode) {
        formatted = {
          ...node,
          check: curNode.check,
          expand: curNode.expand,
          uncheckable: curNode.uncheckable,
          layer: curNode.layer,
          parentNode: curNode.parentNode,
          showNode: shouldShowNodeByExpanded(expandItemValues, parentKeys)
        };
      }
      return formatted;
    });
  }

  getFocusableMenuItems = () => {
    const { filterData } = this.state;
    const { childrenKey } = this.props;

    const items = [];
    const loop = (treeNodes: any[]) => {
      treeNodes.forEach((node: any) => {
        const nodeData = { ...node, ...this.nodes[node.refKey] };
        if (!getDisabledState(this.nodes, node, this.props) && node.visible) {
          items.push(node);
        }
        if (node[childrenKey] && getExpandState(nodeData, this.props)) {
          loop(node[childrenKey]);
        }
      });
    };

    loop(filterData);
    return items;
  };

  getItemsAndActiveIndex() {
    const items = this.getFocusableMenuItems();

    let activeIndex = -1;
    items.forEach((item, index) => {
      if (document.activeElement !== null) {
        if (item.refKey === document.activeElement.getAttribute('data-key')) {
          activeIndex = index;
        }
      }
    });
    return { items, activeIndex };
  }

  getActiveItem() {
    const { filterData } = this.state;
    const activeItem = document.activeElement as HTMLElement;
    if (activeItem !== null) {
      const key = activeItem?.dataset?.key;
      const layer = activeItem?.dataset?.layer;
      const nodeData = this.getActiveElementOption(filterData, key);
      nodeData.check = !this.nodes[nodeData.refKey]?.check;
      nodeData.parentNode = this.nodes[nodeData.refKey]?.parentNode;
      return {
        nodeData,
        layer
      };
    }
    return {};
  }

  /**
   * 获取已选择的items，用于显示在placeholder
   */
  getSelectedItems(selectedValues) {
    const { valueKey } = this.props;
    const checkItems = [];
    Object.keys(this.nodes).map((refKey: string) => {
      const node = this.nodes[refKey];

      if (selectedValues.some((value: any) => shallowEqual(node[valueKey], value))) {
        checkItems.push(node);
      }
    });
    return checkItems;
  }

  /**
   * 判断传入的 value 是否存在于data 中
   * @param {*} values
   */
  hasValue(values: any[] = this.state.selectedValues) {
    const { valueKey } = this.props;
    const selectedValues = Object.keys(this.nodes)
      .map((refKey: string) => this.nodes[refKey][valueKey])
      .filter((item: any) => values.some(v => shallowEqual(v, item)));
    return !!selectedValues.length;
  }

  /**
   * 拍平数组，将tree 转换为一维对象
   * @param {*} nodes tree data
   * @param {*} ref 当前层级
   */
  flattenNodes(nodes: any[], props?: CheckTreePickerProps, ref = '0', parentNode?: any, layer = 0) {
    const { labelKey, valueKey, childrenKey } = props || this.props;

    if (!Array.isArray(nodes) || nodes.length === 0) {
      return;
    }

    nodes.forEach((node, index) => {
      const refKey = `${ref}-${index}`;
      node.refKey = refKey;
      this.nodes[refKey] = {
        layer,
        [labelKey]: node[labelKey],
        [valueKey]: node[valueKey],
        expand: getExpandState(node, props || this.props),
        uncheckable: getUncheckableState(node, props || this.props),
        refKey
      };
      if (parentNode) {
        this.nodes[refKey].parentNode = parentNode;
      }
      this.flattenNodes(node[childrenKey], props, refKey, this.nodes[refKey], layer + 1);
    });
  }

  /**
   * 过滤选中的 values 中不包含 uncheckableItemValues 的那些值
   * @param {*} values
   */
  filterSelectedValues(values: any[]) {
    const { uncheckableItemValues = [] } = this.props;
    return values.filter(value => !uncheckableItemValues.includes(value));
  }

  serializeList(key: string, nodes: Nodes = this.nodes) {
    const { valueKey } = this.props;
    const list = [];

    Object.keys(nodes).forEach((refKey: string) => {
      if (nodes[refKey][key]) {
        list.push(nodes[refKey][valueKey]);
      }
    });
    return list;
  }

  serializeListOnlyParent(key: string, nodes: Nodes = this.nodes) {
    const { valueKey } = this.props;
    const list = [];

    Object.keys(nodes).forEach((refKey: string) => {
      const currentNode = nodes[refKey];
      if (currentNode.parentNode) {
        const parentNode = nodes[currentNode.parentNode?.refKey];
        if (currentNode[key]) {
          if (!parentNode?.checkAll) {
            list.push(nodes[refKey][valueKey]);
          } else if (parentNode?.uncheckable) {
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
  }

  unserializeLists(lists: any, nextProps: CheckTreePickerProps = this.props) {
    const { valueKey, cascade, uncheckableItemValues = [] } = nextProps;
    const expandAll = getExpandAll(nextProps);
    // Reset values to false
    Object.keys(this.nodes).forEach((refKey: string) => {
      Object.keys(lists).forEach((listKey: string) => {
        if (listKey === 'check') {
          const node = this.nodes[refKey];
          if (cascade && 'parentNode' in node) {
            node[listKey] = node.parentNode[listKey];
          } else {
            node[listKey] = false;
          }
          lists[listKey].forEach((value: any) => {
            if (
              shallowEqual(this.nodes[refKey][valueKey], value) &&
              !uncheckableItemValues.some(uncheckableValue => shallowEqual(value, uncheckableValue))
            ) {
              this.nodes[refKey][listKey] = true;
            }
          });
        }
        if (listKey === 'expand') {
          this.nodes[refKey][listKey] = false;
          if (lists[listKey].length) {
            lists[listKey].forEach((value: any) => {
              if (shallowEqual(this.nodes[refKey][valueKey], value)) {
                this.nodes[refKey][listKey] = true;
              }
            });
          } else {
            this.nodes[refKey][listKey] = expandAll;
          }
        }
      });
    });
  }

  nodes = {};

  activeNode = null;

  cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 20
  });

  nodeRefs = {};
  bindNodeRefs = (refKey: string, ref: React.Ref<any>) => {
    this.nodeRefs[refKey] = ref;
  };

  getPositionInstance = () => {
    return this.positionRef.current;
  };

  getToggleInstance = () => {
    return this.toggleRef.current;
  };

  selectActiveItem = (event: React.KeyboardEvent<any>) => {
    const { nodeData } = this.getActiveItem();
    this.handleSelect(nodeData, event);
  };

  focusNextItem = () => {
    const { items, activeIndex } = this.getItemsAndActiveIndex();

    if (items.length === 0) {
      return;
    }
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    const node: any = this.getElementByDataKey(items[nextIndex].refKey);

    node?.focus?.();
  };

  focusPreviousItem = () => {
    const { items, activeIndex } = this.getItemsAndActiveIndex();
    if (items.length === 0) {
      return;
    }
    let prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    prevIndex = prevIndex >= 0 ? prevIndex : 0;
    const node: any = this.getElementByDataKey(items[prevIndex].refKey);
    node?.focus?.();
  };

  handleCloseDropdown = () => {
    this.triggerRef.current?.hide?.();
  };

  handleOpenDropdown = () => {
    this.triggerRef.current?.show?.();
  };
  open = () => {
    this.handleOpenDropdown?.();
  };
  close = () => {
    this.handleCloseDropdown?.();
  };

  handleToggleDropdown = () => {
    const { active } = this.state;
    if (active) {
      this.handleCloseDropdown();
      return;
    }
    this.handleOpenDropdown();
  };

  everyChildChecked = (nodes: Nodes, node: Node) => {
    const list = [];
    Object.keys(nodes).forEach((refKey: string) => {
      const curNode = nodes[refKey];
      if (curNode.parentNode?.refKey === node.refKey && !curNode.uncheckable) {
        list.push(curNode);
      }
    });

    return list.every(l => l.check);
  };

  toggleChecked(node: Node, isChecked: boolean) {
    const nodes = clone(this.nodes);
    this.toggleDownChecked(nodes, node, isChecked);
    node.parentNode && this.toggleUpChecked(nodes, node.parentNode, isChecked);
    const values = this.serializeListOnlyParent('check', nodes);
    return this.filterSelectedValues(values);
  }

  toggleUpChecked(nodes: Nodes, node: Node, checked: boolean) {
    const { cascade } = this.props;
    const currentNode = nodes[node.refKey];
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
  }

  toggleDownChecked(nodes: Nodes, node: Node, isChecked: boolean) {
    const { childrenKey, cascade } = this.props;
    nodes[node.refKey].check = isChecked;

    if (!node[childrenKey] || !node[childrenKey].length || !cascade) {
      nodes[node.refKey].checkAll = false;
    } else {
      nodes[node.refKey].checkAll = isChecked;
      node[childrenKey].forEach(child => {
        this.toggleDownChecked(nodes, child, isChecked);
      });
    }
  }

  toggleNode(key: string, node: Node, toggleValue: boolean) {
    // 如果该节点处于 disabledCheckbox，则忽略该值
    if (!node.uncheckable) {
      this.nodes[node.refKey][key] = toggleValue;
    }
  }

  toggleExpand(node: Node, isExpand: boolean) {
    const { valueKey } = this.props;
    const expandItemValues = new Set(this.serializeList('expand'));
    if (isExpand) {
      expandItemValues.add(node[valueKey]);
    } else {
      expandItemValues.delete(node[valueKey]);
    }
    return Array.from(expandItemValues);
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);
  addTreePrefix = (name: string) => prefix(defaultClassPrefix('check-tree'))(name);

  handleSelect = (activeNode: Node, event: React.SyntheticEvent<any>) => {
    const { onChange, onSelect, value } = this.props;
    const selectedValues = this.toggleChecked(activeNode, !this.nodes[activeNode.refKey].check);
    if (!_.isUndefined(value)) {
      this.activeNode = activeNode;
    } else {
      this.unserializeLists({
        check: selectedValues
      });
      this.setState({
        activeNode,
        selectedValues,
        hasValue: !!selectedValues.length
      });
    }

    onChange?.(selectedValues, event);
    onSelect?.(activeNode, selectedValues, event);
  };

  handleToggle = (node: any) => {
    const { valueKey, childrenKey, onExpand, expandItemValues } = this.props;
    const nextExpandItemValues = this.toggleExpand(node, !node.expand);
    if (_.isUndefined(expandItemValues)) {
      this.unserializeLists({
        expand: nextExpandItemValues
      });

      this.setState({
        expandItemValues: nextExpandItemValues
      });
    }

    onExpand?.(
      nextExpandItemValues,
      node,
      createConcatChildrenFunction(node, node[valueKey], { valueKey, childrenKey })
    );
  };

  handleKeyDown = (event: React.KeyboardEvent) => {
    onMenuKeyDown(event, {
      down: this.focusNextItem,
      up: this.focusPreviousItem,
      enter: this.selectActiveItem,
      del: this.handleClean
    });
  };

  handleToggleKeyDown = (event: React.KeyboardEvent<any>) => {
    const { activeNode, active } = this.state;

    // enter
    if ((!activeNode || !active) && event.keyCode === 13) {
      this.handleToggleDropdown();
    }

    // delete
    if (event.keyCode === 8) {
      this.handleClean(event);
    }

    if (!this.treeViewRef.current) {
      return;
    }
    if (event.target instanceof HTMLElement) {
      const className = event.target.className;
      if (
        className.includes(this.addPrefix('toggle')) ||
        className.includes(this.addPrefix('toggle-custom')) ||
        className.includes(this.addPrefix('search-bar-input'))
      ) {
        onMenuKeyDown(event, {
          down: this.focusNextItem
        });
      }
    }
  };

  handleSearch = (value: string, event: React.KeyboardEvent<any>) => {
    const { filterData } = this.state;
    const { onSearch, searchKeyword } = this.props;
    if (_.isUndefined(searchKeyword)) {
      this.setState({
        filterData: this.getFilterData(value, filterData),
        searchKeyword: value
      });
    }
    onSearch?.(value, event);
  };

  handleClean = (evnet: React.SyntheticEvent<any>) => {
    this.setState({
      selectedValues: [],
      hasValue: false,
      activeNode: {}
    });
    this.unserializeLists({
      check: []
    });

    this.props.onChange?.([], evnet);
  };

  handleOnOpen = () => {
    const { activeNode } = this.state;
    if (activeNode) {
      const node: any = this.getElementByDataKey(activeNode.refKey);
      node?.focus?.();
    }
    this.props.onOpen?.();
    this.setState({
      active: true
    });
  };

  handleOnClose = () => {
    const { filterData } = this.state;
    const { onClose, searchKeyword } = this.props;
    if (_.isUndefined(searchKeyword)) {
      this.setState({
        filterData: this.getFilterData('', filterData),
        searchKeyword: ''
      });
    }
    onClose?.();
    this.setState({
      active: false
    });
  };

  renderDropdownMenu() {
    const {
      height = defaultHeight,
      locale,
      menuStyle,
      searchable,
      renderMenu,
      virtualized,
      searchKeyword,
      renderExtraFooter,
      menuClassName,
      menuAutoWidth
    } = this.props;

    const keyword = !_.isUndefined(searchKeyword) ? searchKeyword : this.state.searchKeyword;
    const classes = classNames(menuClassName, this.addPrefix('check-tree-menu'));
    const menu = this.renderCheckTree();
    const styles = virtualized ? { height, ...menuStyle } : menuStyle;

    return (
      <MenuWrapper
        autoWidth={menuAutoWidth}
        className={classes}
        style={styles}
        ref={this.menuRef}
        getToggleInstance={this.getToggleInstance}
        getPositionInstance={this.getPositionInstance}
      >
        {searchable ? (
          <SearchBar
            placeholder={locale.searchPlaceholder}
            key="searchBar"
            onChange={this.handleSearch}
            value={keyword}
          />
        ) : null}
        {renderMenu ? renderMenu(menu) : menu}
        {renderExtraFooter?.()}
      </MenuWrapper>
    );
  }

  renderNode(node: Node, layer: number) {
    const { activeNode, searchKeyword } = this.state;
    const {
      valueKey,
      labelKey,
      childrenKey,
      renderTreeNode,
      renderTreeIcon,
      cascade,
      locale
    } = this.props;
    const { visible, refKey } = node;

    // 当处于搜索时，需要将所有节点都展开
    const expand = getExpandWhenSearching(searchKeyword, node.expand);
    if (!visible) {
      return null;
    }

    const key = _.isString(node[valueKey]) || _.isNumber(node[valueKey]) ? node[valueKey] : refKey;

    const children = node[childrenKey];
    // 当用户进行搜索时，hasChildren的判断要变成判断是否存在 visible 为 true 的子节点
    const visibleChildren =
      _.isUndefined(searchKeyword) || searchKeyword.length === 0
        ? !!children
        : hasVisibleChildren(node, childrenKey);
    const props: TreeCheckNodeProps = {
      value: node[valueKey],
      label: node[labelKey],
      layer,
      expand,
      rtl: locale.rtl,
      focus: activeNode ? shallowEqual(activeNode[valueKey], node[valueKey]) : false,
      visible: node.visible,
      disabled: getDisabledState(this.nodes, node, this.props),
      nodeData: node,
      checkState: this.getNodeCheckState(node, cascade),
      hasChildren: visibleChildren,
      uncheckable: node.uncheckable,
      allUncheckable: getSiblingNodeUncheckable(node, this.nodes),
      onSelect: this.handleSelect,
      onTreeToggle: this.handleToggle,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };

    if (props.hasChildren) {
      layer += 1;

      // 是否展开树节点且子节点不为空
      const openClass = this.addTreePrefix('open');
      const childrenClass = classNames(this.addTreePrefix('node-children'), {
        [openClass]: expand && visibleChildren
      });

      const nodes = children || [];
      return (
        <div className={childrenClass} key={key} ref={this.bindNodeRefs.bind(this, refKey)}>
          <CheckTreeNode {...props} />
          <div className={this.addTreePrefix('children')}>
            {nodes.map(child => this.renderNode(child, layer))}
          </div>
        </div>
      );
    }

    return <CheckTreeNode key={key} innerRef={this.bindNodeRefs.bind(this, refKey)} {...props} />;
  }

  renderVirtualNode(node: any, options: any) {
    const { activeNode, expandAll, searchKeyword } = this.state;
    const {
      valueKey,
      labelKey,
      childrenKey,
      renderTreeNode,
      renderTreeIcon,
      cascade,
      locale
    } = this.props;
    const { key, style } = options;
    const { layer, refKey, showNode } = node;
    const expand = getExpandWhenSearching(searchKeyword, node.expand);

    const children = node[childrenKey];

    const props = {
      value: node[valueKey],
      label: node[labelKey],
      layer,
      expand,
      rtl: locale.rtl,
      focus: activeNode ? shallowEqual(activeNode[valueKey], node[valueKey]) : false,
      visible: node.visible,
      disabled: getDisabledState(this.nodes, node, this.props),
      nodeData: node,
      children,
      expandAll,
      checkState: this.getNodeCheckState(node, cascade),
      parentNode: node.parentNode,
      hasChildren: !!children,
      uncheckable: node.uncheckable,
      allUncheckable: getSiblingNodeUncheckable(node, this.nodes),
      onSelect: this.handleSelect,
      onTreeToggle: this.handleToggle,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };

    return (
      showNode && (
        <CheckTreeNode
          style={style}
          key={key}
          innerRef={this.bindNodeRefs.bind(this, refKey)}
          {...props}
        />
      )
    );
  }

  measureRowRenderer = nodes => ({ key, index, style, parent }) => {
    const node = nodes[index];

    return (
      <CellMeasurer cache={this.cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
        {() => this.renderVirtualNode(node, { key, style })}
      </CellMeasurer>
    );
  };

  renderCheckTree() {
    const { filterData, isSomeNodeHasChildren } = this.state;
    const {
      inline,
      style,
      height,
      className,
      onScroll,
      locale,
      virtualized,
      searchable
    } = this.props;

    // 树节点的层级
    const layer = 0;
    const classes = classNames(defaultClassPrefix('check-tree'), {
      [className]: inline,
      'without-children': !isSomeNodeHasChildren
    });

    let formattedNodes = [];

    if (!virtualized) {
      formattedNodes = getFormattedTree(filterData, this.nodes, this.props).map(node =>
        this.renderNode(node, layer)
      );

      if (!formattedNodes.some(v => v !== null)) {
        return <div className={this.addPrefix('none')}>{locale.noResultsText}</div>;
      }
    } else {
      formattedNodes = this.getFlattenTreeData(filterData).filter(n => n.showNode && n.visible);
      if (!formattedNodes.length) {
        return <div className={this.addPrefix('none')}>{locale.noResultsText}</div>;
      }
    }

    // 当未定义 height 且 设置了 virtualized 为 true，treeHeight 设置默认高度
    const treeHeight = _.isUndefined(height) && virtualized ? defaultHeight : height;
    const treeWidth = _.isUndefined(style?.width) ? defaultWidth : style.width;
    const styles = inline ? { height: treeHeight, ...style } : {};

    const treeNodesClass = classNames(this.addTreePrefix('nodes'), {
      [this.addTreePrefix('all-uncheckable')]: getEveryFisrtLevelNodeUncheckable(this.nodes)
    });
    const listHeight = getVirtualLisHeight(inline, searchable, treeHeight);
    return (
      <div
        ref={this.treeViewRef}
        className={classes}
        style={styles}
        onScroll={onScroll}
        onKeyDown={this.handleKeyDown}
      >
        <div className={treeNodesClass}>
          {virtualized ? (
            <AutoSizer defaultHeight={listHeight} defaultWidth={treeWidth}>
              {({ height, width }) => (
                <List
                  ref={this.listRef}
                  width={width || treeWidth}
                  height={height || listHeight}
                  rowHeight={36}
                  rowCount={formattedNodes.length}
                  rowRenderer={this.measureRowRenderer(formattedNodes)}
                />
              )}
            </AutoSizer>
          ) : (
            formattedNodes
          )}
        </div>
      </div>
    );
  }

  render() {
    const {
      cascade,
      style,
      locale,
      inline,
      disabled,
      valueKey,
      labelKey,
      cleanable,
      countable,
      placeholder,
      toggleComponentClass,
      onExited,
      onEntered,
      onClean,
      renderValue,
      positionRef,
      ...rest
    } = this.props;
    const { hasValue, selectedValues } = this.state;
    let hasValidValue = hasValue || (selectedValues.length > 0 && _.isFunction(renderValue));

    const selectedItems = this.getSelectedItems(selectedValues);
    let selectedElement: React.ReactNode = placeholder;

    /**
     * if value is invalid and renderValue is undefined, then using placeholder.
     * if value is valid and renderValue is't undefined, then using renderValue()
     */
    if (selectedValues.length) {
      if (hasValue) {
        selectedElement = (
          <SelectedElement
            selectedItems={selectedItems}
            countable={countable}
            valueKey={valueKey}
            labelKey={labelKey}
            prefix={this.addPrefix}
            cascade={cascade}
            locale={locale}
          />
        );
      }
      if (_.isFunction(renderValue)) {
        selectedElement = renderValue(selectedValues, selectedItems, selectedElement);
        if (_.isNil(selectedElement)) {
          hasValidValue = false;
        }
      }
    }

    const unhandled = getUnhandledProps(CheckTreePicker, rest);
    const classes = getToggleWrapperClassName(
      'check-tree',
      this.addPrefix,
      this.props,
      hasValidValue
    );
    if (inline) {
      return this.renderCheckTree();
    }

    return (
      <PickerToggleTrigger
        pickerProps={this.props}
        ref={this.triggerRef}
        positionRef={mergeRefs(this.positionRef, positionRef)}
        onEntered={createChainedFunction(this.handleOnOpen, onEntered)}
        onExited={createChainedFunction(this.handleOnClose, onExited)}
        speaker={this.renderDropdownMenu()}
      >
        <div className={classes} style={style}>
          <PickerToggle
            {...unhandled}
            ref={this.toggleRef}
            onKeyDown={this.handleToggleKeyDown}
            onClean={createChainedFunction(this.handleClean, onClean)}
            componentClass={toggleComponentClass}
            cleanable={cleanable && !disabled}
            hasValue={hasValidValue}
            active={this.state.active}
            aria-disabled={disabled}
          >
            {selectedElement || locale.placeholder}
          </PickerToggle>
        </div>
      </PickerToggleTrigger>
    );
  }
}

polyfill(CheckTreePicker);

export default defaultProps<CheckTreePickerProps>({
  classPrefix: 'picker'
})(CheckTreePicker);
