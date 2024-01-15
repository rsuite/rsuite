import React from 'react';
import { useClassNames, useEventCallback } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface ListItemProps
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  active?: boolean;
  disabled?: boolean;
  value?: any;
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

    const handleClick = useEventCallback((event: React.MouseEvent) => {
      event.preventDefault();
      if (!disabled) {
        onSelect?.(value, event);
      }
    });

    const { withClassPrefix } = useClassNames(classPrefix);
    const classes = withClassPrefix({ active, focus, disabled });

    return (
      <Component
        role={role}
        aria-selected={active}
        aria-disabled={disabled}
        data-key={value}
        {...rest}
        ref={ref}
        className={className}
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
