import React, { useContext, useMemo } from 'react';
import Ripple from '@/internals/Ripple';
import SafeAnchor from '../SafeAnchor';
import { ButtonGroupContext } from '../ButtonGroup';
import { forwardRef, isOneOf } from '@/internals/utils';
import { useClassNames, useControlled, useEventCallback } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { ColorType, SizeType, AppearanceType, WithAsProps } from '@/internals/types';

export interface ButtonProps
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onToggle'> {
  /** A button can have different appearances. */
  appearance?: AppearanceType;

  /** A button can show it is currently the active user selection */
  active?: boolean;

  /** A button can have different sizes */
  size?: SizeType;

  /** A button can have different colors */
  color?: ColorType;

  /** Format button to appear inside a content block */
  block?: boolean;

  /** Providing a `href` will render an `<a>` element, _styled_ as a button */
  href?: string;

  /** Where to display the linked URL */
  target?: string;

  /** A button can show a loading indicator */
  loading?: boolean;

  /** A button can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** Ripple after button click */
  ripple?: boolean;

  /** The icon element placed _before_ the button text */
  startIcon?: React.ReactNode;

  /** The icon element placed _after_ the button text */
  endIcon?: React.ReactNode;

  /** Defines HTML button type attribute */
  type?: 'button' | 'reset' | 'submit';

  /** A button can toggle its state between active and inactive. */
  toggleable?: boolean;

  /** Called when the button is clicked */
  onToggle?: (active: boolean, event: React.MouseEvent) => void;
}

/**
 * The Button component is used to trigger a custom action.
 * @see https://rsuitejs.com/components/button
 */
const Button = forwardRef<'button', ButtonProps>((props: ButtonProps, ref) => {
  const { propsWithDefaults } = useCustom('Button', props);
  const {
    as,
    active: activeProp,
    appearance = 'default',
    block,
    className,
    children,
    classPrefix = 'btn',
    color,
    disabled,
    loading,
    ripple = true,
    size: sizeProp,
    startIcon,
    endIcon,
    type: typeProp,
    toggleable,
    onToggle,
    onClick,
    ...rest
  } = propsWithDefaults;

  const [active, setActive] = useControlled(activeProp, false);
  const buttonGroup = useContext(ButtonGroupContext);

  const size = sizeProp ?? buttonGroup?.size;

  const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix(appearance, color, size, { active, disabled, loading, block })
  );

  const buttonContent = useMemo(() => {
    const spin = <span className={prefix`spin`} />;
    const rippleElement = ripple && !isOneOf(appearance, ['link', 'ghost']) ? <Ripple /> : null;

    return (
      <>
        {loading && spin}
        {startIcon ? <span className={prefix`start-icon`}>{startIcon}</span> : null}
        {children}
        {endIcon ? <span className={prefix`end-icon`}>{endIcon}</span> : null}
        {rippleElement}
      </>
    );
  }, [appearance, children, endIcon, loading, prefix, ripple, startIcon]);

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLElement>) => {
    if (toggleable) {
      const nextActive = !active;

      setActive(nextActive);
      onToggle?.(nextActive, event);
    }
    onClick?.(event);
  });

  if (rest.href) {
    return (
      <SafeAnchor
        {...rest}
        as={as}
        ref={ref}
        aria-disabled={disabled}
        disabled={disabled}
        className={classes}
        onClick={handleClick}
      >
        {buttonContent}
      </SafeAnchor>
    );
  }

  const Component = as || 'button';
  const type = typeProp || (Component === 'button' ? 'button' : undefined);
  const role = rest.role || (Component !== 'button' ? 'button' : undefined);

  return (
    <Component
      {...rest}
      role={role}
      type={type}
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled}
      className={classes}
      onClick={handleClick}
    >
      {buttonContent}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
