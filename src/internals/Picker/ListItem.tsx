import React from 'react';
import { useClassNames, useEventCallback } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import useCombobox from './hooks/useCombobox';

export interface ListItemProps
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  active?: boolean;
  disabled?: boolean;
  value?: string | number;
  focus?: boolean;
  title?: string;
  onSelect?: (value: any, event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  renderItem?: (value: any) => React.ReactNode;
}

const ListItem: RsRefForwardingComponent<'div', ListItemProps> = React.forwardRef(
  (props: ListItemProps, ref) => {
    const {
      as: Component = 'div',
      role = 'option',
      classPrefix = 'dropdown-menu-item',
      active,
      children,
      className,
      disabled,
      focus,
      value,
      onKeyDown,
      onSelect,
      renderItem,
      ...rest
    } = props;

    const { id } = useCombobox();

    const handleClick = useEventCallback((event: React.MouseEvent) => {
      event.preventDefault();
      if (!disabled) {
        onSelect?.(value, event);
      }
    });

    const { withClassPrefix, merge, rootPrefix } = useClassNames(classPrefix);
    const classes = withClassPrefix({ active, focus, disabled });

    return (
      <Component
        role={role}
        aria-selected={active}
        aria-disabled={disabled}
        id={id ? `${id}-opt-${value}` : undefined}
        data-key={value}
        {...rest}
        ref={ref}
        className={merge(className, rootPrefix`picker-list-item`)}
        tabIndex={-1}
        onKeyDown={disabled ? null : onKeyDown}
        onClick={handleClick}
      >
        <span className={classes}>{renderItem ? renderItem(value) : children}</span>
      </Component>
    );
  }
);

ListItem.displayName = 'ListItem';

export default ListItem;
