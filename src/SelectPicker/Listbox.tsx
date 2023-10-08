import React, { useRef, useState, useEffect, useCallback } from 'react';
import isUndefined from 'lodash/isUndefined';
import getPosition from 'dom-lib/getPosition';
import scrollTop from 'dom-lib/scrollTop';
import getHeight from 'dom-lib/getHeight';
import { List, AutoSizer, ListProps, ListHandle } from '../Windowing';
import shallowEqual from '../utils/shallowEqual';
import { mergeRefs, useClassNames, useMount } from '../utils';
import ListboxOptionGroup from './ListboxOptionGroup';
import { CompareFn, Group, groupOptions } from '../utils/getDataGroupBy';
import { StandardProps, Offset } from '../@types/common';
import ListboxOption from './ListboxOption';

interface ListboxProps<T, K>
  extends StandardProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  classPrefix: string;
  options: readonly T[];
  getOptionKey?: (option: T) => K;
  sort?: <B extends boolean>(isGroup: B) => B extends true ? CompareFn<Group<T>> : CompareFn<T>;
  groupBy?: string;
  disabledOptionKeys?: readonly K[];
  selectedOptionKey?: K;
  activeOptionKey?: K;
  maxHeight?: number;
  labelKey?: string;
  className?: string;
  style?: React.CSSProperties;
  optionClassPrefix?: string;
  rowHeight?: number;
  rowGroupHeight?: number;
  virtualized?: boolean;
  listProps?: Partial<ListProps>;
  listRef?: React.Ref<ListHandle>;

  /** Custom selected option */
  renderMenuItem?: (itemLabel: React.ReactNode, item: any) => React.ReactNode;
  renderMenuGroup?: (title: React.ReactNode, item: any) => React.ReactNode;
  onSelect?: (value: K, item: T, event: React.MouseEvent) => void;
  onGroupTitleClick?: (event: React.MouseEvent) => void;
}

