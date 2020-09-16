import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _, { pick, isFunction, omit, cloneDeep } from 'lodash';
import { List, AutoSizer } from '../Picker/VirtualizedList';
import shallowEqual from '../utils/shallowEqual';

import CheckTreeNode from './CheckTreeNode';
import { KEY_CODE } from '../constants';
import { createChainedFunction, useCustom, useClassNames, useControlled } from '../utils';

import {
  PickerToggle,
  onMenuKeyDown,
  MenuWrapper,
  SearchBar,
  SelectedElement,
  PickerToggleTrigger,
  createConcatChildrenFunction,
  usePickerClassName
} from '../Picker';

import {
  isEveryChildChecked,
  isSomeNodeHasChildren,
  isAllSiblingNodeUncheckable,
  TreeNodesType,
  isEveryFirstLevelNodeUncheckable,
  getFormattedTree,
  getDisabledState,
  getCheckTreePickerDefaultValue,
  getSelectedItems,
  getNodeCheckState,
  isNodeUncheckable,
  TreeNodeType
} from './utils';

import {
  hasVisibleChildren,
  getExpandWhenSearching,
  useTreeSearch,
  useTreeNodeRefs,
  getDefaultExpandItemValues,
  useFlattenTreeData,
  focusNextItem,
  getFocusableItems,
  focusPreviousItem,
  toggleExpand,
  getActiveItem,
  getScrollToIndex,
  useGetTreeNodeChildren
} from '../utils/treeUtils';

import { listPickerPropTypes, listPickerDefaultProps } from '../Picker/propTypes';
import { TreeBaseProps } from '../Tree/Tree';
import { FormControlPickerProps, ItemDataType } from '../@types/common';
import { PickerComponent, PickerLocaleType } from '../Picker/types';
import { pickerToggleTriggerProps } from '../Picker/PickerToggleTrigger';

// default value for virtualized
const defaultHeight = 360;

