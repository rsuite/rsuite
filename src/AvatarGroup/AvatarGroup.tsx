import React, { useMemo } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, getCssValue, mergeStyles } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { Size } from '@/internals/types';

export interface AvatarGroupProps extends BoxProps {
  /**
   * Render all avatars as stacks
   */
  stack?: boolean;

  /**
   * Set the spacing of the avatar
   */
  spacing?: number;

  /**
   * Set the size of all avatars.
   */
  size?: Size;
}

export const AvatarGroupContext = React.createContext<{ size?: Size; spacing?: number }>({});

/**
 * The AvatarGroup component is used to represent a collection of avatars.
 * @see https://rsuitejs.com/components/avatar
 */
const AvatarGroup = forwardRef<'div', AvatarGroupProps>((props: AvatarGroupProps, ref) => {
  const { propsWithDefaults } = useCustom('AvatarGroup', props);
  const {
    as,
    classPrefix = 'avatar-group',
    spacing,
    className,
    children,
    stack,
    size,
    style,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge, cssVar } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ stack }));
  const contextValue = useMemo(() => ({ size }), [size]);
  const styles = mergeStyles(style, cssVar('spacing', spacing, getCssValue));

  return (
    <Box as={as} role="group" {...rest} ref={ref} className={classes} style={styles}>
      <AvatarGroupContext.Provider value={contextValue}>{children}</AvatarGroupContext.Provider>
    </Box>
  );
});

AvatarGroup.displayName = 'AvatarGroup';

export default AvatarGroup;
