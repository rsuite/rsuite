import React from 'react';
import SearchBox from '@/internals/SearchBox';
import getOptionKey from '@/internals/Picker/getOptionKey';
import getOptionId from '@/internals/Picker/getOptionId';
import { useCombobox } from '@/internals/Picker';
import Highlight from '../Highlight';
import { Option, WithAsProps } from '@/internals/types';
import { useStyles, useCustom, useUniqueId } from '@/internals/hooks';
import { getPathTowardsItem } from '@/internals/Tree/utils';

interface SearchViewProps<T> extends WithAsProps {
  disabled?: boolean;
  searchKeyword: string;
  labelKey: string;
  valueKey: string;
  parentMap: WeakMap<Option<T>, Option<T>>;
  data: Option<T>[];
  value?: T | null;
  focusItemValue?: T | null;
  disabledItemValues: any[];
  locale?: Record<string, string>;
  renderSearchItem?: (label: React.ReactNode, items: Option<T>[]) => React.ReactNode;
  onSelect: (item: Option<T>, items: Option<T>[], event: React.MouseEvent) => void;
  onSearch: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

function SearchView<T>(props: SearchViewProps<T>) {
  const {
    as: Component = 'div',
    classPrefix = 'cascade-search-view',
    className,
    searchKeyword,
    labelKey,
    locale: overrideLocale,
    valueKey,
    parentMap,
    data,
    value,
    focusItemValue,
    disabled: disabledProp,
    disabledItemValues,
    inputRef,
    renderSearchItem,
    onSearch,
    onSelect,
    ...rest
  } = props;

  const { merge, prefix, withPrefix, rootPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());
  const { getLocale } = useCustom();
  const { searchPlaceholder, noResultsText } = getLocale('Combobox', overrideLocale);
  const { id, popupType, labelId } = useCombobox();
  const searchId = useUniqueId('rs-cascade-search-', id);
  const treeId = `${searchId}-${popupType || 'tree'}`;
  const activeDescendant =
    searchKeyword !== '' &&
    focusItemValue !== undefined &&
    focusItemValue !== null &&
    data.some(item => item[valueKey] === focusItemValue)
      ? getOptionId(searchId, focusItemValue)
      : undefined;

  const renderSearchRow = (item: Option<T>, index: number) => {
    const nodeValue = item[valueKey];
    const itemKey =
      typeof nodeValue === 'number' || typeof nodeValue === 'string'
        ? getOptionKey(nodeValue)
        : index;
    const items = getPathTowardsItem(item, item => parentMap.get(item));

    const formattedNodes = items.map(itemData => {
      const label = (
        <Highlight as="span" query={searchKeyword}>
          {itemData[labelKey]}
        </Highlight>
      );

      return { ...itemData, [labelKey]: label };
    });

    const disabled =
      disabledProp ||
      disabledItemValues.some(value =>
        formattedNodes.some(itemData => itemData[valueKey] === value)
      );
    const itemClasses = prefix('row', {
      'row-disabled': disabled,
      'row-focus': item[valueKey] === focusItemValue
    });

    const label = formattedNodes.map((itemData, index) => (
      <span key={`col-${index}`} className={prefix('col')}>
        {itemData[labelKey]}
      </span>
    ));

    const handleCheck = (event: React.MouseEvent) => {
      if (!disabled) {
        onSelect(item, items, event);
      }
    };

    return (
      <div
        role="treeitem"
        id={getOptionId(searchId, nodeValue)}
        aria-selected={nodeValue === value}
        aria-disabled={disabled}
        aria-label={item[labelKey]}
        key={itemKey}
        data-key={item[valueKey]}
        data-picker-key={getOptionKey(nodeValue)}
        className={itemClasses}
        tabIndex={-1}
        onClick={handleCheck}
      >
        {renderSearchItem ? renderSearchItem(label, items) : label}
      </div>
    );
  };

  return (
    <Component className={classes} {...rest}>
      <SearchBox
        placeholder={searchPlaceholder}
        onChange={onSearch}
        value={searchKeyword}
        inputRef={inputRef}
        inputProps={{
          'aria-controls': searchKeyword !== '' || id ? treeId : undefined,
          'aria-activedescendant': activeDescendant
        }}
      />
      {searchKeyword !== '' && (
        <div
          className={prefix('panel')}
          data-layer={0}
          role="tree"
          id={treeId}
          aria-labelledby={labelId}
        >
          {data.length ? (
            data.map(renderSearchRow)
          ) : (
            <div className={merge(prefix('none'), rootPrefix('picker-none'))}>{noResultsText}</div>
          )}
        </div>
      )}
    </Component>
  );
}

export default SearchView;
