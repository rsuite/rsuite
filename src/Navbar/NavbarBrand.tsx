import { createComponent, ComponentProps } from '@/internals/utils';

export type NavbarBrandProps = ComponentProps;

const NavbarBrand = createComponent<'a', NavbarBrandProps>({
  name: 'NavbarBrand',
  componentAs: 'a',
  componentClassPrefix: 'navbar-brand'
});

export default NavbarBrand;
