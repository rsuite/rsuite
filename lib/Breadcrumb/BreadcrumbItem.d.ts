import * as React from 'react';

import { StandardProps } from '../@types/common';

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
  componentClass?: React.ElementType;

  /** Primary content */
  children?: React.ReactNode;

  /** Custom rendering item */
  renderItem?: (item: React.ReactNode) => React.ReactNode;
}

declare const BreadcrumbItem: React.ComponentType<BreadcrumbItemProps>;

export default BreadcrumbItem;
