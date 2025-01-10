import { createComponent, ComponentProps } from '@/internals/utils';

export type NavbarContentProps = ComponentProps;

const NavbarContent = createComponent({
  name: 'NavbarContent',
  componentAs: 'div',
  componentClassPrefix: 'navbar-content'
});

export default NavbarContent;
