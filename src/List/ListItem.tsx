import React, { useContext, useEffect, useRef } from 'react';
import ListContext from './ListContext';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, mergeRefs } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { Collection } from './helper/useManager';

export interface ListItemProps extends BoxProps, React.HTMLAttributes<HTMLElement> {
  /* Index of list item, for sort */
  index?: number;

  /* Symbol of collection*/
  collection?: Collection;

  /* disable drag */
  disabled?: boolean;

  /* Size of list item */
  size?: 'lg' | 'md' | 'sm' | 'xs';
}

/**
 * The `List.Item` component is used to specify the layout of the list item.
 * @see https://rsuitejs.com/components/list
 */
const ListItem = forwardRef<'div', ListItemProps>((props, ref) => {
  const {
    as,
    children,
    className,
    classPrefix = 'list-item',
    collection = 0,
    disabled,
    index,
    size: sizeProp,
    ...rest
  } = props;

  const { bordered, register, size: parentSize } = useContext(ListContext);
  const size = sizeProp || parentSize;
  const { withPrefix, merge } = useStyles(classPrefix);
  const listItemRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (listItemRef.current) {
      const { unregister } = register({
        node: listItemRef.current,
        edgeOffset: null,
        info: { collection, disabled, index }
      });
      return unregister;
    }
  }, [collection, disabled, index, register]);

  const classes = merge(className, withPrefix(size, { disabled, bordered }));

  return (
    <Box
      as={as}
      role="listitem"
      aria-disabled={disabled}
      ref={mergeRefs(listItemRef as any, ref)}
      className={classes}
      {...rest}
    >
      {children}
    </Box>
  );
});

ListItem.displayName = 'ListItem';

export default ListItem;
