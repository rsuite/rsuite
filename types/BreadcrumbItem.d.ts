import * as React from 'react';

import { StandardProps } from './index';

export interface BreadcrumbItemProps extends StandardProps {
  // Style as the currently active section
  active?: boolean;

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
}

declare const BreadcrumbItem: React.ComponentType<BreadcrumbItemProps>;

export default BreadcrumbItem;
