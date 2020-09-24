import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames, ReactChildren } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import StepItem from './StepItem';

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

const defaultProps: Partial<StepsProps> = {
  as: 'div',
  classPrefix: 'steps',
  currentStatus: 'process',
  current: 0
};

interface Steps extends RsRefForwardingComponent<'div', StepsProps> {
  Item?: typeof StepItem;
}

const Steps: Steps = React.forwardRef((props: StepsProps, ref) => {
  const {
    as: Component,
    classPrefix,
    className,
    children,
    vertical,
    small,
    current,
    currentStatus,
    ...rest
  } = props;

  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
  const horizontal = !vertical;
  const classes = merge(className, withClassPrefix({ small, vertical, horizontal: !vertical }));

  const count = React.Children.count(children);
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
});

Steps.Item = StepItem;

Steps.displayName = 'Steps';
Steps.defaultProps = defaultProps;
Steps.propTypes = {
  classPrefix: PropTypes.string,
  vertical: PropTypes.bool,
  small: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  current: PropTypes.number,
  currentStatus: PropTypes.oneOf(['finish', 'wait', 'process', 'error'])
};

export default Steps;
