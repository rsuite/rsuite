import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { toggleClass, hasClass } from 'dom-lib';
import _ from 'lodash';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/commonjs/CellMeasurer';
import { polyfill } from 'react-lifecycles-compat';
import { shallowEqual, shallowEqualArray } from 'rsuite-utils/lib/utils';

import CheckTreeNode, { TreeCheckNodeProps, CheckState } from './CheckTreeNode';
import { CHECK_STATE, PLACEMENT } from '../constants';
import { clone, defaultProps, prefix, getUnhandledProps, createChainedFunction } from '../utils';

import {
  PickerToggle,
  getToggleWrapperClassName,
  onMenuKeyDown,
  MenuWrapper,
  SearchBar,
  SelectedElement,
  PickerToggleTrigger,
  createConcatChildrenFunction
} from '../Picker';

import {
  isEveryChildChecked,
  isSomeChildChecked,
  isSomeNodeHasChildren,
  getTopParentNodeCheckState,
  getSiblingNodeUncheckable,
  Node,
  Nodes
} from './utils';

import {
  shouldDisplay,
  shouldShowNodeByExpanded,
  flattenTree,
  getNodeParents,
  getVirtualLisHeight
} from '../utils/treeUtils';

import { CheckTreePickerProps } from './CheckTreePicker.d';

const defaultHeight = 360;
const defaultWidth = 200;

export type RowProps = {
  node: Object; // Index of row
  isScrolling: boolean; // The List is currently being scrolled
  isVisible: boolean; // This row is visible within the List (eg it is not an overscanned row)
  key?: any; // Unique key within array of rendered rows
  parent: any; // Reference to the parent List (instance)
  style?: Object; // Style object to be applied to row (to position it);
};

export type CheckTreePickerState = {
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
};

