import React from 'react';
import PropTypes from 'prop-types';
import Check from '@rsuite/icons/Check';
import Close from '@rsuite/icons/Close';
import { oneOf } from '@/internals/propTypes';
import { useClassNames } from '@/internals/hooks';
import { IconProps } from '@rsuite/icons/Icon';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

const STEP_STATUS_ICON: {
  [key in NonNullable<StepItemProps['status']>]: React.ReactElement | null;
} = {
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

/**
 * The `Step.Item` component is used to set the layout of the child element in the `Steps` component.
 *
 * @see https://rsuitejs.com/components/steps
 */
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
        {status ? STEP_STATUS_ICON[status] ?? stepNumber : stepNumber}
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
  status: oneOf(['finish', 'wait', 'process', 'error']),
  icon: PropTypes.object,
  stepNumber: PropTypes.number,
  description: PropTypes.node,
  title: PropTypes.node
};

export default StepItem;
