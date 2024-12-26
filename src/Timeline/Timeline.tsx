import React from 'react';
import some from 'lodash/some';
import TimelineItem from './TimelineItem';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { ReactChildren } from '@/internals/utils';
import type { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

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

const ACTIVE_FIRST = (index: number) => index === 0;
const ACTIVE_LAST = (index: number, totalItemsCount: number) => index === totalItemsCount - 1;

/**
 * The `Timeline` component is used to display a list of items in chronological order.
 *
 * @see https://rsuitejs.com/components/timeline
 */
const Timeline: TimelineComponent = React.forwardRef(function Timeline(props: TimelineProps, ref) {
  const { propsWithDefaults } = useCustom('Timeline', props);
  const {
    children,
    as: Component = 'ul',
    classPrefix = 'timeline',
    className,
    align = 'left',
    endless,
    isItemActive = ACTIVE_LAST,
    ...rest
  } = propsWithDefaults;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const count = ReactChildren.count(children);
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

Timeline.ACTIVE_FIRST = ACTIVE_FIRST;
Timeline.ACTIVE_LAST = ACTIVE_LAST;

Timeline.Item = TimelineItem;

export default Timeline;
