import React from 'react';
import SearchBox from '@/internals/SearchBox';
import Highlight from '../Highlight';
import { ItemDataType, WithAsProps } from '@/internals/types';
import { useClassNames } from '@/internals/hooks';
import { getPathTowardsItem } from '@/internals/Tree/utils';
import { useCustom } from '../CustomProvider';

interface SearchViewProps<T> extends WithAsProps {
  searchKeyword: string;
  labelKey: string;
  valueKey: string;
  parentMap: WeakMap<ItemDataType<T>, ItemDataType<T>>;
  data: ItemDataType<T>[];
  focusItemValue?: T | null;
  disabledItemValues: any[];
  locale?: Record<string, string>;
  renderSearchItem?: (label: React.ReactNode, items: ItemDataType<T>[]) => React.ReactNode;
  onSelect: (item: ItemDataType<T>, items: ItemDataType<T>[], event: React.MouseEvent) => void;
  onSearch: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
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
    focusItemValue,
    disabledItemValues,
    inputRef,
    renderSearchItem,
    onSearch,
    onSelect,
    ...rest
  } = props;

  const { merge, prefix, withClassPrefix, rootPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());
  const { getLocale } = useCustom();
  const { searchPlaceholder, noResultsText } = getLocale('Combobox', overrideLocale);

  const renderSearchRow = (item: ItemDataType<T>, key: number) => {
    const items = getPathTowardsItem(item, item => parentMap.get(item));

    const formattedNodes = items.map(itemData => {
      const label = (
        <Highlight as="span" query={searchKeyword}>
          {itemData[labelKey]}
        </Highlight>
      );

      return { ...itemData, [labelKey]: label };
    });

    const disabled = disabledItemValues.some(value =>
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
        aria-disabled={disabled}
        aria-label={item[labelKey]}
        key={key}
        data-key={item[valueKey]}
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
      />
      {searchKeyword !== '' && (
        <div className={prefix('panel')} data-layer={0} role="tree">
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
