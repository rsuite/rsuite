import React from 'react';
import PropTypes from 'prop-types';
import Check from '@rsuite/icons/Check';
import Close from '@rsuite/icons/Close';

import { useClassNames } from '../utils';
import { IconProps } from '@rsuite/icons/lib/Icon';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

const STEP_STATUS_ICON = {
  finish: <Check />,
  wait: null,
  process: null,
  error: <Close />
};

export interface StepItemProps extends WithAsProps {
  /** The width of each item. */
  itemWidth?: number | string;

  /** Step status */
  status?: 'finish' | 'wait' | 'process' | 'error';

  /** Set icon */
  icon?: React.ReactElement<IconProps>;

  /** Number of Step */
  stepNumber?: number;

  /** The description of Steps item */
  description?: React.ReactNode;

  /** The title of Steps item */
  title?: React.ReactNode;
}

const StepItem: RsRefForwardingComponent<'div', StepItemProps> = React.forwardRef(
  (props: StepItemProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'steps-item',
      style,
      itemWidth,
      status,
      icon,
      stepNumber,
      description,
      title,
      ...rest
    } = props;

    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
    const classes = merge(
      className,
      withClassPrefix({ custom: icon, [`status-${status}`]: status })
    );

    const styles = { width: itemWidth, ...style };

    let iconNode = (
      <span className={prefix('icon', `icon-${status}`)}>
        {status ? STEP_STATUS_ICON[status] : stepNumber}
      </span>
    );

    if (icon) {
      iconNode = <span className={prefix('icon')}>{icon}</span>;
    }

    return (
      <Component {...rest} ref={ref} className={classes} style={styles}>
        <div className={prefix('tail')} />
        <div className={prefix(['icon-wrapper', icon ? 'custom-icon' : ''])}>{iconNode}</div>
        <div className={prefix('content')}>
          {<div className={prefix('title')}>{title}</div>}
          {description && <div className={prefix('description')}>{description}</div>}
        </div>
      </Component>
    );
  }
);

StepItem.displayName = 'StepItem';
StepItem.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  style: PropTypes.object,
  itemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: PropTypes.oneOf(['finish', 'wait', 'process', 'error']),
  icon: PropTypes.object,
  stepNumber: PropTypes.number,
  description: PropTypes.node,
  title: PropTypes.node
};

export default StepItem;
