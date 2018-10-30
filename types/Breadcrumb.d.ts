import * as React from 'react';

import BreadcrumbItem from './BreadcrumbItem';

export interface BreadcrumbProps {
  /** Shorthand for primary content of the React.Node */
  separator?: React.ReactNode;

  /** You can use a custom element for this component */
  componentClass?: React.ReactType<BreadcrumbProps>;

  /** Primary content */
  children?: React.ReactNode;

  /** Additional classes */
  className?: string;

  /** The prefix of the component CSS class */
  classPrefix?: string;
}

interface BreadcrumbComponent extends React.ComponentType<BreadcrumbProps> {
  Item: typeof BreadcrumbItem;
}

declare const Breadcrumb: BreadcrumbComponent;

export default Breadcrumb;
