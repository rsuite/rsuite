import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/commonjs/CellMeasurer';
import { polyfill } from 'react-lifecycles-compat';

import shallowEqual from '../utils/shallowEqual';
import TreeNode from './TreeNode';
import {
  defaultProps,
  prefix,
  defaultClassPrefix,
  getUnhandledProps,
  createChainedFunction,
  mergeRefs
} from '../utils';

import {
  flattenTree,
  getExpandWhenSearching,
  getNodeParents,
  shouldShowNodeByExpanded,
  getVirtualLisHeight,
  treeDeprecatedWarning,
  hasVisibleChildren,
  compareArray,
  getExpandAll,
  getExpandItemValues,
  getExpandState,
  getDragNodeKeys,
  calDropNodePosition,
  createUpdateTreeDataFunction
} from '../utils/treeUtils';

import {
  PickerToggle,
  getToggleWrapperClassName,
  onMenuKeyDown,
  MenuWrapper,
  SearchBar,
  PickerToggleTrigger,
  createConcatChildrenFunction,
  shouldDisplay
} from '../Picker';

import { TreePickerProps } from './TreePicker.d';
import { TREE_NODE_DROP_POSITION } from '../constants';
import { listPickerPropTypes, listPickerDefaultProps } from '../Picker/propTypes';

// default value for virtualized
const defaultHeight = 360;
const defaultWidth = 200;

interface TreePickerState {
  data?: any[];
  value?: any;
  active?: boolean;
  dragging?: boolean;
  expandAll?: boolean;
  filterData?: any[];
  activeNode?: any;
  selectedValue?: any;
  searchKeyword?: string;
  expandItemValues?: any[];
  /** the key of the dragNode and its children */
  dragNodeKeys?: any[];
  dragOverNodeKey?: any;
  dropNodePosition?: TREE_NODE_DROP_POSITION;
}

class TreePicker extends React.Component<TreePickerProps, TreePickerState> {
  static propTypes = {
    ...listPickerPropTypes,
    height: PropTypes.number,
    inline: PropTypes.bool,
    draggable: PropTypes.bool,
    expandAll: PropTypes.bool,
    virtualized: PropTypes.bool,
    searchable: PropTypes.bool,
    menuAutoWidth: PropTypes.bool,
    searchKeyword: PropTypes.string,
    defaultExpandAll: PropTypes.bool,
    expandItemValues: PropTypes.array,
    defaultExpandItemValues: PropTypes.array,
    onSearch: PropTypes.func,
    onExpand: PropTypes.func,
    onSelect: PropTypes.func,
    renderMenu: PropTypes.func,
    renderTreeNode: PropTypes.func,
    renderTreeIcon: PropTypes.func,
    renderExtraFooter: PropTypes.func,
    renderDragNode: PropTypes.func,
    searchBy: PropTypes.func
  };
  static defaultProps = {
    ...listPickerDefaultProps,
    searchable: true,
    menuAutoWidth: true,
    locale: {
      placeholder: 'Select',
      searchPlaceholder: 'Search',
      noResultsText: 'No results found'
    }
  };

  menuRef: React.RefObject<any>;
  treeViewRef: React.RefObject<any>;
  positionRef: React.RefObject<any>;
  listRef: React.RefObject<any>;
  triggerRef: React.RefObject<any>;
  toggleRef: React.RefObject<any>;

