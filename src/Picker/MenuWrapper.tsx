import React, { useRef, useCallback, useEffect } from 'react';
import omit from 'lodash/omit';
import { addStyle, getWidth } from 'dom-lib';
import { getDOMNode, mergeRefs, useElementResize, useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { OverlayTriggerInstance } from '../Picker';

const omitProps = [
  'placement',
  'arrowOffsetLeft',
  'arrowOffsetTop',
  'positionLeft',
  'positionTop',
  'getPositionInstance',
  'getToggleInstance',
  'autoWidth'
];

const resizePlacement = [
  'topStart',
  'topEnd',
  'leftEnd',
  'rightEnd',
  'auto',
  'autoVerticalStart',
  'autoVerticalEnd',
  'autoHorizontalEnd'
];

export interface MenuWrapperProps extends WithAsProps {
  placement?: string;
  autoWidth?: boolean;
  children?: React.ReactNode;
  target?: React.RefObject<OverlayTriggerInstance>;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const MenuWrapper: RsRefForwardingComponent<'div', MenuWrapperProps> = React.forwardRef(
  (props: MenuWrapperProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'picker-menu',
      autoWidth,
      className,
      placement,
      target,
      ...rest
    } = props;

    const menuRef = useRef();
    const handleResize = useCallback(() => {
      const instance = target?.current;
      if (instance && resizePlacement.includes(placement)) {
        instance.updatePosition();
      }
    }, [target, placement]);

    useElementResize(() => menuRef.current, handleResize);
    useEffect(() => {
      const toggle = target?.current;
      if (autoWidth && toggle.child) {
        // Get the width value of the button,
        // and then set it to the menu to make their width consistent.
        const width = getWidth(getDOMNode(toggle.child));
        addStyle(menuRef.current, 'min-width', `${width}px`);
      }
    }, [autoWidth, target, menuRef]);

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <Component {...omit(rest, omitProps)} ref={mergeRefs(menuRef, ref)} className={classes} />
    );
  }
);

MenuWrapper.displayName = 'MenuWrapper';

export default MenuWrapper;
