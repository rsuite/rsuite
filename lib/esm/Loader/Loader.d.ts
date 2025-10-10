import React from 'react';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../internals/types';
export interface LoaderProps extends WithAsProps {
    /** Centered in the container */
    center?: boolean;
    /** Whether the background is displayed */
    backdrop?: boolean;
    /** An alternative dark visual style for the Loader */
    inverse?: boolean;
    /** The icon is displayed vertically with the text */
    vertical?: boolean;
    /** Custom descriptive text */
    content?: React.ReactNode;
    /** The speed at which the loader rotates */
    speed?: 'normal' | 'fast' | 'slow' | 'paused';
    /** A loader can have different sizes */
    size?: TypeAttributes.Size;
}
/**
 * The `Loader` component is used to indicate the loading state of a page or a section.
 * @see https://rsuitejs.com/components/loader
 */
declare const Loader: RsRefForwardingComponent<'div', LoaderProps>;
export default Loader;
