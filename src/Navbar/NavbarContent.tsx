import { createComponent, ComponentProps } from '@/internals/utils';
import Box, { BoxProps } from '@/internals/Box';

export type NavbarContentProps = Omit<ComponentProps, 'hidden'> & BoxProps;

const NavbarContent = createComponent<typeof Box, NavbarContentProps>({
  name: 'NavbarContent',
  componentAs: Box,
  componentClassPrefix: 'navbar-content'
});

export default NavbarContent;
