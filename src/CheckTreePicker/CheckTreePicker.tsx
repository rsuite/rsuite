import React, { useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isNil, pick, isFunction, omit, cloneDeep, isUndefined } from 'lodash';
import { List, AutoSizer, ListChildComponentProps } from '../Windowing';
import CheckTreeNode from './CheckTreeNode';
import TreeContext from '../Tree/TreeContext';
import { PickerLocale } from '../locales';
import { getKeyParentMap, getPathTowardsItem, getTreeNodeIndent } from '../utils/treeUtils';
import {
  createChainedFunction,
  useCustom,
  useClassNames,
  useControlled,
  useEventCallback,
  KEY_VALUES,
  mergeRefs
} from '../utils';

import {
  PickerToggle,
  TreeView,
  onMenuKeyDown,
  PickerPopup,
  SearchBar,
  SelectedElement,
  PickerToggleTrigger,
  PickerComponent,
  PickerToggleProps,
  createConcatChildrenFunction,
  usePickerClassName,
  useToggleKeyDownEvent,
  usePickerRef,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  listPickerPropTypes
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
  useGetTreeNodeChildren,
  focusToActiveTreeNode,
  focusTreeNode,
  leftArrowHandler,
  rightArrowHandler,
  isSearching
} from '../utils/treeUtils';

import { TreeBaseProps } from '../Tree/Tree';
import { FormControlPickerProps, ItemDataType } from '../@types/common';

