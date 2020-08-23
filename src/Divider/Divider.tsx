import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface DividerProps extends WithAsProps {
  /**
   * Vertical dividing line. Cannot be used with text.
   */
  vertical?: boolean;
}

const defaultProps: Partial<DividerProps> = {
  classPrefix: 'divider',
  as: 'div'
};

const Divider: RsRefForwardingComponent<'div', DividerProps> = React.forwardRef(
  (props: DividerProps, ref) => {
    const { as: Component, className, classPrefix, children, vertical, ...rest } = props;
    const { prefix, withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(
      className,
      withClassPrefix(vertical ? 'vertical' : 'horizontal', {
        'with-text': children
      })
    );

    return (
      <Component role="separator" {...rest} ref={ref} className={classes}>
        {children && <span className={prefix('inner-text')}>{children}</span>}
      </Component>
    );
  }
);

Divider.displayName = 'Divider';
Divider.defaultProps = defaultProps;
Divider.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  vertical: PropTypes.bool
};

export default Divider;
