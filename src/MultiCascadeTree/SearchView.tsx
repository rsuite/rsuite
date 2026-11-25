import React from 'react';
import SearchBox from '@/internals/SearchBox';
import getOptionKey from '@/internals/Picker/getOptionKey';
import getOptionId from '@/internals/Picker/getOptionId';
import { useCombobox } from '@/internals/Picker';
import Checkbox from '../Checkbox';
import Highlight from '../Highlight';
import { useStyles, useCustom, useUniqueId } from '@/internals/hooks';
import { isSomeChildChecked, getNodeParents } from './utils';
import type { Option, WithAsProps } from '@/internals/types';

interface SearchViewProps<T> extends WithAsProps {
  disabled?: boolean;
  searchKeyword: string;
  labelKey: string;
  valueKey: string;
  childrenKey: string;
  value: T[];
  focusItemValue?: T | null;
  data: Option<T>[];
  disabledItemValues: any[];
  cascade?: boolean;
  locale?: Record<string, string>;
  onSearch: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheck: (item: Option<T>, event: React.SyntheticEvent, checked: boolean) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
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
    focusItemValue,
    data,
    disabled: disabledProp,
    disabledItemValues,
    inputRef,
    cascade,
    locale: overrideLocale,
    onSearch,
    onCheck,
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
    const disabled =
      disabledProp ||
      disabledItemValues.some(value => nodes.some(node => node[valueKey] === value));

    const rowClasses = prefix('row', { 'row-disabled': disabled });
    const indeterminate =
      cascade && !active && isSomeChildChecked<any>(item, value, { valueKey, childrenKey });

    const handleChange = (_value: any, checked: boolean, event: React.SyntheticEvent) => {
      if (!disabled) onCheck?.(item, event, checked);
    };

    return (
      <div
        role="treeitem"
        id={getOptionId(searchId, nodeValue)}
        aria-selected={active}
        aria-disabled={disabled}
        key={itemKey}
        className={rowClasses}
        data-key={item[valueKey]}
        data-picker-key={getOptionKey(nodeValue)}
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
          aria-multiselectable
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
