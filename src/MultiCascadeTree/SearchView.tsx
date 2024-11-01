import React from 'react';
import SearchBox from '@/internals/SearchBox';
import Checkbox from '../Checkbox';
import Highlight from '../Highlight';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { isSomeChildChecked, getNodeParents } from './utils';
import type { ItemDataType, WithAsProps } from '@/internals/types';

interface SearchViewProps<T> extends WithAsProps {
  searchKeyword: string;
  labelKey: string;
  valueKey: string;
  childrenKey: string;
  value: T[];
  data: ItemDataType<T>[];
  disabledItemValues: any[];
  cascade?: boolean;
  locale?: Record<string, string>;
  onSearch: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheck: (item: ItemDataType<T>, event: React.SyntheticEvent, checked: boolean) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

function SearchView<T>(props: SearchViewProps<T>) {
  const {
    as: Component = 'div',
    classPrefix = 'cascade-search-view',
    className,
    searchKeyword,
    childrenKey,
    labelKey,
    valueKey,
    value,
    data,
    disabledItemValues,
    inputRef,
    cascade,
    locale: overrideLocale,
    onSearch,
    onCheck,
    ...rest
  } = props;

  const { merge, prefix, withClassPrefix, rootPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());
  const { getLocale } = useCustom();
  const { searchPlaceholder, noResultsText } = getLocale('Combobox', overrideLocale);

  const renderSearchRow = (item: ItemDataType<T>, key: number) => {
    const nodes = getNodeParents(item);
    const label = (
      <Highlight as="span" query={searchKeyword}>
        {item[labelKey]}
      </Highlight>
    );

    nodes.push({ ...item, [labelKey]: label });

    const active = value.some(value => {
      if (cascade) {
        return nodes.some(node => node[valueKey] === value);
      }
      return item[valueKey] === value;
    });
    const disabled = disabledItemValues.some(value => nodes.some(node => node[valueKey] === value));

    const rowClasses = prefix('row', { 'row-disabled': disabled });
    const indeterminate =
      cascade && !active && isSomeChildChecked<any>(item, value, { valueKey, childrenKey });

    const handleChange = (_value: any, checked: boolean, event: React.SyntheticEvent) => {
      onCheck?.(item, event, checked);
    };

    return (
      <div
        role="treeitem"
        aria-disabled={disabled}
        key={key}
        className={rowClasses}
        data-key={item[valueKey]}
      >
        <Checkbox
          disabled={disabled}
          checked={active}
          value={item[valueKey]}
          indeterminate={indeterminate}
          onChange={handleChange}
        >
          <span className={prefix('col-group')}>
            {nodes.map((node, index) => (
              <span key={`col-${index}`} className={prefix('col')}>
                {node[labelKey]}
              </span>
            ))}
          </span>
        </Checkbox>
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
