import React, { useState } from 'react';
import classNames from 'classnames';
import { isNil, pick, isFunction, omit } from 'lodash';
import { PickerLocale } from '../locales';
import {
  createChainedFunction,
  useCustom,
  useClassNames,
  useEventCallback,
  mergeRefs
} from '../utils';

import {
  PickerToggle,
  onMenuKeyDown,
  PickerPopup,
  SelectedElement,
  PickerToggleTrigger,
  PickerComponent,
  PickerToggleProps,
  usePickerClassName,
  useToggleKeyDownEvent,
  usePickerRef,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps
} from '../internals/Picker';

import CheckTreeView, { type CheckTreeViewProps } from '../CheckTree/CheckTreeView';
import { getSelectedItems } from '../CheckTree/utils';
import { TreeNode } from '../Tree/types';
import useTreeValue from '../CheckTree/hooks/useTreeValue';
import useFlattenTree from '../Tree/hooks/useFlattenTree';
import useTreeWithChildren from '../Tree/hooks/useTreeWithChildren';
import type { FormControlPickerProps, ItemDataType } from '../@types/common';

export type ValueType = (string | number)[];
export interface CheckTreePickerProps<V = ValueType>
  extends Omit<CheckTreeViewProps<V>, 'value' | 'onChange' | 'data'>,
    FormControlPickerProps<V, PickerLocale, ItemDataType>,
    Pick<PickerToggleProps, 'caretAs' | 'loading'> {
  /**
   * A picker that can be counted
   */
  countable?: boolean;

  /**
   * Custom render selected items
   */
  renderValue?: (
    value: V,
    selectedNodes: TreeNode[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;
}

/**
 * The `CheckTreePicker` component is used for selecting multiple options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/check-tree-picker
 */
const CheckTreePicker: PickerComponent<CheckTreePickerProps> = React.forwardRef((props, ref) => {
  const {
    as: Component = 'div',
    data = [],
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
    defaultValue = [],
    defaultExpandAll = false,
    disabledItemValues = [],
    expandItemValues,
    defaultExpandItemValues = [],
    menuMaxHeight = 320,
    menuStyle,
    menuClassName,
    menuAutoWidth = true,
    searchable = true,
    virtualized = false,
    classPrefix = 'picker',
    uncheckableItemValues = [],
    id,
    listProps,
    renderMenu,
    getChildren,
    renderExtraFooter,
    onEntered,
    onChange,
    onClean,
    onExited,
    onSearch,
    onSelect,
    onSelectItem,
    onScroll,
    onExpand,
    renderValue,
    renderTreeIcon,
    renderTreeNode,
    ...rest
  } = props;

  const { trigger, root, target, overlay, list, searchInput, treeView } = usePickerRef(ref);
  const { locale } = useCustom<PickerLocale>('Picker', overrideLocale);
  const [active, setActive] = useState(false);
  const [activeNode, setActiveNode] = useState<TreeNode | null>(null);
  const { prefix } = useClassNames(classPrefix);

  const [value, setValue] = useTreeValue(controlledValue, {
    defaultValue,
    uncheckableItemValues
  });

  const itemDataKeys = { childrenKey, labelKey, valueKey };
  const { treeData, loadingNodeValues, appendChild } = useTreeWithChildren(data, itemDataKeys);

  const flattenedNodes = useFlattenTree(treeData, {
    ...itemDataKeys,
    cascade,
    uncheckableItemValues
  });

  const selectedNodes = getSelectedItems(flattenedNodes, value);
  const [focusItemValue, setFocusItemValue] = useState<number | string | null>(null);

  const handleFocusItem = useEventCallback((value: string | number) => {
    setFocusItemValue(value);
  });

  const handleOpen = useEventCallback(() => {
    setFocusItemValue(activeNode?.[valueKey]);
    //focusActiveNode();
    setActive(true);
  });

  const handleClose = useEventCallback(() => {
    //setSearchKeyword('');
    setFocusItemValue(null);
    setActive(false);

    /**
     * when using keyboard toggle picker, should refocus on PickerToggle Component after close picker menu
     */
    target.current?.focus();
  });

  const handleClean = useEventCallback((event: React.SyntheticEvent) => {
    const target = event.target as Element;
    // exclude searchbox
    if (target.matches('input[role="searchbox"]') || disabled || !cleanable) {
      return;
    }

    setActiveNode(null);
    setFocusItemValue(null);
    setValue([]);
    onChange?.([], event);
  });

  const handleTreeKeydown = useEventCallback((event: React.KeyboardEvent<any>) => {
    onMenuKeyDown(event, { del: handleClean });
  });

  const onPickerKeydown = useToggleKeyDownEvent({
    toggle: !focusItemValue || !active,
    trigger,
    target,
    overlay,
    searchInput,
    active,
    onExit: handleClean,
    onMenuKeyDown: handleTreeKeydown,
    ...rest
  });

  const handleChange = useEventCallback((nextValue: ValueType, event: React.SyntheticEvent) => {
    setValue(nextValue);
    onChange?.(nextValue, event);
  });

  const checkTreeView = (
    <CheckTreeView
      ref={treeView}
      defaultExpandAll={defaultExpandAll}
      defaultExpandItemValues={defaultExpandItemValues}
      disabledItemValues={disabledItemValues}
      expandItemValues={expandItemValues}
      uncheckableItemValues={uncheckableItemValues}
      cascade={cascade}
      virtualized={virtualized}
      data={treeData}
      height={menuMaxHeight}
      showIndentLine={showIndentLine}
      listProps={listProps}
      listRef={list}
      labelKey={labelKey}
      valueKey={valueKey}
      searchBy={searchBy}
      searchable={searchable}
      searchKeyword={searchKeyword}
      searchInputRef={searchInput}
      renderTreeIcon={renderTreeIcon}
      renderTreeNode={renderTreeNode}
      onScroll={onScroll}
      onSelect={onSelect}
      onSelectItem={onSelectItem}
      onExpand={onExpand}
      onSearch={onSearch}
      onChange={handleChange}
      onFocusItem={handleFocusItem}
      getChildren={getChildren}
      value={value}
      loadingNodeValues={loadingNodeValues}
      flattenedNodes={flattenedNodes}
      appendChild={appendChild}
    />
  );

  const renderTreeView = (positionProps: PositionChildProps, speakerRef) => {
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
        {renderMenu ? renderMenu(checkTreeView) : checkTreeView}
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
      speaker={renderTreeView}
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

export default CheckTreePicker;
