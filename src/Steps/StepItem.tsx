import React from 'react';
import Check from '@rsuite/icons/Check';
import Close from '@rsuite/icons/Close';
import { forwardRef, mergeStyles } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { IconProps } from '@rsuite/icons/Icon';
import type { WithAsProps } from '@/internals/types';

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
const StepItem = forwardRef<'div', StepItemProps>((props, ref) => {
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

  const { merge, withPrefix, prefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  const iconNode = icon ? (
    <span className={prefix('icon')}>{icon}</span>
  ) : (
    <span className={prefix('icon', { [`icon-${status}`]: status })}>
      {status ? (STEP_STATUS_ICON[status] ?? stepNumber) : stepNumber}
    </span>
  );

  return (
    <Component
      ref={ref}
      className={classes}
      style={mergeStyles({ width: itemWidth }, style)}
      data-status={status}
      data-custom-icon={!!icon}
      {...rest}
    >
      <div className={prefix('tail')} />
      <div className={prefix('icon-wrapper')}>{iconNode}</div>
      <div className={prefix('content')}>
        {<div className={prefix('title')}>{title}</div>}
        {description && <div className={prefix('description')}>{description}</div>}
      </div>
    </Component>
  );
});

StepItem.displayName = 'StepItem';

export default StepItem;
