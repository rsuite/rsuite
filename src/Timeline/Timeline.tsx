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

  /**
   * Whether an item is active (with highlighted dot).
   *
   * @default
   * The last item is marked active.
   */
  isItemActive?: (index: number, totalItemsCount: number) => boolean;
}

interface TimelineComponent extends RsRefForwardingComponent<'div', TimelineProps> {
  Item: typeof TimelineItem;

  ACTIVE_FIRST: (index: number, totalItemsCount: number) => boolean;
  ACTIVE_LAST: (index: number, totalItemsCount: number) => boolean;
}

const Timeline: TimelineComponent = React.forwardRef((props: TimelineProps, ref) => {
  const {
    children,
    as: Component = 'ul',
    classPrefix = 'timeline',
    className,
    align = 'left',
    endless,
    isItemActive = Timeline.ACTIVE_LAST,
    ...rest
  } = props;

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
        INTERNAL_active: isItemActive(index, count),
        align
      }))}
    </Component>
  );
}) as unknown as TimelineComponent;

Timeline.ACTIVE_FIRST = index => index === 0;
Timeline.ACTIVE_LAST = (index, totalItemsCount) => index === totalItemsCount - 1;

Timeline.Item = TimelineItem;

Timeline.displayName = 'Timeline';
Timeline.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  align: PropTypes.oneOf(['left', 'right', 'alternate']),
  endless: PropTypes.bool
};

export default Timeline;