export interface CheckTreePickerLocaleType extends PickerLocaleType {
  checkAll?: string;
}
export interface CheckTreePickerProps<T = (string | number)[]>
  extends TreeBaseProps<T, ItemDataType>,
    FormControlPickerProps<T, CheckTreePickerLocaleType, ItemDataType> {
  /** Tree node cascade */
  cascade?: boolean;

  /** A picker that can be counted */
  countable?: boolean;

  /** default value */

  /** Set the option value for the check box not to be rendered */
  uncheckableItemValues?: T;

  /** Custom render selected items */
  renderValue?: (
    value: any[],
    selectedItems: any[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /** Called when scrolling */
  onScroll?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

const defaultProps: Partial<CheckTreePickerProps> = {
  ...listPickerDefaultProps,
  as: 'div',
  cascade: true,
  countable: true,
  searchable: true,
  virtualized: true,
  menuAutoWidth: true,
  defaultValue: [],
  appearance: 'default',
  uncheckableItemValues: [],
  classPrefix: 'picker',
  placement: 'bottomStart',
  locale: {
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found',
    checkAll: 'All'
  }
};

const CheckTreePicker: PickerComponent<CheckTreePickerProps> = React.forwardRef((props, ref) => {
  const {
    as: Component,
    data,
    style,
    cleanable,
    countable,
    searchBy,
    toggleAs,
    searchKeyword,
    locale: overrideLocale,
    inline,
    cascade,
    disabled,
    valueKey,
    labelKey,
    placement,
    childrenKey,
    placeholder,
    value: controlledValue,
    defaultValue,
    defaultExpandAll,
    disabledItemValues,
    expandItemValues: controlledExpandItemValues,
    defaultExpandItemValues,
    height = defaultHeight,
    menuStyle,
    searchable,
    virtualized,
    className,
    classPrefix,
    menuClassName,
    menuAutoWidth,
    uncheckableItemValues,
    renderMenu,
    getChildren,
    renderExtraFooter,
    onEntered,
    onChange,
    onClean,
    onClose,
    onExited,
    onSearch,
    onSelect,
    onOpen,
    onScroll,
    onExpand,
    renderValue,
    renderTreeIcon,
    renderTreeNode,
    ...rest
  } = props;
  const rootRef = useRef<HTMLDivElement>();
  const triggerRef = useRef<any>();
  const positionRef = useRef();
  const toggleRef = useRef<HTMLButtonElement>();
  const listRef = useRef();
  const menuRef = useRef<HTMLDivElement>();
  const treeViewRef = useRef<HTMLDivElement>();
  const { rtl, locale } = useCustom<PickerLocaleType>('Picker', overrideLocale);
  const [active, setActive] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const { prefix, merge } = useClassNames(classPrefix);
  const { prefix: checkTreePrefix, withClassPrefix: withCheckTreeClassPrefix } = useClassNames(
    'check-tree'
  );

  const [value, setValue, isControlled] = useControlled<(string | number)[]>(
    controlledValue,
    defaultValue
  );
  const {
    data: treeData,
    setData: setTreeData,
    loadingNodeValues,
    loadChildren
  } = useGetTreeNodeChildren(data, valueKey, childrenKey);

  const [expandItemValues, setExpandItemValues] = useControlled(
    controlledExpandItemValues,
    getDefaultExpandItemValues(treeData, {
      defaultExpandAll,
      valueKey,
      childrenKey,
      defaultExpandItemValues
    })
  );

  const [focusItemValue, setFocusItemValue] = useState(null);

  const {
    flattenNodes,
    forceUpdate,
    formatVirtualizedTreeData,
    serializeListOnlyParent,
    unSerializeList
  } = useFlattenTreeData({
    data: treeData,
    labelKey,
    valueKey,
    childrenKey,
    uncheckableItemValues,
    callback: nodes => {
      // after flattenData, always unSerialize check property value
      unSerializeList({
        nodes,
        key: 'check',
        value,
        cascade,
        uncheckableItemValues
      });
      forceUpdate();
    }
  });

  const {
    filteredData,
    searchKeywordState,
    setSearchKeyword,
    handleSearch,
    setFilteredData
  } = useTreeSearch({
    labelKey,
    childrenKey,
    searchKeyword,
    data: treeData,
    searchBy,
    callback: (
      searchKeyword: string,
      _filterData: TreeNodeType[],
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      onSearch?.(searchKeyword, event);
    }
  });

  const { treeNodesRefs, saveTreeNodeRef } = useTreeNodeRefs();

  const focusNode = (focusItemElement?: Element) => {
    const container = treeViewRef.current;
    if (!container) {
      return;
    }

    const activeItem: any =
      focusItemElement ?? container.querySelector(`.${checkTreePrefix('node-active')}`);
    if (!activeItem) {
      return;
    }
    activeItem?.focus?.();
  };

  useEffect(() => {
    setValue(getCheckTreePickerDefaultValue(value, uncheckableItemValues));
  }, []);

  useEffect(() => {
    setFilteredData(data, searchKeywordState);
    setTreeData(data);
  }, [data, searchKeywordState]);

  useEffect(() => {
    setFilteredData(treeData, searchKeywordState);
  }, [treeData, searchKeywordState]);

  useEffect(() => {
    if (Array.isArray(controlledExpandItemValues)) {
      setExpandItemValues(controlledExpandItemValues);
    }
  }, [controlledExpandItemValues, setExpandItemValues]);

  useEffect(() => {
    setSearchKeyword(searchKeyword);
  }, [searchKeyword, setSearchKeyword]);

  useEffect(() => {
    unSerializeList({
      nodes: flattenNodes,
      key: 'check',
      value,
      cascade,
      uncheckableItemValues
    });
    forceUpdate();
  }, [cascade, value, uncheckableItemValues, unSerializeList, flattenNodes]);

  const getTreeNodeProps = (node: any, layer: number) => {
    return {
      rtl,
      value: node[valueKey],
      label: node[labelKey],
      layer,
      focus: activeNode ? shallowEqual(activeNode[valueKey], node[valueKey]) : false,
      expand: node.expand,
      visible: node.visible,
      loading: loadingNodeValues.some(item => shallowEqual(item, node[valueKey])),
      disabled: getDisabledState(flattenNodes, node, { disabledItemValues, valueKey }),
      nodeData: node,
      checkState: getNodeCheckState({ node, cascade, nodes: flattenNodes, childrenKey }),
      uncheckable: isNodeUncheckable(node, { uncheckableItemValues, valueKey }),
      allUncheckable: isAllSiblingNodeUncheckable(
        node,
        flattenNodes,
        uncheckableItemValues,
        valueKey
      ),
      onSelect: handleSelect,
      onExpand: handleExpand,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };
  };

  const hasValidValue = () => {
    const selectedValues = Object.keys(flattenNodes)
      .map((refKey: string) => flattenNodes[refKey][valueKey])
      .filter((item: any) => value.some(v => shallowEqual(v, item)));
    return !!selectedValues.length;
  };

  const handleOpen = () => {
    focusNode();
    handleOpenDropdown();
    onOpen?.();
    setActive(true);
  };

  const handleClose = () => {
    setSearchKeyword('');
    onClose?.();
    setActive(false);
    setFocusItemValue(activeNode?.[valueKey]);
  };

  const handleCloseDropdown = () => {
    triggerRef.current?.hide?.();
  };

  const handleOpenDropdown = () => {
    triggerRef.current?.show?.();
  };

  const handleToggleDropdown = () => {
    if (active) {
      handleClose();
      return;
    }
    handleOpen();
  };

  useImperativeHandle(ref, () => ({
    root: rootRef.current,
    get menu() {
      return menuRef.current;
    },
    get toggle() {
      return toggleRef.current;
    },
    get treeView() {
      return treeViewRef.current;
    },
    open: handleOpenDropdown,
    close: handleCloseDropdown
  }));

  const handleClean = (event: React.SyntheticEvent<any>) => {
    setActiveNode(null);
    setValue([]);

    unSerializeList({
      nodes: flattenNodes,
      key: 'check',
      value: [],
      cascade,
      uncheckableItemValues
    });

    onChange?.([], event);
  };

  const handleFocusItem = (type: number) => {
    const focusableItems = getFocusableItems(filteredData, { ...props, expandItemValues });

    const selector = `.${checkTreePrefix('node-label')}`;
    const focusProps = {
      focusItemValue,
      focusableItems,
      treeNodesRefs,
      selector,
      valueKey,
      callback: nextFocusItemValue => {
        setFocusItemValue(nextFocusItemValue);
      }
    };
    if (type === KEY_CODE.DOWN) {
      focusNextItem(focusProps);
      return;
    }
    if (type === KEY_CODE.UP) {
      focusPreviousItem(focusProps);
    }
  };

  const selectActiveItem = (event: React.KeyboardEvent<any>) => {
    const activeItem = getActiveItem(focusItemValue, flattenNodes, valueKey);
    if (
      !isNodeUncheckable(activeItem, { uncheckableItemValues, valueKey }) &&
      activeItem !== null
    ) {
      handleSelect(activeItem, event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<any>) => {
    // enter
    if ((!activeNode || !active) && event.keyCode === KEY_CODE.ENTER) {
      handleToggleDropdown();
    }

    // delete
    if (event.keyCode === KEY_CODE.ESC) {
      handleClean(event);
    }

    if (!treeViewRef.current) {
      return;
    }
    if (event.target instanceof HTMLElement) {
      const className = event.target.className;

      if (
        className.includes(prefix('toggle')) ||
        className.includes(prefix('toggle-custom')) ||
        className.includes(prefix('search-bar-input'))
      ) {
        onMenuKeyDown(event, {
          down: () => handleFocusItem(KEY_CODE.DOWN)
        });
        return;
      }
    }

    onMenuKeyDown(event, {
      down: () => handleFocusItem(KEY_CODE.DOWN),
      up: () => handleFocusItem(KEY_CODE.UP),
      enter: selectActiveItem,
      del: handleClean
    });
  };

  const toggleUpChecked = (nodes: TreeNodesType, node: TreeNodeType, checked: boolean) => {
    const currentNode = nodes[node.refKey];
    if (cascade) {
      if (!checked) {
        currentNode.check = checked;
        currentNode.checkAll = checked;
      } else {
        if (isEveryChildChecked(nodes, currentNode)) {
          currentNode.check = true;
          currentNode.checkAll = true;
        } else {
          currentNode.check = false;
          currentNode.checkAll = false;
        }
      }
      if (currentNode.parent) {
        toggleUpChecked(nodes, currentNode.parent, checked);
      }
    }
  };

  const toggleDownChecked = (nodes: TreeNodesType, node: TreeNodeType, isChecked: boolean) => {
    const currentNode = nodes[node.refKey];
    currentNode.check = isChecked;

    if (!currentNode[childrenKey] || !currentNode[childrenKey].length || !cascade) {
      currentNode.checkAll = false;
    } else {
      currentNode.checkAll = isChecked;
      currentNode[childrenKey].forEach(child => {
        toggleDownChecked(nodes, child, isChecked);
      });
    }
  };

  const toggleChecked = (node: TreeNodeType, isChecked: boolean) => {
    const nodes = cloneDeep(flattenNodes);
    toggleDownChecked(nodes, node, isChecked);
    node.parent && toggleUpChecked(nodes, node.parent, isChecked);
    const values = serializeListOnlyParent(nodes, 'check');
    // filter uncheckableItemValues
    return values.filter(v => !uncheckableItemValues.includes(v));
  };

  const handleSelect = (node: TreeNodeType, event: React.SyntheticEvent<any>) => {
    const selectedValues = toggleChecked(node, !flattenNodes[node.refKey].check);
    if (!isControlled) {
      unSerializeList({
        nodes: flattenNodes,
        key: 'check',
        value: selectedValues,
        cascade,
        uncheckableItemValues
      });
      setValue(selectedValues);
      setFocusItemValue(node[valueKey]);
      setActiveNode(node);
    }

    onChange?.(selectedValues, event);
    onSelect?.(node as ItemDataType, selectedValues, event);
  };

  const handleExpand = (node: any) => {
    const nextExpandItemValues = toggleExpand({
      node: node,
      isExpand: !node.expand,
      expandItemValues,
      valueKey
    });
    setExpandItemValues(nextExpandItemValues);

    onExpand?.(
      nextExpandItemValues,
      node,
      createConcatChildrenFunction(node, node[valueKey], { valueKey, childrenKey })
    );
    if (
      isFunction(getChildren) &&
      !node.expand &&
      Array.isArray(node[childrenKey]) &&
      node[childrenKey].length === 0
    ) {
      loadChildren(node, getChildren);
    }
  };

  const renderNode = (node: TreeNodeType, layer: number) => {
    const { visible, refKey } = node;

    // when searching, all nodes should be expand
    const expand = getExpandWhenSearching(
      searchKeywordState,
      expandItemValues.includes(node[valueKey])
    );
    if (!visible) {
      return null;
    }

    const children = node[childrenKey];
    const visibleChildren =
      _.isUndefined(searchKeywordState) || searchKeywordState.length === 0
        ? !!children
        : hasVisibleChildren(node, childrenKey);
    const nodeProps = {
      ...getTreeNodeProps({ ...node, expand }, layer),
      hasChildren: visibleChildren
    };

    if (nodeProps.hasChildren) {
      layer += 1;

      const openClass = checkTreePrefix('open');
      const childrenClass = merge(checkTreePrefix('node-children'), {
        [openClass]: expand && visibleChildren
      });

      const nodes = children || [];
      return (
        <div className={childrenClass} key={node[valueKey]}>
          <CheckTreeNode {...nodeProps} innerRef={ref => saveTreeNodeRef(refKey, ref)} />
          <div className={checkTreePrefix('children')}>
            {nodes.map(child => renderNode(child, layer))}
          </div>
        </div>
      );
    }

    return (
      <CheckTreeNode
        key={node[valueKey]}
        innerRef={ref => saveTreeNodeRef(refKey, ref)}
        {...nodeProps}
      />
    );
  };

  const renderVirtualListNode = (nodes: any[]) => ({ key, index, style }) => {
    const node = nodes[index];
    const { layer, refKey, showNode } = node;
    const expand = getExpandWhenSearching(
      searchKeywordState,
      expandItemValues.includes(node[valueKey])
    );
    const nodeProps = {
      ...getTreeNodeProps({ ...node, expand }, layer),
      hasChildren: node.hasChildren
    };

    return (
      showNode && (
        <CheckTreeNode
          style={style}
          key={key}
          innerRef={ref => saveTreeNodeRef(refKey, ref)}
          {...nodeProps}
        />
      )
    );
  };

  const renderCheckTree = () => {
    // 树节点的层级
    const layer = 0;
    const classes = withCheckTreeClassPrefix({
      [className]: inline,
      'without-children': !isSomeNodeHasChildren,
      virtualized
    });

    let formattedNodes = [];

    if (!virtualized) {
      formattedNodes = getFormattedTree(filteredData, flattenNodes, props).map(node =>
        renderNode(node, layer)
      );

      if (!formattedNodes.some(v => v !== null)) {
        return <div className={prefix('none')}>{locale.noResultsText}</div>;
      }
    } else {
      formattedNodes = formatVirtualizedTreeData(
        flattenNodes,
        filteredData,
        expandItemValues
      ).filter(item => item.showNode && item.visible);
      if (!formattedNodes.length) {
        return <div className={prefix('none')}>{locale.noResultsText}</div>;
      }
    }

    const treeHeight = treeViewRef?.current?.getBoundingClientRect().height || defaultHeight;
    const listHeight = virtualized ? treeHeight : height;
    const styles = inline ? { height: listHeight, ...style } : {};

    const treeNodesClass = merge(checkTreePrefix('nodes'), {
      [checkTreePrefix('all-uncheckable')]: isEveryFirstLevelNodeUncheckable(
        flattenNodes,
        uncheckableItemValues,
        valueKey
      )
    });

    return (
      <div
        ref={treeViewRef}
        className={classes}
        style={styles}
        onScroll={onScroll}
        onKeyDown={handleKeyDown}
      >
        <div className={treeNodesClass}>
          {virtualized ? (
            <AutoSizer defaultHeight={listHeight} style={{ width: 'auto', height: 'auto' }}>
              {({ height, width }) => (
                <List
                  ref={listRef}
                  width={width}
                  height={height || listHeight}
                  rowHeight={36}
                  rowCount={formattedNodes.length}
                  rowRenderer={renderVirtualListNode(formattedNodes)}
                  scrollToIndex={getScrollToIndex(formattedNodes, activeNode?.[valueKey], valueKey)}
                />
              )}
            </AutoSizer>
          ) : (
            formattedNodes
          )}
        </div>
      </div>
    );
  };

  const renderDropdownMenu = () => {
    const classes = classNames(menuClassName, prefix('check-tree-menu'));
    const styles = virtualized ? { height, ...menuStyle } : menuStyle;

    return (
      <MenuWrapper
        autoWidth={menuAutoWidth}
        className={classes}
        style={styles}
        ref={menuRef}
        getToggleInstance={() => toggleRef.current}
        getPositionInstance={() => positionRef.current}
      >
        {searchable ? (
          <SearchBar
            placeholder={locale.searchPlaceholder}
            key="searchBar"
            onChange={handleSearch}
            value={searchKeywordState}
          />
        ) : null}
        {renderMenu ? renderMenu(renderCheckTree()) : renderCheckTree()}
        {renderExtraFooter?.()}
      </MenuWrapper>
    );
  };

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  const isValid = hasValidValue();
  const hasValue = isValid || (value.length > 0 && isFunction(renderValue));
  let selectedElement: React.ReactNode = placeholder;
  const selectedItems = getSelectedItems(flattenNodes, value, valueKey);

  if (isValid) {
    selectedElement = (
      <SelectedElement
        selectedItems={selectedItems}
        countable={countable}
        valueKey={valueKey}
        labelKey={labelKey}
        childrenKey={childrenKey}
        prefix={prefix}
        cascade={cascade}
        locale={locale}
      />
    );
    if (isFunction(renderValue)) {
      selectedElement = renderValue(value, selectedItems, selectedElement);
    }
  }

  const [classes, usedClassNameProps] = usePickerClassName({
    ...props,
    hasValue,
    name: 'check-tree'
  });

  if (inline) {
    return renderCheckTree();
  }

  return (
    <PickerToggleTrigger
      pickerProps={pick(props, pickerToggleTriggerProps)}
      ref={triggerRef}
      placement={placement}
      positionRef={positionRef}
      onEntered={createChainedFunction(handleOpen, onEntered)}
      onExited={createChainedFunction(handleClose, onExited)}
      speaker={renderDropdownMenu()}
    >
      <Component ref={rootRef} className={classes} style={style}>
        <PickerToggle
          {...omit(rest, [...pickerToggleTriggerProps, ...usedClassNameProps])}
          ref={toggleRef}
          onKeyDown={handleKeyDown}
          onClean={createChainedFunction(handleClean, onClean)}
          cleanable={cleanable && !disabled}
          as={toggleAs}
          hasValue={hasValue}
          active={active}
        >
          {selectedElement || locale.placeholder}
        </PickerToggle>
      </Component>
    </PickerToggleTrigger>
  );
});

CheckTreePicker.displayName = 'CheckTreePicker';
CheckTreePicker.defaultProps = defaultProps;
CheckTreePicker.propTypes = {
  ...listPickerPropTypes,
  height: PropTypes.number,
  appearance: PropTypes.oneOf(['default', 'subtle']),
  inline: PropTypes.bool,
  locale: PropTypes.any,
  cascade: PropTypes.bool,
  countable: PropTypes.bool,
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
  renderMenu: PropTypes.func,
  renderTreeNode: PropTypes.func,
  renderTreeIcon: PropTypes.func,
  searchBy: PropTypes.func,
  onScroll: PropTypes.func
};

export default CheckTreePicker;
