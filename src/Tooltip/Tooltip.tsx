import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface TooltipProps extends WithAsProps {
  /** Dispaly placement */
  placement?: TypeAttributes.Placement;

  /** Whether visible */
  visible?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** Whether show the arrow indicator */
  arrow?: boolean;
}

const Tooltip: RsRefForwardingComponent<'div', TooltipProps> = React.forwardRef(
  (props: TooltipProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'tooltip',
      children,
      style,
      visible,
      arrow = true,
      ...rest
    } = props;

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(
      className,
      withClassPrefix({
        arrow
      })
    );
    const styles = {
      opacity: visible ? 1 : undefined,
      ...style
    };

    return (
      <Component role="tooltip" {...rest} ref={ref} className={classes} style={styles}>
        {children}
      </Component>
    );
  }
);

Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = {
  visible: PropTypes.bool,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  arrow: PropTypes.bool
};

export default Tooltip;
