import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { StandardProps } from '../@types/common';
import { mergeRefs, useClassNames } from '../utils';
import ListContext from './ListContext';
import { Collection } from './helper/useManager';

export interface ListItemProps extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /* Index of list item, for sort */
  index?: number;

  /* Symbol of collection*/
  collection?: Collection;

  /* disable drag */
  disabled?: boolean;
}

const ListItem = React.forwardRef((props: ListItemProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    children,
    className,
    classPrefix = 'list-item',
    collection = 0,
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
      info: {
        collection,
        disabled,
        index
      }
    });
    return unregister;
  }, [collection, disabled, index, register]);
  const classes = merge(
    className,
    withClassPrefix(size, {
      disabled,
      bordered
    })
  );
  return (
    <div
      {...rest}
      role="listitem"
      aria-disabled={disabled}
      ref={mergeRefs(listItemRef, ref)}
      className={classes}
    >
      {children}
    </div>
  );
});

ListItem.displayName = 'ListItem';
ListItem.propTypes = {
  index: PropTypes.number,
  collection: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  children: PropTypes.node
};
export default ListItem;
