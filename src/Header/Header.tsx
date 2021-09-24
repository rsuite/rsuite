import createComponent, { ComponentProps } from '../utils/createComponent';
export type HeaderProps = ComponentProps;

const Header = createComponent({ name: 'Header', componentAs: 'header' });

export default Header;
