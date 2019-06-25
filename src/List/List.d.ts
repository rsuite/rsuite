import * as React from 'react';
import { StandardProps } from '../@types/common';
import ListItem from './ListItem';

export interface Payload {
  collection: number | string;
  index?: number;
  node?: HTMLElement;
  newIndex?: number;
  oldIndex?: number;
}

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
  onSortStart?: (payload: Payload, event: React.SyntheticEvent<any>) => void;

  /* Callback of moving */
  onSortMove?: (event: React.SyntheticEvent<any>) => void;

  /* Callback of moving over a list items */
  onSortOver?: (payload: Payload) => void;

  /* Callback of end of sorting */
  onSortEnd?: (payload: Payload, event: React.SyntheticEvent<any>) => void;

  /* Callback of end of sorting */
  onSort?: (payload: Payload, event: React.SyntheticEvent<any>) => void;
}

interface ListComponent extends React.ComponentClass<ListProps> {
  Item: typeof ListItem;
}

declare const List: ListComponent;

export default List;
