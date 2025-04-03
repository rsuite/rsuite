import React, { useContext, useMemo } from 'react';
import Ripple from '@/internals/Ripple';
import Box, { BoxProps } from '@/internals/Box';
import SafeAnchor from '@/internals/SafeAnchor';
import { ButtonGroupContext } from '../ButtonGroup';
import { forwardRef, isOneOf, isDisableableElement } from '@/internals/utils';
import { useStyles, useControlled, useEventCallback } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { Color, Size, AppearanceType } from '@/internals/types';

export interface ButtonProps extends BoxProps, Omit<React.HTMLAttributes<HTMLElement>, 'onToggle'> {
  /** A button can have different appearances. */
  appearance?: AppearanceType;

  /** A button can show it is currently the active user selection */
  active?: boolean;

  /** A button can have different sizes */
  size?: Size;

  /** A button can have different colors */
  color?: Color;

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
  const buttonGroup = useContext(ButtonGroupContext);
  const {
    as,
    active: activeProp,
    appearance = 'default',
    block,
    className,
    children,
    classPrefix = 'btn',
    color,
    disabled = buttonGroup?.disabled,
    loading,
    role,
    ripple = true,
    size = buttonGroup?.size || 'md',
    startIcon,
    endIcon,
    type: typeProp,
    toggleable,
    onToggle,
    onClick,
    ...rest
  } = propsWithDefaults;

  const [active, setActive] = useControlled(activeProp, false);

  const { withPrefix, prefix, merge } = useStyles(classPrefix);
  const classes = merge(
    className,
    withPrefix(appearance, color, size, { active, disabled, loading, block })
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

  const buttonAs = as || (rest.href ? SafeAnchor : 'button');
  const isCustomElement = buttonAs !== 'button' && buttonAs !== SafeAnchor;

  const uncertainProps = {
    [isDisableableElement(buttonAs) || buttonAs === SafeAnchor ? 'disabled' : 'aria-disabled']:
      disabled,
    type: typeProp ?? (buttonAs === 'button' ? 'button' : undefined),
    role: role ?? (isCustomElement ? 'button' : undefined)
  };

  return (
    <Box
      as={buttonAs}
      ref={ref}
      className={classes}
      onClick={handleClick}
      {...uncertainProps}
      {...rest}
    >
      {buttonContent}
    </Box>
  );
});

Button.displayName = 'Button';

export default Button;
