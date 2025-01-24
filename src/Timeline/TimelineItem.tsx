import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

export interface TimelineItemProps extends WithAsProps {
  /**
   * Whether the last item
   *
   * @internal
   * This props is supposed to be used only by Timeline component internally
   * User should never rely on this prop
   *
   * @deprecated
   * This prop was used to indicate whether an item is the last item so that it gets highlighted.
   * Now we can specify whether an item should be highlighted individually.
   * Use {@link INTERNAL_active} instead
   */
  last?: boolean;

  /** Customizing the Timeline item */
  dot?: React.ReactNode;

  /** The content of the component */
  children?: React.ReactNode;

  /** You can use a custom element type for this component */
  as?: React.ElementType;

  /** Customized time of timeline  **/
  time?: React.ReactNode;

  /**
   * @internal
   * This props is supposed to be used only by Timeline component internally
   * User should never rely on this prop
   */
  INTERNAL_active?: boolean;
}

/**
 * The `Timeline.Item` component is used to set the layout of the child element in the `Timeline` component.
 *
 * @see https://rsuitejs.com/compo◊nents/timeline
 */
const TimelineItem = forwardRef<'div', TimelineItemProps>((props, ref) => {
  const {
    as: Component = 'li',
    children,
    classPrefix = 'timeline-item',
    last: DEPRECATED_last,
    className,
    dot,
    time,
    INTERNAL_active,
    ...rest
  } = props;
  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix({ last: DEPRECATED_last, active: INTERNAL_active })
  );
  return (
    <Component {...rest} ref={ref} className={classes}>
      <span className={prefix('tail')} />
      <span className={prefix('dot', { 'custom-dot': dot })}>{dot}</span>
      {time && <div className={prefix('time')}>{time}</div>}
      <div className={prefix('content')}>{children}</div>
    </Component>
  );
});

TimelineItem.displayName = 'TimelineItem';

export default TimelineItem;
