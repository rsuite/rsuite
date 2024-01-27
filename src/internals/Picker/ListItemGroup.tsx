import React from 'react';
import { useClassNames } from '../../utils';
import { WithAsProps } from '../../@types/common';
import ArrowDown from '@rsuite/icons/legacy/ArrowDown';

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
          <ArrowDown aria-hidden className={prefix`caret`} />
        </div>
      </Component>
    );
  }
);

ListItemGroup.displayName = 'ListItemGroup';

export default ListItemGroup;
