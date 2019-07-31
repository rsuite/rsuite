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
}

interface BreadcrumbComponent extends React.ComponentClass<BreadcrumbProps> {
  Item: typeof BreadcrumbItem;
}

declare const Breadcrumb: BreadcrumbComponent;

export default Breadcrumb;
