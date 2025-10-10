import React, { CSSProperties } from 'react';
import type { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface ImageProps extends WithAsProps, Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
    /**
     * An image may appear with border.
     */
    bordered?: boolean;
    /**
     * An image may appear circular.
     */
    circle?: boolean;
    /**
     * The fallback image when the src fails to load.
     */
    fallbackSrc?: string;
    /**
     * An image may appear rounded.
     */
    rounded?: boolean;
    /**
     * Whether there is a shadow.
     */
    shaded?: boolean;
    /**
     * It maps to css `object-fit` property.
     */
    fit?: CSSProperties['objectFit'];
    /**
     * It maps to css `object-position` property.
     */
    position?: CSSProperties['objectPosition'];
    /**
     * The placeholder to display when the image is loading.
     */
    placeholder?: React.ReactNode;
    /**
     * Whether the image should be zoomed when hovered.
     */
    zoomed?: boolean;
}
declare const Image: RsRefForwardingComponent<'img', ImageProps>;
export default Image;
