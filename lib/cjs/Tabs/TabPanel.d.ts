import React from 'react';
import { WithAsProps } from '../internals/types';
interface TabPanelProps extends WithAsProps {
    /** The active state of the tab. */
    active?: boolean;
    /** The HTML id attribute, which should be unique. */
    id?: string;
}
declare const TabPanel: React.ForwardRefExoticComponent<TabPanelProps & React.RefAttributes<HTMLDivElement>>;
export default TabPanel;
