// @flow

import * as React from 'react';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { toggleClass, hasClass } from 'dom-lib';
import { IntlProvider, FormattedMessage } from 'rsuite-intl';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import _ from 'lodash';
import {
  reactToString,
  filterNodesOfTree,
  shallowEqual,
  shallowEqualArray
} from 'rsuite-utils/lib/utils';

import { SearchBar, MenuWrapper } from 'rsuite-utils/lib/Picker';

import TreeNode from './TreeNode';
import { clone, defaultProps, prefix, getUnhandledProps, createChainedFunction } from '../utils';
import PickerToggle from '../_picker/PickerToggle';
import getToggleWrapperClassName from '../_picker/getToggleWrapperClassName';
import onMenuKeyDown from '../_picker/onMenuKeyDown';

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
  style?: Object,
  block?: boolean,
  value?: any,
  height?: number,
  inline?: boolean,
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
  searchable?: boolean,
  classPrefix: string,
  childrenKey?: string,
  placeholder?: React.Node,
  defaultOpen?: boolean,
  defaultValue?: any,
  menuClassName?: string,
  searchKeyword?: string,
  defaultExpandAll?: boolean,
  containerPadding?: number,
  disabledItemValues?: Array<any>,
  toggleComponentClass?: React.ElementType,
  onOpen?: () => void,
  onExit?: Function,
  onEnter?: Function,
  onClose?: () => void,
  onSearch?: (searchKeyword: string, event: DefaultEvent) => void,
  onChange?: (value: any) => void,
  onExpand?: (activeNode: any, labyer: number) => void,
  onSelect?: (activeNode: any, layer: number, event: DefaultEvent) => void,
  onExited?: Function,
  onEntered?: Function,
  onExiting?: Function,
  onEntering?: Function,
  renderMenu?: (menu: string | React.Node) => React.Node,
  renderValue?: (activeNode: ?Object, placeholder: string | React.Node) => React.Node,
  renderTreeNode?: (nodeData: Object) => React.Node,
  renderTreeIcon?: (nodeData: Object) => React.Node,
  renderExtraFooter?: () => React.Node
};

type State = {
  data: Array<any>,
  value: any,
  expandAll?: boolean,
  filterData: Array<any>,
  activeNode?: ?Object,
  searchKeyword: string
};

class Tree extends React.Component<Props, State> {
  static defaultProps = {
    locale: {
      placeholder: 'Select',
      searchPlaceholder: 'Search',
      selectedValues: '{0} selected'
    },
    valueKey: 'value',
    labelKey: 'label',
    cleanable: true,
    placement: 'bottomLeft',
    searchable: true,
    appearance: 'default',
    childrenKey: 'children',
    searchKeyword: ''
  };

  constructor(props: Props) {
    super(props);
    this.isControlled = 'value' in props;
    const expandAll = props.expandAll !== undefined ? props.expandAll : props.defaultExpandAll;
    this.state = {
      data: props.data,
      value: this.getValue(props),
      expandAll,
      filterData: [],
      activeNode: null,
      searchKeyword: props.searchKeyword || ''
    };
  }

  componentWillMount() {
    const { data, valueKey } = this.props;
    const nextData = clone(data);
    this.flattenNodes(nextData);
    const filterData = this.getFilterData(nextData);
    this.setState({
      data: nextData,
      filterData,
      activeNode: this.getActiveNode(this.getValue(), valueKey)
    });
  }

