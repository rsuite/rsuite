import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Collapse from '../Animation/Collapse';
import MenuContext from '../Dropdown/MenuContext';

import { mergeRefs, useClassNames } from '../utils';

import { IconProps } from '@rsuite/icons/lib/Icon';
import { StandardProps } from '../@types/common';
import useEnsuredRef from '../utils/useEnsuredRef';
import deprecatePropType from '../utils/deprecatePropType';

export interface TreeviewItemGroupProps<T = string> extends StandardProps {
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
}

const defaultProps: Partial<TreeviewItemGroupProps> = {
  openKeys: [],
  classPrefix: 'dropdown-menu'
};

/**
 * If <Dropdown.Menu> is inside another <Dropdown.Menu>,
 * it renders a `menuitem` and a `menu`.
 * Otherwise it renders the `menu` alone.
 */
const TreeviewItemGroup = React.forwardRef(
  (
    props: TreeviewItemGroupProps &
      Omit<React.HTMLAttributes<HTMLUListElement>, 'title' | 'onSelect'>,
    ref
  ) => {
    const { className, classPrefix, collapsible: collapsibleProp, expanded } = props;

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const menuRef = useEnsuredRef<HTMLUListElement>(ref);

    const parentMenu = useContext(MenuContext);

    const collapsible = collapsibleProp ?? parentMenu?.collapsible;

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

    const classes = merge(className, withClassPrefix());

    return renderCollapse((transitionProps, transitionRef) => {
      const { className: transitionClassName, ...transitionRestProps } = transitionProps || {};

      return (
        <ul
          ref={mergeRefs(transitionRef, menuRef)}
          role="group"
          {...props}
          {...transitionRestProps}
          className={classNames(classes, transitionClassName)}
        />
      );
    }, expanded);
  }
);

TreeviewItemGroup.displayName = 'Menu';
TreeviewItemGroup.defaultProps = defaultProps;
TreeviewItemGroup.propTypes = {
  active: PropTypes.bool,
  activeKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.any,
  classPrefix: PropTypes.string,
  pullLeft: deprecatePropType(PropTypes.bool),
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

export default TreeviewItemGroup;
