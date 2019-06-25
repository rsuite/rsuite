

import * as React from 'react';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { toggleClass, hasClass } from 'dom-lib';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/commonjs/CellMeasurer';
import { polyfill } from 'react-lifecycles-compat';
import _ from 'lodash';
import { shallowEqual } from 'rsuite-utils/lib/utils';
import IntlProvider from '../IntlProvider';
import FormattedMessage from '../IntlProvider/FormattedMessage';
import TreeNode from './TreeNode';
import { defaultProps, prefix, getUnhandledProps, createChainedFunction } from '../utils';
import {
  flattenTree,
  shouldDisplay,
  getNodeParents,
  shouldShowNodeByExpanded,
  getVirtualLisHeight
} from '../utils/treeUtils';

import {
  PickerToggle,
  getToggleWrapperClassName,
  onMenuKeyDown,
  MenuWrapper,
  SearchBar,
  PickerToggleTrigger,
  createConcatChildrenFunction
} from '../Picker';

const defaultHeight = 360;
const defaultWidth = 200;

type DefaultEvent = SyntheticEvent<*>;
type Placement =
  | 'bottomStart'
  | 'bottomEnd'
  | 'topStart'
  | 'topEnd'
  | 'leftStart'
  | 'rightStart'
  | 'leftEnd'
  | 'rightEnd'
  | 'auto'
  | 'autoVerticalStart'
  | 'autoVerticalEnd'
  | 'autoHorizontalStart'
  | 'autoHorizontalEnd';

