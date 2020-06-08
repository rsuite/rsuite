import * as React from 'react';

import { StandardProps } from '../@types/common';
import BreadcrumbItem from './BreadcrumbItem';

export interface BreadcrumbProps extends StandardProps {
  /** Shorthand for primary content of the React.ReactNode */
  separator?: React.ReactNode;

  /** You can use a custom element for this component */
  componentClass?: React.ElementType;

  /** Primary content */
  children?: React.ReactNode;

  /**
   * Set the maximum number of breadcrumbs to display.
   * When there are more than the maximum number,
   * only the first and last will be shown, with an ellipsis in between.
   * */
  maxItems?: number;

  /** A function to be called when you are in the collapsed view and click the ellipsis. */
  onExpand?: (event: React.MouseEvent) => void;
}

interface BreadcrumbComponent extends React.ComponentClass<BreadcrumbProps> {
  Item: typeof BreadcrumbItem;
}

declare const Breadcrumb: BreadcrumbComponent;

export default Breadcrumb;
