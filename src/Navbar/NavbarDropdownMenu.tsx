import React, { useContext } from 'react';
import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageNextIcon from '@rsuite/icons/PageNext';
import Disclosure from '@/internals/Disclosure';
import NavContext from '../Nav/NavContext';
import { StandardProps } from '@/internals/types';
import { IconProps } from '@rsuite/icons/Icon';
import { mergeRefs } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { NavbarContext } from '.';
import { useCustom } from '../CustomProvider';

export interface NavbarDropdownMenuProps<T = any> extends StandardProps {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /**
   * The submenu expands from the left and defaults to the right
   * @deprecated Use openDirection="start" instead.
   */
  pullLeft?: boolean;

  /**
   * Direction that the sub-menu open towards
   * - start: towards the head of the reading direction (right by default, left in RTL)
   * - end: towards the end of the reading direction (left by default, right in RTL)
   *
   * @default 'end'
   */
  openDirection?: 'start' | 'end';

  /**
   *  Only used for setting the default expand state when it's a submenu.
   */
  eventKey?: T;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  open?: boolean;
  collapsible?: boolean;
  expanded?: boolean;
  active?: boolean;
  disabled?: boolean;
  activeKey?: T;
  onToggle?: (open: boolean, eventKey?: T | undefined, event?: React.SyntheticEvent) => void;
}

/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a <Nav.Menu> within a <Navbar>
 *
 * <Navbar>
 *   <Nav>
 *     <Nav.Menu>
 *       <Nav.Menu title="menu"> -> This submenu will render <NavbarDropdownMenu> component
 *       </Nav.Menu>
 *     </Nav.Menu>
 *   </Nav>
 * </Navbar>
 */
const NavbarDropdownMenu = React.forwardRef<
  HTMLElement,
  NavbarDropdownMenuProps &
    Omit<React.HTMLAttributes<HTMLUListElement>, 'title' | 'onToggle' | 'onSelect'>
>((props, ref) => {
  const navbar = useContext(NavbarContext);
  const nav = useContext(NavContext);

  if (!navbar || !nav) {
    throw new Error(
      '<Navbar.Dropdown.Menu> must be rendered within a <Nav> within a <Navbar> component.'
    );
  }

  const {
    onToggle,
    eventKey,
    title,
    classPrefix = 'dropdown-menu',
    children,
    openDirection = 'end',
    ...rest
  } = props;

  const { rtl } = useCustom();
  const { prefix } = useClassNames(classPrefix);

  const { withClassPrefix: withMenuClassPrefix, merge: mergeMenuClassName } =
    useClassNames('dropdown-menu');

  const {
    merge: mergeItemClassNames,
    withClassPrefix: withItemClassPrefix,
    prefix: prefixItemClassName
  } = useClassNames('dropdown-item');

  // Parent menu exists. This is a submenu.
  // Should render a `menuitem` that controls this submenu.
  const { icon, className, disabled, ...menuProps } = omit(rest, ['trigger']);

  const Icon = rtl ? PagePreviousIcon : PageNextIcon;

  return (
    <Disclosure
      hideOnClickOutside
      trigger={['click', 'hover']}
      onToggle={(open, event) => onToggle?.(open, undefined, event)}
    >
      {({ open, ...props }, containerRef: React.Ref<HTMLElement>) => {
        const classes = mergeItemClassNames(
          className,
          withItemClassPrefix({
            disabled,
            open,
            submenu: true
          })
        );
        return (
          <li ref={mergeRefs(ref, containerRef)} className={classes} {...props}>
            <Disclosure.Button>
              {({ open, ...buttonProps }, buttonRef: React.Ref<HTMLElement>) => {
                const classes = mergeItemClassNames(
                  className,
                  prefixItemClassName`toggle`,
                  withItemClassPrefix({
                    'with-icon': icon,
                    open,
                    disabled
                  })
                );

                const dataAttributes: { [key: string]: any } = {
                  'data-event-key': eventKey
                };

                if (!isNil(eventKey) && typeof eventKey !== 'string') {
                  dataAttributes['data-event-key-type'] = typeof eventKey;
                }

                return (
                  <div
                    ref={mergeRefs(buttonRef, buttonRef as any)}
                    className={classes}
                    {...dataAttributes}
                    {...buttonProps}
                  >
                    {icon && React.cloneElement(icon, { className: prefix('menu-icon') })}
                    {title}
                    <Icon className={prefix`toggle-icon`} />
                  </div>
                );
              }}
            </Disclosure.Button>
            <Disclosure.Content>
              {({ open }, elementRef) => {
                const menuClassName = mergeMenuClassName(className, withMenuClassPrefix());

                return (
                  <ul
                    ref={elementRef as any}
                    className={menuClassName}
                    hidden={!open}
                    data-direction={openDirection}
                    {...menuProps}
                  >
                    {children}
                  </ul>
                );
              }}
            </Disclosure.Content>
          </li>
        );
      }}
    </Disclosure>
  );
});

NavbarDropdownMenu.displayName = 'Nav.Dropdown.Menu';

export default NavbarDropdownMenu;
