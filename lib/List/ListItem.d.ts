import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface ListItemProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /* Index of list item, for sort */
  index?: number;

  /* Symbol of collection*/
  collection?: number | string;

  /* disable drag */
  disabled?: boolean;
}

declare const ListItem: React.ComponentType<ListItemProps>;

export default ListItem;
