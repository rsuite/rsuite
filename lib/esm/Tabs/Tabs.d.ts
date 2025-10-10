import React from 'react';
import Tab from './Tab';
import type { WithAsProps, RsRefForwardingComponent } from '../internals/types';
/**
 * Props for the Tabs component.
 */
export interface TabsProps extends WithAsProps {
    /**
     * The appearance of the tabs.
     * @default 'tabs'
     * @version 'pills' is supported in version 5.68.0
     */
    appearance?: 'tabs' | 'subtle' | 'pills';
    /**
     * The key of the active tab.
     */
    activeKey?: string | number;
    /**
     * The default key of the active tab.
     */
    defaultActiveKey?: string | number;
    /**
     * Whether to reverse the order of the tabs.
     */
    reversed?: boolean;
    /**
     * Whether to display the tabs vertically.
     */
    vertical?: boolean;
    /**
     * The ID of the tabs.
     * @default A unique ID is automatically generated.
     */
    id?: string;
    /**
     * Callback function that is called when a tab is selected.
     *
     * @param eventKey - The key of the selected tab.
     * @param event - The event object.
     */
    onSelect?: (eventKey: string | number | undefined, event: React.SyntheticEvent) => void;
}
interface TabsComponent extends RsRefForwardingComponent<'div', TabsProps> {
    Tab: typeof Tab;
}
/**
 * Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time.
 *
 * @version 5.53.0
 * @see https://rsuitejs.com/components/tabs
 */
declare const Tabs: TabsComponent;
export default Tabs;
