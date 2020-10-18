import React from 'react';
import PropTypes from 'prop-types';
import some from 'lodash/some';
import TimelineItem from './TimelineItem';
import { useClassNames, ReactChildren } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface TimelineProps extends WithAsProps {
  /** The content of the component */
  children?: React.ReactNode;

  /** TimeLine content relative position  **/
  align?: 'left' | 'right' | 'alternate';

  /** Timeline endless **/
  endless?: boolean;
}

const defaultProps: Partial<TimelineProps> = {
  as: 'ul',
  classPrefix: 'timeline',
  align: 'left'
};

interface Timeline extends RsRefForwardingComponent<'div', TimelineProps> {
  Item?: typeof TimelineItem;
}

const Timeline: Timeline = React.forwardRef((props: TimelineProps, ref) => {
  const { children, as: Component, classPrefix, className, align, endless, ...rest } = props;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const count = React.Children.count(children);
  const withTime = some(React.Children.toArray(children), (item: any) => item?.props?.time);

  const classes = merge(
    className,
    withClassPrefix(`align-${align}`, { endless, 'with-time': withTime })
  );

  return (
    <Component {...rest} ref={ref} className={classes}>
      {ReactChildren.mapCloneElement(children, (_child: any, index: number) => ({
        last: index + 1 === count,
        align
      }))}
    </Component>
  );
});

Timeline.Item = TimelineItem;

Timeline.displayName = 'Timeline';
Timeline.defaultProps = defaultProps;
Timeline.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  align: PropTypes.oneOf(['left', 'right', 'alternate']),
  endless: PropTypes.bool
};

export default Timeline;
