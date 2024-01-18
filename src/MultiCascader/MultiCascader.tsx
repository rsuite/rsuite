import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import TreeView from './TreeView';
import Checkbox from '../Checkbox';
import { useCascadeValue, useColumnData, useFlattenData, isSomeChildChecked } from './utils';
import { getNodeParents, findNodeOfTree } from '../utils/treeUtils';
import { getColumnsAndPaths } from '../Cascader/utils';
import { PickerLocale } from '../locales';
import {
  createChainedFunction,
  mergeRefs,
  getSafeRegExpString,
  useClassNames,
  useCustom,
  useUpdateEffect,
  useControlled,
  useEventCallback
} from '../utils';

import {
  PickerToggle,
  PickerPopup,
  SelectedElement,
  PickerToggleTrigger,
  usePickerClassName,
  usePickerRef,
  useToggleKeyDownEvent,
  useFocusItemValue,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  listPickerPropTypes,
  PickerComponent,
  PickerToggleProps
} from '../internals/Picker';
import SearchBox from '../internals/SearchBox';
import { FormControlPickerProps, ItemDataType } from '../@types/common';

export type ValueType = (number | string)[];
export interface MultiCascaderProps<T = ValueType>
  extends FormControlPickerProps<T, PickerLocale, ItemDataType>,
    Pick<PickerToggleProps, 'loading'> {
  cascade?: boolean;

  /** A picker that can be counted */
  countable?: boolean;

  /** Sets the width of the menu */
  menuWidth?: number;

  /** Sets the height of the menu */
  menuHeight?: number | string;

  /** Set the option value for the check box not to be rendered */
  uncheckableItemValues?: T;

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** The menu is displayed directly when the component is initialized */
  inline?: boolean;

  /** Custom render menu */
  renderMenu?: (
    items: readonly ItemDataType[],
    menu: React.ReactNode,
    parentNode?: any,
    layer?: number
  ) => React.ReactNode;

  /** Custom render menu items */
  renderMenuItem?: (itemLabel: React.ReactNode, item: any) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (
    value: T,
    selectedItems: ItemDataType[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /** Called when the option is selected */
  onSelect?: (
    node: ItemDataType,
    cascadePaths: ItemDataType[],
    event: React.SyntheticEvent
  ) => void;

  /** Called after the checkbox state changes */
  onCheck?: (
    value: ValueType,
    node: ItemDataType,
    checked: boolean,
    event: React.SyntheticEvent
  ) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent) => void;

  /** Called when searching */
  onSearch?: (searchKeyword: string, event: React.SyntheticEvent) => void;

  /** Asynchronously load the children of the tree node. */
  getChildren?: (node: ItemDataType) => ItemDataType[] | Promise<ItemDataType[]>;
}

const emptyArray = [];

/**
 * The `MultiCascader` component is used to select multiple values from cascading options.
 * @see https://rsuitejs.com/components/multi-cascader/
 */
const MultiCascader: PickerComponent<MultiCascaderProps> = React.forwardRef(
  (props: MultiCascaderProps, ref) => {
    const {
      as: Component = 'div',
      data = emptyArray,
      classPrefix = 'picker',
      defaultValue,
      value: valueProp,
      valueKey = 'value',
      labelKey = 'label',
      childrenKey = 'children',
      disabled,
      disabledItemValues = emptyArray,
      cleanable = true,
      locale: overrideLocale,
      toggleAs,
      style,
      countable = true,
      cascade = true,
      inline,
      placeholder,
      placement = 'bottomStart',
      appearance = 'default',
      menuWidth,
      menuHeight,
      menuClassName,
      menuStyle,
      searchable = true,
      uncheckableItemValues = emptyArray,
      id,
      getChildren,
      renderValue,
      renderMenu,
      renderMenuItem,
      renderExtraFooter,
      onEnter,
      onExit,
      onExited,
      onClean,
      onSearch,
      onSelect,
      onChange,
      onOpen,
      onClose,
      onCheck,
      ...rest
    } = props;

    const itemKeys = { childrenKey, labelKey, valueKey };
    const [active, setActive] = useState(false);
    const { flattenData, addFlattenData } = useFlattenData(data, itemKeys);
    const [controlledValue] = useControlled(valueProp, defaultValue);
    const { value, setValue, splitValue } = useCascadeValue(
      {
        ...itemKeys,
        uncheckableItemValues,
        cascade,
        value: controlledValue
      },
      flattenData
    );

    // The columns displayed in the cascading panel.
    const { columnData, setColumnData, addColumn, removeColumnByIndex, enforceUpdateColumnData } =
      useColumnData(flattenData);

    useUpdateEffect(() => {
      enforceUpdateColumnData(data);
    }, [data]);

    // The path after cascading data selection.
    const [selectedPaths, setSelectedPaths] = useState<ItemDataType[]>();
    const { trigger, root, target, overlay, searchInput } = usePickerRef(ref);
    const { locale, rtl } = useCustom<PickerLocale>('Picker', overrideLocale);
    const selectedItems = flattenData.filter(item => value.some(v => v === item[valueKey])) || [];

    // Used to hover the focuse item  when trigger `onKeydown`
    const {
      focusItemValue,
      setLayer,
      setKeys,
      onKeyDown: onFocusItem
    } = useFocusItemValue(selectedPaths?.[selectedPaths.length - 1]?.[valueKey], {
      rtl,
      data: flattenData,
      valueKey,
      defaultLayer: selectedPaths?.length ? selectedPaths.length - 1 : 0,
      target: () => overlay.current,
      callback: useCallback(
        value => {
          const { columns, path } = getColumnsAndPaths(
            data,
            flattenData.find(item => item[valueKey] === value),
            {
              getParent: () => undefined,
              getChildren: item => item[childrenKey]
            }
          );

          setColumnData(columns);
          setSelectedPaths(path);
        },
        [childrenKey, data, flattenData, setColumnData, valueKey]
      )
    });

    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */
    let hasValue =
      selectedItems.length > 0 || (Number(valueProp?.length) > 0 && isFunction(renderValue));

    const { prefix, merge } = useClassNames(classPrefix);

    const [searchKeyword, setSearchKeyword] = useState('');

    const handleEntered = useEventCallback(() => {
      onOpen?.();
      setActive(true);
    });

    const handleExited = useEventCallback(() => {
      setActive(false);
      setSearchKeyword('');
    });

    const handleSelect = useEventCallback(
      (node: ItemDataType, cascadePaths: ItemDataType[], event: React.SyntheticEvent) => {
        setSelectedPaths(cascadePaths);
        onSelect?.(node, cascadePaths, event);

        const columnIndex = cascadePaths.length;

        // Lazy load node's children
        if (typeof getChildren === 'function' && node[childrenKey]?.length === 0) {
          node.loading = true;

          const children = getChildren(node);
          if (children instanceof Promise) {
            children.then((data: ItemDataType[]) => {
              node.loading = false;
              node[childrenKey] = data;

              if (target.current || inline) {
                addFlattenData(data, node);
                addColumn(data, columnIndex);
              }
            });
          } else {
            node.loading = false;
            node[childrenKey] = children;
            addFlattenData(children, node);
            addColumn(children, columnIndex);
          }
        } else if (node[childrenKey]?.length) {
          addColumn(node[childrenKey], columnIndex);
        } else {
          // Removes subsequent columns of the current column when the clicked node is a leaf node.
          removeColumnByIndex(columnIndex);
        }

        trigger.current?.updatePosition?.();
      }
    );

    const handleCheck = useEventCallback(
      (node: ItemDataType, event: React.SyntheticEvent, checked: boolean) => {
        const nodeValue = node[valueKey];
        let nextValue: ValueType = [];

        if (cascade) {
          nextValue = splitValue(node, checked, value).value;
        } else {
          nextValue = [...value];
          if (checked) {
            nextValue.push(nodeValue);
          } else {
            nextValue = nextValue.filter(n => n !== nodeValue);
          }
        }

        setValue(nextValue);
        onChange?.(nextValue, event);
        onCheck?.(nextValue, node, checked, event);
      }
    );

    const handleClean = useEventCallback((event: React.SyntheticEvent) => {
      if (disabled || !target.current) {
        return;
      }

      setSelectedPaths([]);
      setValue([]);
      setColumnData([data]);
      onChange?.([], event);
    });

    const handleMenuPressEnter = useEventCallback((event: React.SyntheticEvent) => {
      const focusItem = findNodeOfTree(data, item => item[valueKey] === focusItemValue);
      const checkbox = overlay.current?.querySelector(
        `[data-key="${focusItemValue}"] [type="checkbox"]`
      );

      if (checkbox) {
        handleCheck(focusItem, event, checkbox?.getAttribute('aria-checked') !== 'true');
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

    const handleSearch = useEventCallback((value: string, event: React.SyntheticEvent) => {
      setSearchKeyword(value);
      onSearch?.(value, event);
      if (value) {
        setLayer(0);
      } else if (selectedPaths?.length) {
        setLayer(selectedPaths.length - 1);
      }
      setKeys([]);
    });

    const getSearchResult = () => {
      const items: ItemDataType[] = [];
      const result = flattenData.filter(item => {
        if (uncheckableItemValues.some(value => item[valueKey] === value)) {
          return false;
        }

        if (item[labelKey].match(new RegExp(getSafeRegExpString(searchKeyword), 'i'))) {
          return true;
        }
        return false;
      });

      for (let i = 0; i < result.length; i++) {
        items.push(result[i]);

        // A maximum of 100 search results are returned.
        if (i === 99) {
          return items;
        }
      }
      return items;
    };

    const renderSearchRow = (item: ItemDataType, key: number) => {
      const nodes = getNodeParents(item);
      const regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
      const labelElements: React.ReactNode[] = [];

      const a = item[labelKey].split(regx);
      const b = item[labelKey].match(regx);

      for (let i = 0; i < a.length; i++) {
        labelElements.push(a[i]);
        if (b[i]) {
          labelElements.push(
            <span key={i} className={prefix('cascader-search-match')}>
              {b[i]}
            </span>
          );
        }
      }

      nodes.push({ ...item, [labelKey]: labelElements });

      const active = value.some(value => {
        if (cascade) {
          return nodes.some(node => node[valueKey] === value);
        }
        return item[valueKey] === value;
      });
      const disabled = disabledItemValues.some(value =>
        nodes.some(node => node[valueKey] === value)
      );

      const itemClasses = prefix('cascader-row', {
        'cascader-row-disabled': disabled,
        'cascader-row-focus': item[valueKey] === focusItemValue
      });

      return (
        <div
          role="treeitem"
          aria-disabled={disabled}
          key={key}
          className={itemClasses}
          data-key={item[valueKey]}
        >
          <Checkbox
            disabled={disabled}
            checked={active}
            value={item[valueKey]}
            indeterminate={
              cascade && !active && isSomeChildChecked(item, value, { valueKey, childrenKey })
            }
            onChange={(_value, checked, event) => {
              handleCheck(item, event, checked);
            }}
          >
            <span className={prefix('cascader-cols')}>
              {nodes.map((node, index) => (
                <span key={`col-${index}`} className={prefix('cascader-col')}>
                  {node[labelKey]}
                </span>
              ))}
            </span>
          </Checkbox>
        </div>
      );
    };

    const renderSearchResultPanel = () => {
      if (searchKeyword === '') {
        return null;
      }

      const items = getSearchResult();
      return (
        <div className={prefix('cascader-search-panel')} data-layer={0} role="tree">
          {items.length ? (
            items.map(renderSearchRow)
          ) : (
            <div className={prefix('none')}>{locale.noResultsText}</div>
          )}
        </div>
      );
    };

    const renderTreeView = (positionProps?: PositionChildProps, speakerRef?) => {
      const { left, top, className } = positionProps || {};
      const styles = { ...menuStyle, left, top };

      const classes = merge(
        className,
        menuClassName,
        prefix('cascader-menu', 'multi-cascader-menu', { inline })
      );

      return (
        <PickerPopup
          ref={mergeRefs(overlay, speakerRef)}
          className={classes}
          style={styles}
          target={trigger}
          onKeyDown={onPickerKeyDown}
        >
          {searchable && (
            <SearchBox
              placeholder={locale?.searchPlaceholder}
              onChange={handleSearch}
              value={searchKeyword}
              inputRef={searchInput}
            />
          )}

          {renderSearchResultPanel()}

          {searchKeyword === '' && (
            <TreeView
              cascade={cascade}
              menuWidth={menuWidth}
              menuHeight={menuHeight}
              uncheckableItemValues={uncheckableItemValues}
              disabledItemValues={disabledItemValues}
              valueKey={valueKey}
              labelKey={labelKey}
              childrenKey={childrenKey}
              classPrefix={'picker-cascader-menu'}
              cascadeData={columnData}
              cascadePaths={selectedPaths}
              value={value}
              onSelect={handleSelect}
              onCheck={handleCheck}
              renderMenu={renderMenu}
              renderMenuItem={renderMenuItem}
            />
          )}

          {renderExtraFooter?.()}
        </PickerPopup>
      );
    };

    let selectedElement: React.ReactNode = placeholder;

    if (selectedItems.length > 0) {
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
    }

    if (hasValue && isFunction(renderValue)) {
      selectedElement = renderValue(
        value.length ? value : valueProp ?? [],
        selectedItems,
        selectedElement
      );
      // If renderValue returns null or undefined, hasValue is false.
      if (isNil(selectedElement)) {
        hasValue = false;
      }
    }

    const [classes, usedClassNamePropKeys] = usePickerClassName({
      ...props,
      classPrefix,
      hasValue,
      countable,
      name: 'cascader',
      appearance,
      cleanable
    });

    if (inline) {
      return renderTreeView();
    }

    return (
      <PickerToggleTrigger
        id={id}
        popupType="tree"
        multiple
        pickerProps={pick(props, pickTriggerPropKeys)}
        ref={trigger}
        placement={placement}
        onEnter={createChainedFunction(handleEntered, onEnter)}
        onExited={createChainedFunction(handleExited, onExited)}
        onExit={createChainedFunction(onClose, onExit)}
        speaker={renderTreeView}
      >
        <Component className={classes} style={style} ref={root}>
          <PickerToggle
            {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
            as={toggleAs}
            appearance={appearance}
            disabled={disabled}
            ref={target}
            onClean={createChainedFunction(handleClean, onClean)}
            onKeyDown={onPickerKeyDown}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
            active={active}
            placement={placement}
            inputValue={value}
          >
            {selectedElement || locale.placeholder}
          </PickerToggle>
        </Component>
      </PickerToggleTrigger>
    );
  }
);

MultiCascader.displayName = 'MultiCascader';
MultiCascader.propTypes = {
  ...listPickerPropTypes,
  value: PropTypes.array,
  disabledItemValues: PropTypes.array,
  locale: PropTypes.any,
  appearance: PropTypes.oneOf(['default', 'subtle']),
  cascade: PropTypes.bool,
  inline: PropTypes.bool,
  countable: PropTypes.bool,
  menuWidth: PropTypes.number,
  menuHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  uncheckableItemValues: PropTypes.array,
  searchable: PropTypes.bool,
  renderMenuItem: PropTypes.func,
  renderMenu: PropTypes.func,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  onCheck: PropTypes.func
};

export default MultiCascader;
