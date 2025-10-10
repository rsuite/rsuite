import React from 'react';
import type { AnimationEventProps, RsRefForwardingComponent, WithAsProps } from '../internals/types';
export interface PanelProps<T = string | number> extends WithAsProps, AnimationEventProps {
    /**
     * Show border
     */
    bordered?: boolean;
    /**
     * Content area filled with containers
     */
    bodyFill?: boolean;
    /**
     * Custom body style
     */
    bodyProps?: React.HTMLAttributes<HTMLDivElement>;
    /**
     * Whether it is a collapsible panel
     */
    collapsible?: boolean;
    /**
     * The icon on the right side of the title
     */
    caretAs?: React.ElementType;
    /**
     * Expand then panel by default
     */
    defaultExpanded?: boolean;
    /**
     * Whether the panel is disabled
     */
    disabled?: boolean;
    /**
     * Expand then panel
     */
    expanded?: boolean;
    /**
     * The event key corresponding to the panel
     */
    eventKey?: T;
    /**
     * The head displays information
     */
    header?: React.ReactNode;
    /**
     * The id attribute of the panel
     */
    id?: string;
    /**
     * The role attribute of the header
     */
    headerRole?: string;
    /**
     * The role attribute of the panel
     */
    panelRole?: string;
    /**
     * Whether there is a shadow
     */
    shaded?: boolean;
    /**
     * The shadow of the content when scrolling
     */
    scrollShadow?: boolean;
    /**
     * Called when the panel is selected
     */
    onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}
/**
 * The `Panel` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/panel
 */
declare const Panel: RsRefForwardingComponent<'div', PanelProps>;
export default Panel;
