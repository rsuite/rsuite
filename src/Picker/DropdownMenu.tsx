import React, { useRef, useState, useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import findIndex from 'lodash/findIndex';
import pickBy from 'lodash/pickBy';
import getPosition from 'dom-lib/getPosition';
import scrollTop from 'dom-lib/scrollTop';
import getHeight from 'dom-lib/getHeight';
import get from 'lodash/get';
import classNames from 'classnames';
import {
  List,
  AutoSizer,
  ListProps,
  ListHandle,
  VariableSizeList,
  ListChildComponentProps
} from '../Windowing';
import shallowEqual from '../utils/shallowEqual';
import { mergeRefs, useClassNames, useMount, useEventCallback } from '../utils';
import DropdownMenuGroup from './DropdownMenuGroup';
import { KEY_GROUP, KEY_GROUP_TITLE } from '../utils/getDataGroupBy';
import { StandardProps, ItemDataType, Offset } from '../@types/common';
import useCombobox from './hooks/useCombobox';

export interface DropdownMenuProps<Multiple = false>
  extends StandardProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  classPrefix: string;
  data?: ItemDataType[];
  group?: boolean;
  groupBy?: string;
  disabledItemValues?: any[];
  activeItemValues?: any[];
  focusItemValue?: any;
  maxHeight?: number;
  valueKey?: string;
  labelKey?: string;
  className?: string;
  style?: React.CSSProperties;
  dropdownMenuItemAs: React.ElementType | string;
  dropdownMenuItemClassPrefix?: string;
  dropdownMenuItemProps?: any;
  rowHeight?: number;
  rowGroupHeight?: number;
  virtualized?: boolean;
  listProps?: Partial<ListProps>;
  listRef?: React.Ref<ListHandle>;

  /** Custom selected option */
  renderMenuItem?: (itemLabel: React.ReactNode, item: any) => React.ReactNode;
  renderMenuGroup?: (title: React.ReactNode, item: any) => React.ReactNode;
  onSelect?: Multiple extends true
    ? (value: any, item: any, event: React.MouseEvent, checked: boolean) => void
    : Multiple extends false
    ? (value: any, item: any, event: React.MouseEvent) => void
    : any;
  onGroupTitleClick?: (event: React.MouseEvent) => void;
}

export type DropdownMenuComponent = React.ForwardRefExoticComponent<DropdownMenuProps> & {
  <Multiple = false>(props: DropdownMenuProps<Multiple>): React.ReactElement | null;
};

