import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { StandardProps } from '../@types/common';

export interface DividerProps extends StandardProps {
  /** Vertical dividing line */
  vertical?: boolean;
}

const defaultProps = {
  classPrefix: 'divider'
};

const propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.elementType
};

const Divider = React.forwardRef<HTMLDivElement, DividerProps>((props, ref) => {
  const { vertical, as: Component = 'div', className, children, classPrefix, ...rest } = props;
  const { merge, prefix, rootPrefix } = useClassNames(classPrefix);
  const classes = merge(rootPrefix(classPrefix), className, {
    [prefix('vertical')]: vertical,
    [prefix('horizontal')]: !vertical,
    [prefix('with-text')]: !!children
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
