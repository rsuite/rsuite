import React, { useMemo } from 'react';
import Heading from '../Heading';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, mergeStyles } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';

export interface PopoverProps extends BoxProps {
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
    as,
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

  const { withPrefix, merge, prefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ full }));

  const styles = useMemo(
    () => mergeStyles(style, { ['--rs-opacity']: visible ? 1 : undefined }),
    [visible, style]
  );

  return (
    <Box as={as} role="dialog" ref={ref} className={classes} style={styles} {...rest}>
      {arrow && <div className={prefix`arrow`} aria-hidden />}
      {title && (
        <Heading level={3} className={prefix`title`}>
          {title}
        </Heading>
      )}
      <div className={prefix`content`}>{children}</div>
    </Box>
  );
});

Popover.displayName = 'Popover';

export default Popover;
