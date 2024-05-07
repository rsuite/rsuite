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
import useExpandTree from '../Tree/hooks/useExpandTree';
import { TreeProvider, useTreeImperativeHandle } from '../Tree/TreeProvider';
import type { FormControlPickerProps, ItemDataType, DeprecatedPickerProps } from '../@types/common';
import type { TreeExtraProps } from '../Tree/types';

export type ValueType = (string | number)[];
export interface CheckTreePickerProps<V = ValueType>
  extends Omit<CheckTreeViewProps<V>, 'value' | 'onChange' | 'data'>,
    TreeExtraProps,
    DeprecatedPickerProps,
    FormControlPickerProps<V, PickerLocale, ItemDataType>,
    Pick<PickerToggleProps, 'caretAs' | 'loading'> {
  /**
   * A picker that can be counted
   */
  countable?: boolean;

  /**
   * Custom popup style
   */
  popupClassName?: string;

  /**
   * Custom popup style
   */
  popupStyle?: React.CSSProperties;

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
    expandItemValues: controlledExpandItemValues,
    defaultExpandItemValues = [],
    menuClassName: DEPRECATED_menuClassName,
    menuStyle: DEPRECATED_menuStyle,
    popupClassName,
    popupStyle,
    popupAutoWidth = true,
    treeHeight = 320,
    menuAutoWidth = popupAutoWidth,
    searchable = true,
    virtualized = false,
    classPrefix = 'picker',
    uncheckableItemValues = [],
    id,
    listProps,
    renderMenu,
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
    renderTreeIcon,
    renderTreeNode,
    ...rest
  } = props;

  const { trigger, root, target, overlay, list, searchInput, treeView } = usePickerRef(ref);
  const { locale } = useCustom<PickerLocale>('Picker', overrideLocale);
  const [active, setActive] = useState(false);
  const { prefix } = useClassNames(classPrefix);

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
    cascade,
    uncheckableItemValues
  });

  const selectedNodes = getSelectedItems(flattenedNodes, value);
  const [focusItemValue, setFocusItemValue] = useState<number | string | null>(null);
  const { register, focusFirstNode } = useTreeImperativeHandle();

  const handleFocusItem = useEventCallback((value: string | number) => {
    setFocusItemValue(value);
  });

  const focusCombobox = useEventCallback(() => {
    target.current?.focus();
  });

  const handleEnter = useEventCallback(() => {
    setActive(true);
  });

  const handleClose = useEventCallback(() => {
    setActive(false);
    focusCombobox();
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

  const handleChange = useEventCallback((nextValue: ValueType, event: React.SyntheticEvent) => {
    setValue(nextValue);
    onChange?.(nextValue, event);
  });

  const checkTreeView = (
    <TreeProvider value={{ register }}>
      <CheckTreeView
        ref={treeView}
        disabledItemValues={disabledItemValues}
        expandItemValues={expandItemValues}
        uncheckableItemValues={uncheckableItemValues}
        cascade={cascade}
        virtualized={virtualized}
        data={treeData}
        height={treeHeight}
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
        onExpand={handleExpandTreeNode}
        onSearch={onSearch}
        onChange={handleChange}
        onFocusItem={handleFocusItem}
        value={value}
        loadingNodeValues={loadingNodeValues}
        flattenedNodes={flattenedNodes}
      />
    </TreeProvider>
  );

  const renderTreeView = (positionProps: PositionChildProps, speakerRef) => {
    const { left, top, className } = positionProps;
    const classes = classNames(
      className,
      popupClassName,
      DEPRECATED_menuClassName,
      prefix('check-tree-menu')
    );
    const mergedMenuStyle = { ...popupStyle, ...DEPRECATED_menuStyle, left, top };

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
      onEnter={createChainedFunction(handleEnter, onEnter)}
      onExit={createChainedFunction(handleClose, onExit)}
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
