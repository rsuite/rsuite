import createComponent, { ComponentProps } from '../utils/createComponent';
import deprecateComponent from '../utils/deprecateComponent';

export type NavbarHeaderProps = ComponentProps;

const NavbarHeader = createComponent({ name: 'NavbarHeader' });

export default deprecateComponent(
  NavbarHeader,
  '<Navbar.Header> has been deprecated, use <Navbar.Brand> instead.'
);
