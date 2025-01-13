import React from 'react';
import Ripple from '@/internals/Ripple';
import { useClassNames, useEventCallback } from '@/internals/hooks';
import { forwardRef, createChainedFunction } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

export interface PaginationButtonProps<T = number | string>
  extends WithAsProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  /** The value of the current option */
  eventKey: T;

  /** Called when the button is clicked. */
  onClick?: React.MouseEventHandler;

  /** A button can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** A button can show it is currently the active user selection */
  active?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: T, event: React.MouseEvent) => void;
}

const PaginationButton = forwardRef<'button', PaginationButtonProps>((props, ref) => {
  const {
    as: Component = 'button',
    active,
    disabled,
    className,
    classPrefix = 'pagination-btn',
    children,
    eventKey,
    style,
    onSelect,
    onClick,
    ...rest
  } = props;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ active, disabled }));

  const handleClick = useEventCallback((event: React.MouseEvent) => {
    if (disabled) {
      return;
    }
    onSelect?.(eventKey, event);
  });

  const asProps: Partial<PaginationButtonProps> = {};

  if (typeof Component !== 'string') {
    asProps.eventKey = eventKey;
    asProps.active = active;
  }

  return (
    <Component
      {...rest}
      {...asProps}
      disabled={disabled}
      onClick={createChainedFunction(onClick, handleClick)}
      ref={ref}
      className={classes}
      style={style}
    >
      {children}
      {!disabled ? <Ripple /> : null}
    </Component>
  );
});

PaginationButton.displayName = 'PaginationButton';

export default PaginationButton;
