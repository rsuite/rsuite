import React from 'react';
import { useClassNames } from '../hooks';
import { WithAsProps } from '@/internals/types';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';

export interface ListItemGroupProps extends WithAsProps, React.HTMLAttributes<HTMLDivElement> {}

const ListItemGroup = React.forwardRef(
  (props: ListItemGroupProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      as: Component = 'div',
      classPrefix = 'dropdown-menu-group',
      children,
      className,
      ...rest
    } = props;
    const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <Component role="group" {...rest} ref={ref} className={classes}>
        <div className={prefix`title`} tabIndex={-1}>
          <span>{children}</span>
          <ArrowDownIcon aria-hidden className={prefix`caret`} />
        </div>
      </Component>
    );
  }
);

ListItemGroup.displayName = 'ListItemGroup';

export default ListItemGroup;
