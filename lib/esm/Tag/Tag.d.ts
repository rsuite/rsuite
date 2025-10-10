import React from 'react';
import type { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../internals/types';
import type { CommonLocale } from '../locales';
export interface TagProps extends WithAsProps {
    /** Different sizes */
    size?: 'lg' | 'md' | 'sm';
    /** A tag can have different colors */
    color?: TypeAttributes.Color;
    /** Whether to close */
    closable?: boolean;
    /** The content of the component */
    children?: React.ReactNode;
    /** Custom locale */
    locale?: CommonLocale;
    /** Click the callback function for the Close button */
    onClose?: (event: React.MouseEvent<HTMLElement>) => void;
}
/**
 * The `Tag` component is used to label and categorize.
 * It can be used to mark the status of an object or classify it into different categories.
 *
 * @see https://rsuitejs.com/components/tag
 */
declare const Tag: RsRefForwardingComponent<'div', TagProps>;
export default Tag;
