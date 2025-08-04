import React from 'react';
import Button, { ButtonProps } from '../Button';
import { useStyles, useEventCallback } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';

export interface PaginationButtonProps<T = number | string> extends Omit<ButtonProps, 'onSelect'> {
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
const PaginationButton = forwardRef<typeof Button, PaginationButtonProps>((props, ref) => {
  const {
    as,
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

  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

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

  return (
    <Button
      {...rest}
      as={as}
      disabled={disabled}
      onClick={handleClick}
      ref={ref}
      className={classes}
      appearance="subtle"
      aria-disabled={disabled}
      aria-current={active ? 'page' : undefined}
      active={active}
      data-event-key={eventKey}
    >
      {children}
    </Button>
  );
});

PaginationButton.displayName = 'PaginationButton';

export default PaginationButton;
