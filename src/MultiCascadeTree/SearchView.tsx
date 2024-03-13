import React from 'react';
import { ItemDataType, WithAsProps } from '../@types/common';
import { getSafeRegExpString, useClassNames, useCustom } from '../utils';
import { getNodeParents } from '../utils/treeUtils';
import SearchBox from '../internals/SearchBox';
import Checkbox from '../Checkbox';
import { isSomeChildChecked } from './utils';

interface SearchViewProps<T> extends WithAsProps {
  searchKeyword: string;
  labelKey: string;
  valueKey: string;
  childrenKey: string;
  value: T[];
  data: ItemDataType<T>[];
  disabledItemValues: any[];
  cascade?: boolean;
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
    onSearch,
    onCheck,
    ...rest
  } = props;

  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());
  const { locale } = useCustom('Picker');

  const renderSearchRow = (item: ItemDataType<T>, key: number) => {
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
    const disabled = disabledItemValues.some(value => nodes.some(node => node[valueKey] === value));

    const itemClasses = prefix('row', {
      'row-disabled': disabled
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
            cascade && !active && isSomeChildChecked<any>(item, value, { valueKey, childrenKey })
          }
          onChange={(_value, checked, event) => {
            onCheck?.(item, event, checked);
          }}
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
        placeholder={locale?.searchPlaceholder}
        onChange={onSearch}
        value={searchKeyword}
        inputRef={inputRef}
      />
      {searchKeyword !== '' && (
        <div className={prefix('panel')} data-layer={0} role="tree">
          {data.length ? (
            data.map(renderSearchRow)
          ) : (
            <div className={prefix('none')}>{locale.noResultsText}</div>
          )}
        </div>
      )}
    </Component>
  );
}

export default SearchView;
