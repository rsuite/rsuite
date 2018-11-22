// @flow

import * as React from 'react';
import classNames from 'classnames';
import { toggleClass, hasClass } from 'dom-lib';
import { findDOMNode } from 'react-dom';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import _ from 'lodash';
import { polyfill } from 'react-lifecycles-compat';
import {
  reactToString,
  shallowEqual,
  shallowEqualArray,
  tplTransform
} from 'rsuite-utils/lib/utils';

import CheckTreeNode from './CheckTreeNode';
import { CHECK_STATE } from '../utils/constants';
import { clone, defaultProps, prefix, getUnhandledProps, createChainedFunction } from '../utils';
import PickerToggle from '../_picker/PickerToggle';
import getToggleWrapperClassName from '../_picker/getToggleWrapperClassName';
import onMenuKeyDown from '../_picker/onMenuKeyDown';
import MenuWrapper from '../_picker/MenuWrapper';
import SearchBar from '../_picker/SearchBar';
import SelectedElement from '../_picker/SelectedElement';

type DefaultEvent = SyntheticEvent<*>;
type Placement =
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

type Props = {
  data: Array<any>,
  open?: boolean,
  block?: boolean,
  style?: Object,
  value?: Array<any>,
  height?: number,
  inline?: boolean,
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
  menuStyle?: Object,
  searchable?: boolean,
  appearance: 'default' | 'subtle',
  classPrefix: string,
  defaultOpen?: boolean,
  childrenKey?: string,
  placeholder?: React.Node,
  defaultValue?: Array<any>,
  searchKeyword?: string,
  menuClassName?: string,
  defaultExpandAll?: boolean,
  containerPadding?: number,
  disabledItemValues?: Array<any>,
  uncheckableItemValues?: Array<any>,
  toggleComponentClass?: React.ElementType,
  // 禁用 checkbox 数组
  onOpen?: () => void,
  onExit?: Function,
  onEnter?: Function,
  onClose?: () => void,
  onHide?: () => void,
  onSearch?: (searchKeyword: string, event: DefaultEvent) => void,
  onChange?: (values: any) => void,
  onExpand?: (activeNode: any, labyer: number) => void,
  onSelect?: (activeNode: any, layer: number, values: any) => void,
  onScroll?: (event: DefaultEvent) => void,
  onExited?: Function,
  onEntered?: Function,
  onExiting?: Function,
  onEntering?: Function,
  renderMenu?: (menu: string | React.Node) => React.Node,
  renderValue?: (
    values: Array<any>,
    checkItems: Array<any>,
    placeholder: string | React.Node
  ) => React.Node,
  renderTreeNode?: (nodeData: Object) => React.Node,
  renderTreeIcon?: (nodeData: Object) => React.Node,
  renderExtraFooter?: () => React.Node
};

type States = {
  data: Array<any>,
  value?: Array<any>,
  cascade: boolean,
  hasValue: boolean,
  expandAll?: boolean,
  filterData: Array<any>,
  activeNode?: ?Object,
  searchWord?: string,
  searchKeyword?: string,
  formattedNodes: Array<any>,
  selectedValues: Array<any>,
  uncheckableItemValues: Array<any>,
  isSomeNodeHasChildren: boolean
};

