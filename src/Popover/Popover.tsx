import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface PopoverProps extends WithAsProps {
  /** The title of the component. */
  title?: React.ReactNode;

  /** The component is visible by default. */
  visible?: boolean;

  /** The content full the container */

  full?: boolean;
}

const defaultProps: Partial<PopoverProps> = {
  as: 'div',
  classPrefix: 'popover'
};

const Popover: RsRefForwardingComponent<'div', PopoverProps> = React.forwardRef(
  (props: PopoverProps, ref) => {
    const {
      as: Component,
      classPrefix,
      title,
      children,
      style,
      visible,
      className,
      full,
      ...rest
    } = props;

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ full }));

    const styles = {
      display: 'block',
      opacity: visible ? 1 : undefined,
      ...style
    };

    return (
      <Component role="dialog" {...rest} ref={ref} className={classes} style={styles}>
        <div className={prefix`arrow`} aria-hidden />
        {title && <h3 className={prefix`title`}>{title}</h3>}
        <div className={prefix`content`}>{children}</div>
      </Component>
    );
  }
);

Popover.displayName = 'Popover';
Popover.defaultProps = defaultProps;
Popover.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.node,
  style: PropTypes.object,
  visible: PropTypes.bool,
  className: PropTypes.string,
  full: PropTypes.bool
};
export default Popover;
