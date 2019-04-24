import * as React from 'react';
import { StandardProps } from './index';
import ListItem from './ListItem';

export interface ListProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /* Bordered */
  bordered?: boolean;

  /* Animation when hover */
  hover?: boolean;

  /* Sortable */
  sortable?: boolean;

  /* Size of list item */
  size?: 'lg' | 'md' | 'sm';

  /* Auto scroll when overflow */
  autoScroll?: boolean;

  /* Delay before trigger sort */
  pressDelay?: number;

  /* Threshold of trigger sort */
  pressThreshold?: number;

  /* Duration of sort animation */
  transitionDuration?: number;

  /* Callback of beginning of sorting */
  onSortStart?: (
    payload: { collection: number | string, index: number, node: HTMLElement },
    event: Event
  ) => void;

  /* Callback of moving */
  onSortMove?: (event: Event) => void;

  /* Callback of moving over a list items */
  onSortOver?: (payload: {
    collection: number | string,
    index: number,
    newIndex: number,
    oldIndex: number
  }) => void;

  /* Callback of end of sorting */
  onSortEnd?: (
    payload: {
      collection: number | string,
      newIndex: number,
      oldIndex: number
    },
    event: Event
  ) => void;

  /* Callback of end of sorting */
  onSort?: (
    payload: {
      collection: number | string,
      newIndex: number,
      oldIndex: number
    },
    event: Event
  ) => void;
}

interface ListComponent extends React.ComponentClass<ListProps> {
  Item: typeof ListItem;
}

declare const List: ListComponent;

export default List;
