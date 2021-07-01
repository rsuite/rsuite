import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import DropdownMenu from './DropdownMenu';
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
  useUpdateEffect
} from '../utils';

import {
  PickerToggle,
  PickerOverlay,
  SearchBar,
  SelectedElement,
  PickerToggleTrigger,
  usePickerClassName,
  usePublicMethods,
  useToggleKeyDownEvent,
  useFocusItemValue,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  OverlayTriggerInstance,
  PositionChildProps,
  listPickerPropTypes,
  PickerComponent
} from '../Picker';

import { FormControlPickerProps, ItemDataType } from '../@types/common';

export type ValueType = (number | string)[];
export interface MultiCascaderProps<T = ValueType>
  extends FormControlPickerProps<T, PickerLocale, ItemDataType> {
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
    items: ItemDataType[],
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

const defaultProps: Partial<MultiCascaderProps> = {
  as: 'div',
  classPrefix: 'picker',
  cleanable: true,
  cascade: true,
  countable: true,
  placement: 'bottomStart',
  appearance: 'default',
  data: [],
  disabledItemValues: [],
  uncheckableItemValues: [],
  childrenKey: 'children',
  valueKey: 'value',
  labelKey: 'label',
  searchable: true
};

const MultiCascader: PickerComponent<MultiCascaderProps> = React.forwardRef(
  (props: MultiCascaderProps, ref) => {
    const {
      as: Component,
      data,
      classPrefix,
      defaultValue,
      value: valueProp,
      valueKey,
      labelKey,
      childrenKey,
      disabled,
      disabledItemValues,
      cleanable,
      locale: overrideLocale,
      toggleAs,
      style,
      countable,
      cascade,
      inline,
      placeholder,
      placement,
      menuWidth,
      menuHeight,
      menuClassName,
      menuStyle,
      searchable,
      uncheckableItemValues,
      id,
      getChildren,
      renderValue,
      renderMenu,
      renderMenuItem,
      renderExtraFooter,
      onEnter,
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
    const { value, setValue, splitValue } = useCascadeValue(
      {
        ...itemKeys,
        uncheckableItemValues,
        cascade,
        value: valueProp || defaultValue
      },
      flattenData
    );

    // The columns displayed in the cascading panel.
    const { columnData, setColumnData, addColumn, enforceUpdateColumnData } = useColumnData(
      flattenData
    );

    useUpdateEffect(() => {
      enforceUpdateColumnData(data);
    }, [data]);

    // The path after cascading data selection.
    const [selectedPaths, setSelectedPaths] = useState<ItemDataType[]>();

    const triggerRef = useRef<OverlayTriggerInstance>();
    const overlayRef = useRef<HTMLDivElement>();
    const targetRef = useRef<HTMLDivElement>();
    const searchInputRef = useRef<HTMLInputElement>();

    usePublicMethods(ref, { triggerRef, overlayRef, targetRef });

    const { locale, rtl } = useCustom<PickerLocale>('Picker', overrideLocale);
    const selectedItems = flattenData.filter(item => value.some(v => v === item[valueKey])) || [];

    // Used to hover the focuse item  when trigger `onKeydown`
    const { focusItemValue, setLayer, setKeys, onKeyDown: onFocusItem } = useFocusItemValue(
      selectedPaths?.[selectedPaths.length - 1]?.[valueKey],
      {
        rtl,
        data: flattenData,
        valueKey,
        defaultLayer: selectedPaths?.length ? selectedPaths.length - 1 : 0,
        target: () => overlayRef.current,
        callback: useCallback(
          value => {
            const { columns, paths } = getColumnsAndPaths(data, value, {
              valueKey,
              childrenKey,
              isAttachChildren: true
            });

            setColumnData(columns);
            setSelectedPaths(paths);
          },
          [childrenKey, data, setColumnData, valueKey]
        )
      }
    );

    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */
    let hasValue = selectedItems.length > 0 || (valueProp?.length > 0 && isFunction(renderValue));

    const { prefix, merge } = useClassNames(classPrefix);

    const [searchKeyword, setSearchKeyword] = useState('');

    const handleEntered = useCallback(() => {
      onOpen?.();
      setActive(true);
    }, [onOpen]);

    const handleExited = useCallback(() => {
      onClose?.();
      setActive(false);
      setSearchKeyword('');
    }, [onClose]);

    const handleSelect = useCallback(
      (node: ItemDataType, cascadePaths: ItemDataType[], event: React.SyntheticEvent) => {
        setSelectedPaths(cascadePaths);
        onSelect?.(node, cascadePaths, event);

        // Lazy load node's children
        if (typeof getChildren === 'function' && node[childrenKey]?.length === 0) {
          node.loading = true;

          const children = getChildren(node);
          if (children instanceof Promise) {
            children.then((data: ItemDataType[]) => {
              node.loading = false;
              node[childrenKey] = data;
              addFlattenData(data, node);
              addColumn(data, cascadePaths.length);
            });
          } else {
            node.loading = false;
            node[childrenKey] = children;
            addFlattenData(children, node);
            addColumn(children, cascadePaths.length);
          }
        } else if (node[childrenKey]?.length) {
          addColumn(node[childrenKey], cascadePaths.length);
        }

        triggerRef.current?.updatePosition?.();
      },
      [onSelect, getChildren, childrenKey, addColumn, addFlattenData]
    );

    const handleCheck = useCallback(
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
      },
      [cascade, onChange, onCheck, setValue, splitValue, value, valueKey]
    );

    const handleClean = useCallback(
      (event: React.SyntheticEvent<HTMLElement>) => {
        if (disabled) {
          return;
        }

        setSelectedPaths([]);
        setValue([]);
        setColumnData([data]);
        onChange?.([], event);
      },
      [data, disabled, onChange, setColumnData, setValue]
    );

    const handleMenuPressEnter = useCallback(
      (event: React.SyntheticEvent) => {
        const focusItem = findNodeOfTree(data, item => item[valueKey] === focusItemValue);
        const checkbox = overlayRef.current?.querySelector(
          `[data-key="${focusItemValue}"] [type="checkbox"]`
        );

        if (checkbox) {
          handleCheck(focusItem, event, checkbox?.getAttribute('aria-checked') !== 'true');
        }
      },
      [data, focusItemValue, handleCheck, valueKey]
    );

    const onPickerKeyDown = useToggleKeyDownEvent({
      toggle: !focusItemValue || !active,
      triggerRef,
      targetRef,
      overlayRef,
      searchInputRef,
      active,
      onExit: handleClean,
      onMenuKeyDown: onFocusItem,
      onMenuPressEnter: handleMenuPressEnter,
      ...rest
    });

    const handleSearch = useCallback(
      (value: string, event: React.SyntheticEvent) => {
        setSearchKeyword(value);
        onSearch?.(value, event);
        if (value) {
          setLayer(0);
        } else if (selectedPaths?.length) {
          setLayer(selectedPaths.length - 1);
        }
        setKeys([]);
      },
      [onSearch, selectedPaths, setKeys, setLayer]
    );

    const getSearchResult = useCallback(() => {
      const items = [];
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
    }, [flattenData, labelKey, searchKeyword, uncheckableItemValues, valueKey]);

    const renderSearchRow = (item: ItemDataType, key: number) => {
      const nodes = getNodeParents(item);
      const regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
      const labelElements = [];

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
        <div key={key} className={itemClasses} aria-disabled={disabled} data-key={item[valueKey]}>
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
        <div className={prefix('cascader-search-panel')} data-layer={0}>
          {items.length ? (
            items.map(renderSearchRow)
          ) : (
            <div className={prefix('none')}>{locale.noResultsText}</div>
          )}
        </div>
      );
    };

    const renderDropdownMenu = (positionProps?: PositionChildProps, speakerRef?) => {
      const { left, top, className } = positionProps || {};
      const styles = { ...menuStyle, left, top };

      const classes = merge(
        className,
        menuClassName,
        prefix('cascader-menu', 'multi-cascader-menu', { inline })
      );

      return (
        <PickerOverlay
          ref={mergeRefs(overlayRef, speakerRef)}
          className={classes}
          style={styles}
          target={triggerRef}
          onKeyDown={onPickerKeyDown}
        >
          {searchable && (
            <SearchBar
              placeholder={locale?.searchPlaceholder}
              onChange={handleSearch}
              value={searchKeyword}
              inputRef={searchInputRef}
            />
          )}

          {renderSearchResultPanel()}

          {searchKeyword === '' && (
            <DropdownMenu
              id={id ? `${id}-listbox` : undefined}
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
        </PickerOverlay>
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
        value.length ? value : valueProp,
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
      hasValue,
      name: 'cascader'
    });

    if (inline) {
      return renderDropdownMenu();
    }

    return (
      <PickerToggleTrigger
        pickerProps={pick(props, pickTriggerPropKeys)}
        ref={triggerRef}
        placement={placement}
        onEnter={createChainedFunction(handleEntered, onEnter)}
        onExited={createChainedFunction(handleExited, onExited)}
        speaker={renderDropdownMenu}
      >
        <Component className={classes} style={style}>
          <PickerToggle
            {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
            id={id}
            as={toggleAs}
            disabled={disabled}
            ref={targetRef}
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
MultiCascader.defaultProps = defaultProps;
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
