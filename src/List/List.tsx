import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import useSortHelper, { SortConfig } from './helper/useSortHelper';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { mergeRefs, useClassNames } from '../utils';
import ListContext, { ListContextType } from './ListContext';
import ListItem from './ListItem';

export interface ListProps extends WithAsProps, SortConfig {
  /* Size of list item */
  size?: 'lg' | 'md' | 'sm';

  /* Bordered */
  bordered?: boolean;

  /* Animation when hover */
  hover?: boolean;

  /* Sortable */
  sortable?: boolean;
}

const defaultProps: Partial<ListProps> = {
  as: 'div',
  classPrefix: 'list',
  size: 'md',
  autoScroll: true,
  pressDelay: 0,
  transitionDuration: 300
};

export interface ListComponent extends RsRefForwardingComponent<'div', ListProps> {
  Item?: typeof ListItem;
}

const List: ListComponent = React.forwardRef((props: ListProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    as: Component,
    classPrefix,
    className,
    bordered,
    hover,
    size,
    sortable,
    autoScroll,
    pressDelay,
    transitionDuration,
    children,
    onSort,
    onSortEnd,
    onSortMove,
    onSortStart,
    ...rest
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const { containerRef, register, sorting, handleEnd, handleStart } = useSortHelper({
    autoScroll,
    onSort,
    onSortEnd,
    onSortMove,
    onSortStart,
    pressDelay,
    transitionDuration
  });

  const classes = merge(className, withClassPrefix({ bordered, sortable, sorting, hover }));
  const contextValue = useMemo<ListContextType>(() => ({ bordered, size, register }), [
    bordered,
    register,
    size
  ]);
  return (
    <Component
      role="list"
      {...rest}
      ref={mergeRefs(containerRef, ref)}
      className={classes}
      onMouseDown={sortable ? handleStart : undefined}
      onMouseUp={sortable ? handleEnd : undefined}
    >
      <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
    </Component>
  );
});

List.Item = ListItem;

List.displayName = 'List';
List.defaultProps = defaultProps;
List.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  bordered: PropTypes.bool,
  hover: PropTypes.bool,
  sortable: PropTypes.bool,
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  autoScroll: PropTypes.bool,
  pressDelay: PropTypes.number,
  transitionDuration: PropTypes.number,
  onSortStart: PropTypes.func,
  onSortMove: PropTypes.func,
  onSortEnd: PropTypes.func,
  onSort: PropTypes.func
};

export default List;
