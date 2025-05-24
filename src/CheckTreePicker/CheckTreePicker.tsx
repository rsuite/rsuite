import React, { useMemo } from 'react';
import classNames from 'classnames';
import CheckTreeView, { type CheckTreeViewProps } from '../CheckTree/CheckTreeView';
import useTreeValue from '../CheckTree/hooks/useTreeValue';
import useFlattenTree from '../Tree/hooks/useFlattenTree';
import useTreeWithChildren from '../Tree/hooks/useTreeWithChildren';
import useExpandTree from '../Tree/hooks/useExpandTree';
import useFocusState from './hooks/useFocusState';
import isNil from 'lodash/isNil';
import pick from 'lodash/pick';
import isFunction from 'lodash/isFunction';
import { PickerLocale } from '../locales';
import { useStyles, useCustom, useEventCallback } from '@/internals/hooks';
import { forwardRef, createChainedFunction, mergeRefs } from '@/internals/utils';
import {
  PickerToggle,
  onMenuKeyDown,
  PickerPopup,
  SelectedElement,
  PickerToggleTrigger,
  PickerToggleProps,
  useToggleKeyDownEvent,
  usePickerRef,
  triggerPropKeys,
  PositionChildProps
} from '@/internals/Picker';
import { getSelectedItems } from '../CheckTree/utils';
import { TreeProvider, useTreeImperativeHandle } from '@/internals/Tree/TreeProvider';
import type { TreeNode } from '@/internals/Tree/types';
import type { FormControlPickerProps, Option, DeprecatedMenuProps } from '@/internals/types';
import type { TreeExtraProps } from '../Tree/types';