  componentDidMount() {
    const { inline } = this.props;
    const { activeNode } = this.state;
    if (activeNode && inline) {
      const node = this.getElementByDataKey(activeNode.refKey);
      if (node !== null) {
        node.focus();
      }
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { value, data, expandAll, valueKey, searchKeyword } = nextProps;

    if (!shallowEqualArray(this.props.data, data)) {
      const nextData = clone(data);
      this.flattenNodes(nextData);
      const filterData = this.getFilterData(nextData);
      this.setState({
        data: nextData,
        filterData,
        activeNode: this.getActiveNode(this.getValue())
      });
    }

    if (!shallowEqual(this.props.value, value)) {
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
      this.setState(nextState);
    }

    if (searchKeyword !== this.props.searchKeyword) {
      this.setState({
        searchKeyword,
        filterData: this.getFilterData(this.state.data, searchKeyword)
      });
    }

    if (expandAll !== this.props.expandAll) {
      this.setState({
        expandAll
      });
    }
  }

  getValue(props: Props = this.props) {
    const { value, defaultValue } = props;
    return !_.isUndefined(value) ? value : defaultValue;
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

  getExpandState(node: Object) {
    const { expandAll } = this.state;
    const { childrenKey } = this.props;
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

  getActiveElementOption(options: Array<any>, value: string) {
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].value === value) {
        return options[i];
      } else if (options[i].children && options[i].children.length) {
        let active = this.getActiveElementOption(options[i].children, value);
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
    const loop = (nodes: Array<any>) => {
      nodes.forEach((node: Object) => {
        const disabled =
          disabledItemValues.filter(disabledItem => shallowEqual(disabledItem, node[valueKey]))
            .length > 0;
        if (!disabled) {
          items.push(node);
          if (!node.expand) {
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
      return ele.querySelector('.rs-picker-tree-view-node-label');
    }
    return null;
  };

  getFilterData(data: Array<any>, word?: string) {
    const { labelKey } = this.props;
    if (!_.isUndefined(word) || !word !== '') {
      return filterNodesOfTree(data, item => this.shouldDisplay(item[labelKey], word));
    }
    return data;
  }

  nodes = {};
  node = null;

  isControlled = null;

  tempNode = [];

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

  /**
   * 将数组变为对象
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
      return [];
    }
    nodes.map((node, index) => {
      const refKey = `${ref}-${index}`;
      node.refKey = refKey;
      node.expand = this.getExpandState(node);
      this.nodes[refKey] = {
        [labelKey]: node[labelKey],
        [valueKey]: node[valueKey],
        expand: node.expand,
        refKey
      };
      if (parentNode) {
        this.nodes[refKey].parentNode = parentNode;
      }
      this.flattenNodes(node[childrenKey], props, refKey, this.nodes[refKey]);
    });
  }

  selectActiveItem = (event: DefaultEvent) => {
    const { nodeData, layer } = this.getActiveItem();
    this.handleNodeSelect(nodeData, +layer, event);
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
  }

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
  }

  closeDropdown = () => {
    if (this.trigger) {
      this.trigger.hide();
    }
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  shouldDisplay = (label: any, searchKeyword?: string = this.state.searchKeyword) => {
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

  // 展开，收起节点
  handleTreeToggle = (nodeData: Object, layer: number) => {
    const { classPrefix = '', onExpand } = this.props;
    const openClass = `${classPrefix}-tree-view-open`;
    toggleClass(findDOMNode(this.nodeRefs[nodeData.refKey]), openClass);
    nodeData.expand = hasClass(findDOMNode(this.nodeRefs[nodeData.refKey]), openClass);
    this.nodes[nodeData.refKey].expand = nodeData.expand;
    onExpand && onExpand(nodeData, layer);
  };

  handleNodeSelect = (nodeData: Object, layer: number, event: DefaultEvent) => {
    const { valueKey, onChange, onSelect } = this.props;
    this.node = nodeData;
    if (!this.isControlled) {
      this.setState({
        activeNode: nodeData,
        value: nodeData[valueKey]
      });
    }

    onChange && onChange(nodeData[valueKey]);
    onSelect && onSelect(nodeData, layer, event);
    this.closeDropdown();
  };

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
          down: this.focusNextItem,
        });
      }
    }
  };

  handleSearch = (value: string, event: DefaultEvent) => {
    const { onSearch, data } = this.props;
    this.setState({
      searchKeyword: value,
      filterData: this.getFilterData(data, value)
    });

    onSearch && onSearch(value, event);
  };

  handleClean = () => {
    const { onChange } = this.props;
    this.setState({
      activeNode: null,
      value: null
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
  };

  handleOnClose = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };

  renderDropdownMenu() {
    const { searchable, placement, renderExtraFooter, locale, renderMenu } = this.props;

    const classes = classNames(
      this.addPrefix('tree-menu'),
      this.addPrefix(`placement-${_.kebabCase(placement)}`)
    );

    return (
      <MenuWrapper className={classes}>
        {searchable ? (
          <SearchBar
            placeholder={locale.searchPlaceholder}
            key="searchBar"
            onChange={this.handleSearch}
            value={this.state.searchKeyword}
          />
        ) : null}
        {renderMenu ? renderMenu(this.renderTree()) : this.renderTree()}
        {renderExtraFooter && renderExtraFooter()}
      </MenuWrapper>
    );
  }

  renderNode(node: Object, index: number, layer: number, classPrefix: string) {
    const { expandAll, value } = this.state;
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
      active: shallowEqual(node[valueKey], value),
      children,
      nodeData: node,
      disabled:
        disabledItemValues.filter(disabledItem => shallowEqual(disabledItem, node[valueKey]))
          .length > 0,
      hasChildren: !!children,
      onSelect: this.handleNodeSelect,
      onTreeToggle: this.handleTreeToggle,
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

  renderTree() {
    // 树节点的层级
    let layer = 0;
    const { filterData } = this.state;
    const { menuClassName, height } = this.props;
    const treeViewClass = classNames(this.addPrefix('tree-view'));
    const classes = classNames(treeViewClass, menuClassName);
    const nodes = filterData.map((dataItem, index) => {
      return this.renderNode(dataItem, index, layer, treeViewClass);
    });
    const styles = {
      height
    };
    const treeNodesClass = `${treeViewClass}-nodes`;
    return (
      <div
        ref={this.bindTreeViewRef}
        className={classes}
        style={styles}
        onKeyDown={this.handleKeyDown}
      >
        <div className={treeNodesClass}>{nodes}</div>
      </div>
    );
  }

  render() {
    const {
      inline,
      locale,
      open,
      defaultOpen,
      disabled,
      className,
      toggleComponentClass,
      placement,
      classPrefix,
      placeholder,
      cleanable,
      renderValue,
      valueKey,
      labelKey,
      appearance,
      onOpen,
      onClose,
      container,
      containerPadding,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      block,
      style,
      ...rest
    } = this.props;
    const { activeNode } = this.state;
    const classes = getToggleWrapperClassName('tree', this.addPrefix, this.props, !!activeNode);

    let placeholderText = null;
    const hasValue = activeNode !== null;
    if (hasValue) {
      placeholderText = activeNode && activeNode[labelKey];
    } else if (placeholder) {
      placeholderText = placeholder;
    }

    if (renderValue && hasValue) {
      placeholderText = renderValue(activeNode, placeholderText);
    }

    const unhandled = getUnhandledProps(Tree, rest);
    return !inline ? (
      <IntlProvider locale={locale}>
        <div
          className={classes}
          style={style}
          onKeyDown={this.handleToggleKeyDown}
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
            container={container}
            containerPadding={containerPadding}
            speaker={this.renderDropdownMenu()}
          >
            <PickerToggle
              {...unhandled}
              onClean={this.handleClean}
              cleanable={cleanable && !disabled}
              componentClass={toggleComponentClass}
              hasValue={hasValue}
            >
              {placeholderText || <FormattedMessage id="placeholder" />}
            </PickerToggle>
          </OverlayTrigger>
        </div>
      </IntlProvider>
    ) : (
      this.renderTree()
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'picker'
});

export default enhance(Tree);
