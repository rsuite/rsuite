import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface TimelineItemProps extends StandardProps {
  /** Whether the last item */
  last?: boolean;

  /** Customizing the Timeline item */
  dot?: React.ReactNode;

  /** The content of the component */
  children?: React.ReactNode;

  /** You can use a custom element type for this component */
  componentClass?: React.ElementType;

  /** Customized time of timeline  **/
  time?: React.ReactNode;
}

declare const TimelineItem: React.ComponentType<TimelineItemProps>;

export default TimelineItem;
