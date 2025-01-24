import React from 'react';
import Heading from '../Heading';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export interface PopoverProps extends WithAsProps {
  /** The title of the component. */
  title?: React.ReactNode;

  /** The component is visible by default. */
  visible?: boolean;

  /** The content full the container */
  full?: boolean;

  /** Whether show the arrow indicator */
  arrow?: boolean;
}

/**
 * The `Popover` component is used to display a popup window for a target component.
 * @see https://rsuitejs.com/components/popover
 */
const Popover = forwardRef<'div', PopoverProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Popover', props);
  const {
    as: Component = 'div',
    classPrefix = 'popover',
    title,
    children,
    style,
    visible,
    className,
    full,
    arrow = true,
    ...rest
  } = propsWithDefaults;

  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ full }));

  const styles = {
    display: 'block',
    opacity: visible ? 1 : undefined,
    ...style
  };

  return (
    <Component role="dialog" {...rest} ref={ref} className={classes} style={styles}>
      {arrow && <div className={prefix`arrow`} aria-hidden />}
      {title && (
        <Heading level={3} className={prefix`title`}>
          {title}
        </Heading>
      )}
      <div className={prefix`content`}>{children}</div>
    </Component>
  );
});

Popover.displayName = 'Popover';

export default Popover;