class CheckTree extends React.Component<Props, States> {
  static defaultProps = {
    locale: {
      placeholder: 'Select',
      searchPlaceholder: 'Search',
      noResultsText: 'No results found',
      checkAll: 'All'
    },
    cascade: true,
    valueKey: 'value',
    labelKey: 'label',
    cleanable: true,
    countable: true,
    placement: 'bottomLeft',
    appearance: 'default',
    searchable: true,
    defaultValue: [],
    childrenKey: 'children',
    searchKeyword: '',
    uncheckableItemValues: []
  };
  constructor(props: Props) {
    super(props);
    const { value, data, searchKeyword } = props;
    this.nodes = {};
    this.isControlled = !_.isUndefined(value);

    const nextValue = this.getValue(props);
    const nextData = clone(data);
    this.flattenNodes(nextData, props);
    this.unserializeLists(
      {
        check: nextValue
      },
      props
    );

    this.state = {
      data: props.data,
      value: props.value,
      cascade: props.cascade,
      hasValue: this.hasValue(nextValue, props),
      expandAll: this.getExpandAll(props),
      filterData: this.getFilterData(searchKeyword, nextData, props),
      searchWord: props.searchKeyword,
      searchKeyword: props.searchKeyword,
      selectedValues: nextValue,
      formattedNodes: [],
      uncheckableItemValues: props.uncheckableItemValues,
      isSomeNodeHasChildren: this.isSomeNodeHasChildren(props.data)
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: States) {
    const { value, data, cascade, expandAll, searchKeyword, uncheckableItemValues } = nextProps;
    let nextState = {};
    if (_.isArray(data) && _.isArray(prevState.data) && !shallowEqualArray(prevState.data, data)) {
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

    if (prevState.searchKeyword !== searchKeyword) {
      nextState.searchWord = searchKeyword;
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
    const { filterData, searchWord, selectedValues } = this.state;
    const { value, data = [], cascade, expandAll, uncheckableItemValues } = this.props;
    if (!shallowEqualArray(prevState.data, data)) {
      const nextData = clone(data);
      this.flattenNodes(nextData);
      this.unserializeLists({
        check: this.getValue()
      });
      this.setState({
        data: nextData,
        filterData: this.getFilterData(searchWord, nextData),
        isSomeNodeHasChildren: this.isSomeNodeHasChildren(nextData),
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
        check: value
      });
      this.setState(nextState);
    }

    if (
      _.isArray(uncheckableItemValues) &&
      !shallowEqualArray(prevState.uncheckableItemValues, uncheckableItemValues)
    ) {
      this.flattenNodes(filterData);
      this.unserializeLists({
        check: selectedValues
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
          check: selectedValues
        },
        this.props
      );
      this.setState({
        cascade
      });
    }

    if (prevProps.searchKeyword !== this.props.searchKeyword) {
      this.setState({
        filterData: this.getFilterData(this.props.searchKeyword, filterData),
        searchWord: this.props.searchKeyword
      });
    }
  }

  getExpandAll(props: Props = this.props) {
    return props.expandAll !== undefined ? props.expandAll : props.defaultExpandAll;
  }

  getValue = (props: Props = this.props) => {
    const { value, defaultValue } = props;
    if (value && value.length) {
      return value;
    }
    if (defaultValue && defaultValue.length > 0) {
      return defaultValue;
    }
    return [];
  };

  getNodeCheckState(node: Object, cascade: boolean) {
    const { childrenKey } = this.props;
    if (!node[childrenKey] || !node[childrenKey].length || !cascade) {
      this.nodes[node.refKey].checkAll = false;
      return node.check ? CHECK_STATE.CHECK : CHECK_STATE.UNCHECK;
    }

    if (this.isEveryChildChecked(node)) {
      this.nodes[node.refKey].checkAll = true;
      return CHECK_STATE.CHECK;
    }

    if (this.isSomeChildChecked(node)) {
      this.nodes[node.refKey].checkAll = false;
      return CHECK_STATE.INDETERMINATE;
    }

    return CHECK_STATE.UNCHECK;
  }

  getExpandState(node: Object, props: Props = this.props) {
    const expandAll = this.getExpandAll(props);
    const { childrenKey } = props;
    if (node[childrenKey] && node[childrenKey].length) {
      if ('expand' in node) {
        return !!node.expand;
      } else if (expandAll) {
        return true;
      }
      return false;
    }
    return false;
  }

  getFilterData(searchKeyword: string = '', data: Array<any>, props?: Props = this.props) {
    const { labelKey } = props;
    const setVisible = (nodes = []) =>
      nodes.forEach((item: Object) => {
        item.visible = this.shouldDisplay(item[labelKey], searchKeyword);
        if (_.isArray(item.children)) {
          setVisible(item.children);
          item.children.forEach((child: Object) => {
            if (child.visible) {
              item.visible = child.visible;
            }
          });
        }
      });

    setVisible(data);
    return data;
  }

  getActiveElementOption(options: Array<any>, refKey: string) {
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].refKey === refKey) {
        return options[i];
      } else if (options[i].children && options[i].children.length) {
        let active = this.getActiveElementOption(options[i].children, refKey);
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

  getFormattedNodes(nodes: Array<any>) {
    return nodes.map((node: Object) => {
      const formatted = { ...node };
      const curNode = this.nodes[node.refKey];
      formatted.check = curNode.check;
      formatted.expand = curNode.expand;
      formatted.uncheckable = curNode.uncheckable;
      formatted.parentNode = curNode.parentNode;
      if (Array.isArray(node.children) && node.children.length > 0) {
        formatted.children = this.getFormattedNodes(formatted.children);
      }
      return formatted;
    });
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
    const loop = (treeNodes: Array<any>) => {
      treeNodes.forEach((node: Object) => {
        if (!this.getDisabledState(node) && !this.getUncheckableState(node) && node.visible) {
          items.push(node);
          const nodeData = { ...node, ...this.nodes[node.refKey] };
          if (!this.getExpandState(nodeData)) {
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
   * 获取每个节点的最顶层父节点的check值
   * @param {*} nodes
   * @param {*} node
   */
  getTopParentNodeCheckState(nodes: Object, node: Object) {
    if (node.parentNode) {
      return this.getTopParentNodeCheckState(nodes, node.parentNode);
    }
    return nodes[node.refKey].check;
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

  getEveryChildUncheckable(node: Object) {
    const list = [];
    Object.keys(this.nodes).forEach((refKey: string) => {
      const curNode = this.nodes[refKey];
      if (curNode.parentNode && curNode.parentNode.refKey === node.refKey) {
        list.push(curNode);
      }
    });

    return list.every(node => node.uncheckable);
  }

  /**
   * 判断传入的 value 是否存在于data 中
   * @param {*} values
   */
  hasValue(values: Array<any> = this.state.selectedValues, props: Props = this.props) {
    const { valueKey } = props;
    const selectedValues = Object.keys(this.nodes)
      .map((refKey: string) => this.nodes[refKey][valueKey])
      .filter((item: any) => values.some(v => shallowEqual(v, item)));
    return !!selectedValues.length;
  }

  /**
   * 判断第一层节点是否存在有children的节点
   * @param {*} data
   */
  isSomeNodeHasChildren = (data: Array<any>) => {
    return data.some((node: Object) => {
      return node.children;
    });
  };

  shouldDisplay = (label: any, searchKeyword: string) => {
    if (!_.trim(searchKeyword)) {
      return true;
    }
    const keyword = searchKeyword.toLocaleLowerCase();
    if (typeof label === 'string') {
      return label.toLocaleLowerCase().indexOf(keyword) >= 0;
    } else if (React.isValidElement(label)) {
      const nodes = reactToString(label);
      return (
        nodes
          .join('')
          .toLocaleLowerCase()
          .indexOf(keyword) >= 0
      );
    }
    return false;
  };

  isEveryChildChecked(node: Object) {
    const { childrenKey } = this.props;
    return node[childrenKey].every((child: Object) => {
      if (child[childrenKey] && child[childrenKey].length) {
        return this.isEveryChildChecked(child);
      }
      if (child.uncheckable) {
        return true;
      }
      return child.check;
    });
  }

  isSomeChildChecked(node: Object) {
    const { childrenKey } = this.props;
    if (!node[childrenKey]) {
      return false;
    }

    return node[childrenKey].some((child: Object) => {
      if (child.check) {
        return true;
      }
      return this.isSomeChildChecked(child);
    });
  }

  /**
   * 拍平数组，将tree 转换为一维对象
   * @param {*} nodes tree data
   * @param {*} ref 当前层级
   */
  flattenNodes(
    nodes: Array<any>,
    props?: Props = this.props,
    ref?: string = '0',
    parentNode?: Object
  ) {
    const { labelKey, valueKey, childrenKey } = props;

    if (!Array.isArray(nodes) || nodes.length === 0) {
      return;
    }
    nodes.forEach((node, index) => {
      const refKey = `${ref}-${index}`;
      node.refKey = refKey;
      this.nodes[refKey] = {
        [labelKey]: node[labelKey],
        [valueKey]: node[valueKey],
        expand: this.getExpandState(node, props),
        uncheckable: this.getUncheckableState(node),
        refKey
      };
      if (parentNode) {
        this.nodes[refKey].parentNode = parentNode;
      }
      this.flattenNodes(node[childrenKey], props, refKey, this.nodes[refKey]);
    });
  }

  /**
   * 过滤选中的values中不包含 uncheckableItemValues 的那些值
   * @param {*} values
   */
  filterSelectedValues(values: Array<any>) {
    const { uncheckableItemValues } = this.props;
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
          } else if (
            !this.getTopParentNodeCheckState(nodes, currentNode) &&
            parentNode.uncheckable
          ) {
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
    const { valueKey, cascade, uncheckableItemValues } = nextProps;
    // Reset values to false
    Object.keys(this.nodes).forEach((refKey: string) => {
      Object.keys(lists).forEach((listKey: string) => {
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
      });
    });
  }

  isControlled = null;

  nodes = {};

  activeNode = null;

  treeView = null;

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
      node.children.forEach((child: Object) => {
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
    const selectedValues = this.toggleChecked(activeNode, activeNode.check);
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
    const { classPrefix = '', onExpand } = this.props;
    const openClass = `${classPrefix}-checktree-view-open`;
    toggleClass(findDOMNode(this.nodeRefs[nodeData.refKey]), openClass);
    nodeData.expand = hasClass(findDOMNode(this.nodeRefs[nodeData.refKey]), openClass);
    this.toggleExpand(nodeData, nodeData.expand);
    onExpand && onExpand(nodeData, layer);
  };

  /**
   * 展开树节点后的回调函数
   */
  handleExpand = (activeNode: Object, layer: number) => {
    const { onExpand } = this.props;
    onExpand && onExpand(activeNode, layer);
  };

  /**
   * 处理键盘方向键移动
   */
  handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    onMenuKeyDown(event, {
      down: this.focusNextItem,
      up: this.focusPreviousItem,
      enter: this.selectActiveItem
    });
  };

  handleToggleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    const { classPrefix } = this.props;
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
    const { onSearch } = this.props;
    this.setState({
      searchWord: value,
      filterData: this.getFilterData(value, filterData)
    });

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
  };

  handleOnClose = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };

  renderDropdownMenu() {
    const {
      locale,
      searchable,
      placement,
      renderExtraFooter,
      renderMenu,
      menuStyle,
      menuClassName
    } = this.props;
    const classes = classNames(
      menuClassName,
      this.addPrefix('checktree-menu'),
      this.addPrefix(`placement-${_.kebabCase(placement)}`)
    );
    const menu = this.renderCheckTree();

    return (
      <MenuWrapper className={classes} style={menuStyle} ref={this.bindMenuRef}>
        {searchable ? (
          <SearchBar
            placeholder={locale.searchPlaceholder}
            key="searchBar"
            onChange={this.handleSearch}
            value={this.state.searchWord}
          />
        ) : null}
        {renderMenu ? renderMenu(menu) : menu}
        {renderExtraFooter && renderExtraFooter()}
      </MenuWrapper>
    );
  }

  renderNode(node: Object, index: number, layer: number, classPrefix: string) {
    if (!node.visible) {
      return null;
    }

    const { activeNode, expandAll } = this.state;
    const { valueKey, labelKey, childrenKey, renderTreeNode, renderTreeIcon, cascade } = this.props;

    const refKey = node.refKey;
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
        'all-uncheckable': this.getEveryChildUncheckable(node)
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

  renderCheckTree() {
    const { filterData, isSomeNodeHasChildren } = this.state;
    const { inline, height, className = '', onScroll, locale } = this.props;
    // 树节点的层级
    let layer = 0;
    const treeViewClass = this.addPrefix('checktree-view');
    const classes = classNames(treeViewClass, {
      [className]: inline,
      'without-children': !isSomeNodeHasChildren
    });
    const formattedNodes = this.getFormattedNodes(filterData);

    const nodes = formattedNodes.map((node, index) =>
      this.renderNode(node, index, layer, treeViewClass)
    );

    if (!nodes.some(v => v !== null)) {
      return <div className={this.addPrefix('none')}>{locale.noResultsText}</div>;
    }

    const style = inline ? this.props.style : {};
    const styles = {
      height,
      ...style
    };

    const treeNodesClass = classNames(this.addPrefix('checktree-nodes'), {
      [this.addPrefix('all-uncheckable')]: this.getEveryFisrtLevelNodeUncheckable()
    });
    return (
      <div
        ref={this.bindTreeViewRef}
        className={classes}
        style={styles}
        onScroll={onScroll}
        onKeyDown={this.handleKeyDown}
      >
        <div className={treeNodesClass}>{nodes}</div>
      </div>
    );
  }

  render() {
    const {
      open,
      block,
      cascade,
      style,
      locale,
      inline,
      disabled,
      valueKey,
      labelKey,
      cleanable,
      className,
      countable,
      placement,
      appearance,
      classPrefix,
      defaultOpen,
      placeholder,
      container,
      containerPadding,
      toggleComponentClass,
      onExit,
      onOpen,
      onClose,
      onHide,
      onEnter,
      onExited,
      onExiting,
      onEntered,
      onEntering,
      renderValue,
      ...rest
    } = this.props;
    const { hasValue, selectedValues } = this.state;
    const classes = getToggleWrapperClassName('checktree', this.addPrefix, this.props, hasValue);
    const selectedItems = this.getSelectedItems(selectedValues);
    let selectedElement = placeholder;

    if (renderValue) {
      selectedElement = renderValue(selectedValues, selectedItems, selectedElement);
    } else if (hasValue && selectedValues.length) {
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

    const unhandled = getUnhandledProps(CheckTree, rest);

    return !inline ? (
      <div
        onKeyDown={this.handleToggleKeyDown}
        className={classes}
        style={style}
        tabIndex={-1}
        role="menu"
        ref={this.bindContainerRef}
      >
        <OverlayTrigger
          ref={this.bindTriggerRef}
          open={open}
          defaultOpen={defaultOpen}
          disabled={disabled}
          trigger="click"
          placement={placement}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={createChainedFunction(this.handleOnOpen, onEntered)}
          onExit={onExit}
          onExiting={onExiting}
          onExited={createChainedFunction(this.handleOnClose, onExited)}
          onHide={onHide}
          container={container}
          containerPadding={containerPadding}
          speaker={this.renderDropdownMenu()}
        >
          <PickerToggle
            {...unhandled}
            onClean={this.handleClean}
            componentClass={toggleComponentClass}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
          >
            {selectedElement || locale.placeholder}
          </PickerToggle>
        </OverlayTrigger>
      </div>
    ) : (
      this.renderCheckTree()
    );
  }
}

polyfill(CheckTree);
const enhance = defaultProps({
  classPrefix: 'picker'
});
export default enhance(CheckTree);
