import createComponent, { ComponentProps } from '../utils/createComponent';

export type NavbarBrandProps = ComponentProps;

const NavbarBrand = createComponent({
  name: 'NavbarBrand',
  componentAs: 'a',
  componentClassPrefix: 'navbar-brand'
});

export default NavbarBrand;
