import React, { useCallback, useMemo } from 'react';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import TreeView from '../CascadeTree/TreeView';
import SearchView from '../CascadeTree/SearchView';
import { usePaths, useSelect, useSearch } from '../CascadeTree/hooks';
import { flattenTree } from '../Tree/utils';
import { findNodeOfTree, getParentMap } from '@/internals/Tree/utils';
import { PickerLocale } from '../locales';
import { useControlled, useStyles, useEventCallback, useMap } from '@/internals/hooks';
import { forwardRef, createChainedFunction, mergeRefs, shallowEqual } from '@/internals/utils';
import {
  PickerToggle,
  PickerPopup,
  PickerToggleTrigger,
  usePickerRef,
  useToggleKeyDownEvent,
  useFocusItemValue,
  triggerPropKeys,
  PositionChildProps,
  PickerToggleProps
} from '@/internals/Picker';
import {
  Option,
  OptionValue,
  FormControlPickerProps,
  DeprecatedMenuProps
} from '@/internals/types';
import { useCustom } from '../CustomProvider';
import useActive from './useActive';
import type { SelectNode, CascadeTreeProps } from '../CascadeTree/types';

interface DeprecatedProps extends DeprecatedMenuProps {
  /**
   * The panel is displayed directly when the component is initialized
   * @deprecated Use CascadeTree instead
   * @see CascadeTree https://rsuitejs.com/components/cascade-tree
   */
  inline?: boolean;
}