type Props = {
  data: any[],
  open?: boolean,
  style?: Object,
  block?: boolean,
  value?: any,
  height?: number,
  inline: boolean,
  locale: Object,
  labelKey: string,
  valueKey: string,
  container?: HTMLElement | (() => HTMLElement),
  disabled?: boolean,
  className?: string,
  expandAll?: boolean,
  cleanable?: boolean,
  placement?: Placement,
  appearance: 'default' | 'subtle',
  virtualized: boolean,
  searchable?: boolean,
  classPrefix: string,
  childrenKey?: string,
  placeholder?: React.Node,
  /**
   * Prevent floating element overflow
   */
  preventOverflow?: boolean,
  defaultOpen?: boolean,
  defaultValue?: any,
  menuStyle?: Object,
  menuClassName?: string,
  menuAutoWidth?: boolean,
  searchKeyword?: string,
  defaultExpandAll?: boolean,
  containerPadding?: number,
  disabledItemValues?: any[],
  toggleComponentClass?: React.ElementType,
  onOpen?: () => void,
  onExit?: () => void,
  onEnter?: () => void,
  onClose?: () => void,
  onHide?: () => void,
  onSearch?: (searchKeyword: string, event: DefaultEvent) => void,
  onClean?: (event: DefaultEvent) => void,
  onChange?: (value: any) => void,
  onExpand?: (
    activeNode: any,
    labyer: number,
    concat: (data: any[], children: any[]) => any[]
  ) => void,
  onSelect?: (activeNode: any, layer: number, event: DefaultEvent) => void,
  onExited?: () => void,
  onEntered?: () => void,
  onExiting?: () => void,
  onEntering?: () => void,
  renderMenu?: (menu: React.Node) => React.Node,
  renderValue?: (value: any, item: ?Object, selectedElement: ?React.Node) => React.Node,
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

type States = {
  data: any[],
  value: any,
  active?: boolean,
  expandAll?: boolean,
  filterData: any[],
  activeNode?: ?Object,
  selectedValue: any,
  searchKeyword?: string,
  expandItemValues: any[]
};

class Tree extends React.Component<Props, States> {
  static defaultProps = {
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

  constructor(props: Props) {
    super(props);
    const { value, data, valueKey } = props;
    this.isControlled = !_.isUndefined(value);
    const nextData = [...data];
    const keyword = this.getSearchKeyword(props);
    this.flattenNodes(nextData);
    this.state = {
      data: data,
      value: value,
      selectedValue: this.getValue(props),
      expandAll: this.getExpandAll(props),
      filterData: this.getFilterData(nextData, keyword, props),
      activeNode: this.getActiveNode(this.getValue(props), valueKey),
      searchKeyword: keyword,
      expandItemValues: this.serializeList('expand')
    };
  }

  componentDidMount() {
    const { activeNode } = this.state;
    this.focusNode(activeNode);
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: States) {
    const { value, data, expandAll, searchKeyword } = nextProps;
    let nextState = {};
    if (_.isArray(data) && _.isArray(prevState.data) && prevState.data !== data) {
      nextState.data = data;
    }

    if (!shallowEqual(value, prevState.value)) {
      nextState.value = value;
      nextState.selectedValue = value;
    }

    if (searchKeyword !== prevState.searchKeyword) {
      nextState.searchKeyword = searchKeyword;
    }

    if (expandAll !== prevState.expandAll) {
      nextState.expandAll = expandAll;
    }

    return Object.keys(nextState).length ? nextState : null;
  }

  componentDidUpdate(prevProps: Props, prevState: States) {
    const { filterData, searchKeyword } = this.state;
    const { value, data, valueKey } = this.props;
    if (prevState.data !== data) {
      const nextData = [...data];
      this.flattenNodes(nextData);
      const filterData = this.getFilterData(nextData, searchKeyword);
      const activeNode = this.getActiveNode(this.getValue());
      this.focusNode(activeNode);
      this.setState({
        data: nextData,
        filterData,
        activeNode
      });
    }

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

    if (prevState.searchKeyword !== this.props.searchKeyword) {
      this.setState({
        filterData: this.getFilterData(filterData, this.props.searchKeyword)
      });
    }

    if (this.list) {
      this.list.forceUpdateGrid();
    }
  }

  getExpandAll(props: Props = this.props) {
    return props.expandAll !== undefined ? props.expandAll : props.defaultExpandAll;
  }

  getValue(props: Props = this.props) {
    const { value, defaultValue } = props;
    return !_.isUndefined(value) ? value : defaultValue;
  }

  getSearchKeyword(props: Props = this.props) {
    const { searchKeyword = '' } = props;
    return !_.isUndefined(searchKeyword) ? searchKeyword : '';
  }

  getActiveNode(value: any, valueKey: ?string = this.props.valueKey) {
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

  getExpandState(node: Object, props: Props = this.props) {
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

  getActiveElementOption(options: any[], value: string) {
    const { childrenKey } = this.props;
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].value === value) {
        return options[i];
      } else if (options[i][childrenKey] && options[i][childrenKey].length) {
        let active = this.getActiveElementOption(options[i][childrenKey], value);
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

    let items = [];
    const loop = (nodes: any[]) => {
      nodes.forEach((node: Object) => {
        const disabled = disabledItemValues.some(disabledItem =>
          shallowEqual(disabledItem, node[valueKey])
        );
        if (!disabled) {
          items.push(node);
          if (!this.getExpandState(node, this.props)) {
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
    let nodeData: Object = {};
    if (document.activeElement !== null) {
      const activeItem = document.activeElement;
      const { key, layer } = activeItem.dataset;
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
    const ele = findDOMNode(this.nodeRefs[dataKey]);
    if (ele instanceof Element) {
      return ele.querySelector(`.${this.addPrefix('tree-view-node-label')}`);
    }
    return null;
  };

  getFilterData(data: any[], word: string = '', props: Props = this.props) {
    const { labelKey, childrenKey } = props;

    const setVisible = (nodes = []) =>
      nodes.forEach((item: Object) => {
        item.visible = shouldDisplay(item[labelKey], word);
        if (_.isArray(item[childrenKey])) {
          setVisible(item[childrenKey]);
          item[childrenKey].forEach((child: Object) => {
            if (child.visible) {
              item.visible = child.visible;
            }
          });
        }
      });

    if (!_.isUndefined(word) || !word !== '') {
      setVisible(data);
    }
    return data;
  }

  getFlattenTreeData(nodes: any[]) {
    const { expandItemValues } = this.state;
    const { childrenKey, valueKey } = this.props;

    return flattenTree(nodes, childrenKey, (node: Object) => {
      const formatted = { ...node };
      const curNode = this.nodes[node.refKey];
      const parentKeys = getNodeParents(curNode, 'parentNode', valueKey);
      if (curNode) {
        formatted.expand = curNode.expand;
        formatted.layer = curNode.layer;
        formatted.parentNode = curNode.parentNode;
        formatted.showNode = shouldShowNodeByExpanded(expandItemValues, parentKeys);
      }
      return formatted;
    });
  }

  nodes = {};
  node = null;

  isControlled = null;

  tempNode = [];

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

  focusNode(activeNode) {
    const { inline } = this.props;
    if (activeNode && inline) {
      const node = this.getElementByDataKey(activeNode.refKey);
      if (node !== null) {
        node.focus();
      }
    }
  }
  /**
   * 将数组变为对象
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
      return [];
    }

    layer += 1;
    nodes.map((node, index) => {
      const refKey = `${ref}-${index}`;
      node.refKey = refKey;
      this.nodes[refKey] = {
        layer,
        [labelKey]: node[labelKey],
        [valueKey]: node[valueKey],
        expand: this.getExpandState(node, props),
        refKey
      };
      if (parentNode) {
        this.nodes[refKey].parentNode = parentNode;
      }
      this.flattenNodes(node[childrenKey], props, refKey, this.nodes[refKey], layer);
    });
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

  selectActiveItem = (event: DefaultEvent) => {
    const { nodeData, layer } = this.getActiveItem();
    this.handleSelect(nodeData, +layer, event);
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

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  // 展开，收起节点
  handleToggle = (nodeData: Object, layer: number) => {
    const { classPrefix = '', valueKey, onExpand, virtualized } = this.props;
    if (!virtualized) {
      const openClass = `${classPrefix}-tree-view-open`;
      toggleClass(findDOMNode(this.nodeRefs[nodeData.refKey]), openClass);
      nodeData.expand = hasClass(findDOMNode(this.nodeRefs[nodeData.refKey]), openClass);
      this.nodes[nodeData.refKey].expand = nodeData.expand;
    } else {
      this.nodes[nodeData.refKey].expand = !nodeData.expand;
    }

    this.setState({
      expandItemValues: this.serializeList('expand')
    });
    onExpand &&
      onExpand(nodeData, layer, createConcatChildrenFunction(nodeData, nodeData[valueKey]));
  };

  handleSelect = (nodeData: Object, layer: number, event: DefaultEvent) => {
    const { valueKey, onChange, onSelect } = this.props;
    this.node = nodeData;
    if (!this.isControlled) {
      this.setState({
        activeNode: nodeData,
        selectedValue: nodeData[valueKey]
      });
    }

    onChange && onChange(nodeData[valueKey]);
    onSelect && onSelect(nodeData, layer, event);
    this.closeDropdown();
    if (this.toggle) {
      this.toggle.onFocus();
    }
  };

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
        searchKeyword: value,
        filterData: this.getFilterData(filterData, value)
      });
    }
    onSearch && onSearch(value, event);
  };

  handleClean = () => {
    const { onChange } = this.props;
    this.setState({
      activeNode: null,
      selectedValue: null
    });

    this.node = null;

    onChange && onChange(null);
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
    const { searchKeyword, onClose } = this.props;
    if (_.isUndefined(searchKeyword)) {
      this.setState({
        searchKeyword: '',
        filterData: this.getFilterData(filterData, '')
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
        {renderMenu ? renderMenu(this.renderTree()) : this.renderTree()}
        {renderExtraFooter && renderExtraFooter()}
      </MenuWrapper>
    );
  }

  renderNode(node: Object, index: number, layer: number, classPrefix: string) {
    if (!node.visible) {
      return null;
    }

    const { expandAll, selectedValue } = this.state;
    const {
      disabledItemValues = [],
      valueKey,
      labelKey,
      childrenKey,
      renderTreeNode,
      renderTreeIcon
    } = this.props;

    const refKey = node.refKey;
    const key = _.isString(node[valueKey]) || _.isNumber(node[valueKey]) ? node[valueKey] : refKey;
    const { hasChildren } = node;
    const children = node[childrenKey];
    const hasNotEmptyChildren =
      hasChildren !== undefined
        ? hasChildren
        : children && Array.isArray(children) && children.length > 0;

    const props = {
      value: node[valueKey],
      label: node[labelKey],
      index,
      layer,
      parent,
      active: shallowEqual(node[valueKey], selectedValue),
      visible: node.visible,
      children,
      nodeData: node,
      disabled:
        disabledItemValues.filter(disabledItem => shallowEqual(disabledItem, node[valueKey]))
          .length > 0,
      hasChildren: !!children,
      onSelect: this.handleSelect,
      onTreeToggle: this.handleToggle,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };

    if (props.hasChildren) {
      layer += 1;
      const expandControlled = 'expandAll' in this.props;
      const expandALlState = expandControlled
        ? expandAll
        : expandAll || this.nodes[node.refKey].expand;
      // 是否展开树节点且子节点不为空
      const openClass = `${classPrefix}-open`;
      let childrenClass = classNames(`${classPrefix}-node-children`, {
        [openClass]: expandALlState && hasNotEmptyChildren
      });

      let nodes = children || [];
      return (
        <div className={childrenClass} key={key} ref={this.bindNodeRefs.bind(this, refKey)}>
          <TreeNode
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
      <TreeNode
        classPrefix={classPrefix}
        key={key}
        ref={this.bindNodeRefs.bind(this, refKey)}
        {...props}
      />
    );
  }

  renderVirtualNode(node: Object, options: Object) {
    const { selectedValue } = this.state;
    const {
      disabledItemValues = [],
      valueKey,
      labelKey,
      childrenKey,
      renderTreeNode,
      renderTreeIcon
    } = this.props;

    const { key, style, classPrefix } = options;
    const { layer, refKey, expand, showNode } = node;
    if (!node.visible) {
      return null;
    }
    const children = node[childrenKey];

    const props = {
      style,
      value: node[valueKey],
      label: node[labelKey],
      layer,
      expand,
      active: shallowEqual(node[valueKey], selectedValue),
      visible: node.visible,
      nodeData: node,
      disabled:
        disabledItemValues.filter(disabledItem => shallowEqual(disabledItem, node[valueKey]))
          .length > 0,
      children,
      hasChildren: !!children,
      onSelect: this.handleSelect,
      onTreeToggle: this.handleToggle,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };

    return (
      showNode && (
        <TreeNode
          classPrefix={classPrefix}
          key={key}
          ref={this.bindNodeRefs.bind(this, refKey)}
          {...props}
        />
      )
    );
  }

  rowRenderer = ({ node, key, style }: RowProps) => {
    const treeViewClasses = this.addPrefix('tree-view');
    const options = {
      key,
      style,
      classPrefix: treeViewClasses
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

  renderTree() {
    const { filterData } = this.state;
    const { height, className = '', inline, style, locale, virtualized } = this.props;

    // 树节点的层级
    let layer = 0;

    const treeViewClasses = this.addPrefix('tree-view');
    const classes = classNames(treeViewClasses, {
      [className]: inline
    });

    let nodes = [];
    if (!virtualized) {
      nodes = filterData.map((dataItem, index) =>
        this.renderNode(dataItem, index, layer, treeViewClasses)
      );

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
    const styles = inline ? { height: treeHeight, ...style } : {};

    const ListHeight = getVirtualLisHeight(inline, treeHeight);

    return (
      <div
        ref={this.bindTreeViewRef}
        className={classes}
        style={styles}
        onKeyDown={this.handleKeyDown}
      >
        <div className={this.addPrefix('tree-view-nodes')}>
          {virtualized ? (
            <AutoSizer defaultHeight={ListHeight} defaultWidth={defaultWidth}>
              {({ height, width }) => (
                <List
                  ref={this.bindListRef}
                  width={width || defaultWidth}
                  height={height || ListHeight}
                  rowHeight={36}
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
    );
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
      valueKey,
      labelKey,
      onEntered,
      onExited,
      onClean,
      style,
      ...rest
    } = this.props;
    const { activeNode } = this.state;
    const classes = getToggleWrapperClassName('tree', this.addPrefix, this.props, !!activeNode);

    let selectedElement = placeholder;
    const hasValue = !!activeNode;
    if (hasValue) {
      selectedElement = activeNode && activeNode[labelKey];
      if (renderValue && activeNode) {
        selectedElement = renderValue(activeNode[valueKey], activeNode, selectedElement);
      }
    }

    const unhandled = getUnhandledProps(Tree, rest);

    if (inline) {
      return this.renderTree();
    }

    return (
      <IntlProvider locale={locale}>
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
              onClean={createChainedFunction(this.handleClean, onClean)}
              cleanable={cleanable && !disabled}
              componentClass={toggleComponentClass}
              hasValue={hasValue}
              active={this.state.active}
            >
              {selectedElement || <FormattedMessage id="placeholder" />}
            </PickerToggle>
          </div>
        </PickerToggleTrigger>
      </IntlProvider>
    );
  }
}

polyfill(Tree);
const enhance = defaultProps({
  classPrefix: 'picker'
});

export default enhance(Tree);
