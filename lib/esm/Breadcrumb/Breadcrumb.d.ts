import React from 'react';
import BreadcrumbItem from './BreadcrumbItem';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
import { BreadcrumbLocale } from '../locales';
export interface BreadcrumbProps extends WithAsProps {
    /**
     * The separator between each breadcrumb item.
     */
    separator?: React.ReactNode;
    /**
     * Set the maximum number of breadcrumbs to display.
     * When there are more than the maximum number,
     * only the first and last will be shown, with an ellipsis in between.
     */
    maxItems?: number;
    /**
     * The locale of the component.
     */
    locale?: BreadcrumbLocale;
    /**
     * The ellipsis element.
     */
    ellipsis?: React.ReactNode;
    /**
     * Callback function for clicking the ellipsis.
     */
    onExpand?: (event: React.MouseEvent) => void;
}
export interface BreadcrumbComponent extends RsRefForwardingComponent<'ol', BreadcrumbProps> {
    Item: typeof BreadcrumbItem;
}
/**
 * The Breadcrumb component is used to indicate the current page location and navigate.
 * @see https://rsuitejs.com/components/breadcrumb
 */
declare const Breadcrumb: BreadcrumbComponent;
export default Breadcrumb;
