import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface DropdownMenuItemProps extends WithAsProps {
  active?: boolean;
  disabled?: boolean;
  value?: any;
  focus?: boolean;
  title?: string;
  onSelect?: (value: any, event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  renderItem?: (value: any) => React.ReactNode;
}

const DropdownMenuItem: RsRefForwardingComponent<'div', DropdownMenuItemProps> = React.forwardRef(
  (props: DropdownMenuItemProps, ref) => {
    const {
      as: Component = 'div',
      active,
      classPrefix = 'dropdown-menu-item',
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

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        if (!disabled) {
          onSelect?.(value, event);
        }
      },
      [onSelect, disabled, value]
    );

    const { withClassPrefix } = useClassNames(classPrefix);
    const classes = withClassPrefix({ active, focus, disabled });

    return (
      <Component
        role="option"
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

DropdownMenuItem.displayName = 'DropdownMenuItem';
DropdownMenuItem.propTypes = {
  classPrefix: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  onSelect: PropTypes.func,
  onKeyDown: PropTypes.func,
  focus: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.elementType
};

export default DropdownMenuItem;
