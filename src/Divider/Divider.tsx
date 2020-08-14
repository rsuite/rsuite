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
  className: PropTypes.string,
  vertical: PropTypes.bool,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.elementType
};

const Divider = React.forwardRef((props: DividerProps, ref: React.Ref<HTMLDivElement>) => {
  const { vertical, as: Component, className, children, classPrefix, ...rest } = props;
  const { prefix, withClassPrefix } = useClassNames(classPrefix);
  const classes = withClassPrefix(className, {
    vertical,
    horizontal: !vertical,
    'with-text': !!children
  });

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
