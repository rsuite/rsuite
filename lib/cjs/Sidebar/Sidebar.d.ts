import type { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface SidebarProps extends WithAsProps {
    /** Width */
    width?: number | string;
    /** Sidebar can be collapsed */
    collapsible?: boolean;
}
/**
 * The `Sidebar` component for use with the `Container` component.
 * @see https://rsuitejs.com/components/container/
 */
declare const Sidebar: RsRefForwardingComponent<'aside', SidebarProps>;
export default Sidebar;