class CheckTree extends React.Component<CheckTreePickerProps, CheckTreePickerState> {
  static propTypes = {
    data: PropTypes.array,
    open: PropTypes.bool,
    block: PropTypes.bool,
    style: PropTypes.object,
    value: PropTypes.array,
    height: PropTypes.number,
    inline: PropTypes.bool,
    locale: PropTypes.object,
    cascade: PropTypes.bool,
    disabled: PropTypes.bool,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    className: PropTypes.string,
    cleanable: PropTypes.bool,
    countable: PropTypes.bool,
    expandAll: PropTypes.bool,
    placement: PropTypes.oneOf(PLACEMENT),
    searchable: PropTypes.bool,
    appearance: PropTypes.oneOf(['default', 'subtle']),
    virtualized: PropTypes.bool,
    classPrefix: PropTypes.string,
    defaultOpen: PropTypes.bool,
    childrenKey: PropTypes.string,
    placeholder: PropTypes.node,
    preventOverflow: PropTypes.bool,
    defaultValue: PropTypes.array,
    searchKeyword: PropTypes.string,
    menuStyle: PropTypes.object,
    menuClassName: PropTypes.string,
    menuAutoWidth: PropTypes.bool,
    defaultExpandAll: PropTypes.bool,
    containerPadding: PropTypes.number,
    disabledItemValues: PropTypes.array,
    uncheckableItemValues: PropTypes.array,
    toggleComponentClass: PropTypes.elementType,
    onOpen: PropTypes.func,
    onExit: PropTypes.func,
    onEnter: PropTypes.func,
    onClose: PropTypes.func,
    onHide: PropTypes.func,
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
    onExpand: PropTypes.func,
    onSelect: PropTypes.func,
    onScroll: PropTypes.func,
    onClean: PropTypes.func,
    onExited: PropTypes.func,
    onEntered: PropTypes.func,
    onExiting: PropTypes.func,
    onEntering: PropTypes.func,
    renderMenu: PropTypes.func,
    renderValue: PropTypes.func,
    renderTreeNode: PropTypes.func,
    renderTreeIcon: PropTypes.func,
    renderExtraFooter: PropTypes.func
  };
  static defaultProps = {
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
  menuRef: React.RefObject<any>;
  treeViewRef: React.RefObject<any>;
  positionRef: React.RefObject<any>;
  listRef: React.RefObject<any>;
  triggerRef: React.RefObject<any>;
  toggleRef: React.RefObject<any>;

  constructor(props: CheckTreePickerProps) {
    super(props);
    const { value, data, cascade, childrenKey } = props;
    this.nodes = {};
    this.isControlled = !_.isUndefined(value);

    const keyword = this.getSearchKeyword(props);
    const nextValue = this.getValue(props);
    const nextData = [...data];
    this.flattenNodes(nextData, props);
    this.unserializeLists(
      {
        check: nextValue,
        expand: []
      },
      props
    );

    this.state = {
      data,
      value,
      cascade,
      hasValue: this.hasValue(nextValue, props),
      expandAll: this.getExpandAll(props),
      filterData: this.getFilterData(keyword, nextData, props),
      searchKeyword: keyword,
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
  }

  static getDerivedStateFromProps(
    nextProps: CheckTreePickerProps,
    prevState: CheckTreePickerState
  ) {
    const { value, data, cascade, expandAll, searchKeyword, uncheckableItemValues } = nextProps;
    let nextState: CheckTreePickerState = {};
    if (_.isArray(data) && _.isArray(prevState.data) && prevState.data !== data) {
      nextState.data = data;
    }
    if (_.isArray(value) && !shallowEqualArray(value, prevState.value)) {
      nextState.value = value;
    }

    if (
      _.isArray(uncheckableItemValues) &&
      _.isArray(prevState.uncheckableItemValues) &&
      !shallowEqualArray(uncheckableItemValues, prevState.uncheckableItemValues)
    ) {
      nextState.uncheckableItemValues = uncheckableItemValues;
    }

    if (searchKeyword !== prevState.searchKeyword) {
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

  componentDidUpdate(prevProps: CheckTreePickerProps, prevState: CheckTreePickerState) {
    const { filterData, searchKeyword, selectedValues, expandItemValues } = this.state;

    const { value, data = [], cascade, uncheckableItemValues, childrenKey } = this.props;
    if (prevState.data !== data) {
      const nextData = [...data];
      this.flattenNodes(nextData);
      this.unserializeLists({
        check: this.getValue(),
        expand: expandItemValues
      });
      this.setState({
        data: nextData,
        filterData: this.getFilterData(searchKeyword, nextData),
        isSomeNodeHasChildren: isSomeNodeHasChildren(nextData, childrenKey),
        hasValue: this.hasValue()
      });
    }

    if (_.isArray(value) && !shallowEqualArray(prevState.value, value)) {
      const nextState = {
        selectedValues: value,
        hasValue: this.hasValue(value),
        activeNode: this.activeNode
      };

      if (value && !value.length) {
        nextState.activeNode = null;
      }
      this.unserializeLists({
        check: value,
        expand: expandItemValues
      });
      this.setState(nextState);
    }

    if (
      _.isArray(uncheckableItemValues) &&
      !shallowEqualArray(prevState.uncheckableItemValues, uncheckableItemValues)
    ) {
      this.flattenNodes(filterData);
      this.unserializeLists({
        check: selectedValues,
        expand: expandItemValues
      });

      this.setState({
        hasValue: this.hasValue()
      });
    }

    // cascade 改变时，重新初始化
    if (cascade !== prevState.cascade && cascade) {
      this.flattenNodes(filterData);
      this.unserializeLists(
        {
          check: selectedValues,
          expand: expandItemValues
        },
        this.props
      );
      this.setState({
        cascade
      });
    }

    if (prevState.searchKeyword !== this.props.searchKeyword) {
      this.setState({
        filterData: this.getFilterData(this.props.searchKeyword, filterData)
      });
    }

    if (this.listRef.current) {
      this.listRef.current.forceUpdateGrid();
    }
  }

  getExpandAll(props: CheckTreePickerProps = this.props) {
    const { expandAll, defaultExpandAll } = props;
    return !_.isUndefined(expandAll) ? expandAll : defaultExpandAll;
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

  getSearchKeyword(props: CheckTreePickerProps = this.props) {
    const { searchKeyword } = props;
    return !_.isUndefined(searchKeyword) ? searchKeyword : '';
  }

  getNodeCheckState(node: any, cascade: boolean): CheckState {
    const { childrenKey } = this.props;
    if (!node[childrenKey] || !node[childrenKey].length || !cascade) {
      this.nodes[node.refKey].checkAll = false;
      return node.check ? CHECK_STATE.CHECK : CHECK_STATE.UNCHECK;
    }

    if (isEveryChildChecked(node, this.nodes, this.props)) {
      this.nodes[node.refKey].checkAll = true;
      return CHECK_STATE.CHECK;
    }

    if (isSomeChildChecked(node, this.nodes, this.props)) {
      this.nodes[node.refKey].checkAll = false;
      return CHECK_STATE.INDETERMINATE;
    }

    return CHECK_STATE.UNCHECK;
  }

  getExpandState(node: any, props: CheckTreePickerProps) {
    const { valueKey } = props;
    const expandItemValues = _.isUndefined(this.state) ? [] : this.state.expandItemValues;
    const expandAll = this.getExpandAll(props);
    const expand = expandItemValues.some((value: any) => shallowEqual(node[valueKey], value));
    const { childrenKey } = props;
    if (expandItemValues.length) {
      return expand;
    } else if (node[childrenKey] && node[childrenKey].length) {
      if (expand) {
        return !!node.expand;
      } else if (expandAll) {
        return true;
      }
      return false;
    }
    return false;
  }

  getFilterData(searchKeyword: string = '', data: any[], props: CheckTreePickerProps = this.props) {
    const { labelKey, childrenKey } = props;
    const setVisible = (nodes = []) =>
      nodes.forEach(item => {
        item.visible = shouldDisplay(item[labelKey], searchKeyword);
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
      } else if (options[i][childrenKey] && options[i][childrenKey].length) {
        let active = this.getActiveElementOption(options[i][childrenKey], refKey);
        if (!_.isEmpty(active)) {
          return active;
        }
      }
    }
    return {};
  }

  getElementByDataKey = (dataKey: string) => {
    const ele = findDOMNode(this.nodeRefs[dataKey]);
    if (ele instanceof Element) {
      return ele.querySelector(`.${this.addPrefix('checktree-view-checknode-label')}`);
    }
    return null;
  };

  getFormattedTree(nodes: any[]) {
    const { childrenKey } = this.props;
    return nodes.map((node: any) => {
      const formatted: any = { ...node };
      const curNode = this.nodes[node.refKey];
      if (curNode) {
        formatted.check = curNode.check;
        formatted.expand = curNode.expand;
        formatted.uncheckable = curNode.uncheckable;
        formatted.parentNode = curNode.parentNode;
        if (Array.isArray(node[childrenKey]) && node[childrenKey].length > 0) {
          formatted[childrenKey] = this.getFormattedTree(formatted[childrenKey]);
        }
      }

      return formatted;
    });
  }

  getFlattenTreeData(nodes: any[]) {
    const { expandItemValues } = this.state;
    const { childrenKey, valueKey } = this.props;

    return flattenTree(nodes, childrenKey, (node: any) => {
      const formatted: any = { ...node };
      const curNode = this.nodes[node.refKey];
      const parentKeys = getNodeParents(curNode, 'parentNode', valueKey);
      if (curNode) {
        formatted.check = curNode.check;
        formatted.expand = curNode.expand;
        formatted.uncheckable = curNode.uncheckable;
        formatted.layer = curNode.layer;
        formatted.parentNode = curNode.parentNode;
        formatted.showNode = shouldShowNodeByExpanded(expandItemValues, parentKeys);
      }
      return formatted;
    });
  }

  /**
   * 获取每个节点的disable状态
   * @param {*} node
   */
  getDisabledState(node: any) {
    const { disabledItemValues = [], valueKey } = this.props;
    return disabledItemValues.some((value: any) =>
      shallowEqual(this.nodes[node.refKey][valueKey], value)
    );
  }

  /**
   * 获取节点的是否需要隐藏checkbox
   * @param {*} node
   */
  getUncheckableState(node: any) {
    const { uncheckableItemValues = [], valueKey } = this.props;
    return uncheckableItemValues.some((value: any) => shallowEqual(node[valueKey], value));
  }

  getFocusableMenuItems = () => {
    const { filterData } = this.state;
    const { childrenKey } = this.props;

    let items = [];
    const loop = (treeNodes: any[]) => {
      treeNodes.forEach((node: any) => {
        if (!this.getDisabledState(node) && node.visible) {
          items.push(node);
          const nodeData = { ...node, ...this.nodes[node.refKey] };
          if (!this.getExpandState(nodeData, this.props)) {
            return;
          }
          if (node[childrenKey]) {
            loop(node[childrenKey]);
          }
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
    const activeItem = document.activeElement;
    if (activeItem !== null) {
      const { key, layer } = _.get(activeItem, 'dataset');
      const nodeData = this.getActiveElementOption(filterData, key);
      nodeData.check = !this.nodes[nodeData.refKey].check;
      nodeData.parentNode = this.nodes[nodeData.refKey].parentNode;
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
   * 获取第一层节点是否全部都为 uncheckable
   */
  getEveryFisrtLevelNodeUncheckable() {
    const list = [];
    Object.keys(this.nodes).forEach((refKey: string) => {
      const curNode = this.nodes[refKey];
      if (!curNode.parentNode) {
        list.push(curNode);
      }
    });

    return list.every(node => node.uncheckable);
  }

  /**
   * 判断传入的 value 是否存在于data 中
   * @param {*} values
   */
  hasValue(values: any[] = this.state.selectedValues, props: CheckTreePickerProps = this.props) {
    const { valueKey } = props;
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
  flattenNodes(
    nodes: any[],
    props: CheckTreePickerProps = this.props,
    ref: string = '0',
    parentNode?: any,
    layer: number = 0
  ) {
    const { labelKey, valueKey, childrenKey } = props;

    if (!Array.isArray(nodes) || nodes.length === 0) {
      return;
    }
    layer += 1;
    nodes.forEach((node, index) => {
      const refKey = `${ref}-${index}`;
      node.refKey = refKey;
      this.nodes[refKey] = {
        layer,
        [labelKey]: node[labelKey],
        [valueKey]: node[valueKey],
        expand: this.getExpandState(node, props),
        uncheckable: this.getUncheckableState(node),
        refKey
      };
      if (parentNode) {
        this.nodes[refKey].parentNode = parentNode;
      }
      this.flattenNodes(node[childrenKey], props, refKey, this.nodes[refKey], layer);
    });
  }

  /**
   * 过滤选中的values中不包含 uncheckableItemValues 的那些值
   * @param {*} values
   */
  filterSelectedValues(values: any[]) {
    const { uncheckableItemValues = [] } = this.props;
    return values.filter(value => !uncheckableItemValues.includes(value));
  }

  serializeList(key: string, nodes: Object = this.nodes) {
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
        const parentNode = nodes[currentNode.parentNode.refKey];
        if (currentNode[key]) {
          if (!parentNode.checkAll) {
            list.push(nodes[refKey][valueKey]);
          } else if (!getTopParentNodeCheckState(nodes, currentNode) && parentNode.uncheckable) {
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

  unserializeLists(lists: object, nextProps: CheckTreePickerProps = this.props) {
    const { valueKey, cascade, uncheckableItemValues = [] } = nextProps;
    const expandAll = this.getExpandAll();
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

  isControlled = null;

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
    if (node !== null && typeof node.focus === 'function') {
      node.focus();
    }
  };

  focusPreviousItem = () => {
    const { items, activeIndex } = this.getItemsAndActiveIndex();
    if (items.length === 0) {
      return;
    }
    let prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    prevIndex = prevIndex >= 0 ? prevIndex : 0;
    const node: any = this.getElementByDataKey(items[prevIndex].refKey);
    if (node !== null && typeof node.focus === 'function') {
      node.focus();
    }
  };

  closeDropdown = () => {
    if (this.triggerRef.current) {
      this.triggerRef.current.hide();
    }
  };

  openDropdown = () => {
    if (this.triggerRef.current) {
      this.triggerRef.current.show();
    }
  };

  toggleDropdown = () => {
    const { active } = this.state;
    if (active) {
      this.closeDropdown();
      return;
    }
    this.openDropdown();
  };

  everyChildChecked = (nodes: Nodes, node: Node) => {
    const list = [];
    Object.keys(nodes).forEach((refKey: string) => {
      const curNode = nodes[refKey];
      if (curNode.parentNode && curNode.parentNode.refKey === node.refKey && !curNode.uncheckable) {
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
      node[childrenKey].forEach((child: Object) => {
        this.toggleDownChecked(nodes, child, isChecked);
      });
    }
  }

  toggleNode(key: string, node: Node, toggleValue: boolean) {
    // 如果该节点处于 disabledChecbox，则忽略该值
    if (!node.uncheckable) {
      this.nodes[node.refKey][key] = toggleValue;
    }
  }

  toggleExpand(node: Node, isExpand: boolean) {
    this.nodes[node.refKey].expand = isExpand;
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  handleSelect = (activeNode: Node, event: React.SyntheticEvent<any>) => {
    const { onChange, onSelect } = this.props;
    const selectedValues = this.toggleChecked(activeNode, !this.nodes[activeNode.refKey].check);
    if (this.isControlled) {
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

    onChange && onChange(selectedValues, event);
    onSelect && onSelect(activeNode, selectedValues, event);
  };

  handleToggle = (nodeData: any, layer: number) => {
    const { classPrefix = '', valueKey, onExpand, virtualized } = this.props;
    if (!virtualized) {
      const openClass = `${classPrefix}-checktree-view-open`;
      toggleClass(findDOMNode(this.nodeRefs[nodeData.refKey]), openClass);
      nodeData.expand = hasClass(findDOMNode(this.nodeRefs[nodeData.refKey]), openClass);
      this.toggleExpand(nodeData, nodeData.expand);
    } else {
      this.toggleExpand(nodeData, !nodeData.expand);
    }
    this.setState({
      expandItemValues: this.serializeList('expand')
    });

    onExpand &&
      onExpand(nodeData, layer, createConcatChildrenFunction(nodeData, nodeData[valueKey]));
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
    const { classPrefix } = this.props;
    const { activeNode, active } = this.state;

    // enter
    if ((!activeNode || !active) && event.keyCode === 13) {
      this.toggleDropdown();
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
        className.includes(`${classPrefix}-toggle`) ||
        className.includes(`${classPrefix}-toggle-custom`) ||
        className.includes(`${classPrefix}-search-bar-input`)
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
    onSearch && onSearch(value, event);
  };

  handleClean = (evnet: React.SyntheticEvent<any>) => {
    const { onChange } = this.props;
    this.setState({
      selectedValues: [],
      hasValue: false,
      activeNode: {}
    });
    this.unserializeLists({
      check: []
    });

    onChange && onChange([], evnet);
  };

  handleOnOpen = () => {
    const { activeNode } = this.state;
    const { onOpen } = this.props;
    if (activeNode) {
      const node: any = this.getElementByDataKey(activeNode.refKey);
      if (node !== null && typeof node.focus === 'function') {
        node.focus();
      }
    }
    onOpen && onOpen();
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
    onClose && onClose();
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
    const classes = classNames(menuClassName, this.addPrefix('checktree-menu'));
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
        {renderExtraFooter && renderExtraFooter()}
      </MenuWrapper>
    );
  }

  renderNode(node: Node, index: number, layer: number, classPrefix: string) {
    const { activeNode, expandAll } = this.state;
    const { valueKey, labelKey, childrenKey, renderTreeNode, renderTreeIcon, cascade } = this.props;
    const { visible, refKey } = node;

    if (!visible) {
      return null;
    }

    const key = _.isString(node[valueKey]) || _.isNumber(node[valueKey]) ? node[valueKey] : refKey;

    const children = node[childrenKey];
    const hasNotEmptyChildren = children && Array.isArray(children) && children.length > 0;

    const props: TreeCheckNodeProps = {
      value: node[valueKey],
      label: node[labelKey],
      layer,
      active: activeNode ? shallowEqual(activeNode[valueKey], node[valueKey]) : false,
      visible: node.visible,
      disabled: this.getDisabledState(node),
      nodeData: node,
      checkState: this.getNodeCheckState(node, cascade),
      hasChildren: !!children,
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
      const openClass = `${classPrefix}-open`;
      const expandControlled = 'expandAll' in this.props;
      const expandALlState = expandControlled ? expandAll : expandAll || node.expand;
      let childrenClass = classNames(`${classPrefix}-node-children`, {
        [openClass]: expandALlState && hasNotEmptyChildren
      });

      let nodes = children || [];
      return (
        <div className={childrenClass} key={key} ref={this.bindNodeRefs.bind(this, refKey)}>
          <CheckTreeNode
            classPrefix={classPrefix}
            key={key}
            ref={this.bindNodeRefs.bind(this, refKey)}
            {...props}
          />
          <div className={`${classPrefix}-children`}>
            {nodes.map((child, i) => this.renderNode(child, i, layer, classPrefix))}
          </div>
        </div>
      );
    }

    return (
      <CheckTreeNode
        classPrefix={classPrefix}
        key={key}
        ref={this.bindNodeRefs.bind(this, refKey)}
        {...props}
      />
    );
  }

  renderVirtualNode(node: any, options: any) {
    const { activeNode, expandAll } = this.state;
    const { valueKey, labelKey, childrenKey, renderTreeNode, renderTreeIcon, cascade } = this.props;
    const { key, style, classPrefix } = options;
    const { layer, refKey, expand, showNode } = node;

    const children = node[childrenKey];

    const props = {
      value: node[valueKey],
      label: node[labelKey],
      layer,
      expand,
      active: activeNode ? shallowEqual(activeNode[valueKey], node[valueKey]) : false,
      visible: node.visible,
      disabled: this.getDisabledState(node),
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
          classPrefix={classPrefix}
          key={key}
          ref={this.bindNodeRefs.bind(this, refKey)}
          {...props}
        />
      )
    );
  }

  rowRenderer = ({ node, key, style }: RowProps) => {
    const treeViewClass = this.addPrefix('checktree-view');
    const options = {
      key,
      style,
      classPrefix: treeViewClass
    };
    return this.renderVirtualNode(node, options);
  };

  measureRowRenderer = nodes => ({ key, index, style, parent }) => {
    const node = nodes[index];

    return (
      <CellMeasurer cache={this.cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
        {m => this.rowRenderer({ ...m, node, key, style })}
      </CellMeasurer>
    );
  };

  renderCheckTree() {
    const { filterData, isSomeNodeHasChildren } = this.state;
    const { inline, style, height, className = '', onScroll, locale, virtualized } = this.props;

    // 树节点的层级
    let layer = 0;
    const treeViewClass = this.addPrefix('checktree-view');
    const classes = classNames(treeViewClass, {
      [className]: inline,
      'without-children': !isSomeNodeHasChildren
    });

    let formattedNodes = [];

    if (!virtualized) {
      formattedNodes = this.getFormattedTree(filterData).map((node, index) =>
        this.renderNode(node, index, layer, treeViewClass)
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
    const styles = inline ? { height: treeHeight, ...style } : {};

    const treeNodesClass = classNames(this.addPrefix('checktree-nodes'), {
      [this.addPrefix('all-uncheckable')]: this.getEveryFisrtLevelNodeUncheckable()
    });
    const ListHeight = getVirtualLisHeight(inline, treeHeight);
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
            <AutoSizer defaultHeight={ListHeight} defaultWidth={defaultWidth}>
              {({ height, width }) => (
                <List
                  ref={this.listRef}
                  width={width || defaultWidth}
                  height={height || ListHeight}
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
      ...rest
    } = this.props;
    const { hasValue, selectedValues } = this.state;
    const classes = getToggleWrapperClassName('checktree', this.addPrefix, this.props, hasValue);
    const selectedItems = this.getSelectedItems(selectedValues);
    let selectedElement: React.ReactNode = placeholder;

    if (hasValue && selectedValues.length) {
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
      if (renderValue) {
        selectedElement = renderValue(selectedValues, selectedItems, selectedElement);
      }
    }

    const unhandled = getUnhandledProps(CheckTree, rest);
    if (inline) {
      return this.renderCheckTree();
    }

    return (
      <PickerToggleTrigger
        pickerProps={this.props}
        innerRef={this.triggerRef}
        positionRef={this.positionRef}
        onEntered={createChainedFunction(this.handleOnOpen, onEntered)}
        onExit={createChainedFunction(this.handleOnClose, onExited)}
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
            hasValue={hasValue}
            active={this.state.active}
          >
            {selectedElement || locale.placeholder}
          </PickerToggle>
        </div>
      </PickerToggleTrigger>
    );
  }
}

polyfill(CheckTree);

const enhance = defaultProps<CheckTreePickerProps>({
  classPrefix: 'picker'
});
export default enhance(CheckTree);
