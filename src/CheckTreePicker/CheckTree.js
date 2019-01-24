// @flow

import * as React from 'react';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { toggleClass, hasClass } from 'dom-lib';
import _ from 'lodash';
import { AutoSizer, List, CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { polyfill } from 'react-lifecycles-compat';
import { shallowEqual, shallowEqualArray } from 'rsuite-utils/lib/utils';

import CheckTreeNode from './CheckTreeNode';
import { CHECK_STATE } from '../utils/constants';
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
} from '../_picker';
import {
  shouldDisplay,
  shouldShowNodeByExpanded,
  flattenTree,
  getNodeParentKeys,
  isEveryChildChecked,
  isSomeChildChecked,
  isSomeNodeHasChildren,
  getTopParentNodeCheckState,
  getVirtualLisHeight,
  getEveryChildUncheckable,
  getSiblingNodeUncheckable
} from './utils';
// import { Props, States, DefaultEvent, RowProps } from './types';

const defaultHeight = 360;
const defaultWidth = 200;

export type DefaultEvent = SyntheticEvent<*>;
export type Placement =
  | 'bottomLeft'
  | 'bottomRight'
  | 'topLeft'
  | 'topRight'
  | 'leftTop'
  | 'rightTop'
  | 'leftBottom'
  | 'rightBottom'
  | 'auto'
  | 'autoVerticalLeft'
  | 'autoVerticalRight'
  | 'autoHorizontalTop'
  | 'autoHorizontalBottom';

export type Props = {
  data: any[],
  open?: boolean,
  block?: boolean,
  style?: Object,
  value?: any[],
  height?: number,
  inline: boolean,
  locale: Object,
  cascade: boolean,
  disabled?: boolean,
  valueKey: string,
  labelKey: string,
  container?: HTMLElement | (() => HTMLElement),
  className?: string,
  cleanable?: boolean,
  countable?: boolean,
  expandAll?: boolean,
  placement?: Placement,
  searchable?: boolean,
  appearance: 'default' | 'subtle',
  virtualized: boolean,
  classPrefix: string,
  defaultOpen?: boolean,
  childrenKey: string,
  placeholder?: React.Node,
  defaultValue?: any[],
  searchKeyword?: string,
  menuStyle?: Object,
  menuClassName?: string,
  menuAutoWidth?: boolean,
  defaultExpandAll?: boolean,
  containerPadding?: number,
  disabledItemValues?: any[],
  uncheckableItemValues?: any[],
  toggleComponentClass?: React.ElementType,
  // 禁用 checkbox 数组
  onOpen?: () => void,
  onExit?: () => void,
  onEnter?: () => void,
  onClose?: () => void,
  onHide?: () => void,
  onSearch?: (searchKeyword: string, event: DefaultEvent) => void,
  onChange?: (values: any) => void,
  onExpand?: (
    activeNode: any,
    labyer: number,
    concat: (data: any[], children: any[]) => any[]
  ) => void,
  onSelect?: (activeNode: any, layer: number, values: any) => void,
  onScroll?: (event: DefaultEvent) => void,
  onExited?: () => void,
  onEntered?: () => void,
  onExiting?: () => void,
  onEntering?: () => void,
  renderMenu?: (menu: string | React.Node) => React.Node,
  renderValue?: (value: any[], selectedItems: any[], selectedElement?: React.Node) => React.Node,
  renderTreeNode?: (nodeData: Object) => React.Node,
  renderTreeIcon?: (nodeData: Object) => React.Node,
  renderExtraFooter?: () => React.Node
};

export type RowProps = {
  node: Object, // Index of row
  isScrolling: boolean, // The List is currently being scrolled
  isVisible: boolean, // This row is visible within the List (eg it is not an overscanned row)
  key?: any, // Unique key within array of rendered rows
  parent: any, // Reference to the parent List (instance)
  style?: Object // Style object to be applied to row (to position it);
};

export type States = {
  data: any[],
  value?: any[],
  cascade: boolean,
  hasValue: boolean,
  expandAll?: boolean,
  filterData: any[],
  activeNode?: ?Object,
  searchKeyword?: string,
  selectedValues: any[],
  expandItemValues: any[],
  uncheckableItemValues?: any[],
  isSomeNodeHasChildren: boolean,
  active?: boolean
};