export type ValueType = (string | number)[];
export interface CheckTreePickerProps<T = ValueType>
  extends TreeBaseProps<T, ItemDataType>,
    FormControlPickerProps<T, PickerLocale, ItemDataType>,
    Pick<PickerToggleProps, 'caretAs' | 'loading'> {
  /** Tree node cascade */
  cascade?: boolean;

  /** A picker that can be counted */
  countable?: boolean;

  /** Set the option value for the check box not to be rendered */
  uncheckableItemValues?: T;

  /** Custom render selected items */
  renderValue?: (
    value: any[],
    selectedItems: any[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /** Called when scrolling */
  onScroll?: (event: React.SyntheticEvent) => void;
}

const emptyArray = [];
const itemSize = () => 36;

/**
 * The `CheckTreePicker` component is used for selecting multiple options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/check-tree-picker
 */
const CheckTreePicker: PickerComponent<CheckTreePickerProps> = React.forwardRef((props, ref) => {
  const {
    as: Component = 'div',
    data = emptyArray,
    style,
    appearance = 'default',
    cleanable = true,
    countable = true,
    searchBy,
    toggleAs,
    searchKeyword,
    showIndentLine,
    locale: overrideLocale,
    cascade = true,
    disabled,
    valueKey = 'value',
    labelKey = 'label',
    placement = 'bottomStart',
    childrenKey = 'children',
    placeholder,
    value: controlledValue,
    defaultValue = emptyArray,
    defaultExpandAll = false,
    disabledItemValues = emptyArray,
    expandItemValues: controlledExpandItemValues,
    defaultExpandItemValues = emptyArray,
    height = 360,
    menuMaxHeight = 320,
    menuStyle,
    searchable = true,
    virtualized = false,
    className,
    classPrefix = 'picker',
    menuClassName,
    menuAutoWidth = true,
    uncheckableItemValues = emptyArray,
    id,
    listProps,
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
    onSelectItem,
    onOpen,
    onScroll,
    onExpand,
    renderValue,
    renderTreeIcon,
    renderTreeNode,
    ...rest
  } = props;

  const { inline } = useContext(TreeContext);
  const { trigger, root, target, overlay, list, searchInput, treeView } = usePickerRef(ref, {
    inline
  });

  const { rtl, locale } = useCustom<PickerLocale>('Picker', overrideLocale);
  const [active, setActive] = useState(false);
  const [activeNode, setActiveNode] = useState<TreeNodeType | null>(null);
  const { prefix, merge } = useClassNames(classPrefix);
  const { prefix: checkTreePrefix, withClassPrefix: withCheckTreeClassPrefix } =
    useClassNames('check-tree');

  const [value, setValue, isControlled] = useControlled(controlledValue, defaultValue);
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
      unSerializeList({ nodes, key: 'check', value, cascade, uncheckableItemValues });
      forceUpdate();
    }
  });

  const { filteredData, searchKeywordState, setSearchKeyword, handleSearch, setFilteredData } =
    useTreeSearch({
      labelKey,
      childrenKey,
      searchKeyword,
      data: treeData,
      searchBy,
      callback: (
        searchKeyword: string,
        _filterData: TreeNodeType[],
        event: React.SyntheticEvent
      ) => {
        onSearch?.(searchKeyword, event as React.KeyboardEvent<HTMLInputElement>);
      }
    });

  const { treeNodesRefs, saveTreeNodeRef } = useTreeNodeRefs();

  /**
   * get formatted nodes for render tree
   * @params render - renderNode function. only used when virtualized setting false
   */
  const getFormattedNodes = (render?: any) => {
    if (virtualized) {
      return formatVirtualizedTreeData(flattenNodes, filteredData, expandItemValues, {
        cascade,
        searchKeyword: searchKeywordState
      }).filter(item => item.visible);
    }

    return getFormattedTree(flattenNodes, filteredData, {
      childrenKey,
      cascade
    }).map(node => render?.(node, 1));
  };

  const getTreeNodeProps = (node: any, layer: number) => {
    return {
      as: Component,
      rtl,
      value: node[valueKey],
      label: node[labelKey],
      layer,
      focus: focusItemValue === node[valueKey],
      expand: node.expand,
      visible: node.visible,
      loading: loadingNodeValues.some(item => item === node[valueKey]),
      disabled: getDisabledState(flattenNodes, node, { disabledItemValues, valueKey }),
      nodeData: node,
      checkState: node.checkState,
      uncheckable: isNodeUncheckable(node, { uncheckableItemValues, valueKey }),
      allUncheckable: isAllSiblingNodeUncheckable(
        node,
        flattenNodes,
        uncheckableItemValues,
        valueKey
      ),
      onSelect: handleSelect,
      onExpand: handleExpand,
      renderTreeNode,
      renderTreeIcon
    };
  };

  const focusActiveNode = () => {
    if (list.current) {
      focusToActiveTreeNode({
        list: list.current,
        valueKey,
        selector: `.${checkTreePrefix('node-active')}`,
        activeNode,
        virtualized,
        container: treeView.current,
        formattedNodes: getFormattedNodes()
      });
    }
  };

  useEffect(() => {
    setValue(getCheckTreePickerDefaultValue(value, uncheckableItemValues));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFilteredData(data, searchKeywordState);
    setTreeData(data);
  }, [data, searchKeywordState, setFilteredData, setTreeData]);

  useEffect(() => {
    setFilteredData(treeData, searchKeywordState);
  }, [treeData, searchKeywordState, setFilteredData]);

  useEffect(() => {
    if (Array.isArray(controlledExpandItemValues)) {
      setExpandItemValues(controlledExpandItemValues);
    }
  }, [controlledExpandItemValues, setExpandItemValues]);

  useEffect(() => {
    setSearchKeyword(searchKeyword ?? '');
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
  }, [cascade, value, uncheckableItemValues, unSerializeList, flattenNodes, forceUpdate]);

  const toggleUpChecked = useEventCallback(
    (nodes: TreeNodesType, node: TreeNodeType, checked: boolean) => {
      const currentNode = node.refKey ? nodes[node.refKey] : null;
      if (cascade && currentNode) {
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
    }
  );

  const toggleDownChecked = useEventCallback(
    (nodes: TreeNodesType, node: TreeNodeType, isChecked: boolean) => {
      const currentNode = node.refKey ? nodes[node.refKey] : null;

      if (!currentNode) {
        return;
      }

      currentNode.check = isChecked;

      if (!currentNode[childrenKey] || !currentNode[childrenKey].length || !cascade) {
        currentNode.checkAll = false;
      } else {
        currentNode.checkAll = isChecked;
        currentNode[childrenKey].forEach(child => {
          toggleDownChecked(nodes, child, isChecked);
        });
      }
    }
  );

  const toggleChecked = useEventCallback((node: TreeNodeType, isChecked: boolean) => {
    const nodes = cloneDeep(flattenNodes);
    toggleDownChecked(nodes, node, isChecked);
    node.parent && toggleUpChecked(nodes, node.parent, isChecked);
    const values = serializeListOnlyParent(nodes, 'check');
    // filter uncheckableItemValues
    return values.filter(v => !uncheckableItemValues.includes(v));
  });

  // TODO-Doma
  // Replace `getKeyParentMap` with `getParentMap`
  const itemParentMap = useMemo(
    () =>
      getKeyParentMap(
        data,
        node => node[valueKey],
        node => node[childrenKey]
      ),
    [childrenKey, data, valueKey]
  );

  const handleSelect = useEventCallback((node: TreeNodeType, event: React.SyntheticEvent) => {
    const currentNode = node.refKey ? flattenNodes[node.refKey] : null;

    if (!node || !currentNode) {
      return;
    }

    const selectedValues = toggleChecked(node, !currentNode.check);

    if (!isControlled) {
      unSerializeList({
        nodes: flattenNodes,
        key: 'check',
        value: selectedValues,
        cascade,
        uncheckableItemValues
      });
      setValue(selectedValues);
    }

    setActiveNode(node);
    setFocusItemValue(node[valueKey]);

    onChange?.(selectedValues, event);
    onSelect?.(node as ItemDataType, selectedValues, event);
    onSelectItem?.(
      node,
      getPathTowardsItem(node, item => itemParentMap.get(item[valueKey]))
    );
  });

  const handleOpen = useEventCallback(() => {
    trigger.current?.open?.();
    setFocusItemValue(activeNode?.[valueKey]);
    focusActiveNode();
    onOpen?.();
    setActive(true);
  });

  const handleClose = useEventCallback(() => {
    trigger.current?.close?.();
    setSearchKeyword('');
    onClose?.();
    setFocusItemValue(null);
    setActive(false);

    /**
     * when using keyboard toggle picker, should refocus on PickerToggle Component after close picker menu
     */
    target.current?.focus();
  });

  const handleExpand = useEventCallback((node: any) => {
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
  });

  const handleClean = useEventCallback((event: React.SyntheticEvent) => {
    const target = event.target as Element;
    // exclude searchbox
    if (target.matches('input[role="searchbox"]') || disabled || !cleanable) {
      return;
    }

    setActiveNode(null);
    setFocusItemValue(null);

    if (!isControlled) {
      setValue([]);
      unSerializeList({
        nodes: flattenNodes,
        key: 'check',
        value: [],
        cascade,
        uncheckableItemValues
      });
    }

    onChange?.([], event);
  });

  const handleFocusItem = useEventCallback((key: string) => {
    const focusableItems = getFocusableItems(
      filteredData,
      {
        disabledItemValues,
        valueKey,
        childrenKey,
        expandItemValues
      },
      isSearching(searchKeywordState)
    );

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
    if (key === KEY_VALUES.DOWN) {
      focusNextItem(focusProps);
      return;
    }
    if (key === KEY_VALUES.UP) {
      focusPreviousItem(focusProps);
    }
  });

  const handleLeftArrow = useEventCallback(() => {
    if (isNil(focusItemValue)) return;
    const focusItem = getActiveItem(focusItemValue, flattenNodes, valueKey);
    leftArrowHandler({
      focusItem,
      expand: expandItemValues.includes(focusItem?.[valueKey]),
      onExpand: handleExpand,
      childrenKey,
      onFocusItem: () => {
        setFocusItemValue(focusItem?.parent?.[valueKey]);
        focusTreeNode(
          focusItem?.parent?.refKey,
          treeNodesRefs,
          `.${checkTreePrefix('node-label')}`
        );
      }
    });
  });

  const handleRightArrow = useEventCallback(() => {
    if (isNil(focusItemValue)) return;
    const focusItem = getActiveItem(focusItemValue, flattenNodes, valueKey);

    rightArrowHandler({
      focusItem,
      expand: expandItemValues.includes(focusItem?.[valueKey]),
      childrenKey,
      onExpand: handleExpand,
      onFocusItem: () => {
        handleFocusItem(KEY_VALUES.DOWN);
      }
    });
  });

  const selectActiveItem = (event: React.KeyboardEvent<any>) => {
    if (isNil(focusItemValue)) return;
    const activeItem = getActiveItem(focusItemValue, flattenNodes, valueKey);
    if (
      !isNodeUncheckable(activeItem, { uncheckableItemValues, valueKey }) &&
      activeItem !== null
    ) {
      handleSelect(activeItem, event);
    }
  };

  const onPickerKeydown = useToggleKeyDownEvent({
    toggle: !focusItemValue || !active,
    trigger,
    target,
    overlay,
    searchInput,
    active,
    onExit: handleClean,
    onClose: handleClose,
    onMenuKeyDown: event => {
      onMenuKeyDown(event, {
        down: () => handleFocusItem(KEY_VALUES.DOWN),
        up: () => handleFocusItem(KEY_VALUES.UP),
        left: rtl ? handleRightArrow : handleLeftArrow,
        right: rtl ? handleLeftArrow : handleRightArrow,
        enter: selectActiveItem,
        del: handleClean
      });
    },
    ...rest
  });

  const handleTreeKeydown = useEventCallback((event: React.KeyboardEvent<any>) => {
    if (!treeView.current) {
      return;
    }

    onMenuKeyDown(event, {
      down: () => handleFocusItem(KEY_VALUES.DOWN),
      up: () => handleFocusItem(KEY_VALUES.UP),
      left: rtl ? handleRightArrow : handleLeftArrow,
      right: rtl ? handleLeftArrow : handleRightArrow,
      enter: selectActiveItem
    });
  });

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
      isUndefined(searchKeywordState) || searchKeywordState.length === 0
        ? !!children
        : hasVisibleChildren(node, childrenKey);
    const nodeProps = {
      ...getTreeNodeProps(
        {
          ...node,
          /**
           * spread operator don't copy unenumerable properties
           * so we need to copy them manually
           */
          parent: node.parent,
          expand
        },
        layer
      ),
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
          <CheckTreeNode {...nodeProps} ref={ref => saveTreeNodeRef(ref, refKey)} />
          <div className={checkTreePrefix('group')} role="group">
            {nodes.map(child => renderNode(child, layer))}
            {showIndentLine && (
              <span
                className={checkTreePrefix('indent-line')}
                style={getTreeNodeIndent(rtl, layer - 1, true)}
              />
            )}
          </div>
        </div>
      );
    }

    return (
      <CheckTreeNode
        key={node[valueKey]}
        ref={ref => saveTreeNodeRef(ref, refKey)}
        {...nodeProps}
      />
    );
  };

  const renderVirtualListNode = ({ index, style, data }: ListChildComponentProps) => {
    const node = data[index];
    const { layer, refKey, visible } = node;
    const expand = getExpandWhenSearching(
      searchKeywordState,
      expandItemValues.includes(node[valueKey])
    );

    const nodeProps = {
      ...getTreeNodeProps(
        {
          ...node,
          /**
           * spread operator don't copy unenumerable properties
           * so we need to copy them manually
           */ parent: node.parent,
          expand
        },
        layer
      ),
      hasChildren: node.hasChildren
    };

    return (
      visible && (
        <CheckTreeNode style={style} ref={ref => saveTreeNodeRef(ref, refKey)} {...nodeProps} />
      )
    );
  };

  const renderCheckTree = () => {
    const classes = withCheckTreeClassPrefix({
      [className ?? '']: inline,
      'without-children': !isSomeNodeHasChildren(data, childrenKey),
      virtualized
    });

    const formattedNodes = getFormattedNodes(renderNode);

    if (!formattedNodes.some(v => v !== null)) {
      return <div className={prefix('none')}>{locale.noResultsText}</div>;
    }

    const treeNodesClass = merge(checkTreePrefix('root'), {
      [checkTreePrefix('all-uncheckable')]: isEveryFirstLevelNodeUncheckable(
        flattenNodes,
        uncheckableItemValues,
        valueKey
      )
    });

    return (
      <TreeView
        ref={inline ? root : treeView}
        multiselectable
        treeRootClassName={treeNodesClass}
        className={classes}
        style={inline ? { height, ...style } : {}}
        onScroll={onScroll}
        onKeyDown={inline ? handleTreeKeydown : undefined}
      >
        {virtualized ? (
          <AutoSizer
            defaultHeight={inline ? height : menuMaxHeight}
            style={{ width: 'auto', height: 'auto' }}
          >
            {({ height }) => (
              <List
                ref={list}
                height={height}
                itemSize={itemSize}
                itemCount={formattedNodes.length}
                itemData={formattedNodes}
                {...listProps}
              >
                {renderVirtualListNode}
              </List>
            )}
          </AutoSizer>
        ) : (
          formattedNodes
        )}
      </TreeView>
    );
  };

  const renderDropdownMenu = (positionProps: PositionChildProps, speakerRef) => {
    const { left, top, className } = positionProps;
    const classes = classNames(className, menuClassName, prefix('check-tree-menu'));
    const mergedMenuStyle = { ...menuStyle, left, top };

    return (
      <PickerPopup
        autoWidth={menuAutoWidth}
        className={classes}
        style={mergedMenuStyle}
        ref={mergeRefs(overlay, speakerRef)}
        onKeyDown={onPickerKeydown}
        target={trigger}
      >
        {searchable ? (
          <SearchBar
            placeholder={locale.searchPlaceholder}
            onChange={handleSearch}
            value={searchKeywordState}
            inputRef={searchInput}
          />
        ) : null}
        {renderMenu ? renderMenu(renderCheckTree()) : renderCheckTree()}
        {renderExtraFooter?.()}
      </PickerPopup>
    );
  };

  const selectedItems = useMemo(() => getSelectedItems(flattenNodes, value), [flattenNodes, value]);
  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  let hasValidValue = selectedItems.length > 0 || (value.length > 0 && isFunction(renderValue));
  let selectedElement: React.ReactNode = placeholder;

  if (hasValidValue) {
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
      if (isNil(selectedElement)) {
        hasValidValue = false;
      }
    }
  }

  const [classes, usedClassNamePropKeys] = usePickerClassName({
    ...props,
    classPrefix,
    appearance,
    countable,
    cleanable,
    disabled,
    hasValue: hasValidValue,
    name: 'check-tree'
  });

  if (inline) {
    return renderCheckTree();
  }

  return (
    <PickerToggleTrigger
      id={id}
      popupType="tree"
      multiple
      pickerProps={pick(props, pickTriggerPropKeys)}
      ref={trigger}
      placement={placement}
      onEnter={handleOpen}
      onEntered={onEntered}
      onExited={createChainedFunction(handleClose, onExited)}
      speaker={renderDropdownMenu}
    >
      <Component className={classes} style={style} ref={root}>
        <PickerToggle
          {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
          ref={target}
          appearance={appearance}
          onKeyDown={onPickerKeydown}
          onClean={createChainedFunction(handleClean, onClean)}
          cleanable={cleanable && !disabled}
          disabled={disabled}
          as={toggleAs}
          hasValue={hasValidValue}
          active={active}
          placement={placement}
          inputValue={value}
          focusItemValue={focusItemValue}
        >
          {selectedElement || locale.placeholder}
        </PickerToggle>
      </Component>
    </PickerToggleTrigger>
  );
});

CheckTreePicker.displayName = 'CheckTreePicker';
CheckTreePicker.propTypes = {
  ...listPickerPropTypes,
  height: PropTypes.number,
  appearance: PropTypes.oneOf(['default', 'subtle']),
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
