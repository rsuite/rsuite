import React, { useContext } from 'react';
import { Burger, BurgerProps } from '@/internals/Burger';
import { useEventCallback } from '@/internals/hooks';
import { createChainedFunction } from '@/internals/utils';
import { NavbarContext } from './NavbarContext';

export interface NavbarToggleProps extends Omit<BurgerProps, 'onToggle'> {
  /**
   * Callback function that is called when the toggle is clicked.
   */
  onToggle?: (open: boolean) => void;
}

const NavbarToggle = React.forwardRef((props: NavbarToggleProps, ref: React.Ref<any>) => {
  const {
    navbarId,
    open: contextOpen,
    onToggle: onToggleContext
  } = useContext(NavbarContext) || {};
  const { open, onClick, onToggle, ...rest } = props;

  const handleClick = useEventCallback(() => {
    onToggle?.(true);
    onToggleContext?.(true);
  });

  return (
    <Burger
      ref={ref}
      onClick={createChainedFunction(handleClick, onClick)}
      aria-controls={`${navbarId}-drawer`}
      open={typeof open === 'boolean' ? open : contextOpen}
      {...rest}
    />
  );
});

NavbarToggle.displayName = 'NavbarToggle';

export default NavbarToggle;
