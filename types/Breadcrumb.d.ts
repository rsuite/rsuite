import * as React from 'react';

import BreadcrumbItem from '../src/BreadcrumbItem';

export interface BreadcrumbProps extends StrictBreadcrumbProps {
  [key: string]: any;
}

export interface StrictBreadcrumbProps {
  // Shorthand for primary content of the React.Node
  separator: React.Node;

  // You can use a custom element for this component
  componentClass: React.ElementType;

  // Primary content
  children?: React.ReactNode;

  // Additional classes
  className?: string;

  // The prefix of the component CSS class
  classPrefix?: string;
}

interface BreadcrumbComponent extends React.ComponentClass<BreadcrumbProps> {
  Item: typeof BreadcrumbItem;
}

declare const Breadcrumb: BreadcrumbComponent;

export default Breadcrumb;
