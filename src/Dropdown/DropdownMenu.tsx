import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleRight from '@rsuite/icons/legacy/AngleRight';
import Collapse from '../Animation/Collapse';
import MenuContext from './MenuContext';

import DropdownMenuItem from './DropdownMenuItem';
import { shallowEqual, mergeRefs, useClassNames } from '../utils';

import { IconProps } from '@rsuite/icons/lib/Icon';
import { StandardProps } from '../@types/common';
import useCustom from '../utils/useCustom';

export interface DropdownMenuProps<T = string> extends StandardProps {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** The submenu expands from the left and defaults to the right */
  pullLeft?: boolean;

  /**
   *  Only used for setting the default expand state when it's a submenu.
   *  Used in conjunction with `openKeys` from parents
   */
  eventKey?: T;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  open?: boolean;
  openKeys?: T[];
  collapsible?: boolean;
  expanded?: boolean;
  active?: boolean;
  activeKey?: T;
  trigger?: 'hover' | 'click';
  onSelect?: (eventKey: T, event: React.SyntheticEvent<Element>) => void;
  onToggle?: (eventKey: T, event: React.SyntheticEvent<Element>) => void;
  /**
   * Which item to place focus when menu gets opened
   * @internal Only used when opening with keyboard control
   */
  focusIndexOnOpen?: number;
}

const defaultProps: Partial<DropdownMenuProps> = {
  openKeys: [],
  classPrefix: 'dropdown-menu'
};

/**
 * If <Dropdown.Menu> is inside another <Dropdown.Menu>,
 * it renders a `menuitem` and a `menu`.
 * Otherwise it renders the `menu` alone.
 */
const DropdownMenu = React.forwardRef((props: DropdownMenuProps, ref) => {
  const {
    children,
    className,
    classPrefix,
    collapsible: collapsibleProp,
    expanded,
    activeKey,
    openKeys,
    onSelect,
    onToggle,
    focusIndexOnOpen,
    ...rest
  } = props;
  const parentMenuContext = useContext(MenuContext);

  const collapsible = collapsibleProp ?? parentMenuContext?.collapsible;

  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const { rtl } = useCustom('DropdownMenu');
  const handleToggleChange = useCallback(
    (eventKey: string, event: React.MouseEvent) => {
      onToggle?.(eventKey, event);
    },
    [onToggle]
  );

  const [itemIds, setItemIds] = useState<string[]>([]);

  // Register menuitems' ID
  const handleItemRendered = useCallback((element: HTMLElement) => {
    setItemIds(ids => [...ids, element.id]);
  }, []);

  const [activeItemIndex, setActiveItemIndex] = useState<number>();

  const activeDescendantId = useMemo(() => {
    if (isNil(activeItemIndex)) return null;

    return itemIds[activeItemIndex];
  }, [itemIds, activeItemIndex]);

  useEffect(() => {
    setActiveItemIndex(focusIndexOnOpen);
  }, [focusIndexOnOpen]);

  const renderCollapse = (children, expanded?: boolean) => {
    return collapsible ? (
      <Collapse
        in={expanded}
        exitedClassName={prefix`collapse-out`}
        exitingClassName={prefix`collapsing`}
        enteredClassName={prefix`collapse-in`}
        enteringClassName={prefix`collapsing`}
      >
        {children}
      </Collapse>
    ) : (
      children()
    );
  };

  // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-13
  const menuAriaAttributes: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > = {
    role: 'menu',
    'aria-activedescendant': activeDescendantId
  };

  // Parent menu exists. This is a submenu.
  // Should render a `menuitem` that controls this submenu.
  if (parentMenuContext) {
    const { icon, open, trigger, pullLeft, eventKey, title, className } = props;
    const expanded = !isNil(eventKey) && openKeys.some(key => shallowEqual(key, eventKey));
    const itemClassName = merge(className, prefix(`pull-${pullLeft ? 'left' : 'right'}`));
    const Icon = (pullLeft && !rtl) || (rtl && !pullLeft) ? AngleLeft : AngleRight;

    const submenu = renderCollapse((transitionProps, ref) => {
      const { className, ...transitionRestProps } = transitionProps || {};

      return (
        <ul
          {...transitionRestProps}
          id={(rest as any).id}
          ref={ref}
          className={merge(className, withClassPrefix())}
          {...menuAriaAttributes}
        >
          {props.children}
        </ul>
      );
    }, expanded);

    return (
      <DropdownMenuItem
        icon={icon}
        open={open}
        trigger={trigger}
        expanded={expanded}
        className={itemClassName}
        pullLeft={pullLeft}
        submenu={submenu}
        role="none presentation"
        eventKey={eventKey}
      >
        <div
          className={prefix`toggle`}
          onClick={e => handleToggleChange(eventKey, e)}
          role="menuitem"
          aria-controls={(rest as any).id}
          tabIndex={-1}
        >
          <span>{title}</span>
          <Icon className={prefix`toggle-icon`} />
        </div>
      </DropdownMenuItem>
    );
  }

  const classes = merge(className, withClassPrefix());

  return (
    <MenuContext.Provider
      value={{
        activeKey,
        openKeys,
        collapsible,
        onSelect,
        onItemRendered: handleItemRendered,
        activeDescendantId
      }}
    >
      {renderCollapse((transitionProps, transitionRef) => {
        const { className: transitionClassName, ...transitionRestProps } = transitionProps || {};

        return (
          <ul
            {...rest}
            {...transitionRestProps}
            className={classNames(classes, transitionClassName)}
            ref={mergeRefs(transitionRef, ref)}
            tabIndex={0}
            {...menuAriaAttributes}
          >
            {children}
          </ul>
        );
      }, expanded)}
    </MenuContext.Provider>
  );
});

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.defaultProps = defaultProps;
DropdownMenu.propTypes = {
  active: PropTypes.bool,
  activeKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.any,
  classPrefix: PropTypes.string,
  pullLeft: PropTypes.bool,
  title: PropTypes.node,
  open: PropTypes.bool,
  trigger: PropTypes.oneOf(['click', 'hover']),
  eventKey: PropTypes.any,
  openKeys: PropTypes.array,
  expanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  onSelect: PropTypes.func,
  onToggle: PropTypes.func
};

export default DropdownMenu;