const DropdownMenu: DropdownMenuComponent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuProps<any>
>((props, ref) => {
  const {
    data = [],
    group,
    groupBy,
    maxHeight = 320,
    activeItemValues = [],
    disabledItemValues = [],
    classPrefix = 'dropdown-menu',
    valueKey = 'value',
    labelKey = 'label',
    virtualized,
    listProps,
    listRef: virtualizedListRef,
    className,
    style,
    focusItemValue,
    dropdownMenuItemClassPrefix,
    dropdownMenuItemAs: DropdownMenuItem,
    dropdownMenuItemProps,
    rowHeight = 36,
    rowGroupHeight = 48,
    renderMenuGroup,
    renderMenuItem,
    onGroupTitleClick,
    onSelect,
    ...rest
  } = props;

  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix('items', { grouped: group }));
  const { id, labelId, popupType, multiple } = useCombobox();

  const menuBodyContainerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<ListHandle>(null);

  const [foldedGroupKeys, setFoldedGroupKeys] = useState<string[]>([]);

  const handleGroupTitleClick = useEventCallback((key: string, event: React.MouseEvent) => {
    const nextGroupKeys = foldedGroupKeys.filter(item => item !== key);
    if (nextGroupKeys.length === foldedGroupKeys.length) {
      nextGroupKeys.push(key);
    }
    setFoldedGroupKeys(nextGroupKeys);
    onGroupTitleClick?.(event);
  });

  const handleSelect = useEventCallback(
    (item: any, value: any, event: React.MouseEvent, checked?: boolean) => {
      onSelect?.(value, item, event, checked);
    }
  );

  const getRowHeight = (list: any[], index) => {
    const item = list[index];

    if (group && item[KEY_GROUP] && index !== 0) {
      return rowGroupHeight;
    }

    return rowHeight;
  };

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
  }, [focusItemValue, menuBodyContainerRef, prefix]);

  const renderItem = ({
    index = 0,
    style,
    data,
    item: itemData
  }: Partial<ListChildComponentProps> & { item?: any }) => {
    const item = itemData || data[index];
    const value = item[valueKey];
    const label = item[labelKey];

    if (isUndefined(label) && !item[KEY_GROUP]) {
      throw Error(`labelKey "${labelKey}" is not defined in "data" : ${index}`);
    }

    // Use `value` in keys when If `value` is string or number
    const itemKey = isString(value) || isNumber(value) ? value : index;

    /**
     * Render <DropdownMenuGroup>
     * when if `group` is enabled
     */
    if (group && item[KEY_GROUP]) {
      const groupValue = item[KEY_GROUP_TITLE];
      // TODO: grouped options should be owned by group
      return (
        <DropdownMenuGroup
          style={style}
          classPrefix={'picker-menu-group'}
          className={classNames({
            folded: foldedGroupKeys.some(key => key === groupValue)
          })}
          key={`group-${groupValue}`}
          onClick={handleGroupTitleClick.bind(null, groupValue)}
        >
          {renderMenuGroup ? renderMenuGroup(groupValue, item) : groupValue}
        </DropdownMenuGroup>
      );
    } else if (isUndefined(value) && !isUndefined(item[KEY_GROUP])) {
      throw Error(`valueKey "${valueKey}" is not defined in "data" : ${index} `);
    }

    const disabled = disabledItemValues?.some(disabledValue => shallowEqual(disabledValue, value));
    const active = activeItemValues?.some(v => shallowEqual(v, value));
    const focus = !isUndefined(focusItemValue) && shallowEqual(focusItemValue, value);

    return (
      <DropdownMenuItem
        style={style}
        key={itemKey}
        disabled={disabled}
        active={active}
        focus={focus}
        value={value}
        classPrefix={dropdownMenuItemClassPrefix}
        onSelect={handleSelect.bind(null, item)}
        {...pickBy(dropdownMenuItemProps, v => v !== undefined)}
      >
        {renderMenuItem ? renderMenuItem(label, item) : label}
      </DropdownMenuItem>
    );
  };

  const filteredItems = group
    ? data.filter(item => {
        // Display group title items
        if (item[KEY_GROUP as keyof typeof item]) return true;

        // Display items under the unfolded group
        // FIXME-Doma
        // `groupBy` is bound to be string when `group` is true
        // because `group` is actually redundant as a prop
        // It could simply be derived from `groupBy` value
        const groupValue =
          get(item, groupBy as string, '') ||
          // FIXME-Doma
          // Usage of `item.parent` is strongly discouraged
          // It's only here for legacy support
          // Remove once `item.parent` is completely removed across related components
          item.parent?.[KEY_GROUP_TITLE];
        return !foldedGroupKeys.includes(groupValue);
      })
    : data;
  const rowCount = filteredItems.length;

  useMount(() => {
    const itemIndex = findIndex(filteredItems, item => item[valueKey] === activeItemValues?.[0]);
    listRef.current?.scrollToItem?.(itemIndex);
  });

  return (
    <div
      role="listbox"
      id={`${id}-${popupType}`}
      aria-labelledby={labelId}
      aria-multiselectable={multiple}
      {...rest}
      className={classes}
      ref={mergeRefs(menuBodyContainerRef, ref)}
      style={{ ...style, maxHeight }}
    >
      {virtualized ? (
        <AutoSizer defaultHeight={maxHeight} style={{ width: 'auto', height: 'auto' }}>
          {({ height }) => (
            <List
              as={VariableSizeList}
              ref={mergeRefs(listRef, virtualizedListRef)}
              height={height || maxHeight}
              itemCount={rowCount}
              itemData={filteredItems}
              itemSize={getRowHeight.bind(this, filteredItems)}
              {...listProps}
            >
              {renderItem}
            </List>
          )}
        </AutoSizer>
      ) : (
        filteredItems.map((item, index: number) => renderItem({ index, item }))
      )}
    </div>
  );
});

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