  constructor(props: TreePickerProps) {
    super(props);
    const { value, data, valueKey, searchKeyword = '' } = props;
    const nextData = [...data];
    const nextExpandItemValues = getExpandItemValues(props);
    this.flattenNodes(nextData);
    this.unserializeLists('expand', nextExpandItemValues, props);
    this.state = {
      data: data,
      value: value,
      dragging: false,
      selectedValue: this.getValue(props),
      expandAll: getExpandAll(props),
      filterData: this.getFilterData(nextData, searchKeyword, props),
      activeNode: this.getActiveNode(this.getValue(props), valueKey),
      searchKeyword,
      expandItemValues: this.serializeList('expand'),
      dragNodeKeys: [],
      dragOverNodeKey: null,
      dropNodePosition: null
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

  componentDidMount() {
    const { activeNode } = this.state;
    this.focusNode(activeNode);
  }

  static getDerivedStateFromProps(nextProps: TreePickerProps, prevState: TreePickerState) {
    const { value, data, expandAll, searchKeyword, expandItemValues } = nextProps;
    const nextState: TreePickerState = {};
    if (_.isArray(data) && _.isArray(prevState.data) && prevState.data !== data) {
      nextState.data = data;
    }

    if (!shallowEqual(value, prevState.value)) {
      nextState.value = value;
      nextState.selectedValue = value;
    }

    if (compareArray(expandItemValues, prevState.expandItemValues)) {
      nextState.expandItemValues = expandItemValues;
    }

    if (!_.isUndefined(searchKeyword) && searchKeyword !== prevState.searchKeyword) {
      nextState.searchKeyword = searchKeyword;
    }

    if (expandAll !== prevState.expandAll) {
      nextState.expandAll = expandAll;
    }

    return Object.keys(nextState).length ? nextState : null;
  }

  componentDidUpdate(_prevProps: TreePickerProps, prevState: TreePickerState) {
    this.updateDataChange(prevState);
    this.updateValueChange(prevState);
    this.updateExpandItemValuesChange(prevState);
    this.updateSearchKeywordChange(prevState);

    if (this.listRef.current) {
      this.listRef.current.forceUpdateGrid();
    }
  }

  updateDataChange(prevState: TreePickerState) {
    const { searchKeyword, expandItemValues } = this.state;
    const { data } = this.props;
    if (prevState.data !== data) {
      const nextData = [...data];

      this.flattenNodes(nextData);
      const filterData = this.getFilterData(nextData, searchKeyword);
      const activeNode = this.getActiveNode(this.getValue());

      this.focusNode(activeNode);
      this.unserializeLists('expand', expandItemValues);

      let newState = {};
      if (activeNode) {
        newState = { activeNode: activeNode };
      }
      this.setState({
        ...{
          data: nextData,
          filterData,
          expandItemValues: this.serializeList('expand')
        },
        ...newState
      });
    }
  }

  updateValueChange(prevState: TreePickerState) {
    const { value, valueKey } = this.props;
    if (!shallowEqual(prevState.value, value)) {
      let activeNode = null;
      if (this.node === null) {
        activeNode = this.getActiveNode(value);
      }

      if (value !== null && this.node !== null) {
        activeNode = shallowEqual(this.node[valueKey], value)
          ? this.node
          : this.getActiveNode(value);
      }
      const nextState = {
        value,
        activeNode
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
  }

  updateExpandItemValuesChange(prevState: TreePickerState) {
    const { expandItemValues } = this.props;
    if (compareArray(expandItemValues, prevState.expandItemValues)) {
      this.unserializeLists('expand', expandItemValues);

      this.setState({
        expandItemValues
      });
    }
  }

  updateSearchKeywordChange(prevState: TreePickerState) {
    const { filterData } = this.state;
    if (
      !_.isUndefined(this.props.searchKeyword) &&
      prevState.searchKeyword !== this.props.searchKeyword
    ) {
      this.setState({
        filterData: this.getFilterData(filterData, this.props.searchKeyword)
      });
    }
  }

  getValue(props: TreePickerProps = this.props) {
    const { value, defaultValue } = props;
    return !_.isUndefined(value) ? value : defaultValue;
  }

  getActiveNode(value: any, valueKey: string = this.props.valueKey) {
    let activeNode = null;
    if (!_.isUndefined(value)) {
      Object.keys(this.nodes).forEach(refKey => {
        if (shallowEqual(this.nodes[refKey][valueKey], value)) {
          activeNode = this.nodes[refKey];
        }
      });
    }

    return activeNode;
  }

  getActiveElementOption(options: any[], value: string) {
    const { childrenKey } = this.props;
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].value === value) {
        return options[i];
      } else if (options[i][childrenKey]?.length) {
        const active = this.getActiveElementOption(options[i][childrenKey], value);
        if (!_.isEmpty(active)) {
          return active;
        }
      }
    }
    return {};
  }

  getFocusableMenuItems = () => {
    const { filterData } = this.state;
    const { childrenKey, disabledItemValues = [], valueKey } = this.props;

    const items = [];
    const loop = (nodes: any[]) => {
      nodes.forEach((node: any) => {
        const nodeData = { ...node, ...this.nodes[node.refKey] };
        const disabled = disabledItemValues.some(disabledItem =>
          shallowEqual(disabledItem, node[valueKey])
        );
        if (!disabled) {
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
    let nodeData: object = {};
    const activeItem = document.activeElement;
    if (activeItem !== null) {
      const { key, layer } = _.get(activeItem, 'dataset');
      const activeNode = this.nodes[key];
      if (activeNode) {
        nodeData = activeNode;
      }
      return {
        nodeData,
        layer
      };
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

  getFilterData(data: any[], word = '', props?: TreePickerProps) {
    const { labelKey, childrenKey, searchBy } = props || this.props;

    const setVisible = (nodes = []) =>
      nodes.forEach((item: any) => {
        item.visible = searchBy
          ? searchBy(word, item[labelKey], item)
          : shouldDisplay(item[labelKey], word);
        if (_.isArray(item[childrenKey])) {
          setVisible(item[childrenKey]);
          item[childrenKey].forEach((child: any) => {
            if (child.visible) {
              item.visible = child.visible;
            }
          });
        }
      });

    if (!_.isUndefined(word)) {
      setVisible(data);
    }
    return data;
  }

  getFlattenTreeData(nodes: any[]) {
    const { expandItemValues } = this.state;
    const { childrenKey, valueKey } = this.props;

    return flattenTree(nodes, childrenKey, (node: any) => {
      let formatted = {};
      const curNode = this.nodes[node.refKey];
      const parentKeys = getNodeParents(curNode, 'parentNode', valueKey);
      if (curNode) {
        formatted = {
          ...node,
          expand: curNode.expand,
          layer: curNode.layer,
          parentNode: curNode.parentNode,
          showNode: shouldShowNodeByExpanded(expandItemValues, parentKeys)
        };
      }
      return formatted;
    });
  }

  getTreeNodeProps(node: any, layer: number, index?: number) {
    const { dragOverNodeKey, selectedValue, dropNodePosition } = this.state;
    const dragNode = this.dragNode || {};
    const {
      locale,
      valueKey,
      labelKey,
      draggable,
      childrenKey,
      disabledItemValues = [],
      renderTreeNode,
      renderTreeIcon
    } = this.props;

    return {
      rtl: locale.rtl,
      value: node[valueKey],
      label: node[labelKey],
      index,
      layer,
      expand: node.expand,
      active: shallowEqual(node[valueKey], selectedValue),
      visible: node.visible,
      draggable,
      dragging: shallowEqual(node[valueKey], dragNode[valueKey]),
      children: node[childrenKey],
      nodeData: node,
      disabled: disabledItemValues.some(disabledItem => shallowEqual(disabledItem, node[valueKey])),
      dragOver:
        shallowEqual(node[valueKey], dragOverNodeKey) &&
        dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER,
      dragOverTop:
        shallowEqual(node[valueKey], dragOverNodeKey) &&
        dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_TOP,
      dragOverBottom:
        shallowEqual(node[valueKey], dragOverNodeKey) &&
        dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM,
      onSelect: this.handleSelect,
      onDragStart: this.handleDragStart,
      onDragEnter: this.handleDragEnter,
      onDragOver: this.handleDragOver,
      onDragLeave: this.handleDragLeave,
      onDragEnd: this.handleDragEnd,
      onDrop: this.handleDrop,
      onTreeToggle: this.handleToggle,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };
  }

  /**
   * 获取 onDrop 的回调数据
   */
  getDropData(nodeData: any) {
    const { dropNodePosition } = this.state;
    const { valueKey, childrenKey } = this.props;
    const options = { valueKey, childrenKey };
    const dragNode = _.omit(this.dragNode, 'parentNode');
    return {
      /** 拖拽节点 */
      dragNode,
      /** 释放所在节点的父节点 */
      dropNode: nodeData,
      /** 拖拽节点的类型 */
      dropNodePosition,
      createUpdateDataFunction: createUpdateTreeDataFunction(
        {
          /** 拖拽节点 */
          dragNode,
          /** 释放所在节点的父节点 */
          dropNode: nodeData,
          /** 拖拽节点的类型 */
          dropNodePosition
        },
        options
      )
    };
  }

  nodes = {};
  node = null;

  cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 20
  });

  nodeRefs = {};

  /** dragging node */
  dragNode = null;

  bindNodeRefs = (refKey: string, ref: React.Ref<any>) => {
    this.nodeRefs[refKey] = ref;
  };

  getPositionInstance = () => {
    return this.positionRef.current;
  };

  getToggleInstance = () => {
    return this.toggleRef.current;
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  addTreePrefix = (name: string) => prefix(defaultClassPrefix('tree'))(name);

  focusNode(activeNode) {
    const { inline } = this.props;
    if (activeNode && inline) {
      const node: any = this.getElementByDataKey(activeNode.refKey);
      node?.focus?.();
    }
  }

  flattenNodes(nodes: any[], props?: TreePickerProps, ref = '0', parentNode?: object, layer = 0) {
    const { labelKey, valueKey, childrenKey } = props || this.props;

    if (!Array.isArray(nodes) || nodes.length === 0) {
      return [];
    }

    nodes.map((node, index) => {
      const refKey = `${ref}-${index}`;

      node.refKey = refKey;

      this.nodes[refKey] = {
        layer,
        [labelKey]: node[labelKey],
        [valueKey]: node[valueKey],
        expand: getExpandState(node, props || this.props),
        refKey,
        ...node
      };
      if (parentNode) {
        this.nodes[refKey].parentNode = parentNode;
      }
      this.flattenNodes(node[childrenKey], props, refKey, this.nodes[refKey], layer + 1);
    });
  }

  serializeList(key: string, nodes: object = this.nodes) {
    const { valueKey } = this.props;
    const list = [];

    Object.keys(nodes).forEach((refKey: string) => {
      if (nodes[refKey][key]) {
        list.push(nodes[refKey][valueKey]);
      }
    });
    return list;
  }

  unserializeLists(key: string, value: any[] = [], props: TreePickerProps = this.props) {
    const { valueKey } = props;
    const expandAll = getExpandAll(props);
    Object.keys(this.nodes).forEach((refKey: string) => {
      this.nodes[refKey][key] = false;
      if (value.length) {
        value.forEach((value: any) => {
          if (shallowEqual(this.nodes[refKey][valueKey], value)) {
            this.nodes[refKey][key] = true;
          }
        });
      } else {
        this.nodes[refKey][key] = expandAll;
      }
    });
  }

  selectActiveItem = (event: React.SyntheticEvent<any>) => {
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

  handleToggle = (nodeData: any) => {
    const { valueKey, childrenKey, onExpand, expandItemValues } = this.props;
    const nextExpandItemValues = this.toggleExpand(nodeData, !nodeData.expand);
    if (_.isUndefined(expandItemValues)) {
      this.unserializeLists('expand', nextExpandItemValues);
      this.setState({
        expandItemValues: nextExpandItemValues
      });
    }

    onExpand?.(
      nextExpandItemValues,
      nodeData,
      createConcatChildrenFunction(nodeData, nodeData[valueKey], { valueKey, childrenKey })
    );
  };

  toggleExpand(node: any, isExpand: boolean) {
    const { valueKey } = this.props;
    const expandItemValues = new Set(this.serializeList('expand'));
    if (isExpand) {
      expandItemValues.add(node[valueKey]);
    } else {
      expandItemValues.delete(node[valueKey]);
    }
    return Array.from(expandItemValues);
  }

  handleSelect = (nodeData: any, event: React.SyntheticEvent<any>) => {
    const { valueKey, onChange, onSelect, value } = this.props;
    this.node = nodeData;
    if (_.isUndefined(value)) {
      this.setState({
        activeNode: nodeData,
        selectedValue: nodeData[valueKey]
      });
    }

    onChange?.(nodeData[valueKey], event);
    onSelect?.(nodeData, nodeData[valueKey], event);
    this.handleCloseDropdown();
    this.toggleRef.current?.onFocus();
  };

  handleKeyDown = (event: React.KeyboardEvent<any>) => {
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
        searchKeyword: value,
        filterData: this.getFilterData(filterData, value)
      });
    }
    onSearch?.(value, event);
  };

  handleClean = (event: React.SyntheticEvent<any>) => {
    this.setState({
      activeNode: null,
      selectedValue: null
    });

    this.node = null;

    this.props.onChange?.(null, event);
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
    const { searchKeyword, onClose } = this.props;
    if (_.isUndefined(searchKeyword)) {
      this.setState({
        searchKeyword: '',
        filterData: this.getFilterData(filterData, '')
      });
    }
    onClose?.();
    this.setState({
      active: false
    });
  };

  handleDragStart = (nodeData: any, event: React.DragEvent) => {
    const { valueKey, childrenKey, onDragStart, draggable } = this.props;
    if (draggable) {
      this.setState({
        dragging: true,
        dragNodeKeys: getDragNodeKeys(nodeData, childrenKey, valueKey)
      });

      this.dragNode = this.nodes[nodeData.refKey];
      onDragStart?.(nodeData, event);
    }
  };

  handleDragEnter = (nodeData: any, event: React.DragEvent) => {
    const { dragging, dragNodeKeys } = this.state;
    const { valueKey, onDragEnter } = this.props;

    if (dragNodeKeys.some(d => shallowEqual(d, nodeData[valueKey]))) {
      return;
    }

    if (dragging && this.dragNode) {
      const dropNodePosition = calDropNodePosition(event, this.nodeRefs[nodeData.refKey]);
      this.setState({
        dragOverNodeKey: nodeData[valueKey],
        dropNodePosition
      });
    }
    onDragEnter?.(nodeData, event);
  };

  handleDragOver = (nodeData: any, event: React.DragEvent) => {
    const { dragNodeKeys, dragOverNodeKey, dropNodePosition } = this.state;
    const { valueKey, onDragOver } = this.props;

    if (dragNodeKeys.some(d => shallowEqual(d, nodeData[valueKey]))) {
      return;
    }

    if (this.dragNode && shallowEqual(nodeData[valueKey], dragOverNodeKey)) {
      const lastDropNodePosition = calDropNodePosition(event, this.nodeRefs[nodeData.refKey]);
      if (lastDropNodePosition === dropNodePosition) return;
      this.setState({
        dropNodePosition: lastDropNodePosition
      });
    }

    onDragOver?.(nodeData, event);
  };

  handleDragLeave = (nodeData: any, event: React.DragEvent) => {
    const { onDragLeave } = this.props;
    onDragLeave?.(nodeData, event);
  };

  handleDragEnd = (nodeData: any, event: React.DragEvent) => {
    const { onDragEnd } = this.props;
    this.setState({
      dragging: false,
      dragNodeKeys: [],
      dragOverNodeKey: null
    });
    onDragEnd?.(nodeData, event);
  };

  handleDrop = (nodeData: any, event: React.DragEvent) => {
    const { dragNodeKeys } = this.state;
    const { valueKey, onDrop } = this.props;
    if (dragNodeKeys.some(d => shallowEqual(d, nodeData[valueKey]))) {
      console.error('Cannot drag a node to itself and its children');
    } else {
      const dropData = this.getDropData(nodeData);
      onDrop?.(dropData, event);
    }
    this.setState({
      dragging: false,
      dragNodeKeys: [],
      dragOverNodeKey: null,
      dropNodePosition: null
    });
    this.dragNode = null;
  };

  renderDropdownMenu() {
    const {
      height = defaultHeight,
      searchable,
      searchKeyword,
      renderExtraFooter,
      locale,
      renderMenu,
      menuStyle,
      virtualized,
      menuClassName,
      menuAutoWidth
    } = this.props;
    const keyword = !_.isUndefined(searchKeyword) ? searchKeyword : this.state.searchKeyword;
    const classes = classNames(menuClassName, this.addPrefix('tree-menu'));

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
        {renderMenu ? renderMenu(this.renderTree()) : this.renderTree()}
        {renderExtraFooter?.()}
      </MenuWrapper>
    );
  }

  renderNode(node: any, index: number, layer: number) {
    const { searchKeyword } = this.state;
    const { valueKey, childrenKey } = this.props;

    if (!node.visible) {
      return null;
    }

    const refKey = node.refKey;
    const expand = getExpandWhenSearching(searchKeyword, this.nodes[refKey].expand);
    const key = _.isString(node[valueKey]) || _.isNumber(node[valueKey]) ? node[valueKey] : refKey;
    const children = node[childrenKey];
    // 当用户进行搜索时，hasChildren的判断要变成判断是否存在 visible 为 true 的子节点
    const visibleChildren =
      _.isUndefined(searchKeyword) || searchKeyword.length === 0
        ? !!children
        : hasVisibleChildren(node, childrenKey);

    const nodeProps = {
      ...this.getTreeNodeProps({ ...node, expand }, layer, index),
      hasChildren: visibleChildren
    };

    if (nodeProps.hasChildren) {
      layer += 1;
      // 是否展开树节点且子节点不为空
      const openClass = this.addTreePrefix('open');
      const childrenClass = classNames(this.addTreePrefix('node-children'), {
        [openClass]: expand && visibleChildren
      });

      const nodes = children || [];
      return (
        <div className={childrenClass} key={key}>
          <TreeNode {...nodeProps} innerRef={this.bindNodeRefs.bind(this, refKey)} />
          <div className={this.addTreePrefix('children')}>
            {nodes.map((child, i) => this.renderNode(child, i, layer))}
          </div>
        </div>
      );
    }

    return <TreeNode key={key} innerRef={this.bindNodeRefs.bind(this, refKey)} {...nodeProps} />;
  }

  renderVirtualNode(node: any, options: any) {
    const { searchKeyword } = this.state;
    const { childrenKey } = this.props;
    const { key, style } = options;
    const { layer, refKey, showNode } = node;

    const expand = getExpandWhenSearching(searchKeyword, this.nodes[refKey].expand);
    if (!node.visible) {
      return null;
    }

    const nodeProps = {
      ...this.getTreeNodeProps({ ...node, expand }, layer),
      style,
      hasChildren: !!node[childrenKey]
    };

    return (
      showNode && (
        <TreeNode key={key} innerRef={this.bindNodeRefs.bind(this, refKey)} {...nodeProps} />
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

  renderTree() {
    const { filterData } = this.state;
    const { height, className, inline, style, locale, virtualized, searchable } = this.props;

    const layer = 0;

    const classes = classNames(defaultClassPrefix('tree'), {
      [className]: inline
    });

    let nodes = [];
    if (!virtualized) {
      nodes = filterData.map((dataItem, index) => this.renderNode(dataItem, index, layer));

      if (!nodes.some(v => v !== null)) {
        return <div className={this.addPrefix('none')}>{locale.noResultsText}</div>;
      }
    } else {
      nodes = this.getFlattenTreeData(filterData).filter(n => n.showNode && n.visible);
      if (!nodes.length) {
        return <div className={this.addPrefix('none')}>{locale.noResultsText}</div>;
      }
    }

    // 当未定义 height 且 设置了 virtualized 为 true，treeHeight 设置默认高度
    const treeHeight = _.isUndefined(height) && virtualized ? defaultHeight : height;
    const treeWidth = _.isUndefined(style?.width) ? defaultWidth : style.width;
    const styles = inline ? { height: treeHeight, ...style } : {};

    const listHeight = getVirtualLisHeight(inline, searchable, treeHeight);

    return (
      <React.Fragment>
        <div
          ref={this.treeViewRef}
          className={classes}
          style={styles}
          onKeyDown={this.handleKeyDown}
        >
          <div className={this.addTreePrefix('nodes')}>
            {virtualized ? (
              <AutoSizer defaultHeight={listHeight} defaultWidth={treeWidth}>
                {({ height, width }) => (
                  <List
                    ref={this.listRef}
                    width={width || treeWidth}
                    height={height || listHeight}
                    rowHeight={38}
                    rowCount={nodes.length}
                    rowRenderer={this.measureRowRenderer(nodes)}
                  />
                )}
              </AutoSizer>
            ) : (
              nodes
            )}
          </div>
        </div>
        {this.renderDragNode()}
      </React.Fragment>
    );
  }

  renderDragNode() {
    const { labelKey, draggable, renderDragNode } = this.props;
    const dragNode = this.dragNode || {};
    if (draggable) {
      let dragNodeContent = dragNode[labelKey];
      if (_.isFunction(renderDragNode)) {
        dragNodeContent = renderDragNode(dragNode);
      }
      return (
        <span id="drag-node" className={this.addTreePrefix('drag-node-mover')}>
          {dragNodeContent}
        </span>
      );
    }
    return null;
  }

  render() {
    const {
      inline,
      locale,
      disabled,
      toggleComponentClass,
      placeholder,
      cleanable,
      renderValue,
      labelKey,
      onEntered,
      onExited,
      onClean,
      style,
      positionRef,
      ...rest
    } = this.props;
    const { selectedValue, activeNode } = this.state;
    let hasValidValue =
      !_.isNil(activeNode) || (!_.isNil(selectedValue) && _.isFunction(renderValue));

    let selectedElement: React.ReactNode = placeholder;
    const hasValue = !!activeNode;

    /**
     * if value is invalid and renderValue is undefined, then using placeholder.
     * if value is valid and renderValue is't undefined, then using renderValue()
     */
    if (!_.isNil(selectedValue)) {
      if (hasValue) {
        selectedElement = activeNode[labelKey];
      }
      if (_.isFunction(renderValue)) {
        const node = activeNode ?? {};
        selectedElement = renderValue(selectedValue, node, selectedElement);

        if (_.isNil(selectedElement)) {
          hasValidValue = false;
        }
      }
    }

    const unhandled = getUnhandledProps(TreePicker, rest);
    const classes = getToggleWrapperClassName('tree', this.addPrefix, this.props, hasValidValue);

    if (inline) {
      return this.renderTree();
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
            cleanable={cleanable && !disabled}
            componentClass={toggleComponentClass}
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

polyfill(TreePicker);

export default defaultProps<TreePickerProps>({
  classPrefix: 'picker'
})(TreePicker);
