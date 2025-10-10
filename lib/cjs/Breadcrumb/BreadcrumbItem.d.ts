import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface BreadcrumbItemProps extends WithAsProps<React.ElementType | string> {
    /**
     * The wrapper element of the BreadcrumbItem.
     */
    wrapperAs?: React.ElementType;
    /**
     * The active state of the BreadcrumbItem.
     */
    active?: boolean;
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href?: string;
    /**
     * The title attribute specifies extra information about an element.
     */
    title?: string;
    /**
     * The target attribute specifies where to open the linked document.
     */
    target?: string;
    /**
     * The separator between each breadcrumb item.
     */
    separator?: React.ReactNode;
}
/**
 * The `<Breadcrumb.Item>` component is used to specify each section of the Breadcrumb.
 * @see https://rsuitejs.com/components/breadcrumb
 */
declare const BreadcrumbItem: RsRefForwardingComponent<'a', BreadcrumbItemProps>;
export default BreadcrumbItem;
