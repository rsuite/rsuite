import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleRight from '@rsuite/icons/legacy/AngleRight';
import Collapse from '../Animation/Collapse';

import DropdownMenuItem from './DropdownMenuItem';
import Ripple from '../Ripple';
import {
  createChainedFunction,
  ReactChildren,
  shallowEqual,
  mergeRefs,
  useClassNames
} from '../utils';

import { IconProps } from '@rsuite/icons/lib/Icon';
import { StandardProps } from '../@types/common';
import useCustom from '../utils/useCustom';

export interface DropdownMenuProps<T = string> extends StandardProps {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** The submenu expands from the left and defaults to the right */
  pullLeft?: boolean;

  /** The value of the current option */
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
}

const defaultProps: Partial<DropdownMenuProps> = {
  openKeys: [],
  classPrefix: 'dropdown-menu'
};

const DropdownMenu = React.forwardRef((props: DropdownMenuProps, ref) => {
  const {
    children,
    className,
    classPrefix,
    collapsible,
    expanded,
    activeKey,
    openKeys,
    onSelect,
    onToggle,
    ...rest
  } = props;

  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const { rtl } = useCustom('DropdownMenu');
  const handleToggleChange = useCallback(
    (eventKey: string, event: React.MouseEvent) => {
      onToggle?.(eventKey, event);
    },
    [onToggle]
  );

  const isActive = useCallback(
    (props: DropdownMenuProps) => {
      if (
        props.active ||
        (typeof activeKey !== 'undefined' && shallowEqual(props.eventKey, activeKey))
      ) {
        return true;
      }

      if (ReactChildren.some(props.children, child => isActive(child.props))) {
        return true;
      }

      return props.active;
    },
    [activeKey]
  );

  const getMenuItemsAndStatus = (children?: React.ReactNode): { items: any[]; active: boolean } => {
    let hasActiveItem: boolean;

    const items = React.Children.map(children, (item: any, index: number) => {
      if (!item) {
        return null;
      }

      const displayName = item?.type?.displayName;
      let active: boolean;

      if (displayName === 'DropdownMenuItem' || displayName === 'DropdownMenu') {
        active = isActive(item.props);
        if (active) {
          hasActiveItem = true;
        }
      }

      if (displayName === 'DropdownMenuItem') {
        const { onSelect: onItemSelect } = item.props;
        return React.cloneElement(item, {
          key: index,
          active,
          onSelect: createChainedFunction(onSelect, onItemSelect)
        });
      } else if (displayName === 'DropdownMenu') {
        const itemsAndStatus = getMenuItemsAndStatus(item.props.children);
        const { icon, open, trigger, pullLeft, eventKey, title, className } = item.props;
        const expanded = openKeys.some(key => shallowEqual(key, eventKey));
        const itemClassName = merge(
          className,
          prefix(`pull-${pullLeft ? 'left' : 'right'}`, {
            'item-focus': isActive(item.props)
          })
        );
        const Icon = (pullLeft && !rtl) || (rtl && !pullLeft) ? AngleLeft : AngleRight;

        return (
          <DropdownMenuItem
            icon={icon}
            open={open}
            trigger={trigger}
            expanded={expanded}
            className={itemClassName}
            pullLeft={pullLeft}
            as="div"
            submenu
            role={null}
          >
            <div
              className={prefix`toggle`}
              onClick={e => handleToggleChange(eventKey, e)}
              role="menu"
              tabIndex={-1}
            >
              <span>{title}</span>
              <Icon className={prefix`toggle-icon`} />
              <Ripple />
            </div>
            {renderCollapse((transitionProps, ref) => {
              const { className, ...transitionRestProps } = transitionProps || {};
              return (
                <div
                  {...transitionRestProps}
                  ref={ref}
                  role="menu"
                  className={merge(className, withClassPrefix())}
                >
                  {itemsAndStatus.items}
                </div>
              );
            }, expanded)}
          </DropdownMenuItem>
        );
      }

      return item;
    });

    return {
      items,
      active: hasActiveItem
    };
  };

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

  const { items, active } = getMenuItemsAndStatus(children);
  const classes = merge(className, withClassPrefix({ active }));

  return renderCollapse((transitionProps, transitionRef) => {
    const { className: transitionClassName, ...transitionRestProps } = transitionProps || {};

    return (
      <div
        {...rest}
        {...transitionRestProps}
        className={classNames(classes, transitionClassName)}
        role="menu"
        ref={mergeRefs(transitionRef, ref)}
      >
        {items}
      </div>
    );
  }, expanded);
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
