import React from 'react';
import { ItemDataType } from '../@types/common';
import { getSafeRegExpString } from '../utils';
import { getPathTowardsItem } from '../utils/treeUtils';
import SearchBox from '../internals/SearchBox';

interface SearchPanelProps<T> {
  searchKeyword: string;
  locale: Record<string, any>;
  prefix: (...args: any[]) => string;
  labelKey: string;
  valueKey: string;
  parentMap: WeakMap<ItemDataType<T>, ItemDataType<T>>;
  data: ItemDataType<T>[];
  focusItemValue?: T | null;
  disabledItemValues: any[];
  renderSearchItem?: (label: React.ReactNode, items: ItemDataType<T>[]) => React.ReactNode;
  onSelect: (item: ItemDataType<T>, items: ItemDataType<T>[], event: React.MouseEvent) => void;
  onSearch: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

function SearchPanel<T>(props: SearchPanelProps<T>) {
  const {
    searchKeyword,
    locale,
    prefix,
    labelKey,
    valueKey,
    parentMap,
    data,
    focusItemValue,
    disabledItemValues,
    inputRef,
    renderSearchItem,
    onSearch,
    onSelect
  } = props;

  const renderSearchRow = (item: ItemDataType<T>, key: number) => {
    const regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
    const items = getPathTowardsItem(item, item => parentMap.get(item));
    const formattedNodes = items.map(itemData => {
      const labelElements: React.ReactElement[] = [];
      const a = itemData[labelKey].split(regx);
      const b = itemData[labelKey].match(regx);

      for (let i = 0; i < a.length; i++) {
        labelElements.push(a[i]);
        if (b && b[i]) {
          labelElements.push(
            <span key={i} className={prefix('cascader-search-match')}>
              {b[i]}
            </span>
          );
        }
      }
      return {
        ...itemData,
        [labelKey]: labelElements
      };
    });

    const disabled = disabledItemValues.some(value =>
      formattedNodes.some(itemData => itemData[valueKey] === value)
    );
    const itemClasses = prefix('cascader-row', {
      'cascader-row-disabled': disabled,
      'cascader-row-focus': item[valueKey] === focusItemValue
    });

    const label = formattedNodes.map((itemData, index) => (
      <span key={`col-${index}`} className={prefix('cascader-col')}>
        {itemData[labelKey]}
      </span>
    ));

    return (
      <div
        role="treeitem"
        key={key}
        aria-disabled={disabled}
        data-key={item[valueKey]}
        className={itemClasses}
        tabIndex={-1}
        onClick={event => {
          if (!disabled) {
            onSelect(item, items, event);
          }
        }}
      >
        {renderSearchItem ? renderSearchItem(label, items) : label}
      </div>
    );
  };

  return (
    <>
      <SearchBox
        placeholder={locale?.searchPlaceholder}
        onChange={onSearch}
        value={searchKeyword}
        inputRef={inputRef}
      />
      {searchKeyword !== '' && (
        <div className={prefix('cascader-search-panel')} data-layer={0} role="tree">
          {data.length ? (
            data.map(renderSearchRow)
          ) : (
            <div className={prefix('none')}>{locale.noResultsText}</div>
          )}
        </div>
      )}
    </>
  );
}

export default SearchPanel;
