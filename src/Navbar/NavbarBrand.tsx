import { createComponent, ComponentProps } from '@/internals/utils';

export type NavbarBrandProps = ComponentProps;

const NavbarBrand = createComponent({
  name: 'NavbarBrand',
  componentAs: 'a',
  componentClassPrefix: 'navbar-brand'
});

export default NavbarBrand;
