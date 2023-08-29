import React from 'react';
import classNames from 'classnames';
import { useClassNames } from '../utils';
import { StandardProps } from '../@types/common';
import ArrowDown from '@rsuite/icons/legacy/ArrowDown';
import useUniqueId from '../utils/useUniqueId';

interface ListboxOptionGroupProps
  extends StandardProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  expanded?: boolean;
  onClickTitle?: React.MouseEventHandler;
}

const ListboxOptionGroup = React.forwardRef<HTMLDivElement, ListboxOptionGroupProps>(
  (props, ref) => {
    const {
      classPrefix = 'dropdown-menu-group',
      title,
      children,
      className,
      expanded = true,
      onClickTitle,
      ...rest
    } = props;
    const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    const groupId = useUniqueId('listbox-group-');
    const labelId = groupId + '-label';

    return (
      <div
        role="group"
        id={groupId}
        aria-expanded={expanded}
        aria-labelledby={labelId}
        {...rest}
        ref={ref}
        className={classNames(classes, {
          folded: !expanded
        })}
      >
        <div className={prefix`title`} tabIndex={-1} onClick={onClickTitle}>
          <span id={labelId}>{title}</span>
          <ArrowDown aria-hidden className={prefix`caret`} />
        </div>
        {children}
      </div>
    );
  }
);
ListboxOptionGroup.displayName = 'Listbox.OptionGroup';

export default ListboxOptionGroup;
