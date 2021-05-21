import createComponent, { ComponentProps } from '../utils/createComponent';
import deprecateComponent from '../utils/deprecateComponent';

export type NavbarBodyProps = ComponentProps;

const NavbarBody = createComponent({ name: 'NavbarBody' });

export default deprecateComponent(
  NavbarBody,
  '<Navbar.Body> has been deprecated, you should <Nav> as direct child of <Navbar>'
);
