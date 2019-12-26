import * as React from 'react';
import { StandardProps } from '../@types/common';
import ListItem from './ListItem';

interface Payload {
  collection: string | number;
  node: HTMLElement;
  newIndex: number;
  oldIndex: number;
}

interface PayloadCallback {
  (payload?: Payload, event?: MouseEvent): any;
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

  /* Duration of sort animation */
  transitionDuration?: number;

  /* Callback of beginning of sorting */
  onSortStart?: PayloadCallback;

  /* Callback of moving */
  onSortMove?: PayloadCallback;

  /* Callback of end of sorting */
  onSortEnd?: PayloadCallback;

  /* Callback of end of sorting */
  onSort?: PayloadCallback;
}

interface ListComponent extends React.ComponentClass<ListProps> {
  Item: typeof ListItem;
}

declare const List: ListComponent;

export default List;
