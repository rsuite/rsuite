import React from 'react';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../internals/types';
import { type Size } from '../AvatarGroup/AvatarGroup';
export interface AvatarProps extends WithAsProps {
    /**
     * A avatar can have different sizes.
     *
     * @default 'md'
     * @version xxl and xs added in v5.59.0
     */
    size?: Size;
    /**
     * The `src` attribute for the `img` element.
     */
    src?: string;
    /**
     * The `sizes` attribute for the `img` element.
     */
    sizes?: string;
    /**
     * The `srcSet` attribute for the `img` element.
     * Use this attribute for responsive image display.
     */
    srcSet?: string;
    /**
     * Attributes applied to the `img` element if the component is used to display an image.
     * It can be used to listen for the loading error event.
     */
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    /**
     * Set avatar shape to circle
     */
    circle?: boolean;
    /**
     * This attribute defines an alternative text description of the image
     */
    alt?: string;
    /**
     * Show a border around the avatar.
     * @version 5.59.0
     */
    bordered?: boolean;
    /**
     * Sets the avatar background color.
     * @version 5.59.0
     */
    color?: TypeAttributes.Color;
    /**
     * Callback fired when the image failed to load.
     * @version 5.59.0
     */
    onError?: OnErrorEventHandler;
}
/**
 * The Avatar component is used to represent user or brand.
 * @see https://rsuitejs.com/components/avatar
 */
declare const Avatar: RsRefForwardingComponent<'div', AvatarProps>;
export default Avatar;
