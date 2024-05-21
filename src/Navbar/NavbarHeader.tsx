import { deprecateComponent, createComponent, ComponentProps } from '@/internals/utils';

export type NavbarHeaderProps = ComponentProps;

const NavbarHeader = createComponent({ name: 'NavbarHeader' });

export default deprecateComponent(
  NavbarHeader,
  '<Navbar.Header> has been deprecated, use <Navbar.Brand> instead.'
);
