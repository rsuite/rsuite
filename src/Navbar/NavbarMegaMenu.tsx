import React, { useCallback } from 'react';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import Whisper, { WhisperProps } from '../Whisper';
import Popover from '../Popover';
import NavbarItem, { NavbarItemProps } from './NavbarItem';
import { useStyles } from '@/internals/hooks';
import type { WithoutChildren } from '@/internals/types';

export interface NavbarMegaMenuProps extends Omit<WithoutChildren<NavbarItemProps>, 'title'> {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /**
   * Control the open state of the mega menu
   * @default false
   */
  open?: boolean;

  /**
   * The content of the mega menu. Can be either React nodes or a render function
   * @param props.onClose Function to close the mega menu
   */
  children?: React.ReactNode | ((props: { onClose: () => void }) => React.ReactNode);

  /**
   * Define the placement of the mega menu
   */
  placement?: WhisperProps['placement'];
}

const NavbarMegaMenu = React.forwardRef<HTMLElement, NavbarMegaMenuProps>((props, ref) => {
  const {
    as: Component = NavbarItem,
    className,
    classPrefix = 'mega-menu',
    children,
    title,
    open,
    placement = 'autoVertical',
    ...rest
  } = props;

  const { merge, prefix, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  const renderMenu = useCallback(
    (
      menuProps: { onClose: (delay?: number) => NodeJS.Timeout | void; className?: string },
      ref
    ) => {
      const { onClose, className } = menuProps;
      return (
        <Popover ref={ref} full arrow={false} className={className}>
          {typeof children === 'function' ? children({ onClose }) : children}
        </Popover>
      );
    },
    [children]
  );

  return (
    <Whisper preventOverflow placement={placement} trigger="click" speaker={renderMenu} open={open}>
      <Component ref={ref} className={classes} {...rest}>
        {title}
        <ArrowDownLineIcon className={prefix`toggle-icon`} />
      </Component>
    </Whisper>
  );
});

NavbarMegaMenu.displayName = 'NavbarMegaMenu';

export default NavbarMegaMenu;
