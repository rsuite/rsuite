import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useCustom } from '../utils';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface AvatarGroupProps extends WithAsProps {
  /** Render all avatars as stacks */
  stack?: boolean;

  /** Set the spacing of the avatar */
  spacing?: number;

  /** Set the size of all avatars. */
  size?: TypeAttributes.Size;
}

export const AvatarGroupContext = React.createContext<{ size?: TypeAttributes.Size }>({});

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
      ...rest
    } = props;

    const { rtl } = useCustom('AvatarGroup');
    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ stack }));
    const contextValue = useMemo(() => ({ size }), [size]);

    return (
      <Component {...rest} ref={ref} className={classes}>
        <AvatarGroupContext.Provider value={contextValue}>
          {spacing
            ? React.Children.map(children as React.ReactElement[], child => {
                return React.cloneElement(child, {
                  style: { [rtl ? 'marginLeft' : 'marginRight']: spacing, ...child.props.style }
                });
              })
            : children}
        </AvatarGroupContext.Provider>
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
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs'])
};

export default AvatarGroup;