export type ValueType = (string | number)[];
export interface CheckTreePickerProps<V = ValueType>
  extends Omit<CheckTreeViewProps<V>, 'value' | 'onChange' | 'data'>,
    TreeExtraProps,
    DeprecatedMenuProps,
    FormControlPickerProps<V, PickerLocale, Option>,
    Pick<PickerToggleProps, 'caretAs' | 'loading'> {
  /**
   * A picker that can be counted
   */
  countable?: boolean;

  /**
   * The height of the tree
   */
  treeHeight?: number;

  /**
   * Popup auto width
   *
   * @default true
   */
  popupAutoWidth?: boolean;

  /**
   * Custom render selected items
   */
  renderValue?: (
    value: V,
    selectedNodes: TreeNode[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /**
   * In the cascade case, the leaf node's value change callbacks
   */
  onCascadeChange?: (v: ValueType, event: React.SyntheticEvent) => void;
}

/**
 * The `CheckTreePicker` component is used for selecting multiple options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/check-tree-picker
 */
const CheckTreePicker = forwardRef<'div', CheckTreePickerProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('CheckTreePicker', props);
  const {
    as,
    id,
    appearance = 'default',
    block,
    cleanable = true,
    countable = true,
    cascade = true,
    className,
    classPrefix = 'picker',
    childrenKey = 'children',
    disabled,
    data = [],
    defaultValue = [],
    defaultExpandAll = false,
    disabledItemValues = [],
    expandItemValues: controlledExpandItemValues,
    defaultExpandItemValues = [],
    placeholder,
    popupClassName,
    popupStyle,
    popupAutoWidth = true,
    placement = 'bottomStart',
    treeHeight = 320,
    toggleAs,
    searchBy,
    searchKeyword,
    showIndentLine,
    searchable = true,
    style,
    valueKey = 'value',
    value: controlledValue,
    virtualized = false,
    uncheckableItemValues = [],
    locale,
    labelKey = 'label',
    listProps,
    getChildren,
    renderExtraFooter,
    onEnter,
    onChange,
    onClean,
    onExit,
    onSearch,
    onSelect,
    onSelectItem,
    onScroll,
    onExpand,
    renderValue,
    renderTree,
    renderTreeIcon,
    renderTreeNode,
    onCascadeChange,
    ...rest
  } = propsWithDefaults;

  const { trigger, root, target, overlay, list, searchInput, treeView } = usePickerRef(ref);
  const { prefix } = useStyles(classPrefix);

  const [value, setValue] = useTreeValue(controlledValue, {
    defaultValue,
    uncheckableItemValues
  });

  const itemDataKeys = { childrenKey, labelKey, valueKey };
  const { treeData, loadingNodeValues, appendChild } = useTreeWithChildren(data, itemDataKeys);

  const { expandItemValues, handleExpandTreeNode } = useExpandTree(data, {
    ...itemDataKeys,
    defaultExpandAll,
    defaultExpandItemValues,
    controlledExpandItemValues,
    onExpand,
    getChildren,
    appendChild
  });

  const flattenedNodes = useFlattenTree(treeData, {
    ...itemDataKeys,
    uncheckableItemValues,
    multiple: true,
    cascade,
    value
  });

  const selectedNodes = getSelectedItems(flattenedNodes, value);
  const { register, focusFirstNode } = useTreeImperativeHandle();
  const { focusItemValue, setFocusItemValue, active, triggerProps } = useFocusState({
    target,
    onEnter,
    onExit
  });

  const handleClean = useEventCallback((event: React.SyntheticEvent) => {
    const target = event.target as Element;
    // exclude searchbox
    if (target.matches('input[role="searchbox"]') || disabled || !cleanable) {
      return;
    }

    setFocusItemValue(null);
    setValue([]);
    onChange?.([], event);
    onCascadeChange?.([], event);
  });

  const handleTreeKeyDown = useEventCallback((event: React.KeyboardEvent<any>) => {
    onMenuKeyDown(event, { del: handleClean, down: () => focusFirstNode() });
  });

  const onPickerKeydown = useToggleKeyDownEvent({
    toggle: !focusItemValue || !active,
    trigger,
    target,
    overlay,
    searchInput,
    active,
    onExit: handleClean,
    onMenuKeyDown: handleTreeKeyDown,
    ...rest
  });

  // transform the parent node value to the leaf node value
  const handleTransValue2Children = useEventCallback((nextSelectedNodes: TreeNode[]) => {
    return nextSelectedNodes
      .map((node: TreeNode) => {
        const currentNode = node.refKey ? flattenedNodes[node.refKey] : null;
        if (currentNode && currentNode[childrenKey] && currentNode[childrenKey].length) {
          const childNodes = currentNode[childrenKey].filter((child: TreeNode) => {
            const childValue = child[valueKey];
            return (
              !disabledItemValues.includes(childValue) &&
              !uncheckableItemValues.includes(childValue)
            );
          });
          return handleTransValue2Children(childNodes);
        }
        return node;
      })
      .flat();
  });

  const handleChangeCascade = useEventCallback(
    (nextValue: ValueType, event: React.SyntheticEvent) => {
      if (!cascade) {
        onCascadeChange?.(nextValue, event);
      } else {
        const nextSelectedNodes = getSelectedItems(flattenedNodes, nextValue);
        const childrenNodes = handleTransValue2Children(nextSelectedNodes);
        const childrenValue = childrenNodes.map((node: TreeNode) => node[valueKey]);
        onCascadeChange?.(childrenValue, event);
      }
    }
  );

  const handleChange = useEventCallback((nextValue: ValueType, event: React.SyntheticEvent) => {
    setValue(nextValue);
    onChange?.(nextValue, event);
    handleChangeCascade(nextValue, event);
  });

  const treeContext = useMemo(
    () => ({
      register,
      props: { labelKey, valueKey, childrenKey, virtualized, renderTreeIcon, renderTreeNode }
    }),
    [childrenKey, labelKey, valueKey, virtualized, register, renderTreeIcon, renderTreeNode]
  );

  const checkTreeView = (
    <TreeProvider value={treeContext}>
      <CheckTreeView
        ref={treeView}
        disabledItemValues={disabledItemValues}
        expandItemValues={expandItemValues}
        uncheckableItemValues={uncheckableItemValues}
        cascade={cascade}
        data={treeData}
        height={treeHeight}
        showIndentLine={showIndentLine}
        listProps={listProps}
        listRef={list}
        locale={locale}
        searchBy={searchBy}
        searchable={searchable}
        searchKeyword={searchKeyword}
        searchInputRef={searchInput}
        onScroll={onScroll}
        onSelect={onSelect}
        onSelectItem={onSelectItem}
        onExpand={handleExpandTreeNode}
        onSearch={onSearch}
        onChange={handleChange}
        onFocusItem={setFocusItemValue}
        value={value}
        loadingNodeValues={loadingNodeValues}
        flattenedNodes={flattenedNodes}
      />
    </TreeProvider>
  );

  const renderTreeView = (positionProps: PositionChildProps, speakerRef) => {
    const { className } = positionProps;
    const classes = classNames(className, popupClassName, prefix('check-tree-menu'));
    return (
      <PickerPopup
        ref={mergeRefs(overlay, speakerRef)}
        autoWidth={popupAutoWidth}
        className={classes}
        style={popupStyle}
        onKeyDown={onPickerKeydown}
        target={trigger}
      >
        {renderTree ? renderTree(checkTreeView) : checkTreeView}
        {renderExtraFooter?.()}
      </PickerPopup>
    );
  };

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  let hasValidValue = selectedNodes.length > 0 || (value.length > 0 && isFunction(renderValue));
  let selectedElement: React.ReactNode = placeholder;

  if (hasValidValue) {
    selectedElement = (
      <SelectedElement
        selectedItems={selectedNodes}
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
      selectedElement = renderValue(value, selectedNodes, selectedElement);
      if (isNil(selectedElement)) {
        hasValidValue = false;
      }
    }
  }

  return (
    <PickerToggleTrigger
      as={as}
      id={id}
      name="check-tree"
      block={block}
      disabled={disabled}
      appearance={appearance}
      popupType="tree"
      multiple
      triggerProps={{
        ...pick(props, triggerPropKeys),
        ...triggerProps
      }}
      ref={trigger}
      placement={placement}
      speaker={renderTreeView}
      rootRef={root}
      style={style}
      classPrefix={classPrefix}
      className={className}
    >
      <PickerToggle
        ref={target}
        appearance={appearance}
        onKeyDown={onPickerKeydown}
        onClean={createChainedFunction(handleClean, onClean)}
        cleanable={cleanable && !disabled}
        countable={countable}
        disabled={disabled}
        as={toggleAs}
        hasValue={hasValidValue}
        active={active}
        placement={placement}
        inputValue={value}
        focusItemValue={focusItemValue}
        {...rest}
      >
        {selectedElement || locale?.placeholder}
      </PickerToggle>
    </PickerToggleTrigger>
  );
});

CheckTreePicker.displayName = 'CheckTreePicker';

export default CheckTreePicker;
