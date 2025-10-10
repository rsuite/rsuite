import React from 'react';
import TimelineItem from './TimelineItem';
import type { WithAsProps, RsRefForwardingComponent } from '../internals/types';
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
/**
 * The `Timeline` component is used to display a list of items in chronological order.
 *
 * @see https://rsuitejs.com/components/timeline
 */
declare const Timeline: TimelineComponent;
export default Timeline;
