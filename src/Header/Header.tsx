import createComponent, { ComponentProps } from '../utils/createComponent';
export type HeaderProps = ComponentProps;

/**
 * The `<Header>` component is used to specify the header of the page.
 * @see https://rsuitejs.com/components/container/
 */
const Header = createComponent({ name: 'Header', componentAs: 'header' });

export default Header;
