import React, { useMemo } from 'react';
import useSortHelper, { SortConfig } from './helper/useSortHelper';
import ListContext, { ListContextType } from './ListContext';
import ListItem from './ListItem';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles, useCustom } from '@/internals/hooks';
import { forwardRef, mergeRefs } from '@/internals/utils';

export interface ListProps extends Omit<BoxProps, 'transitionDuration'>, SortConfig {
  /**
   * Size of list item.
   */

  size?: 'lg' | 'md' | 'sm' | 'xs';

  /**
   * Whether the list is bordered.
   */
  bordered?: boolean;

  /**
   * Whether the list is hoverable.
   */
  hover?: boolean;

  /**
   * Whether the list is sortable.
   */
  sortable?: boolean;

  /**
   * Whether to display a divider between items.
   *
   * @version 5.75.0
   */
  divider?: boolean;
}

const Subcomponents = {
  Item: ListItem
};

/**
 * The `List` component is used to specify the layout of the list.
 * @see https://rsuitejs.com/components/list
 */
const List = forwardRef<'div', ListProps, typeof Subcomponents>((props, ref) => {
  const { propsWithDefaults } = useCustom('List', props);
  const {
    as,
    autoScroll = true,
    bordered,
    classPrefix = 'list',
    className,
    children,
    divider = true,
    hover,
    size = 'md',
    sortable,
    pressDelay = 0,
    transitionDuration = 300,
    onSort,
    onSortEnd,
    onSortMove,
    onSortStart,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge } = useStyles(classPrefix);
  const {
    containerRef,
    register,
    sorting,
    handleEnd,
    handleStart,
    handleTouchStart,
    handleTouchEnd
  } = useSortHelper({
    autoScroll,
    onSort,
    onSortEnd,
    onSortMove,
    onSortStart,
    pressDelay,
    transitionDuration
  });

  const classes = merge(className, withPrefix());

  const contextValue = useMemo<ListContextType>(
    () => ({ bordered, size, register }),
    [bordered, register, size]
  );

  return (
    <Box
      as={as}
      role="list"
      ref={mergeRefs(containerRef, ref)}
      className={classes}
      onMouseDown={sortable ? handleStart : undefined}
      onMouseUp={sortable ? handleEnd : undefined}
      onTouchStart={sortable ? handleTouchStart : undefined}
      onTouchEnd={sortable ? handleTouchEnd : undefined}
      data-bordered={bordered}
      data-hover={hover}
      data-sortable={sortable}
      data-sorting={sorting}
      data-divider={divider}
      {...rest}
    >
      <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
    </Box>
  );
}, Subcomponents);

List.displayName = 'List';

export default List;
