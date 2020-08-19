import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { StandardProps } from '../@types/common';

export interface DividerProps extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Vertical dividing line */
  vertical?: boolean;
}

const defaultProps = {
  classPrefix: 'divider',
  as: 'div'
};

const propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  vertical: PropTypes.bool
};

const Divider = React.forwardRef((props: DividerProps, ref: React.Ref<HTMLDivElement>) => {
  const { as: Component, className, classPrefix, children, vertical, ...rest } = props;
  const { prefix, withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix({
      vertical,
      horizontal: !vertical,
      'with-text': !!children
    })
  );

  return (
    <Component {...rest} className={classes} ref={ref}>
      {children ? <span className={prefix('inner-text')}>{children}</span> : null}
    </Component>
  );
});

Divider.displayName = 'Divider';
Divider.propTypes = propTypes;
Divider.defaultProps = defaultProps;

export default Divider;
