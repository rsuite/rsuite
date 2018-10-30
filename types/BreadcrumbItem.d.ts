import * as React from 'react';

export interface BreadcrumbItemProps {
  // Style as the currently active section
  active?: boolean;

  // Additional classes
  className?: string;

  // Render as an `a` tag instead of a `div` and adds the href attribute
  href?: string;

  // Display title.
  title?: string;

  // The target attribute specifies where to open the linked document
  target?: string;

  // You can use a custom element for this component
  componentClass: React.ReactType<BreadcrumbItemProps>;

  /** Primary content */
  children?: React.ReactNode;

  // The prefix of the component CSS class
  classPrefix?: string;
}

declare const BreadcrumbItem: React.ComponentType<BreadcrumbItemProps>;

export default BreadcrumbItem;
