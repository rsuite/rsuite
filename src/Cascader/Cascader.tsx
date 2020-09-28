import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import shallowEqual from '../utils/shallowEqual';
import DropdownMenu from './DropdownMenu';
import { flattenTree, getNodeParents } from '../utils/treeUtils';
import { usePaths } from './utils';
import {
  getSafeRegExpString,
  createChainedFunction,
  mergeRefs,
  useControlled,
  useCustom,
  useClassNames
} from '../utils';

import {
  PickerToggle,
  MenuWrapper,
  SearchBar,
  PickerToggleTrigger,
  usePickerClassName,
  usePublicMethods,
  pickerToggleTriggerProps,
  OverlayTriggerInstance,
  PositionChildProps,
  listPickerPropTypes,
  PickerLocaleType,
  PickerComponent
} from '../Picker';

import { ItemDataType, FormControlPickerProps } from '../@types/common';

export type ValueType = number | string;
export interface CascaderProps<T = ValueType>
  extends FormControlPickerProps<T, PickerLocaleType, ItemDataType> {
  /** Sets the width of the menu */
  menuWidth?: number;

  /** Sets the height of the menu */
  menuHeight?: number | string;

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** The menu is displayed directly when the component is initialized */
  inline?: boolean;

  /** When true, make the parent node selectable */
  parentSelectable?: boolean;

  /** Custom render menu */
  renderMenu?: (items: ItemDataType[], menu: React.ReactNode, parentNode?: any) => React.ReactNode;

  /** Custom render menu items */
  renderMenuItem?: (itemLabel: React.ReactNode, item: ItemDataType) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (
    value: T,
    selectedPaths: ItemDataType[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /** Called when the option is selected */
  onSelect?: (
    value: ItemDataType,
    selectedPaths: ItemDataType[],
    event: React.SyntheticEvent
  ) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent) => void;

  /** Called when searching */
  onSearch?: (searchKeyword: string, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Asynchronously load the children of the tree node. */
  getChildren?: (node: ItemDataType) => ItemDataType[] | Promise<ItemDataType[]>;
}

const defaultProps: Partial<CascaderProps> = {
  as: 'div',
  classPrefix: 'picker',
  cleanable: true,
  placement: 'bottomStart',
  appearance: 'default',
  data: [],
  disabledItemValues: [],
  childrenKey: 'children',
  valueKey: 'value',
  labelKey: 'label',
  searchable: true
};

const Cascader: PickerComponent<CascaderProps> = React.forwardRef((props: CascaderProps, ref) => {
  const {
    as: Component,
    data,
    classPrefix,
    childrenKey,
    valueKey,
    labelKey,
    defaultValue,
    placeholder,
    disabled,
    disabledItemValues,
    cleanable,
    locale: overrideLocale,
    toggleAs,
    style,
    value: valueProp,
    inline,
    menuClassName,
    menuStyle,
    menuWidth,
    menuHeight,
    searchable,
    parentSelectable,
    placement,
    renderMenuItem,
    renderValue,
    renderMenu,
    renderExtraFooter,
    onEnter,
    onExited,
    onClean,
    onChange,
    onSelect,
    onSearch,
    onClose,
    onOpen,
    getChildren,
    ...rest
  } = props;

  // Use component active state to support keyboard events.
  const [active, setActive] = useState(false);
  const [flattenData, setFlattenData] = useState<ItemDataType[]>(flattenTree(data));

  const triggerRef = useRef<OverlayTriggerInstance>();
  const menuRef = useRef<HTMLDivElement>();
  const toggleRef = useRef<HTMLButtonElement>();
  const [value, setValue] = useControlled<ValueType>(valueProp, defaultValue);
  const {
    selectedPaths,
    valueToPaths,
    columnData,
    addColumn,
    setValueToPaths,
    setColumnData,
    setSelectedPaths,
    enforceUpdate
  } = usePaths({
    data,
    valueKey,
    childrenKey,
    value
  });

  useEffect(() => {
    setFlattenData(flattenTree(data));
  }, [data]);

  usePublicMethods(ref, { triggerRef, menuRef, toggleRef });

  const { locale } = useCustom<PickerLocaleType>('Picker', overrideLocale);
  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  let hasValue = valueToPaths.length > 0 || (!isNil(value) && isFunction(renderValue));

  const { prefix, merge } = useClassNames(classPrefix);

  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (value: string, event: React.SyntheticEvent<HTMLElement>) => {
    setSearchKeyword(value);
    onSearch?.(value, event);
  };

  const handleEntered = useCallback(() => {
    onOpen?.();
    setActive(true);
  }, [onOpen]);

  const handleExited = useCallback(() => {
    onClose?.();
    setActive(false);
    setSearchKeyword('');
  }, [onClose]);

  const handleClose = useCallback(() => {
    triggerRef.current?.close();
  }, [triggerRef]);

  const handleClean = useCallback(
    (event: React.SyntheticEvent<any>) => {
      if (disabled) {
        return;
      }

      setColumnData([data]);
      setValue(null);
      setSelectedPaths([]);
      setValueToPaths([]);
      onChange?.(null, event);
    },
    [data, disabled, onChange, setSelectedPaths, setColumnData, setValueToPaths, setValue]
  );

  const handleSelect = (
    node: ItemDataType,
    cascadeData: ItemDataType[][],
    cascadePaths: ItemDataType[],
    isLeafNode: boolean,
    event: React.MouseEvent
  ) => {
    const nextValue = node[valueKey];

    onSelect?.(node, cascadePaths, event);
    setSelectedPaths(cascadePaths);
    setColumnData(cascadeData);

    // Lazy load node's children
    if (typeof getChildren === 'function' && node.children?.length === 0) {
      node.loading = true;

      const children = getChildren(node);
      if (children instanceof Promise) {
        children.then((data: ItemDataType[]) => {
          node.loading = false;
          node[childrenKey] = data;
          addColumn(data, cascadePaths.length);
        });
      } else {
        node.loading = false;
        node[childrenKey] = children;
        addColumn(children, cascadePaths.length);
      }
    }

    if (isLeafNode) {
      // Determines whether the option is a leaf node, and if so, closes the picker.
      handleClose();

      // Update the selected path to the value path.
      // That is, the selected path will be displayed on the button after clicking the child node.
      setValueToPaths(cascadePaths);
      setValue(nextValue);

      if (!shallowEqual(value, nextValue)) {
        onChange?.(nextValue, event);
      }

      return;
    }

    /** When the parent is optional, the value and the displayed path are updated. */
    if (parentSelectable && !shallowEqual(value, nextValue)) {
      setValue(nextValue);
      onChange?.(nextValue, event);
      setValueToPaths(cascadePaths);
    }

    // Update menu position
    triggerRef.current?.updatePosition();
  };

  const someKeyword = (item: ItemDataType) => {
    if (item[labelKey].match(new RegExp(getSafeRegExpString(searchKeyword), 'i'))) {
      return true;
    }

    if (item.parent && someKeyword(item.parent)) {
      return true;
    }

    return false;
  };

  const getSearchResult = () => {
    const items = [];
    const result = flattenData.filter(item => {
      if (item[childrenKey]) {
        return false;
      }
      return someKeyword(item);
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

  /**
   * The search structure option is processed after being selected.
   */
  const handleSearchRowSelect = (
    node: ItemDataType,
    nodes: ItemDataType[],
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    const nextValue = node[valueKey];

    handleClose();
    setSearchKeyword('');
    setValue(nextValue);
    setValueToPaths(nodes);
    enforceUpdate(nextValue);

    onSelect?.(node, null, event);
    onChange?.(nextValue, event);
  };

  const renderSearchRow = (item: ItemDataType, key: number) => {
    const regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
    const nodes = getNodeParents(item);
    nodes.push(item);
    const formattedNodes = nodes.map(node => {
      const labelElements = [];
      const a = node[labelKey].split(regx);
      const b = node[labelKey].match(regx);

      for (let i = 0; i < a.length; i++) {
        labelElements.push(a[i]);
        if (b && b[i]) {
          labelElements.push(<strong key={i}>{b[i]}</strong>);
        }
      }
      return { ...node, [labelKey]: labelElements };
    });

    const disabled = disabledItemValues.some(value =>
      formattedNodes.some(node => node[valueKey] === value)
    );
    const itemClasses = prefix('cascader-row', { 'cascader-row-disabled': disabled });

    return (
      <div
        key={key}
        className={itemClasses}
        onClick={event => {
          if (!disabled) {
            handleSearchRowSelect(item, nodes, event);
          }
        }}
      >
        {formattedNodes.map((node, index) => (
          <span key={`col-${index}`} className={prefix('cascader-col')}>
            {node[labelKey]}
          </span>
        ))}
      </div>
    );
  };

  const renderSearchResultPanel = () => {
    if (searchKeyword === '') {
      return null;
    }

    const items = getSearchResult();
    return (
      <div className={prefix('cascader-search-panel')}>
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
    const classes = merge(className, menuClassName, prefix('cascader-menu', { inline }));

    return (
      <MenuWrapper
        ref={mergeRefs(menuRef, speakerRef)}
        className={classes}
        style={styles}
        target={triggerRef}
      >
        {searchable && (
          <SearchBar
            placeholder={locale?.searchPlaceholder}
            onChange={handleSearch}
            value={searchKeyword}
          />
        )}

        {renderSearchResultPanel()}
        {searchKeyword === '' && (
          <DropdownMenu
            menuWidth={menuWidth}
            menuHeight={menuHeight}
            disabledItemValues={disabledItemValues}
            valueKey={valueKey}
            labelKey={labelKey}
            childrenKey={childrenKey}
            classPrefix={'picker-cascader-menu'}
            cascadeData={columnData}
            cascadePaths={selectedPaths}
            activeItemValue={value}
            loadingText={locale?.loading}
            onSelect={handleSelect}
            renderMenu={renderMenu}
            renderMenuItem={renderMenuItem}
          />
        )}
        {renderExtraFooter?.()}
      </MenuWrapper>
    );
  };

  let selectedElement: any = placeholder;

  if (valueToPaths.length > 0) {
    selectedElement = [];

    valueToPaths.forEach((item, index) => {
      const key = item[valueKey] || item[labelKey];
      selectedElement.push(<span key={key}>{item[labelKey]}</span>);
      if (index < valueToPaths.length - 1) {
        selectedElement.push(
          <span className="separator" key={`${key}-separator`}>
            {' / '}
          </span>
        );
      }
    });
  }

  if (!isNil(value) && isFunction(renderValue)) {
    selectedElement = renderValue(value, valueToPaths, selectedElement);
    // If renderValue returns null or undefined, hasValue is false.
    if (isNil(selectedElement)) {
      hasValue = false;
    }
  }

  const [classes, usedClassNameProps] = usePickerClassName({
    ...props,
    hasValue,
    name: 'cascader'
  });

  if (inline) {
    return renderDropdownMenu();
  }

  return (
    <PickerToggleTrigger
      pickerProps={pick(props, pickerToggleTriggerProps)}
      ref={triggerRef}
      placement={placement}
      onEntered={createChainedFunction(handleEntered, onEnter)}
      onExited={createChainedFunction(handleExited, onExited)}
      speaker={renderDropdownMenu}
    >
      <Component className={classes} style={style}>
        <PickerToggle
          {...omit(rest, [...pickerToggleTriggerProps, ...usedClassNameProps])}
          ref={toggleRef}
          as={toggleAs}
          onClean={createChainedFunction(handleClean, onClean)}
          cleanable={cleanable && !disabled}
          hasValue={hasValue}
          active={active}
        >
          {selectedElement || locale?.placeholder}
        </PickerToggle>
      </Component>
    </PickerToggleTrigger>
  );
});

Cascader.displayName = 'Cascader';
Cascader.defaultProps = defaultProps;
Cascader.propTypes = {
  ...listPickerPropTypes,
  disabledItemValues: PropTypes.array,
  locale: PropTypes.any,
  appearance: PropTypes.oneOf(['default', 'subtle']),
  renderMenu: PropTypes.func,
  onSelect: PropTypes.func,
  onSearch: PropTypes.func,
  cleanable: PropTypes.bool,
  renderMenuItem: PropTypes.func,
  menuWidth: PropTypes.number,
  menuHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  searchable: PropTypes.bool,
  inline: PropTypes.bool,
  parentSelectable: PropTypes.bool
};

export default Cascader;
