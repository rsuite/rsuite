import React from 'react';
import StepItem from './StepItem';
import { forwardRef, ReactChildren } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export interface StepsProps extends WithAsProps {
  /** Vertical display */
  vertical?: boolean;

  /** Small size Step Bar */
  small?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** Current execution step */
  current?: number;

  /** Current execution step status */
  currentStatus?: 'finish' | 'wait' | 'process' | 'error';
}

const Subcomponents = {
  Item: StepItem
};

/**
 * The `Steps` component is used to guide users to complete tasks in accordance with the process.
 *
 * @see https://rsuitejs.com/components/steps
 */
const Steps = forwardRef<'div', StepsProps, typeof Subcomponents>((props, ref) => {
  const { propsWithDefaults } = useCustom('Steps', props);
  const {
    as: Component = 'div',
    classPrefix = 'steps',
    className,
    children,
    vertical,
    small,
    current = 0,
    currentStatus = 'process',
    ...rest
  } = propsWithDefaults;

  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
  const horizontal = !vertical;
  const classes = merge(className, withClassPrefix({ small, vertical, horizontal: !vertical }));

  const count = ReactChildren.count(children);
  const items = ReactChildren.mapCloneElement(children, (item, index) => {
    const itemStyles = {
      flexBasis: index < count - 1 ? `${100 / (count - 1)}%` : undefined,
      maxWidth: index === count - 1 ? `${100 / count}%` : undefined
    };
    const itemProps = {
      stepNumber: index + 1,
      status: 'wait',
      style: horizontal ? itemStyles : undefined,
      ...item.props
    };

    // fix tail color
    if (currentStatus === 'error' && index === current - 1) {
      itemProps.className = prefix('next-error');
    }

    if (!item.props.status) {
      if (index === current) {
        itemProps.status = currentStatus;
        itemProps.className = merge(itemProps.className, prefix('item-active'));
      } else if (index < current) {
        itemProps.status = 'finish';
      }
    }

    return itemProps;
  });

  return (
    <Component {...rest} ref={ref} className={classes}>
      {items}
    </Component>
  );
}, Subcomponents);

Steps.displayName = 'Steps';

export default Steps;
