import React, { useContext } from 'react';
import IconButton, { IconButtonProps } from '../IconButton';
import MenuIcon from '@rsuite/icons/Menu';
import { useEventCallback } from '@/internals/hooks';
import { createComponent, createChainedFunction } from '@/internals/utils';
import { NavbarContext } from './NavbarContext';

export type NavbarToggleProps = IconButtonProps;

const Toggle = createComponent<typeof IconButton, IconButtonProps>({
  name: 'NavbarToggle',
  componentAs: IconButton,
  componentClassPrefix: 'navbar-toggle',
  icon: <MenuIcon />
});

const NavbarToggle = React.forwardRef((props: NavbarToggleProps, ref: React.Ref<any>) => {
  const { appearance: navbarAppearance, navbarId, onToggle } = useContext(NavbarContext) || {};
  const {
    appearance = navbarAppearance === 'inverse' ? 'primary' : 'subtle',
    onClick,
    ...rest
  } = props;

  const handleClick = useEventCallback(() => {
    onToggle?.(true);
  });

  return (
    <Toggle
      ref={ref}
      appearance={appearance}
      onClick={createChainedFunction(handleClick, onClick)}
      aria-controls={`${navbarId}-drawer`}
      {...rest}
    />
  );
});

NavbarToggle.displayName = 'NavbarToggle';

export default NavbarToggle;
