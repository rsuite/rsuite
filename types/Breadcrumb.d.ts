import * as React from 'react';

import { StandardProps } from './index';
import BreadcrumbItem from './BreadcrumbItem';

export interface BreadcrumbProps extends StandardProps {
  /** Shorthand for primary content of the React.Node */
  separator?: React.ReactNode;

  /** You can use a custom element for this component */
  componentClass?: React.ReactType<BreadcrumbProps>;

  /** Primary content */
  children?: React.ReactNode;
}

interface BreadcrumbComponent extends React.ComponentClass<BreadcrumbProps> {
  Item: typeof BreadcrumbItem;
}

declare const Breadcrumb: BreadcrumbComponent;

export default Breadcrumb;
