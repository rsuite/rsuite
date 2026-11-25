import React from 'react';
import type { TimelineItemProps } from './TimelineItem';

function getTimelineItems(
  children: React.ReactNode,
  parentKeys: string[] = []
): React.ReactElement<TimelineItemProps>[] {
  return React.Children.toArray(children).flatMap(child => {
    if (!React.isValidElement<TimelineItemProps>(child)) {
      return [];
    }

    const keys = [...parentKeys, String(child.key)];

    if (child.type === React.Fragment) {
      return getTimelineItems(child.props.children, keys);
    }

    // Keep fragment key scopes without collisions between keys containing separators.
    return [React.cloneElement(child, { key: JSON.stringify(keys) })];
  });
}

export default getTimelineItems;
