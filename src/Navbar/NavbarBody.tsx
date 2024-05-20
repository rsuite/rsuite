import { deprecateComponent, createComponent, ComponentProps } from '@/internals/utils';

export type NavbarBodyProps = ComponentProps;

const NavbarBody = createComponent({ name: 'NavbarBody' });

export default deprecateComponent(
  NavbarBody,
  '<Navbar.Body> has been deprecated, you should <Nav> as direct child of <Navbar>'
);
