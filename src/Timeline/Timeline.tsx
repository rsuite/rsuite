import React from 'react';
import some from 'lodash/some';
import TimelineItem from './TimelineItem';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles, useCustom } from '@/internals/hooks';
import { forwardRef, rch } from '@/internals/utils';

export interface TimelineProps extends BoxProps {
  /** The content of the component */
  children?: React.ReactNode;

  /** TimeLine content relative position  **/
  align?: 'left' | 'right' | 'alternate';

  /** Timeline endless **/
  endless?: boolean;

  /** Reverse the order of Timeline items **/
  reverse?: boolean;

  /**
   * Whether an item is active (with highlighted dot).
   *
   * @default
   * The last item is marked active.
   */
  isItemActive?: (index: number, totalItemsCount: number) => boolean;
}

const ACTIVE_FIRST = (index: number) => index === 0;
const ACTIVE_LAST = (index: number, totalItemsCount: number) => index === totalItemsCount - 1;

const SubcomponentsAndStaticMethods = {
  Item: TimelineItem,
  ACTIVE_FIRST,
  ACTIVE_LAST
};

/**
 * The `Timeline` component is used to display a list of items in chronological order.
 *
 * @see https://rsuitejs.com/components/timeline
 */
const Timeline = forwardRef<'div', TimelineProps, typeof SubcomponentsAndStaticMethods>(
  (props, ref) => {
    const { propsWithDefaults } = useCustom('Timeline', props);
    const {
      as = 'ul',
      children,
      classPrefix = 'timeline',
      className,
      align = 'left',
      endless,
      reverse,
      isItemActive = ACTIVE_LAST,
      ...rest
    } = propsWithDefaults;

    const { merge, withPrefix } = useStyles(classPrefix);
    const count = rch.count(children);
    const withTime = some(React.Children.toArray(children), (item: any) => item?.props?.time);

    const classes = merge(
      className,
      withPrefix(`align-${align}`, { endless, 'with-time': withTime, reverse })
    );

    const childrenArray = React.Children.toArray(children);
    const orderedChildren = reverse ? [...childrenArray].reverse() : childrenArray;

    return (
      <Box as={as} ref={ref} className={classes} {...rest}>
        {orderedChildren.map((child: any, domIndex: number) => {
          const logicalIndex = reverse ? count - 1 - domIndex : domIndex;
          return React.cloneElement(child, {
            key: domIndex,
            last: domIndex + 1 === count,
            INTERNAL_active: isItemActive(logicalIndex, count),
            align
          });
        })}
      </Box>
    );
  },
  SubcomponentsAndStaticMethods
);

Timeline.displayName = 'Timeline';

export default Timeline;
