import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface TimelineItemProps extends WithAsProps {
  /** Whether the last item */
  last?: boolean;

  /** Customizing the Timeline item */
  dot?: React.ReactNode;

  /** The content of the component */
  children?: React.ReactNode;

  /** You can use a custom element type for this component */
  as?: React.ElementType;

  /** Customized time of timeline  **/
  time?: React.ReactNode;
}

const defaultProps: Partial<TimelineItemProps> = {
  as: 'li',
  classPrefix: 'timeline-item'
};

const TimelineItem: RsRefForwardingComponent<'div', TimelineItemProps> = React.forwardRef(
  (props: TimelineItemProps, ref) => {
    const { as: Component, children, classPrefix, last, className, dot, time, ...rest } = props;
    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ last }));

    return (
      <Component {...rest} ref={ref} className={classes}>
        <span className={prefix('tail')} />
        <span className={prefix('dot', { 'custom-dot': dot })}>{dot}</span>
        {time && <div className={prefix('time')}>{time}</div>}
        <div className={prefix('content')}>{children}</div>
      </Component>
    );
  }
);

TimelineItem.displayName = 'TimelineItem';
TimelineItem.defaultProps = defaultProps;
TimelineItem.propTypes = {
  last: PropTypes.bool,
  dot: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  as: PropTypes.elementType
};

export default TimelineItem;
