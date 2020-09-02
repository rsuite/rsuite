import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface TooltipProps extends WithAsProps {
  /** Dispaly placement */
  placement?: TypeAttributes.Placement;

  /** Wheather visible */
  visible?: boolean;

  /** Primary content */
  children?: React.ReactNode;
}

const defaultProps: Partial<TooltipProps> = {
  as: 'div',
  classPrefix: 'tooltip'
};

const Tooltip: RsRefForwardingComponent<'div', TooltipProps> = React.forwardRef(
  (props: TooltipProps, ref) => {
    const { as: Component, className, classPrefix, children, style, visible, ...rest } = props;

    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
    const styles = {
      opacity: visible ? 1 : undefined,
      ...style
    };

    return (
      <Component role="tooltip" {...rest} ref={ref} className={classes} style={styles}>
        <div className={prefix`arrow`} aria-hidden />
        <div className={prefix`inner`}>{children}</div>
      </Component>
    );
  }
);

Tooltip.displayName = 'Tooltip';
Tooltip.defaultProps = defaultProps;
Tooltip.propTypes = {
  visible: PropTypes.bool,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
};

export default Tooltip;
