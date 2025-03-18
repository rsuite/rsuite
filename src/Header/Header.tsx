import { createComponent, ComponentProps } from '@/internals/utils';

export type HeaderProps = ComponentProps;

/**
 * The `<Header>` component is used to specify the header of the page.
 * @see https://rsuitejs.com/components/container/
 */
const Header = createComponent<'header', HeaderProps>({ name: 'Header', componentAs: 'header' });

export default Header;
