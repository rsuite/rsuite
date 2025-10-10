import React from 'react';
interface TabProps {
    /**
     * The children of the tab.
     */
    children?: React.ReactNode;
    /**
     * The disabled state of the tab.
     */
    disabled?: boolean;
    /**
     * The event key of the tab.
     */
    eventKey?: string;
    /**
     * The icon of the tab.
     */
    icon?: React.ReactNode;
    /**
     * Content for the tab title.
     */
    title: React.ReactNode;
}
declare const Tab: React.FC<TabProps>;
export default Tab;