type ListboxComponent = <T, K>(
  p: ListboxProps<T, K> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => JSX.Element;

const Listbox = React.forwardRef(function Listbox<T, K extends React.Key = React.Key>(
  props: ListboxProps<T, K>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    options = [],
    getOptionKey,
    groupBy,
    sort,
    maxHeight = 320,
    selectedOptionKey,
    disabledOptionKeys = [],
    classPrefix = 'dropdown-menu',
    labelKey = 'label',
    virtualized,
    listProps,
    listRef: virtualizedListRef,
    className,
    style,
    activeOptionKey,
    optionClassPrefix,
    rowHeight = 36,
    rowGroupHeight = 48,
    renderMenuGroup,
    renderMenuItem,
    onGroupTitleClick,
    onSelect,
    ...rest
  } = props;

  const group = typeof groupBy !== 'undefined';

  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix('items', { grouped: group }));

  const menuBodyContainerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<ListHandle>(null);

  const [foldedGroupKeys, setFoldedGroupKeys] = useState<string[]>([]);

  const handleGroupTitleClick = useCallback(
    (key: string, event: React.MouseEvent) => {
      const nextGroupKeys = foldedGroupKeys.filter(item => item !== key);
      if (nextGroupKeys.length === foldedGroupKeys.length) {
        nextGroupKeys.push(key);
      }
      setFoldedGroupKeys(nextGroupKeys);
      onGroupTitleClick?.(event);

      // See example https://codesandbox.io/s/grouped-list-with-sticky-headers-shgok?fontsize=14&file=/index.js:1314-1381
      listRef.current?.resetAfterIndex(0); // use group index to reduce calculation
    },
    [onGroupTitleClick, foldedGroupKeys]
  );

  useEffect(() => {
    const container = menuBodyContainerRef.current;

    if (!container) {
      return;
    }

    let activeItem = container.querySelector(`.${prefix('item-focus')}`);

    if (!activeItem) {
      activeItem = container.querySelector(`.${prefix('item-active')}`);
    }

    if (!activeItem) {
      return;
    }

    const position = getPosition(activeItem, container) as Offset;
    const sTop = scrollTop(container);
    const sHeight = getHeight(container);
    if (sTop > position.top) {
      scrollTop(container, Math.max(0, position.top - 20));
    } else if (position.top > sTop + sHeight) {
      scrollTop(container, Math.max(0, position.top - sHeight + 32));
    }
  }, [activeOptionKey, menuBodyContainerRef, prefix]);

  useMount(function scrollToSelectedOption() {
    if (virtualized && selectedOptionKey) {
      if (typeof groupBy === 'undefined') {
        const selectedOptionIndex = options.findIndex(
          option => getOptionKey?.(option) === selectedOptionKey
        );
        listRef.current?.scrollToItem(selectedOptionIndex);
      } else {
        const groups = groupOptions(options, groupBy, sort?.(false), sort?.(true));
        const selectedGroupIndex = groups.findIndex(group => group.key === selectedOptionKey);
        // TODO-Doma
        // This only scrolls the list to the group, not to the selected item within the group
        // .scrollToItem does not support specifying an px offset
        // Find a way to scroll to the selected item within the group
        listRef.current?.scrollToItem(selectedGroupIndex);
      }
    }
  });

  const renderOption = useCallback(
    (option: T, style?: React.CSSProperties) => {
      const optionKey = getOptionKey?.(option) ?? JSON.stringify(option);
      const label = option[labelKey];

      const disabled = disabledOptionKeys?.some(disabledValue =>
        shallowEqual(disabledValue, optionKey)
      );
      const selected = shallowEqual(selectedOptionKey, optionKey);
      const focus = !isUndefined(activeOptionKey) && shallowEqual(activeOptionKey, optionKey);

      return (
        <ListboxOption
          key={optionKey}
          style={style}
          disabled={disabled}
          selected={selected}
          active={focus}
          data-key={optionKey}
          classPrefix={optionClassPrefix}
          onClick={event => {
            if (!disabled) {
              onSelect?.(optionKey as K, option, event);
            }
          }}
        >
          {renderMenuItem ? renderMenuItem(label, option) : label}
        </ListboxOption>
      );
    },
    [
      getOptionKey,
      labelKey,
      disabledOptionKeys,
      selectedOptionKey,
      activeOptionKey,
      optionClassPrefix,
      renderMenuItem,
      onSelect
    ]
  );

  const renderOptions = useCallback(
    (options: readonly T[]) => {
      return options.map(option => renderOption(option));
    },
    [renderOption]
  );

  const renderOptionGroup = useCallback(
    (group: Group<T>) => {
      const groupKey = group.key;
      const expanded = !foldedGroupKeys.includes(groupKey);

      return (
        <ListboxOptionGroup
          key={groupKey}
          title={renderMenuGroup ? renderMenuGroup(groupKey, group) : groupKey}
          classPrefix={'picker-menu-group'}
          expanded={expanded}
          onClickTitle={e => handleGroupTitleClick(group.key, e)}
        >
          {renderOptions(group.options)}
        </ListboxOptionGroup>
      );
    },
    [foldedGroupKeys, handleGroupTitleClick, renderMenuGroup, renderOptions]
  );

  const renderOptionGroups = useCallback(
    (groupKey: string) => {
      const groups = groupOptions(options, groupKey, sort?.(false), sort?.(true));
      return groups.map(group => renderOptionGroup(group));
    },
    [options, renderOptionGroup, sort]
  );

  const renderVirtualizedOptions = useCallback(() => {
    return (
      <AutoSizer defaultHeight={maxHeight} style={{ width: 'auto', height: 'auto' }}>
        {({ height }) => (
          <List
            ref={mergeRefs(listRef, virtualizedListRef)}
            height={height || maxHeight}
            itemCount={options.length}
            itemSize={rowHeight}
            {...listProps}
          >
            {({ index, style }) => renderOption(options[index], style)}
          </List>
        )}
      </AutoSizer>
    );
  }, [listProps, maxHeight, options, renderOption, rowHeight, virtualizedListRef]);

  // Example of rendering option groups in VariableSizeList
  // https://github.com/bvaughn/react-window/issues/358
  const renderVirtualizedOptionGroups = useCallback(
    (groupKey: string) => {
      const groups = groupOptions(options, groupKey, sort?.(false), sort?.(true));
      return (
        <AutoSizer defaultHeight={maxHeight} style={{ width: 'auto', height: 'auto' }}>
          {({ height }) => (
            <List
              ref={mergeRefs(listRef, virtualizedListRef)}
              height={height || maxHeight}
              itemCount={groups.length}
              itemSize={index => {
                const item = groups[index];

                const expanded = !foldedGroupKeys.includes(item.key);
                if (expanded) {
                  return item.options.length * rowHeight + rowGroupHeight;
                }

                return rowGroupHeight;
              }}
              {...listProps}
            >
              {({ index }) => renderOptionGroup(groups[index])}
            </List>
          )}
        </AutoSizer>
      );
    },
    [
      foldedGroupKeys,
      listProps,
      maxHeight,
      options,
      renderOptionGroup,
      rowGroupHeight,
      rowHeight,
      sort,
      virtualizedListRef
    ]
  );

  return (
    <div
      role="listbox"
      {...rest}
      className={classes}
      ref={mergeRefs(menuBodyContainerRef, ref)}
      style={{ ...style, maxHeight }}
    >
      {typeof groupBy === 'undefined'
        ? virtualized
          ? renderVirtualizedOptions()
          : renderOptions(options)
        : virtualized
        ? renderVirtualizedOptionGroups(groupBy)
        : renderOptionGroups(groupBy)}
    </div>
  );
}) as ListboxComponent;

export default Listbox;
