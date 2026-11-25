import { createComponent, ComponentProps } from '@/internals/utils';

export type SidenavHeaderProps = ComponentProps;

/**
 * The `Sidenav.Header` component for use with the `Sidenav` component.
 *
 * @see https://rsuitejs.com/components/sidenav
 */
const SidenavHeader = createComponent<'div', SidenavHeaderProps>({ name: 'SidenavHeader' });

export default SidenavHeader;
