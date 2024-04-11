import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, isIE } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { oneOf } from '../internals/propTypes';

export type Size = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export interface AvatarGroupProps extends WithAsProps {
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
   * @version xxl and xs added in v5.59.0
   */
  size?: Size;
}

export const AvatarGroupContext = React.createContext<{ size?: Size; spacing?: number }>({});

/**
 * The AvatarGroup component is used to represent a collection of avatars.
 * @see https://rsuitejs.com/components/avatar
 */
const AvatarGroup: RsRefForwardingComponent<'div', AvatarGroupProps> = React.forwardRef(
  (props: AvatarGroupProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'avatar-group',
      spacing,
      className,
      children,
      stack,
      size,
      style,
      ...rest
    } = props;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ stack }));
    const contextValue = useMemo(() => ({ size }), [size]);
    const styles = isIE() ? style : { ...style, gap: spacing };

    return (
      <Component role="group" {...rest} ref={ref} className={classes} style={styles}>
        <AvatarGroupContext.Provider value={contextValue}>{children}</AvatarGroupContext.Provider>
      </Component>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
AvatarGroup.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  stack: PropTypes.bool,
  spacing: PropTypes.number,
  size: oneOf(['lg', 'md', 'sm', 'xs'])
};

export default AvatarGroup;
