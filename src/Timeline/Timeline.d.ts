import * as React from 'react';
import TimelineItem from './TimelineItem';
import { StandardProps } from '../@types/common';

export interface TimelineProps extends StandardProps {
  /** The content of the component */
  children?: React.ReactNode;

  /** You can use a custom element type for this component */
  componentClass?: React.ElementType;

  /** TimeLine content relative position  **/
  align?: 'left' | 'right' | 'alternate';

  /** Timeline endless **/
  endless?: boolean;
}

interface TimelineComponent extends React.ComponentClass<TimelineProps> {
  Item: typeof TimelineItem;
}

declare const Timeline: TimelineComponent;

export default Timeline;
