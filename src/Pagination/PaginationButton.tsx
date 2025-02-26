import React, { useMemo } from 'react';
import Button from '../Button';
import { useClassNames, useEventCallback } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import type { WithAsProps, HTMLPropsWithoutSelect } from '@/internals/types';

export interface PaginationButtonProps<T = number | string>
  extends WithAsProps,
    HTMLPropsWithoutSelect<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>> {
  /** The value of the current option */
  eventKey: T;

  /** A button can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** A button can show it is currently the active user selection */
  active?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** Called when the button is clicked */
  onClick?: React.MouseEventHandler<HTMLElement>;

  /** Select the callback function for the current option */
  onSelect?: (eventKey: T, event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * PaginationButton component for pagination navigation.
 * Renders a button that can be used in pagination contexts.
 */
const PaginationButton = forwardRef<'button', PaginationButtonProps>((props, ref) => {
  const {
    as: Component = Button,
    active,
    disabled,
    className,
    classPrefix = 'pagination-btn',
    children,
    eventKey,
    onSelect,
    onClick,
    ...rest
  } = props;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ active, disabled }));

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      return;
    }

    onClick?.(event);

    // Only call onSelect if the event hasn't been prevented
    if (!event.defaultPrevented && onSelect) {
      onSelect(eventKey, event);
    }
  });

  // Determine props to pass based on component type
  const asProps: Partial<PaginationButtonProps> = useMemo(
    () =>
      Component !== Button && typeof Component !== 'string'
        ? { eventKey, active, role: 'button' }
        : {},
    [Component, eventKey, active]
  );

  return (
    <Component
      {...rest}
      {...asProps}
      disabled={disabled}
      onClick={handleClick}
      ref={ref}
      className={classes}
      role="button"
      aria-disabled={disabled}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </Component>
  );
});

PaginationButton.displayName = 'PaginationButton';

export default PaginationButton;
