import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface IconStackProps extends WithAsProps {
  /** Sets the icon size */
  size?: 'lg' | '2x' | '3x' | '4x' | '5x';
}

const defaultProps: Partial<IconStackProps> = {
  as: 'span',
  classPrefix: 'icon-stack'
};

const IconStack: RsRefForwardingComponent<'span', IconStackProps> = React.forwardRef(
  (props: IconStackProps, ref) => {
    const { as: Component, className, size, classPrefix, ...rest } = props;
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(
      className,
      withClassPrefix({
        [`size-${size || ''}`]: size
      })
    );

    return <Component {...rest} ref={ref} className={classes} />;
  }
);

IconStack.displayName = 'IconStack';
IconStack.defaultProps = defaultProps;
IconStack.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x'])
};

export default IconStack;
