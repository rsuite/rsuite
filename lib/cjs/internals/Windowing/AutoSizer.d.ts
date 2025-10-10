import React from 'react';
export interface Size {
    height: number;
    width: number;
}
export interface AutoSizerProps {
    /** Function responsible for rendering children. */
    children: (size: Size) => React.ReactNode;
    /** Optional custom CSS class name to attach to root AutoSizer element.    */
    className?: string | undefined;
    /** Default height to use for initial render; useful for SSR */
    defaultHeight?: number | undefined;
    /** Default width to use for initial render; useful for SSR */
    defaultWidth?: number | undefined;
    /** Disable dynamic :height property */
    disableHeight?: boolean | undefined;
    /** Disable dynamic :width property */
    disableWidth?: boolean | undefined;
    /** Optional inline style */
    style?: React.CSSProperties | undefined;
    /** Callback to be invoked on-resize */
    onResize?: ((size: Size) => void) | undefined;
}
/**
 * High-order component that automatically adjusts the width and height of a single child.
 *
 * @private
 */
declare const AutoSizer: React.ForwardRefExoticComponent<AutoSizerProps & React.RefAttributes<HTMLDivElement>>;
export default AutoSizer;