export interface CascaderProps<T = OptionValue>
  extends FormControlPickerProps<T, PickerLocale, Option<T>>,
    CascadeTreeProps<T, T, PickerLocale>,
    DeprecatedProps,
    Pick<PickerToggleProps, 'label' | 'caretAs' | 'loading'> {
  /**
   * When true, make the parent node selectable
   */
  parentSelectable?: boolean;

  /**
   * Custom render selected items
   */
  renderValue?: (
    value: T,
    selectedPaths: Option<T>[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /**
   * Called when clean
   */
  onClean?: (event: React.SyntheticEvent) => void;
}

const emptyArray = [];

export interface CascaderComponent {
  <T>(props: CascaderProps<T>): React.ReactElement | null;
  displayName?: string;
}

/**
 * The `Cascader` component displays a hierarchical list of options.
 * @see https://rsuitejs.com/components/cascader
 */
const Cascader = forwardRef<'div', CascaderProps>(
  <T extends OptionValue>(props: CascaderProps<T>, ref) => {
    const { rtl, propsWithDefaults } = useCustom('Cascader', props);
    const {
      appearance = 'default',
      as,
      block,
      className,
      cleanable = true,
      classPrefix = 'picker',
      columnHeight,
      columnWidth,
      data = emptyArray,
      defaultValue,
      disabled,
      disabledItemValues = emptyArray,
      childrenKey = 'children',
      id,
      labelKey = 'label',
      locale,
      parentSelectable,
      placeholder,
      placement = 'bottomStart',
      popupClassName,
      popupStyle,
      renderColumn,
      renderExtraFooter,
      renderSearchItem,
      renderTreeNode,
      renderValue,
      searchable = true,
      style,
      toggleAs,
      value: valueProp,
      valueKey = 'value',
      onClean,
      onChange,
      onEnter,
      onExit,
      onSearch,
      onSelect,
      getChildren,
      ...rest
    } = propsWithDefaults;

    const { trigger, root, target, overlay, searchInput } = usePickerRef(ref);
    const [value, setValue] = useControlled(valueProp, defaultValue) as [
      T | null | undefined,
      (value: React.SetStateAction<T | null>) => void,
      boolean
    ];

    // Store the children of each node
    const childrenMap = useMap<Option<T>, readonly Option<T>[]>();

    // Store the parent of each node
    const parentMap = useMemo(
      () => getParentMap(data, item => childrenMap.get(item) ?? item[childrenKey]),
      [childrenMap, childrenKey, data]
    );

    // Flatten the tree data
    const flattenedData = useMemo(
      () => flattenTree(data, item => childrenMap.get(item) ?? item[childrenKey]),
      [childrenMap, childrenKey, data]
    );

    // The selected item
    const selectedItem = flattenedData.find(item => item[valueKey] === value);

    // Callback function after selecting the node
    const onSelectCallback = (node: SelectNode<T>, event: React.SyntheticEvent) => {
      const { isLeafNode, cascadePaths, itemData } = node;

      onSelect?.(itemData, cascadePaths, event);

      const nextValue = itemData[valueKey];

      if (isLeafNode) {
        // Determines whether the option is a leaf node, and if so, closes the picker.
        handleClose();
        setValue(nextValue);
        return;
      }

      //  When the parent is optional, the value and the displayed path are updated.
      if (parentSelectable && !shallowEqual(value, nextValue)) {
        setValue(nextValue);
        onChange?.(nextValue, event);
      }

      // Update menu position
      trigger.current?.updatePosition();
    };

    const { activeItem, setActiveItem, loadingItemsSet, handleSelect } = useSelect<T>({
      value,
      valueKey,
      childrenKey,
      childrenMap,
      selectedItem,
      getChildren,
      onChange,
      onSelect: onSelectCallback
    });

    const { columns, pathTowardsActiveItem, pathTowardsSelectedItem } = usePaths({
      data,
      activeItem,
      selectedItem,
      getParent: item => parentMap.get(item),
      getChildren: item =>
        childrenMap.get(item) ?? (item[childrenKey] as readonly Option<T>[] | undefined)
    });

    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */
    let hasValue = pathTowardsSelectedItem.length > 0 || (!isNil(value) && isFunction(renderValue));

    const { prefix, merge } = useStyles(classPrefix);

    const onFocusItemCallback = useCallback(
      value => {
        setActiveItem(flattenedData.find(item => item[valueKey] === value));
      },
      [flattenedData, setActiveItem, valueKey]
    );

    // Used to hover the focuse item  when trigger `onKeydown`
    const {
      focusItemValue,
      setFocusItemValue,
      setLayer,
      setKeys,
      onKeyDown: onFocusItem
    } = useFocusItemValue(value, {
      rtl,
      data: flattenedData,
      valueKey,
      defaultLayer: pathTowardsSelectedItem?.length ? pathTowardsSelectedItem.length - 1 : 0,
      target: () => overlay.current,
      getParent: item => parentMap.get(item),
      callback: onFocusItemCallback
    });

    const onSearchCallback = (value: string, items: Option<T>[], event: React.SyntheticEvent) => {
      onSearch?.(value, event);

      if (!value || items.length === 0) {
        setFocusItemValue(undefined);
        return;
      }

      if (items.length > 0) {
        setFocusItemValue(items[0][valueKey]);
        setLayer(0);
        setKeys([]);
      }
    };

    const { items, searchKeyword, setSearchKeyword, handleSearch } = useSearch({
      labelKey,
      childrenKey,
      parentMap,
      flattenedData,
      parentSelectable,
      onSearch: onSearchCallback
    });

    const { active, events } = useActive({
      onEnter,
      onExit,
      target,
      setSearchKeyword
    });

    const handleClose = useEventCallback(() => {
      trigger.current?.close();

      // The focus is on the trigger button after closing
      target.current?.focus?.();
    });

    const handleClean = useEventCallback((event: React.SyntheticEvent) => {
      if (disabled || !target.current) {
        return;
      }

      setValue(null);
      onChange?.(null as T, event);
    });

    const handleMenuPressEnter = useEventCallback((event: React.SyntheticEvent) => {
      const focusItem = findNodeOfTree(data, item => item[valueKey] === focusItemValue);
      const isLeafNode = focusItem && !focusItem[childrenKey];

      if (isLeafNode) {
        setValue(focusItemValue as T);
        if (pathTowardsActiveItem.length) {
          setLayer(pathTowardsActiveItem.length - 1);
        }

        if (!shallowEqual(value, focusItemValue)) {
          onSelect?.(focusItem as Option<T>, pathTowardsActiveItem, event);
          onChange?.(focusItemValue ?? (null as T), event);
        }
        handleClose();
      }
    });

    const onPickerKeyDown = useToggleKeyDownEvent({
      toggle: !focusItemValue || !active,
      trigger,
      target,
      overlay,
      searchInput,
      active,
      onExit: handleClean,
      onMenuKeyDown: onFocusItem,
      onMenuPressEnter: handleMenuPressEnter,
      ...rest
    });

    /**
     * The search structure option is processed after being selected.
     */
    const handleSearchRowSelect = useEventCallback(
      (itemData: Option<T>, nodes: Option<T>[], event: React.SyntheticEvent) => {
        const nextValue = itemData[valueKey];

        handleClose();
        setSearchKeyword('');
        setValue(nextValue);

        onSelect?.(itemData, nodes, event);
        onChange?.(nextValue, event);
      }
    );

    const renderCascadeColumn = (
      childNodes: React.ReactNode,
      column: {
        items: readonly Option<T>[];
        parentItem?: Option<T>;
        layer?: number;
      }
    ) => {
      if (typeof renderColumn === 'function') {
        return renderColumn(childNodes, column);
      }
      return childNodes;
    };

    const renderCascadeTreeNode = (node: React.ReactNode, itemData: Option<T>) => {
      if (typeof renderTreeNode === 'function') {
        return renderTreeNode(node, itemData);
      }
      return node;
    };

    const renderTreeView = (positionProps?: PositionChildProps, speakerRef?) => {
      const { className } = positionProps || {};
      const classes = merge(className, popupClassName, prefix('popup-cascader'));

      return (
        <PickerPopup
          ref={mergeRefs(overlay, speakerRef)}
          className={classes}
          style={popupStyle}
          target={trigger}
          onKeyDown={onPickerKeyDown}
        >
          {searchable && (
            <SearchView<T>
              data={items}
              searchKeyword={searchKeyword}
              valueKey={valueKey}
              labelKey={labelKey}
              locale={locale}
              parentMap={parentMap}
              disabledItemValues={disabledItemValues}
              focusItemValue={focusItemValue}
              inputRef={searchInput}
              renderSearchItem={renderSearchItem}
              onSelect={handleSearchRowSelect}
              onSearch={handleSearch}
            />
          )}

          {searchKeyword === '' && (
            <TreeView
              columnWidth={columnWidth}
              columnHeight={columnHeight}
              disabledItemValues={disabledItemValues}
              loadingItemsSet={loadingItemsSet}
              valueKey={valueKey}
              labelKey={labelKey}
              childrenKey={childrenKey}
              classPrefix={'cascade-tree'}
              data={columns}
              cascadePaths={pathTowardsActiveItem}
              activeItemValue={value}
              onSelect={handleSelect}
              renderColumn={renderCascadeColumn}
              renderTreeNode={renderCascadeTreeNode}
            />
          )}
          {renderExtraFooter?.()}
        </PickerPopup>
      );
    };

    let selectedElement: any = placeholder;

    if (pathTowardsSelectedItem.length > 0) {
      selectedElement = [];

      pathTowardsSelectedItem.forEach((item, index) => {
        const key = item[valueKey] || item[labelKey];
        selectedElement.push(<span key={key}>{item[labelKey]}</span>);
        if (index < pathTowardsSelectedItem.length - 1) {
          selectedElement.push(
            <span className="separator" key={`${key}-separator`}>
              {' / '}
            </span>
          );
        }
      });
    }

    if (!isNil(value) && isFunction(renderValue)) {
      selectedElement = renderValue(value, pathTowardsSelectedItem, selectedElement);
      // If renderValue returns null or undefined, hasValue is false.
      if (isNil(selectedElement)) {
        hasValue = false;
      }
    }

    const triggerProps = {
      ...pick(props, triggerPropKeys),
      ...events
    };

    return (
      <PickerToggleTrigger
        as={as}
        id={id}
        name="cascader"
        block={block}
        disabled={disabled}
        appearance={appearance}
        popupType="tree"
        triggerProps={triggerProps}
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
          as={toggleAs}
          appearance={appearance}
          disabled={disabled}
          onClean={createChainedFunction(handleClean, onClean)}
          onKeyDown={onPickerKeyDown}
          cleanable={cleanable && !disabled}
          hasValue={hasValue}
          active={active}
          placement={placement}
          inputValue={value ?? ''}
          focusItemValue={focusItemValue}
          {...rest}
        >
          {selectedElement || locale?.placeholder}
        </PickerToggle>
      </PickerToggleTrigger>
    );
  }
) as CascaderComponent;

Cascader.displayName = 'Cascader';

export default Cascader;
