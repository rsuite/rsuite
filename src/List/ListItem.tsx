import React from 'react';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { WithAsProps } from '../@types/common';
import { mergeRefs, useClassNames } from '../utils';
import ListContext from './ListContext';
import { Collection } from './helper/useManager';

export interface ListItemProps extends WithAsProps {
  /* Index of list item, for sort */
  index?: number;

  /* Symbol of collection*/
  collection?: Collection;

  /* disable drag */
  disabled?: boolean;
}

const defaultProps: Partial<ListItemProps> = {
  as: 'div',
  classPrefix: 'list-item',
  collection: 0
};

const ListItem = React.forwardRef((props: ListItemProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    as: Component,
    children,
    className,
    classPrefix,
    collection,
    disabled,
    index,
    ...rest
  } = props;

  const { bordered, register, size } = useContext(ListContext);
  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const listItemRef = useRef(null);

  useEffect(() => {
    const { unregister } = register({
      node: listItemRef.current,
      edgeOffset: null,
      info: { collection, disabled, index }
    });
    return unregister;
  }, [collection, disabled, index, register]);

  const classes = merge(className, withClassPrefix(size, { disabled, bordered }));

  return (
    <Component
      role="listitem"
      aria-disabled={disabled}
      {...rest}
      ref={mergeRefs(listItemRef, ref)}
      className={classes}
    >
      {children}
    </Component>
  );
});

ListItem.displayName = 'ListItem';
ListItem.defaultProps = defaultProps;
ListItem.propTypes = {
  index: PropTypes.number,
  collection: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  children: PropTypes.node
};
export default ListItem;