class CheckTree extends React.Component<Props, States> {
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
    placement: 'bottomLeft',
    appearance: 'default',
    searchable: true,
    virtualized: false,
    menuAutoWidth: true,
    defaultValue: [],
    childrenKey: 'children',
    defaultExpandAll: false,
    uncheckableItemValues: []
  };

  constructor(props: Props) {
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
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: States) {
    const { value, data, cascade, expandAll, uncheckableItemValues } = nextProps;
    let nextState = {};
    if (_.isArray(data) && _.isArray(prevState.data) && prevState.data !== data) {
      nextState.data = data;
    }
    if (
      _.isArray(value) &&
      _.isArray(prevState.value) &&
      !shallowEqualArray(value, prevState.value)
    ) {
      nextState.value = value;
    }

    if (
      _.isArray(uncheckableItemValues) &&
      _.isArray(prevState.uncheckableItemValues) &&
      !shallowEqualArray(uncheckableItemValues, prevState.uncheckableItemValues)
    ) {
      nextState.uncheckableItemValues = uncheckableItemValues;
    }

    if (cascade !== prevState.cascade) {
      nextState.cascade = cascade;
    }
    if (expandAll !== prevState.expandAll) {
      nextState.expandAll = expandAll;
    }

    return Object.keys(nextState).length ? nextState : null;
  }

  componentDidUpdate(prevProps: Props, prevState: States) {
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

    if (prevProps.searchKeyword !== this.props.searchKeyword) {
      this.setState({
        filterData: this.getFilterData(this.props.searchKeyword, filterData)
      });
    }

    if (this.list) {
      this.list.forceUpdateGrid();
    }
  }

  getExpandAll(props: Props = this.props) {
    const { expandAll, defaultExpandAll } = props;
    return !_.isUndefined(expandAll) ? expandAll : defaultExpandAll;
  }

  getValue = (props: Props = this.props) => {
    const { value, defaultValue, uncheckableItemValues = [] } = props;
    if (value && value.length) {
      return value.filter(v => !uncheckableItemValues.includes(v));
    }
    if (defaultValue && defaultValue.length > 0) {
      return defaultValue.filter(v => !uncheckableItemValues.includes(v));
    }
    return [];
  };

  getSearchKeyword(props: Props = this.props) {
    const { searchKeyword } = props;
    return !_.isUndefined(searchKeyword) ? searchKeyword : '';
  }

  getNodeCheckState(node: Object, cascade: boolean) {
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

  getExpandState(node: Object, props: Props) {
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

  getFilterData(searchKeyword: string = '', data: any[], props?: Props = this.props) {
    const { labelKey, childrenKey } = props;
    const setVisible = (nodes = []) =>
      nodes.forEach((item: Object) => {
        item.visible = shouldDisplay(item[labelKey], searchKeyword);
        if (_.isArray(item[childrenKey])) {
          setVisible(item[childrenKey]);
          item[childrenKey].forEach((child: Object) => {
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
    return nodes.map((node: Object) => {
      const formatted = { ...node };
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
    return flattenTree(
      nodes,
      (node: Object) => {
        const formatted = { ...node };
        const curNode = this.nodes[node.refKey];
        const parentKeys = getNodeParentKeys(curNode, this.props);
        if (curNode) {
          formatted.check = curNode.check;
          formatted.expand = curNode.expand;
          formatted.uncheckable = curNode.uncheckable;
          formatted.layer = curNode.layer;
          formatted.parentNode = curNode.parentNode;
          formatted.showNode = shouldShowNodeByExpanded(expandItemValues, parentKeys);
        }
        return formatted;
      },
      this.props
    );
  }

  /**
   * 获取每个节点的disable状态
   * @param {*} node
   */
  getDisabledState(node: Object) {
    const { disabledItemValues = [], valueKey } = this.props;
    return disabledItemValues.some((value: any) =>
      shallowEqual(this.nodes[node.refKey][valueKey], value)
    );
  }

  /**
   * 获取节点的是否需要隐藏checkbox
   * @param {*} node
   */
  getUncheckableState(node: Object) {
    const { uncheckableItemValues = [], valueKey } = this.props;
    return uncheckableItemValues.some((value: any) => shallowEqual(node[valueKey], value));
  }

  getFocusableMenuItems = () => {
    const { filterData } = this.state;
    const { childrenKey } = this.props;

    let items = [];
    const loop = (treeNodes: any[]) => {
      treeNodes.forEach((node: Object) => {
        if (!this.getDisabledState(node) && !this.getUncheckableState(node) && node.visible) {
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
      const { key, layer } = activeItem.dataset;
      const nodeData: Object = this.getActiveElementOption(filterData, key);
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
  hasValue(values: any[] = this.state.selectedValues, props: Props = this.props) {
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
    props?: Props = this.props,
    ref?: string = '0',
    parentNode?: Object,
    layer?: number = 0
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

  serializeListOnlyParent(key: string, nodes: Object = this.nodes) {
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

  unserializeLists(lists: Object, nextProps?: Props = this.props) {
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

  treeView = null;

  list = null;

  cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 20
  });

  bindListRef = (ref: React.ElementRef<*>) => {
    this.list = ref;
  };

  bindTreeViewRef = (ref: React.ElementRef<*>) => {
    this.treeView = ref;
  };
  trigger = null;

  bindTriggerRef = (ref: React.ElementRef<*>) => {
    this.trigger = ref;
  };

  container = null;
  bindContainerRef = (ref: React.ElementRef<*>) => {
    this.container = ref;
  };

  nodeRefs = {};
  bindNodeRefs = (refKey: string, ref: React.ElementRef<*>) => {
    this.nodeRefs[refKey] = ref;
  };

  // for test
  menu = null;
  bindMenuRef = (ref: React.ElementRef<*>) => {
    this.menu = ref;
  };

  position = null;

  bindPositionRef = (ref: React.ElementRef<*>) => {
    this.position = ref;
  };

  toggle = null;

  bindToggleRef = (ref: React.ElementRef<*>) => {
    this.toggle = ref;
  };

  getPositionInstance = () => {
    return this.position;
  };

  getToggleInstance = () => {
    return this.toggle;
  };

  selectActiveItem = () => {
    const { nodeData, layer } = this.getActiveItem();
    this.handleSelect(nodeData, +layer);
  };

  focusNextItem = () => {
    const { items, activeIndex } = this.getItemsAndActiveIndex();
    if (items.length === 0) {
      return;
    }
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    const node = this.getElementByDataKey(items[nextIndex].refKey);
    if (node !== null) {
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
    const node = this.getElementByDataKey(items[prevIndex].refKey);
    if (node !== null) {
      node.focus();
    }
  };

  closeDropdown = () => {
    if (this.trigger) {
      this.trigger.hide();
    }
  };

  openDropdown = () => {
    if (this.trigger) {
      this.trigger.show();
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

  everyChildChecked = (nodes: Object, node: Object) => {
    const list = [];
    Object.keys(nodes).forEach((refKey: string) => {
      const curNode = nodes[refKey];
      if (curNode.parentNode && curNode.parentNode.refKey === node.refKey && !curNode.uncheckable) {
        list.push(curNode);
      }
    });

    return list.every(l => l.check);
  };

  toggleChecked(node: Object, isChecked: boolean) {
    const nodes = clone(this.nodes);
    this.toggleDownChecked(nodes, node, isChecked);
    node.parentNode && this.toggleUpChecked(nodes, node.parentNode, isChecked);
    const values = this.serializeListOnlyParent('check', nodes);
    return this.filterSelectedValues(values);
  }

  toggleUpChecked(nodes: Object, node: Object, checked: boolean) {
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

  toggleDownChecked(nodes: Object, node: Object, isChecked: boolean) {
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

  toggleNode(key: string, node: Object, toggleValue: boolean) {
    // 如果该节点处于 disabledChecbox，则忽略该值
    if (!node.uncheckable) {
      this.nodes[node.refKey][key] = toggleValue;
    }
  }

  toggleExpand(node: Object, isExpand: boolean) {
    this.nodes[node.refKey].expand = isExpand;
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  /**
   * 选择某个节点后的回调函数
   * @param {object} activeNodeData   节点的数据
   * @param {number} layer            节点的层级
   */
  handleSelect = (activeNode: Object, layer: number) => {
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

    onChange && onChange(selectedValues);
    onSelect && onSelect(activeNode, layer, selectedValues);
  };

  /**
   * 展开、收起节点
   */
  handleToggle = (nodeData: Object, layer: number) => {
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

  /**
   * 处理键盘方向键移动
   */
  handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    onMenuKeyDown(event, {
      down: this.focusNextItem,
      up: this.focusPreviousItem,
      enter: this.selectActiveItem,
      del: this.handleClean
    });
  };

  handleToggleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    const { classPrefix } = this.props;
    const { activeNode, active } = this.state;

    // enter
    if ((!activeNode || !active) && event.keyCode === 13) {
      this.toggleDropdown();
    }

    // delete
    if (event.keyCode === 8) {
      this.handleClean();
    }

    if (!this.treeView) {
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

  handleSearch = (value: string, event: DefaultEvent) => {
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

  /**
   * 清除已选择的项
   */
  handleClean = () => {
    const { onChange } = this.props;
    this.setState({
      selectedValues: [],
      hasValue: false,
      activeNode: {}
    });
    this.unserializeLists({
      check: []
    });

    onChange && onChange([]);
  };

  handleOnOpen = () => {
    const { activeNode } = this.state;
    const { onOpen } = this.props;
    if (activeNode) {
      const node = this.getElementByDataKey(activeNode.refKey);
      if (node !== null) {
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
      placement,
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
    const classes = classNames(
      menuClassName,
      this.addPrefix('checktree-menu'),
      this.addPrefix(`placement-${_.kebabCase(placement)}`)
    );
    const menu = this.renderCheckTree();
    const styles = virtualized ? { height, ...menuStyle } : menuStyle;
    return (
      <MenuWrapper
        autoWidth={menuAutoWidth}
        className={classes}
        style={styles}
        ref={this.bindMenuRef}
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

  renderNode(node: Object, index: number, layer: number, classPrefix: string) {
    const { activeNode, expandAll } = this.state;
    const { valueKey, labelKey, childrenKey, renderTreeNode, renderTreeIcon, cascade } = this.props;
    const { visible, refKey } = node;

    if (!visible) {
      return null;
    }

    const key = _.isString(node[valueKey]) || _.isNumber(node[valueKey]) ? node[valueKey] : refKey;

    const children = node[childrenKey];
    const hasNotEmptyChildren = children && Array.isArray(children) && children.length > 0;

    const props = {
      value: node[valueKey],
      label: node[labelKey],
      index,
      layer,
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

      const viewChildrenClass = classNames(`${classPrefix}-children`, {
        [this.addPrefix('all-uncheckable')]: getEveryChildUncheckable(node, this.nodes)
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
          <div className={viewChildrenClass}>
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

  renderVirtualNode(node: Object, options: Object) {
    const { activeNode, expandAll } = this.state;
    const { valueKey, labelKey, childrenKey, renderTreeNode, renderTreeIcon, cascade } = this.props;
    const { key, style, classPrefix } = options;
    const { layer, refKey, expand, showNode } = node;

    if (!node.visible) {
      return null;
    }

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
      formattedNodes = this.getFlattenTreeData(filterData).filter(n => n.showNode);
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
        ref={this.bindTreeViewRef}
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
                  ref={this.bindListRef}
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
      renderValue,
      ...rest
    } = this.props;
    const { hasValue, selectedValues } = this.state;
    const classes = getToggleWrapperClassName('checktree', this.addPrefix, this.props, hasValue);
    const selectedItems = this.getSelectedItems(selectedValues);
    let selectedElement = placeholder;

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
        innerRef={this.bindTriggerRef}
        positionRef={this.bindPositionRef}
        onEntered={createChainedFunction(this.handleOnOpen, onEntered)}
        onExit={createChainedFunction(this.handleOnClose, onExited)}
        speaker={this.renderDropdownMenu()}
      >
        <div className={classes} style={style} ref={this.bindContainerRef}>
          <PickerToggle
            {...unhandled}
            ref={this.bindToggleRef}
            onKeyDown={this.handleToggleKeyDown}
            onClean={this.handleClean}
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
const enhance = defaultProps({
  classPrefix: 'picker'
});
export default enhance(CheckTree);
